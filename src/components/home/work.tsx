import Image from "next/image";
import Link from "next/link";
import { SectionLabel } from "@/components/section";
import { projects } from "@/content/projects";
import type { CaseStudy } from "@/content/types";
import { getShots } from "@/lib/previews";
import { cn, displayUrl, pad } from "@/lib/utils";

/** Breaks the grid: each case study sits on a full-bleed stage. */
export function Work() {
  return (
    <section id="work" aria-labelledby="work-heading" className="border-t border-rule pt-20 lg:pt-32">
      <div className="page grid-editorial">
        <SectionLabel id="work" index="03" label="Selected work" />
      </div>
      <ol className="mt-12 lg:mt-16">
        {projects.map((project, i) => (
          <WorkItem key={project.slug} project={project} index={i} />
        ))}
      </ol>
    </section>
  );
}

function WorkItem({ project, index }: { project: CaseStudy; index: number }) {
  const { desktop, mobile } = getShots(project.slug);
  const flip = index % 2 === 1;

  return (
    <li data-reveal className="border-t border-rule pt-8 pb-16 lg:pb-24">
      <div className="page flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <p className="meta">
          {pad(index + 1)} · {project.kind}
          {project.year && ` · ${project.year}`}
        </p>
        <p className="meta">{project.client}</p>
      </div>

      <div className="mt-6 overflow-hidden bg-stage">
        <div className="relative mx-auto max-w-[96rem] px-4 pt-8 sm:px-10 sm:pt-14 lg:px-20 lg:pt-20">
          {desktop && (
            <Image
              src={desktop.src}
              width={desktop.width}
              height={desktop.height}
              alt={project.alt.desktop}
              sizes="(min-width: 1536px) 1150px, (min-width: 640px) 80vw, 92vw"
              placeholder={desktop.blurDataURL ? "blur" : "empty"}
              blurDataURL={desktop.blurDataURL}
              className={cn("block h-auto w-full rounded-t-[3px] sm:w-[82%]", flip && "sm:ml-auto")}
            />
          )}
          {mobile && (
            <Image
              src={mobile.src}
              width={mobile.width}
              height={mobile.height}
              alt={project.alt.mobile}
              sizes="(min-width: 640px) 15vw, 1px"
              placeholder={mobile.blurDataURL ? "blur" : "empty"}
              blurDataURL={mobile.blurDataURL}
              className={cn(
                "absolute bottom-0 hidden h-auto w-[15%] max-w-[14rem] rounded-t-[10px] sm:block",
                flip ? "left-10 lg:left-20" : "right-10 lg:right-20",
              )}
            />
          )}
        </div>
      </div>

      <div className="page grid-editorial mt-10">
        <h3 className="text-[clamp(2rem,4.5vw,3.5rem)] leading-none font-semibold tracking-[-0.04em] lg:col-span-5">
          <Link href={`/work/${project.slug}`} className="transition-colors hover:text-accent">
            {project.title}
          </Link>
        </h3>
        <div className="min-w-0 lg:col-span-7">
          <p className="max-w-xl text-lg leading-relaxed text-muted">{project.summary}</p>
          <p className="meta mt-4">{project.stack.join(" · ")}</p>
          <p className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
            <Link href={`/work/${project.slug}`} className="link">
              Read the case study
            </Link>
            <a href={project.url} target="_blank" rel="noopener noreferrer" className="link">
              {displayUrl(project.url)}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </p>
        </div>
      </div>
    </li>
  );
}
