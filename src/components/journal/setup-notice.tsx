/** Shown instead of the journal until the two Supabase variables are set. */
export function SetupNotice() {
  return (
    <section className="j-setup">
      <h1>Learning journal</h1>
      <p>The journal is not connected to a database yet.</p>
      <ol>
        <li>Create a free project at supabase.com and run <code>supabase/schema.sql</code> in its SQL editor.</li>
        <li>Copy the project URL and anon key into <code>NEXT_PUBLIC_SUPABASE_URL</code> and <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> (see <code>.env.example</code>).</li>
        <li>Restart the site, then log in at <code>/journal/login</code>.</li>
      </ol>
    </section>
  );
}
