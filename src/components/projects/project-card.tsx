import Link from "next/link";
import { ArrowUpRight, GitHub } from "@/components/icons";
import { ButtonLink } from "@/components/ui/button";
import { BrowserFrame, PhoneFrame } from "@/components/ui/frames";
import { TagList } from "@/components/ui/tag-list";
import type { Project } from "@/content/types";
import { categoryLabel, hasCaseStudy, type Preview, type Previews } from "@/lib/projects";
import { cn, displayUrl, pad } from "@/lib/utils";

/** Large, alternating showcase card used in "Things I've built". */
export function FeaturedProjectCard({ project, previews, index }: { project: Project; previews: Previews; index: number }) {
  const reversed = index % 2 === 1;

  return (
    <article data-reveal className="group spotlight panel grid overflow-hidden lg:grid-cols-12">
      <div className={cn("relative p-3 sm:p-6 lg:col-span-7 lg:p-8", reversed && "lg:order-2")}>
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgb(255_155_84/0.12),transparent_60%)] opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        />
        <div className="relative">
          <BrowserFrame project={project} preview={previews.desktop} sizes="(min-width: 1024px) 640px, 100vw" />
          <PhoneFrame
            project={project}
            preview={previews.mobile}
            sizes="140px"
            className={cn(
              "absolute -bottom-3 hidden w-[21%] max-w-[8.5rem] transition-transform duration-700 ease-out-expo group-hover:-translate-y-2 sm:block",
              reversed ? "left-5" : "right-5",
            )}
          />
        </div>
      </div>

      <div className={cn("relative flex flex-col justify-center px-6 pt-3 pb-7 sm:p-8 lg:col-span-5 lg:p-10", reversed && "lg:order-1")}>
        <div className="flex items-center gap-3 font-mono text-xs text-subtle">
          <span className="text-accent">{pad(index + 1)}</span>
          <span aria-hidden="true" className="h-px w-8 bg-line-strong" />
          <span>{project.categories.map(categoryLabel).join(" · ")}</span>
        </div>

        <h3 className="mt-5 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
          <Link href={`/projects/${project.slug}`} className="stretched-link">
            {project.name}
          </Link>
        </h3>
        <p className="mt-2 font-mono text-sm text-subtle">{displayUrl(project.url)}</p>

        {project.description && <p className="mt-5 leading-relaxed text-muted">{project.description}</p>}
        <TagList tags={project.stack} className="mt-6" />

        <div className="relative z-10 mt-8 flex flex-wrap gap-3">
          <ButtonLink href={project.url} size="sm" arrow="up-right">
            Live website
          </ButtonLink>
          {project.github && (
            <ButtonLink href={project.github} size="sm" variant="secondary" arrow="up-right" icon={<GitHub className="size-4" />}>
              GitHub
            </ButtonLink>
          )}
          {hasCaseStudy(project) && (
            <ButtonLink href={`/projects/${project.slug}`} size="sm" variant="secondary">
              Case study
            </ButtonLink>
          )}
        </div>
      </div>
    </article>
  );
}

/** Compact card used in the freelance section and the archive. */
export function ProjectCard({
  project,
  preview,
  sizes,
  className,
}: {
  project: Project;
  preview?: Preview;
  sizes: string;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "group spotlight panel flex h-full flex-col overflow-hidden p-2.5 transition-transform duration-500 ease-out-expo hover:-translate-y-1",
        className,
      )}
    >
      <BrowserFrame project={project} preview={preview} sizes={sizes} className="rounded-[0.9rem]" />
      <div className="flex flex-1 flex-col px-3 pt-5 pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="truncate text-lg font-semibold tracking-tight">
              <Link href={`/projects/${project.slug}`} className="stretched-link">
                {project.name}
              </Link>
            </h3>
            <p className="mt-1 truncate font-mono text-xs text-subtle">{displayUrl(project.url)}</p>
          </div>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit the ${project.name} website (opens in a new tab)`}
            className="relative z-10 grid size-9 shrink-0 place-items-center rounded-full text-muted ring-1 ring-line-strong transition duration-300 hover:bg-fg hover:text-bg"
          >
            <ArrowUpRight className="size-4" />
          </a>
        </div>
        {project.description && <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted">{project.description}</p>}
        <ul className="mt-auto flex flex-wrap gap-1.5 pt-4">
          {project.categories.map((c) => (
            <li key={c} className="rounded-full px-2 py-0.5 font-mono text-[0.625rem] tracking-wide text-subtle uppercase ring-1 ring-line">
              {categoryLabel(c)}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
