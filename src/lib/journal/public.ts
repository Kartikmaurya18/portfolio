/**
 * Reads only the dates of the journal entries, with a plain fetch, so the
 * homepage does not need the whole database library. The anon key is public by
 * design; the database's read rule is what allows this.
 */
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const PAGE = 1000;

export async function fetchPublicDates(): Promise<string[]> {
  if (!url || !key) return [];
  const dates: string[] = [];
  for (let offset = 0; ; offset += PAGE) {
    const response = await fetch(
      `${url}/rest/v1/learning_entries?select=entry_date&order=entry_date.asc,id.asc&limit=${PAGE}&offset=${offset}`,
      { headers: { apikey: key } },
    );
    if (!response.ok) throw new Error("Could not load the calendar.");
    const rows = (await response.json()) as { entry_date: string }[];
    dates.push(...rows.map((row) => row.entry_date));
    if (rows.length < PAGE) return dates;
  }
}
