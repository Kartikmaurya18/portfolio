export interface Category {
  id: string;
  name: string;
  sort_order: number;
}

export interface EntryLink {
  title: string;
  url: string;
}

/** One saved learning record. Several can share the same entry_date. */
export interface Entry {
  id: string;
  /** Calendar day, "YYYY-MM-DD". */
  entry_date: string;
  title: string;
  category_id: string | null;
  tags: string[];
  summary: string;
  /** Markdown: the detailed explanation. Images are Markdown images. */
  explanation: string;
  takeaways: string[];
  /** Markdown: practical examples and code snippets. */
  examples: string;
  links: EntryLink[];
  created_at: string;
  updated_at: string;
  categories?: { name: string } | null;
}

export type EntryInput = Omit<Entry, "id" | "created_at" | "updated_at" | "categories">;

export interface EntryFilter {
  from?: string;
  to?: string;
  categoryId?: string;
  text?: string;
}
