import { createClient } from "https://esm.sh/@supabase/supabase-js@2.119.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS"
};
const prices = {
  monthly: { amountPaise: 24900, durationDays: 30 },
  annual: { amountPaise: 199900, durationDays: 365 }
} as const;

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
  if (request.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (request.method !== "POST") return jsonResponse(405, { error: "Method not allowed." });

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const keyId = Deno.env.get("RAZORPAY_KEY_ID");
  const keySecret = Deno.env.get("RAZORPAY_KEY_SECRET");
  if (!supabaseUrl || !serviceRoleKey || !keyId || !keySecret) {
    console.error("Subscription function is missing server credentials.");
    return jsonResponse(503, { error: "Secure subscription checkout is not configured." });
  }

  const admin = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false }
  });
  const authorization = `Basic ${btoa(`${keyId}:${keySecret}`)}`;

  try {
    const body = await request.json();
    const bearer = request.headers.get("Authorization") || "";
    const token = bearer.startsWith("Bearer ") ? bearer.slice(7) : "";
    if (!token) return jsonResponse(401, { error: "Sign in with a MealMate account to manage Pro." });

    const { data: userData, error: userError } = await admin.auth.getUser(token);
    if (userError || !userData.user) {
      return jsonResponse(401, { error: "Your session could not be verified. Please sign in again." });
    }
    const userId = userData.user.id;

    if (body.action === "status") {
      const { data, error } = await admin
        .from("pro_subscriptions")
        .select("expires_at")
        .eq("user_id", userId)
        .eq("status", "active")
        .gt("expires_at", new Date().toISOString())
        .order("expires_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      if (error) throw error;
      return jsonResponse(200, {
        isPro: Boolean(data),
        expiresAt: data?.expires_at || null
      });
    }

    if (body.action === "create") {
      const billingCycle = body.billingCycle as keyof typeof prices;
      const price = prices[billingCycle];
      if (!price) return jsonResponse(400, { error: "Choose a valid billing cycle." });

      const receipt = `mm_pro_${crypto.randomUUID().replaceAll("-", "").slice(0, 20)}`;
      const orderResponse = await fetch("https://api.razorpay.com/v1/orders", {
        method: "POST",
        headers: { Authorization: authorization, "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: price.amountPaise,
          currency: "INR",
          receipt,
          notes: { purpose: "MealMate Pro subscription", user_id: userId, billing_cycle: billingCycle }
        })
      });
      if (!orderResponse.ok) {
        console.error("Razorpay subscription order creation failed:", orderResponse.status);
        return jsonResponse(502, { error: "Could not start secure checkout. Please try again later." });
      }
      const order = await orderResponse.json();
      const { error } = await admin.from("pro_subscriptions").insert({
        user_id: userId,
        order_id: order.id,
        billing_cycle: billingCycle,
        amount_paise: price.amountPaise,
        status: "pending"
      });
      if (error) throw error;

      return jsonResponse(200, {
        keyId,
        orderId: order.id,
        amountPaise: price.amountPaise,
        currency: "INR",
        billingCycle
      });
    }

    if (body.action === "verify") {
      const orderId = typeof body.orderId === "string" ? body.orderId : "";
      const paymentId = typeof body.paymentId === "string" ? body.paymentId : "";
      const signature = typeof body.signature === "string" ? body.signature : "";
      if (!orderId || !paymentId || !/^[a-f0-9]{64}$/i.test(signature)) {
        return jsonResponse(400, { error: "Payment details are incomplete." });
      }

      const { data: purchase, error: lookupError } = await admin
        .from("pro_subscriptions")
        .select("order_id, user_id, payment_id, billing_cycle, amount_paise, status, expires_at")
        .eq("order_id", orderId)
        .eq("user_id", userId)
        .maybeSingle();
      if (lookupError) throw lookupError;
      if (!purchase) return jsonResponse(404, { error: "Subscription order was not found for this account." });
      if (purchase.status === "active" && purchase.payment_id === paymentId) {
        return jsonResponse(200, { confirmed: true, isPro: true, expiresAt: purchase.expires_at });
      }
      if (purchase.status !== "pending") {
        return jsonResponse(409, { error: "This subscription order is not awaiting payment." });
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
        console.error("Razorpay subscription payment lookup failed:", paymentResponse.status);
        return jsonResponse(502, { error: "Could not confirm payment status. Please retry shortly." });
      }

      let payment = await paymentResponse.json();
      if (payment.order_id !== orderId || payment.amount !== purchase.amount_paise) {
        return jsonResponse(400, { error: "Payment details do not match this subscription." });
      }
      if (payment.status === "authorized") {
        const captureResponse = await fetch(
          `https://api.razorpay.com/v1/payments/${encodeURIComponent(paymentId)}/capture`,
          {
            method: "POST",
            headers: { Authorization: authorization, "Content-Type": "application/json" },
            body: JSON.stringify({ amount: purchase.amount_paise, currency: "INR" })
          }
        );
        if (!captureResponse.ok) {
          console.error("Razorpay subscription payment capture failed:", captureResponse.status);
          return jsonResponse(502, { error: "Payment is authorized but not yet captured. Please retry confirmation." });
        }
        payment = await captureResponse.json();
      }
      if (payment.order_id !== orderId || payment.amount !== purchase.amount_paise || payment.status !== "captured") {
        return jsonResponse(402, { error: "Payment is not captured yet. Please retry confirmation." });
      }

      const { data: latest, error: latestError } = await admin
        .from("pro_subscriptions")
        .select("expires_at")
        .eq("user_id", userId)
        .eq("status", "active")
        .gt("expires_at", new Date().toISOString())
        .order("expires_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      if (latestError) throw latestError;
      const currentExpiry = latest?.expires_at ? Date.parse(latest.expires_at) : Date.now();
      const startAt = Math.max(Date.now(), currentExpiry);
      const durationDays = prices[purchase.billing_cycle as keyof typeof prices].durationDays;
      const expiresAt = new Date(startAt + durationDays * 24 * 60 * 60 * 1000).toISOString();
      const { data: activated, error: updateError } = await admin
        .from("pro_subscriptions")
        .update({
          payment_id: paymentId,
          status: "active",
          paid_at: new Date().toISOString(),
          expires_at: expiresAt
        })
        .eq("order_id", orderId)
        .eq("user_id", userId)
        .eq("status", "pending")
        .select("expires_at")
        .maybeSingle();
      if (updateError) throw updateError;
      if (!activated) {
        return jsonResponse(409, { error: "Subscription activation could not be confirmed. Please retry verification." });
      }

      return jsonResponse(200, { confirmed: true, isPro: true, expiresAt: activated.expires_at });
    }

    return jsonResponse(400, { error: "Unknown subscription action." });
  } catch (error) {
    console.error("Subscription request failed:", error);
    return jsonResponse(500, { error: "Subscription request failed. Please try again later." });
  }
});
