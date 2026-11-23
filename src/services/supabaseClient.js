import { createClient } from "@supabase/supabase-js";

// Retrieve environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if valid credentials are provided
export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl !== "https://your-project.supabase.co" &&
  !supabaseUrl.includes("placeholder")
);

// Export client instance (or dummy instance if unconfigured)
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * Sign up a new user with email and password
 */
export async function signUpWithEmail(email, password, displayName = "") {
  if (!isSupabaseConfigured) {
    // Local / Demo mode fallback
    const mockUser = {
      id: "local-" + Date.now(),
      email,
      user_metadata: { full_name: displayName || email.split("@")[0] }
    };
    return { data: { user: mockUser }, error: null };
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

/**
 * Sign in an existing user
 */
export async function signInWithEmail(email, password) {
  if (!isSupabaseConfigured) {
    // Local / Demo mode fallback
    const mockUser = {
      id: "local-" + Date.now(),
      email,
      user_metadata: { full_name: email.split("@")[0] }
    };
    return { data: { user: mockUser }, error: null };
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
  if (!isSupabaseConfigured || !supabase || !userId) return false;

  try {
    const { error } = await supabase
      .from("user_workspaces")
      .upsert({
        user_id: userId,
        data: workspaceData,
        updated_at: new Date().toISOString()
      }, { onConflict: "user_id" });

    return !error;
  } catch (err) {
    console.warn("Cloud sync error:", err);
    return false;
  }
}

/**
 * Pull workspace state from Supabase cloud
 */
export async function fetchUserDataFromCloud(userId) {
  if (!isSupabaseConfigured || !supabase || !userId) return null;

  try {
    const { data, error } = await supabase
      .from("user_workspaces")
      .select("data")
      .eq("user_id", userId)
      .maybeSingle();

    if (error || !data) return null;
    return data.data;
  } catch (err) {
    console.warn("Fetch cloud error:", err);
    return null;
  }
}
