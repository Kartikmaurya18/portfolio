"use client";

import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { useSearchParams } from "next/navigation";
import { categoryFilters } from "@/content/projects";
import type { Project, ProjectCategory } from "@/content/types";
import type { Preview } from "@/lib/projects";
import { cn } from "@/lib/utils";
import { ProjectCard } from "./project-card";

type Filter = ProjectCategory | "all";

export interface ArchiveItem {
  project: Project;
  preview?: Preview;
}

const ease = [0.16, 1, 0.3, 1] as const;

function toFilter(value: string | null): Filter {
  return categoryFilters.some((f) => f.id === value) ? (value as Filter) : "all";
}

/** Filter state lives in `?category=` so filtered views are shareable. */
export function ProjectArchive({ items }: { items: ArchiveItem[] }) {
  const searchParams = useSearchParams();
  const active = toFilter(searchParams.get("category"));

  const select = (id: Filter) => {
    window.history.replaceState(null, "", id === "all" ? window.location.pathname : `?category=${id}`);
  };

  return <ArchiveView items={items} active={active} onSelect={select} />;
}

/** Static render used while search params are unavailable (prerender). */
export function ArchiveView({
  items,
  active = "all",
  onSelect,
}: {
  items: ArchiveItem[];
  active?: Filter;
  onSelect?: (id: Filter) => void;
}) {
  const matches = (id: Filter, project: Project) => id === "all" || project.categories.includes(id);
  const visible = items.filter(({ project }) => matches(active, project));
  const activeLabel = categoryFilters.find((f) => f.id === active)?.label ?? "";

  return (
    <>
      <div role="group" aria-label="Filter projects by category" className="mt-12 flex flex-wrap gap-2">
        {categoryFilters.map((filter) => {
          const selected = filter.id === active;
          const count = items.filter(({ project }) => matches(filter.id, project)).length;
          return (
            <button
              key={filter.id}
              type="button"
              aria-pressed={selected}
              onClick={() => onSelect?.(filter.id)}
              className={cn(
                "relative isolate inline-flex h-9 items-center gap-2 rounded-full px-4 text-sm transition-colors duration-300",
                selected ? "text-bg" : "text-muted ring-1 ring-line ring-inset hover:text-fg hover:ring-line-strong",
              )}
            >
              {selected && (
                <m.span
                  layoutId="archive-filter"
                  className="absolute inset-0 -z-10 rounded-full bg-fg"
                  transition={{ type: "spring", bounce: 0.18, duration: 0.5 }}
                />
              )}
              {filter.label}
              <span className={cn("font-mono text-[0.6875rem] tabular-nums", selected ? "text-bg/60" : "text-subtle")}>{count}</span>
            </button>
          );
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        {visible.length} {visible.length === 1 ? "project" : "projects"} shown
      </p>

      <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map(({ project, preview }) => (
            <m.li
              key={project.slug}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, ease }}
            >
              <ProjectCard
                project={project}
                preview={preview}
                sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
              />
            </m.li>
          ))}
        </AnimatePresence>
      </ul>

      {visible.length === 0 && (
        <m.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease }}
          className="panel grid place-items-center px-6 py-20 text-center"
        >
          <p className="font-mono text-xs tracking-wider text-subtle uppercase">Nothing here yet</p>
          <p className="mt-3 text-xl font-medium tracking-tight">No {activeLabel} projects published yet.</p>
          <p className="mt-2 text-sm text-muted">New work will be added here as it&apos;s ready.</p>
        </m.div>
      )}
    </>
  );
}
