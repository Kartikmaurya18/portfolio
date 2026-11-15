import type { Metadata } from "next";
import { Suspense } from "react";
import { JournalHome } from "@/components/journal/journal-home";

export const metadata: Metadata = {
  alternates: { canonical: "/journal" },
};

export default function JournalPage() {
  return (
    <Suspense fallback={<p className="j-muted j-top">Loading…</p>}>
      <JournalHome />
    </Suspense>
  );
}
