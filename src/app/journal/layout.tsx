import type { Metadata } from "next";
import type { ReactNode } from "react";
import { JournalHeader } from "@/components/journal/journal-header";

export const metadata: Metadata = {
  title: "Learning journal",
  description: "What I'm learning, day by day: AI, system design and backend engineering.",
};

export default function JournalLayout({ children }: { children: ReactNode }) {
  return (
    <div className="portfolio-shell journal">
      <JournalHeader />
      {children}
    </div>
  );
}
