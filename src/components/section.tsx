import type { ReactNode } from "react";

/** A plain heading and the paragraphs under it. Every page is built from these. */
export function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="mt-14">
      <h2 id={`${id}-heading`} className="font-semibold">
        {title}
      </h2>
      <div className="mt-3 space-y-5">{children}</div>
    </section>
  );
}
