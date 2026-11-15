import type { Metadata } from "next";
import { EntryForm } from "@/components/journal/entry-form";

export const metadata: Metadata = { title: "New entry", robots: { index: false } };

export default async function WritePage({ searchParams }: PageProps<"/journal/write">) {
  const { date } = await searchParams;
  return <EntryForm initialDate={typeof date === "string" ? date : undefined} />;
}
