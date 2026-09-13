import { Spark } from "@/components/icons";
import { ButtonLink } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";
import { AgentFlow } from "@/components/visuals/agent-flow";
import { agenticAI } from "@/content/site";
import { aiCtaHref } from "@/lib/links";
import { pad } from "@/lib/utils";

export function AgenticAI() {
  return (
    <section id="ai" aria-labelledby="ai-title" className="relative isolate overflow-hidden py-28 sm:py-36">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
        <div className="absolute top-0 left-1/2 h-[36rem] w-[64rem] -translate-x-1/2 -translate-y-1/3 rounded-full bg-[radial-gradient(closest-side,rgb(255_155_84/0.11),transparent)]" />
        <div className="bg-grid mask-radial-top absolute inset-0 opacity-60" />
      </div>

      <div className="container-page">
        <SectionHeader
          align="center"
          id="ai-title"
          eyebrow="05 — Agentic AI"
          title={agenticAI.title}
          subtitle={<span className="font-serif text-[1.45em] leading-snug text-fg/90 italic">{agenticAI.subtitle}</span>}
        >
          <p className="mx-auto mt-5 max-w-xl leading-relaxed text-muted">{agenticAI.intro}</p>
          <p className="mt-7 inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 font-mono text-xs text-accent ring-1 ring-accent/25">
            <Spark className="size-3.5" />
            Currently exploring
          </p>
        </SectionHeader>

        <div data-reveal className="mt-16">
          <AgentFlow stages={agenticAI.stages} />
        </div>

        <div className="mt-20">
          <p data-reveal className="eyebrow">
            Areas I&apos;m exploring
          </p>
          <ul data-reveal className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-line ring-1 ring-line lg:grid-cols-5">
            {agenticAI.concepts.map((concept, i) => (
              <li key={concept.title} className="group spotlight bg-bg p-4 transition-colors duration-500 hover:bg-[#0b0c0f] sm:p-5">
                <span className="font-mono text-[0.6875rem] text-subtle transition-colors group-hover:text-accent">{pad(i + 1)}</span>
                <p className="mt-5 font-medium tracking-tight">{concept.title}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-subtle">{concept.text}</p>
              </li>
            ))}
          </ul>
        </div>

        <div data-reveal className="mt-12 flex justify-center">
          <ButtonLink href={aiCtaHref}>{agenticAI.cta.label}</ButtonLink>
        </div>
      </div>
    </section>
  );
}
