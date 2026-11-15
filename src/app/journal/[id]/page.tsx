import type { Metadata } from "next";
import { EntryDetail } from "@/components/journal/entry-detail";

export const metadata: Metadata = { title: "Learning entry" };

export default async function EntryPage({ params }: PageProps<"/journal/[id]">) {
  const { id } = await params;
  return <EntryDetail id={id} />;
}
