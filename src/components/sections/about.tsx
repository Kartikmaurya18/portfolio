import { ArrowRight } from "@/components/icons";
import { SectionHeader } from "@/components/ui/section-header";
import { about } from "@/content/site";
import { cn, pad, splitEmphasis } from "@/lib/utils";

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="py-28 sm:py-36">
      <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <SectionHeader id="about-title" eyebrow="01 — About" title={about.title} className="lg:sticky lg:top-28 lg:self-start" />

        <div>
          <p data-reveal className="text-[clamp(1.65rem,3.2vw,2.35rem)] leading-[1.18] font-medium tracking-[-0.03em]">
            {splitEmphasis(about.lede).map(({ text, strong }, i) =>
              strong ? (
                <span key={i} className="text-accent-gradient font-serif text-[1.1em] font-normal italic">
                  {text}
                </span>
              ) : (
                text
              ),
            )}
          </p>

          <div className="mt-8 space-y-5 text-[1.0625rem] leading-relaxed text-muted">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph} data-reveal>
                {splitEmphasis(paragraph).map(({ text, strong }, i) =>
                  strong ? (
                    <strong key={i} className="font-medium text-fg">
                      {text}
                    </strong>
                  ) : (
                    text
                  ),
                )}
              </p>
            ))}
          </div>

          <div data-reveal className="relative mt-14">
            <p className="eyebrow">How I work</p>
            <div className="relative mt-5 overflow-hidden rounded-2xl ring-1 ring-line">
              <ol className="grid grid-cols-2 gap-px bg-line sm:grid-cols-4">
                {about.process.map((step, i) => (
                  <li key={step.title} className="bg-bg p-5">
                    <div className="flex items-center gap-2 font-mono text-[0.6875rem] text-subtle">
                      <span className="text-accent">{pad(i + 1)}</span>
                      {i < about.process.length - 1 && (
                        <ArrowRight className={cn("size-3 opacity-50", i === 1 && "sm:inline hidden")} />
                      )}
                    </div>
                    <p className="mt-6 text-lg font-medium tracking-tight">{step.title}</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-subtle">{step.text}</p>
                  </li>
                ))}
              </ol>
              <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px">
                <span className="block h-px w-1/4 animate-[travel-x_6s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-accent to-transparent" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
