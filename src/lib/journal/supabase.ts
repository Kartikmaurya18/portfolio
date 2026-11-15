import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**
 * False until the two environment variables are set. The journal then shows a
 * setup notice instead of failing, and the rest of the site is unaffected.
 * The anon key is meant to be public: Row Level Security in the database is
 * what stops anyone except the owner from writing.
 */
export const journalConfigured = Boolean(url && anonKey);

let client: SupabaseClient | undefined;

export function db(): SupabaseClient {
  if (!url || !anonKey) throw new Error("The journal database is not configured.");
  client ??= createClient(url, anonKey, { auth: { persistSession: true, autoRefreshToken: true } });
  return client;
}
