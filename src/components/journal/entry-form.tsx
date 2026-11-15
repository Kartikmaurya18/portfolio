"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useId, useRef, useState, type FormEvent } from "react";
import { addCategory, createEntry, deleteEntry, getEntry, listCategories, updateEntry, uploadImage } from "@/lib/journal/api";
import { isISODate } from "@/lib/journal/dates";
import { draftToInput, linksToText, type EntryDraft } from "@/lib/journal/form";
import { useQuery, useSession, useToday } from "@/lib/journal/hooks";
import { journalConfigured } from "@/lib/journal/supabase";
import type { Category, Entry } from "@/lib/journal/types";
import { Markdown } from "./markdown";
import { SetupNotice } from "./setup-notice";

/** Create (no id) or edit (id) an entry. Only a logged-in owner can save; the database enforces that too. */
export function EntryForm({ id, initialDate }: { id?: string; initialDate?: string }) {
  if (!journalConfigured) return <SetupNotice />;
  return <Loader id={id} initialDate={initialDate} />;
}

function Loader({ id, initialDate }: { id?: string; initialDate?: string }) {
  const { ready, owner } = useSession();
  const today = useToday();
  const categories = useQuery("categories", listCategories);
  const existing = useQuery(`entry:${id ?? "new"}`, () => (id ? getEntry(id) : Promise.resolve(null)));

  if (!ready || !today) return <p className="j-muted j-form">Loading…</p>;
  if (!owner) {
    return (
      <div className="j-form">
        <h1>Log in to write</h1>
        <p className="j-muted">Only I can add or edit entries.</p>
        <Link className="button button-quiet" href="/journal/login">
          Log in
        </Link>
      </div>
    );
  }
  if (categories.error || existing.error) {
    return (
      <p role="alert" className="j-error j-form">
        {categories.error ?? existing.error}
      </p>
    );
  }
  if (!categories.data || existing.data === undefined) return <p className="j-muted j-form">Loading…</p>;
  if (id && existing.data === null) return <p className="j-error j-form">That entry does not exist.</p>;

  return (
    <FormBody
      key={id ?? "new"}
      entry={existing.data}
      initialCategories={categories.data}
      defaultDate={initialDate && isISODate(initialDate) ? initialDate : today}
    />
  );
}

function toDraft(entry: Entry | null, date: string): EntryDraft {
  return {
    title: entry?.title ?? "",
    entry_date: entry?.entry_date ?? date,
    category_id: entry?.category_id ?? "",
    tags: entry?.tags.join(", ") ?? "",
    summary: entry?.summary ?? "",
    explanation: entry?.explanation ?? "",
    takeaways: entry?.takeaways.join("\n") ?? "",
    examples: entry?.examples ?? "",
    links: entry ? linksToText(entry.links) : "",
  };
}

