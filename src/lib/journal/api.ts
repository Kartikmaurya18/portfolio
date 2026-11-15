import { db } from "./supabase.ts";
import type { Category, Entry, EntryFilter, EntryInput } from "./types.ts";

const ENTRY = "*, categories(name)";
const PAGE = 1000;

function fail(error: { message: string } | null): asserts error is null {
  if (error) throw new Error(error.message);
}

/** Every entry's date (one item per entry), for the calendar, counts and streak. Pages through the API's 1,000-row limit. */
export async function fetchAllDates(): Promise<string[]> {
  const dates: string[] = [];
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await db()
      .from("learning_entries")
      .select("entry_date")
      .order("entry_date", { ascending: true })
      .order("id", { ascending: true })
      .range(from, from + PAGE - 1);
    fail(error);
    const rows = (data ?? []) as { entry_date: string }[];
    dates.push(...rows.map((row) => row.entry_date));
    if (rows.length < PAGE) return dates;
  }
}

/** All entries saved for one calendar day, oldest first. */
export async function entriesOnDate(date: string): Promise<Entry[]> {
  const { data, error } = await db()
    .from("learning_entries")
    .select(ENTRY)
    .eq("entry_date", date)
    .order("created_at", { ascending: true });
  fail(error);
  return (data ?? []) as Entry[];
}

export async function latestEntry(): Promise<Entry | null> {
  const { data, error } = await db()
    .from("learning_entries")
    .select(ENTRY)
    .order("entry_date", { ascending: false })
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  fail(error);
  return (data as Entry | null) ?? null;
}

export async function getEntry(id: string): Promise<Entry | null> {
  const { data, error } = await db().from("learning_entries").select(ENTRY).eq("id", id).maybeSingle();
  fail(error);
  return (data as Entry | null) ?? null;
}

/** Characters that would break a PostgREST filter value are replaced with spaces. */
const clean = (value: string) => value.toLowerCase().replace(/[,()*{}"\\%_]/g, " ").replace(/\s+/g, " ").trim();

/** Newest first. Fetches one extra row so the caller knows whether there is more. */
export async function listEntries(filter: EntryFilter, limit: number): Promise<{ rows: Entry[]; hasMore: boolean }> {
  let query = db().from("learning_entries").select(ENTRY);
  if (filter.from) query = query.gte("entry_date", filter.from);
  if (filter.to) query = query.lte("entry_date", filter.to);
  if (filter.categoryId) query = query.eq("category_id", filter.categoryId);
  const text = filter.text ? clean(filter.text) : "";
  if (text) {
    const tagMatches = text.split(" ").map((word) => `tags.cs.{${word}}`);
    query = query.or(
      [`title.ilike.*${text}*`, `summary.ilike.*${text}*`, `explanation.ilike.*${text}*`, `examples.ilike.*${text}*`, ...tagMatches].join(","),
    );
  }
  const { data, error } = await query
    .order("entry_date", { ascending: false })
    .order("created_at", { ascending: false })
    .limit(limit + 1);
  fail(error);
  const rows = (data ?? []) as Entry[];
  return { rows: rows.slice(0, limit), hasMore: rows.length > limit };
}

/** Other entries in the same category or sharing a tag. */
export async function relatedEntries(entry: Entry): Promise<Entry[]> {
  const parts: string[] = [];
  if (entry.category_id) parts.push(`category_id.eq.${entry.category_id}`);
  const tags = entry.tags.map(clean).filter((tag) => tag && !tag.includes(" "));
  if (tags.length) parts.push(`tags.ov.{${tags.join(",")}}`);
  if (!parts.length) return [];
  const { data, error } = await db()
    .from("learning_entries")
    .select(ENTRY)
    .neq("id", entry.id)
    .or(parts.join(","))
    .order("entry_date", { ascending: false })
    .limit(6);
  fail(error);
  return (data ?? []) as Entry[];
}

export async function createEntry(input: EntryInput): Promise<Entry> {
  const { data, error } = await db().from("learning_entries").insert(input).select(ENTRY).single();
  fail(error);
  return data as Entry;
}

export async function updateEntry(id: string, input: EntryInput): Promise<Entry> {
  const { data, error } = await db().from("learning_entries").update(input).eq("id", id).select(ENTRY).single();
  if (error) throw new Error("Could not save. Make sure you are logged in.");
  return data as Entry;
}

export async function deleteEntry(id: string): Promise<void> {
  const { data, error } = await db().from("learning_entries").delete().eq("id", id).select("id");
  fail(error);
  if (!data?.length) throw new Error("Nothing was deleted. Make sure you are logged in.");
}

export async function listCategories(): Promise<Category[]> {
  const { data, error } = await db().from("categories").select("*").order("sort_order").order("name");
  fail(error);
  return (data ?? []) as Category[];
}

export async function addCategory(name: string): Promise<Category> {
  const { data, error } = await db().from("categories").insert({ name: name.trim(), sort_order: 100 }).select("*").single();
  fail(error);
  return data as Category;
}

const IMAGE_TYPES = ["image/png", "image/jpeg", "image/webp", "image/gif"];
const MAX_IMAGE = 5 * 1024 * 1024;

/** Uploads to the public "journal-images" bucket and returns the image's URL. */
export async function uploadImage(file: File): Promise<string> {
  if (!IMAGE_TYPES.includes(file.type)) throw new Error("Use a PNG, JPEG, WebP or GIF image.");
  if (file.size > MAX_IMAGE) throw new Error("Keep images under 5 MB.");
  const safe = file.name.toLowerCase().replace(/[^a-z0-9.]+/g, "-").slice(-60);
  const path = `${new Date().getUTCFullYear()}/${crypto.randomUUID()}-${safe}`;
  const bucket = db().storage.from("journal-images");
  const { error } = await bucket.upload(path, file, { contentType: file.type, upsert: false });
  if (error) throw new Error("Upload failed. Make sure you are logged in.");
  return bucket.getPublicUrl(path).data.publicUrl;
}

export async function signIn(email: string, password: string): Promise<void> {
  const { error } = await db().auth.signInWithPassword({ email, password });
  if (error) throw new Error("That email and password did not work.");
}

export async function signOut(): Promise<void> {
  await db().auth.signOut();
}
