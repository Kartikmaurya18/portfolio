import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "@/components/icons";
import { SectionHeader } from "@/components/ui/section-header";
import { TagList } from "@/components/ui/tag-list";
import { experience } from "@/content/site";
import { cn } from "@/lib/utils";

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="py-28 sm:py-36">
      <div className="container-page">
        <SectionHeader
          id="experience-title"
          eyebrow="02 — Experience"
          title="Professional Experience"
          subtitle="Engineering at Insolutions Global — and client work alongside it."
        />

        <ol className="relative mt-16 space-y-6 before:absolute before:top-8 before:bottom-8 before:left-[11px] before:w-px before:bg-gradient-to-b before:from-accent/60 before:via-line-strong before:to-transparent sm:before:left-[15px]">
          {experience.map((job) => (
            <li key={`${job.company}-${job.role}`} data-reveal className="relative pl-10 sm:pl-14">
              <span
                aria-hidden="true"
                className={cn(
                  "absolute top-8 left-0 grid size-6 place-items-center rounded-full bg-bg ring-1 sm:size-8",
                  job.current ? "ring-accent/50" : "ring-line-strong",
                )}
              >
                <span
                  className={cn(
                    "size-2 rounded-full",
                    job.current ? "bg-accent shadow-[0_0_12px_var(--accent)]" : "bg-white/30",
                  )}
                />
              </span>

              <article className="spotlight panel overflow-hidden p-6 sm:p-8">
                {job.current && <span aria-hidden="true" className="beam" />}

                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">
                      {job.url ? (
                        <a
                          href={job.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 transition-colors hover:text-accent"
                        >
                          {job.company}
                          <ArrowUpRight className="size-4" />
                        </a>
                      ) : (
                        job.company
                      )}
                    </h3>
                    <p className="mt-1 text-muted">{job.role}</p>
                  </div>

                  {job.current && (
                    <span className="inline-flex items-center gap-2 rounded-full bg-live/10 px-3 py-1 text-xs font-medium text-live ring-1 ring-live/25">
                      <span className="relative flex size-1.5">
                        <span className="absolute inset-0 animate-[ping-soft_2.2s_cubic-bezier(0,0,0.2,1)_infinite] rounded-full bg-live" />
                        <span className="relative size-1.5 rounded-full bg-live" />
                      </span>
                      Currently working here
                    </span>
                  )}
                </div>

                {(job.period || job.location) && (
                  <p className="mt-4 font-mono text-xs text-subtle">{[job.period, job.location].filter(Boolean).join(" · ")}</p>
                )}

                <p className="mt-5 max-w-3xl leading-relaxed text-muted">{job.summary}</p>

                {!!job.highlights?.length && (
                  <ul className="mt-5 space-y-2">
                    {job.highlights.map((item) => (
                      <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted">
                        <span aria-hidden="true" className="mt-2 size-1 shrink-0 rounded-full bg-accent/70" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}

                <TagList tags={job.stack} className="mt-6" />

                {job.link && (
                  <Link
                    href={job.link.href}
                    className="group relative mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-fg transition-colors hover:text-accent"
                  >
                    {job.link.label}
                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                )}
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