function FormBody({
  entry,
  initialCategories,
  defaultDate,
}: {
  entry: Entry | null;
  initialCategories: Category[];
  defaultDate: string;
}) {
  const router = useRouter();
  const [draft, setDraft] = useState<EntryDraft>(() => toDraft(entry, defaultDate));
  const [categories, setCategories] = useState(initialCategories);
  const [newCategory, setNewCategory] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const set = <K extends keyof EntryDraft>(key: K, value: EntryDraft[K]) => setDraft((d) => ({ ...d, [key]: value }));

  async function submit(event: FormEvent) {
    event.preventDefault();
    const { input, errors: found } = draftToInput(draft);
    setErrors(found);
    if (!input) return;
    setSaving(true);
    try {
      const saved = entry ? await updateEntry(entry.id, input) : await createEntry(input);
      router.push(`/journal/${saved.id}`);
    } catch (e) {
      setErrors([e instanceof Error ? e.message : "Could not save."]);
      setSaving(false);
    }
  }

  async function addNewCategory() {
    const name = newCategory.trim();
    if (!name) return;
    try {
      const created = await addCategory(name);
      setCategories((list) => [...list, created]);
      set("category_id", created.id);
      setNewCategory("");
    } catch {
      setErrors([`Could not add “${name}”. It may already exist.`]);
    }
  }

  async function remove() {
    if (!entry || !window.confirm(`Delete “${entry.title}”? This cannot be undone.`)) return;
    try {
      await deleteEntry(entry.id);
      router.push(`/journal?date=${entry.entry_date}`);
    } catch (e) {
      setErrors([e instanceof Error ? e.message : "Could not delete."]);
    }
  }

  return (
    <form className="j-form" onSubmit={submit} noValidate>
      <h1>{entry ? "Edit entry" : "New entry"}</h1>

      <label className="j-field">
        <span>Title</span>
        <input value={draft.title} onChange={(e) => set("title", e.target.value)} maxLength={200} required />
      </label>

      <div className="j-row">
        <label className="j-field">
          <span>Date</span>
          <input type="date" value={draft.entry_date} onChange={(e) => set("entry_date", e.target.value)} required />
        </label>
        <label className="j-field">
          <span>Category</span>
          <select value={draft.category_id} onChange={(e) => set("category_id", e.target.value)}>
            <option value="">No category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="j-field">
        <span>Add a new category</span>
        <div className="j-inline">
          <input
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="e.g. Networking"
            aria-label="New category name"
          />
          <button type="button" className="button button-quiet button-sm" onClick={addNewCategory}>
            Add
          </button>
        </div>
      </div>

      <label className="j-field">
        <span>Topics / tags</span>
        <input value={draft.tags} onChange={(e) => set("tags", e.target.value)} placeholder="rag, embeddings, kafka" />
        <small>Separate with commas. They become lower-case.</small>
      </label>

      <label className="j-field">
        <span>Short summary</span>
        <textarea value={draft.summary} onChange={(e) => set("summary", e.target.value)} rows={2} />
      </label>

      <MarkdownField label="Detailed explanation" value={draft.explanation} onChange={(v) => set("explanation", v)} rows={10} />

      <label className="j-field">
        <span>Key takeaways</span>
        <textarea value={draft.takeaways} onChange={(e) => set("takeaways", e.target.value)} rows={4} />
        <small>One per line.</small>
      </label>

      <MarkdownField label="Practical examples and code" value={draft.examples} onChange={(v) => set("examples", v)} rows={8} />

      <label className="j-field">
        <span>References / useful links</span>
        <textarea value={draft.links} onChange={(e) => set("links", e.target.value)} rows={3} placeholder="Title | https://example.com" />
        <small>One per line: “Title | https://…” or just the link.</small>
      </label>

      {errors.length > 0 && (
        <ul role="alert" className="j-error j-errors">
          {errors.map((message) => (
            <li key={message}>{message}</li>
          ))}
        </ul>
      )}

      <div className="j-actions">
        <button type="submit" className="button button-primary" disabled={saving}>
          {saving ? "Saving…" : entry ? "Save changes" : "Save entry"}
        </button>
        <Link className="button button-quiet" href={entry ? `/journal/${entry.id}` : "/journal"}>
          Cancel
        </Link>
        {entry && (
          <button type="button" className="button button-quiet" onClick={remove}>
            Delete
          </button>
        )}
      </div>
    </form>
  );
}

/** A Markdown textarea with a preview, a code-block shortcut and image upload. */
function MarkdownField({ label, value, onChange, rows }: { label: string; value: string; onChange: (value: string) => void; rows: number }) {
  const [preview, setPreview] = useState(false);
  const [status, setStatus] = useState("");
  const area = useRef<HTMLTextAreaElement>(null);
  const file = useRef<HTMLInputElement>(null);
  const id = useId();

  const insert = (text: string) => {
    const el = area.current;
    const start = el?.selectionStart ?? value.length;
    const end = el?.selectionEnd ?? value.length;
    onChange(value.slice(0, start) + text + value.slice(end));
  };

  async function upload(picked: File | undefined) {
    if (!picked) return;
    setStatus("Uploading…");
    try {
      const url = await uploadImage(picked);
      insert(`\n![${picked.name.replace(/\.[^.]+$/, "")}](${url})\n`);
      setStatus("Image added.");
    } catch (e) {
      setStatus(e instanceof Error ? e.message : "Upload failed.");
    }
    if (file.current) file.current.value = "";
  }

  return (
    <div className="j-field">
      <label htmlFor={id}>
        <span>{label}</span>
      </label>
      <div className="j-toolbar">
        <button type="button" aria-pressed={!preview} onClick={() => setPreview(false)}>
          Write
        </button>
        <button type="button" aria-pressed={preview} onClick={() => setPreview(true)}>
          Preview
        </button>
        <button type="button" onClick={() => insert("\n```\ncode here\n```\n")} disabled={preview}>
          Code block
        </button>
        <button type="button" onClick={() => file.current?.click()} disabled={preview}>
          Upload image
        </button>
        <input ref={file} type="file" accept="image/png,image/jpeg,image/webp,image/gif" hidden onChange={(e) => upload(e.target.files?.[0])} />
      </div>
      {preview ? (
        <div className="j-preview">{value.trim() ? <Markdown>{value}</Markdown> : <p className="j-muted">Nothing to preview.</p>}</div>
      ) : (
        <textarea id={id} ref={area} value={value} onChange={(e) => onChange(e.target.value)} rows={rows} spellCheck />
      )}
      <small role="status" aria-live="polite">
        {status || "Markdown works: headings, lists, tables, code blocks and images."}
      </small>
    </div>
  );
}
