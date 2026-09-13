import { SectionHeader } from "@/components/ui/section-header";
import { principles } from "@/content/site";
import { delay, pad } from "@/lib/utils";

export function Philosophy() {
  return (
    <section id="principles" aria-labelledby="principles-title" className="py-28 sm:py-36">
      <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <SectionHeader
          id="principles-title"
          eyebrow="07 — Principles"
          title="How I think about building software"
          className="lg:sticky lg:top-28 lg:self-start"
        />
        <ol className="grid gap-x-10 sm:grid-cols-2">
          {principles.map((principle, i) => (
            <li key={principle.title} data-reveal style={delay(i * 70)} className="group border-t border-line py-8">
              <span className="font-mono text-xs text-accent">{pad(i + 1)}</span>
              <h3 className="mt-4 text-xl font-semibold tracking-tight">{principle.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{principle.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
