import { createClient } from "https://esm.sh/@supabase/supabase-js@2.119.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS"
};

const jsonResponse = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" }
  });

const safeEqual = (left: string, right: string) => {
  if (left.length !== right.length) return false;
  let difference = 0;
  for (let index = 0; index < left.length; index += 1) {
    difference |= left.charCodeAt(index) ^ right.charCodeAt(index);
  }
  return difference === 0;
};

const hmacHex = async (secret: string, message: string) => {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(message));
  return Array.from(new Uint8Array(signature), (byte) => byte.toString(16).padStart(2, "0")).join("");
};

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  if (request.method !== "POST") {
    return jsonResponse(405, { error: "Method not allowed." });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !serviceRoleKey) {
    console.error("Donation function is missing Supabase server credentials.");
    return jsonResponse(503, { error: "Donation service is not configured." });
  }

  const admin = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false }
  });

  try {
    const body = await request.json();
    if (body.action === "summary") {
      const { data, error } = await admin.rpc("get_donation_summary").single();
      if (error) throw error;
      return jsonResponse(200, {
        totalPaise: Number(data.total_paise),
        donationCount: Number(data.donation_count),
        checkoutReady: Boolean(Deno.env.get("RAZORPAY_KEY_ID") && Deno.env.get("RAZORPAY_KEY_SECRET"))
      });
    }

    const keyId = Deno.env.get("RAZORPAY_KEY_ID");
    const keySecret = Deno.env.get("RAZORPAY_KEY_SECRET");
    if (!keyId || !keySecret) {
      console.error("Donation function is missing Razorpay server credentials.");
      return jsonResponse(503, { error: "Donation checkout is not configured." });
    }

    const authorization = `Basic ${btoa(`${keyId}:${keySecret}`)}`;
    if (body.action === "create") {
      const amount = Number(body.amount);
      const amountPaise = Math.round(amount * 100);
      if (!Number.isFinite(amount) || amountPaise < 100 || amountPaise > 10000000) {
        return jsonResponse(400, { error: "Donation amount must be between ₹1 and ₹1,00,000." });
      }

      const receipt = `mm_${crypto.randomUUID().replaceAll("-", "").slice(0, 20)}`;
      const providerResponse = await fetch("https://api.razorpay.com/v1/orders", {
        method: "POST",
        headers: {
          Authorization: authorization,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          amount: amountPaise,
          currency: "INR",
          receipt,
          notes: { purpose: "Voluntary MealMate team donation" }
        })
      });
      if (!providerResponse.ok) {
        console.error("Razorpay order creation failed:", providerResponse.status);
        return jsonResponse(502, { error: "Could not start checkout. Please try again later." });
      }

      const order = await providerResponse.json();
      const { error } = await admin.from("donations").insert({
        order_id: order.id,
        amount_paise: amountPaise,
        status: "pending"
      });
      if (error) throw error;

      return jsonResponse(200, {
        keyId,
        orderId: order.id,
        amountPaise,
        currency: "INR"
      });
    }

    if (body.action === "verify") {
      const orderId = typeof body.orderId === "string" ? body.orderId : "";
      const paymentId = typeof body.paymentId === "string" ? body.paymentId : "";
      const signature = typeof body.signature === "string" ? body.signature : "";
      if (!orderId || !paymentId || !/^[a-f0-9]{64}$/i.test(signature)) {
        return jsonResponse(400, { error: "Payment details are incomplete." });
      }

      const { data: donation, error: lookupError } = await admin
        .from("donations")
        .select("order_id, payment_id, amount_paise, status")
        .eq("order_id", orderId)
        .maybeSingle();
      if (lookupError) throw lookupError;
      if (!donation) return jsonResponse(404, { error: "Donation order was not found." });
      if (donation.status === "paid" && donation.payment_id === paymentId) {
        const { data: summary, error } = await admin.rpc("get_donation_summary").single();
        if (error) throw error;
        return jsonResponse(200, {
          confirmed: true,
          totalPaise: Number(summary.total_paise),
          donationCount: Number(summary.donation_count)
        });
      }
      if (donation.status !== "pending") {
        return jsonResponse(409, { error: "This donation order is not awaiting payment." });
      }

      const expectedSignature = await hmacHex(keySecret, `${orderId}|${paymentId}`);
      if (!safeEqual(expectedSignature, signature.toLowerCase())) {
        return jsonResponse(400, { error: "Payment signature could not be verified." });
      }

      const paymentResponse = await fetch(
        `https://api.razorpay.com/v1/payments/${encodeURIComponent(paymentId)}`,
        { headers: { Authorization: authorization } }
      );
      if (!paymentResponse.ok) {
        console.error("Razorpay payment lookup failed:", paymentResponse.status);
        return jsonResponse(502, { error: "Could not confirm payment status. Please retry shortly." });
      }
      let payment = await paymentResponse.json();
      if (payment.order_id !== orderId || payment.amount !== donation.amount_paise) {
        return jsonResponse(400, { error: "Payment details do not match this donation." });
      }
      if (payment.status === "authorized") {
        const captureResponse = await fetch(
          `https://api.razorpay.com/v1/payments/${encodeURIComponent(paymentId)}/capture`,
          {
            method: "POST",
            headers: {
              Authorization: authorization,
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ amount: donation.amount_paise, currency: "INR" })
          }
        );
        if (!captureResponse.ok) {
          console.error("Razorpay payment capture failed:", captureResponse.status);
          return jsonResponse(502, { error: "Payment was authorized but could not yet be captured. Please retry confirmation." });
        }
        payment = await captureResponse.json();
      }
      if (payment.order_id !== orderId || payment.amount !== donation.amount_paise || payment.status !== "captured") {
        return jsonResponse(402, { error: "Payment is not captured yet. Please retry confirmation shortly." });
      }

      const { error: updateError } = await admin
        .from("donations")
        .update({ payment_id: paymentId, status: "paid", paid_at: new Date().toISOString() })
        .eq("order_id", orderId)
        .eq("status", "pending");
      if (updateError) throw updateError;

      const { data: summary, error } = await admin.rpc("get_donation_summary").single();
      if (error) throw error;
      return jsonResponse(200, {
        confirmed: true,
        totalPaise: Number(summary.total_paise),
        donationCount: Number(summary.donation_count)
      });
    }

    return jsonResponse(400, { error: "Unknown donation action." });
  } catch (error) {
    console.error("Donation request failed:", error);
    return jsonResponse(500, { error: "Donation request failed. Please try again later." });
  }
});
