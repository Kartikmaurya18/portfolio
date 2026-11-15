import type { Metadata } from "next";
import { EntryForm } from "@/components/journal/entry-form";

export const metadata: Metadata = { title: "Edit entry", robots: { index: false } };

export default async function EditPage({ params }: PageProps<"/journal/[id]/edit">) {
  const { id } = await params;
  return <EntryForm id={id} />;
}
