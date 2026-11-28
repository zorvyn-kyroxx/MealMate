import { createClient } from "@supabase/supabase-js";

// Retrieve environment variables (accept both standard anon and publishable key names)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseBrowserKey = [
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
  import.meta.env.VITE_SUPABASE_ANON_KEY
].find((key) => key && !/your-|placeholder/i.test(key));

const hasValidSupabaseUrl = (() => {
  if (!supabaseUrl || /your-project|placeholder/i.test(supabaseUrl)) return false;
  try {
    const parsedUrl = new URL(supabaseUrl);
    return parsedUrl.protocol === "https:" ||
      (parsedUrl.protocol === "http:" && ["localhost", "127.0.0.1"].includes(parsedUrl.hostname));
  } catch {
    return false;
  }
})();

export const isSupabaseConfigured = Boolean(
  hasValidSupabaseUrl &&
  supabaseBrowserKey
);

// No client is created when public Supabase configuration is unavailable.
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseBrowserKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
      }
    })
  : null;

export async function getCurrentAuthUser() {
  if (!supabase) return null;
  const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
  if (sessionError) throw sessionError;
  if (!sessionData.session) return null;

  const { data, error } = await supabase.auth.getUser();
  if (error) throw error;
  return data.user;
}

/**
 * Sign up a new user with email and password
 */
export async function signUpWithEmail(email, password, displayName = "") {
  if (!isSupabaseConfigured) {
    return {
      data: { user: null },
      error: new Error("Account registration is unavailable until Supabase is configured.")
    };
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: displayName }
    }
  });

  return { data, error };
}

export async function resendSignupConfirmation(email) {
  if (!isSupabaseConfigured || !supabase) {
    return {
      data: null,
      error: new Error("Email confirmation is unavailable until Supabase is configured.")
    };
  }

  const { data, error } = await supabase.auth.resend({
    type: "signup",
    email
  });

  return { data, error };
}

/**
 * Sign in an existing user
 */
export async function signInWithEmail(email, password) {
  if (!isSupabaseConfigured) {
    return {
      data: { user: null },
      error: new Error("Sign-in is unavailable until Supabase is configured.")
    };
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  return { data, error };
}

/**
 * Sign out current session
 */
export async function signOutUser() {
  if (!isSupabaseConfigured) {
    return { error: null };
  }
  const { error } = await supabase.auth.signOut();
  return { error };
}

/**
 * Push workspace state to Supabase cloud
 */
export async function syncUserDataToCloud(userId, workspaceData) {
  if (!isSupabaseConfigured || !supabase || !userId) {
    throw new Error("Cloud workspace sync requires a configured Supabase client and signed-in user.");
  }

  const { data: existingWorkspace, error: fetchError } = await supabase
    .from("user_workspaces")
    .select("data")
    .eq("user_id", userId)
    .maybeSingle();

  if (fetchError) throw fetchError;
  const existingData = existingWorkspace?.data;
  const mergedData = {
    ...(existingData && typeof existingData === "object" && !Array.isArray(existingData)
      ? existingData
      : {}),
    ...workspaceData
  };
  const { error } = await supabase
    .from("user_workspaces")
    .upsert({
      user_id: userId,
      data: mergedData,
      updated_at: new Date().toISOString()
    }, { onConflict: "user_id" });

  if (error) throw error;
  return true;
}

/**
 * Pull workspace state from Supabase cloud
 */
export async function fetchUserDataFromCloud(userId) {
  if (!isSupabaseConfigured || !supabase || !userId) return null;

  const { data, error } = await supabase
    .from("user_workspaces")
    .select("data")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) throw error;
  return data?.data ?? null;
}
