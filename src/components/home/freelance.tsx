import Link from "next/link";
import { ArrowUpRight } from "@/components/icons";
import { Section } from "@/components/section";
import { freelance } from "@/content/freelance";
import { freelanceIntro } from "@/content/site";
import { displayUrl, pad } from "@/lib/utils";

/** A plain typographic index. The list is the proof, so no screenshots. */
export function Freelance() {
  return (
    <Section id="freelance" index="04" label="Freelance" className="py-20 lg:py-28">
      <p data-reveal className="max-w-2xl text-lg leading-relaxed text-muted">
        {freelanceIntro}
      </p>
      <ol data-reveal className="mt-10 border-t border-rule">
        {freelance.map((site, i) => (
          <li
            key={site.url}
            className="group relative grid grid-cols-[2rem_minmax(0,1fr)_6rem] items-baseline gap-x-4 border-b border-rule py-4 sm:grid-cols-[3rem_minmax(0,1fr)_minmax(0,1fr)_7rem]"
          >
            <span className="meta tabular-nums">{pad(i + 1)}</span>
            <span className="min-w-0">
              <a
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-medium tracking-[-0.01em] transition-colors group-hover:text-accent after:absolute after:inset-0"
              >
                {site.name}
                <span className="sr-only"> ({displayUrl(site.url)}, opens in a new tab)</span>
              </a>
              <span aria-hidden="true" className="meta block truncate sm:hidden">
                {displayUrl(site.url)}
              </span>
            </span>
            <span aria-hidden="true" className="meta hidden truncate sm:block">
              {displayUrl(site.url)}
            </span>
            <span className="flex items-center justify-end gap-4">
              {site.caseStudy && (
                <Link href={`/work/${site.caseStudy}`} className="meta link relative z-10">
                  Case study
                </Link>
              )}
              <ArrowUpRight className="size-4 text-subtle transition-colors group-hover:text-accent" />
            </span>
          </li>
        ))}
      </ol>
    </Section>
  );
}
