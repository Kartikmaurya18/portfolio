import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ArrowLeft } from "@/components/icons";
import { ArchiveView, ProjectArchive, type ArchiveItem } from "@/components/projects/project-archive";
import { site } from "@/content/site";
import { getPreviews, projects } from "@/lib/projects";
import { delay } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Projects",
  description: `Websites and software projects built by ${site.name}.`,
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  const items: ArchiveItem[] = projects.map((project) => ({ project, preview: getPreviews(project).desktop }));

  return (
    <div className="relative isolate overflow-hidden pt-28 pb-28 sm:pt-36">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid mask-radial-top absolute inset-0" />
        <div className="absolute -top-64 left-1/2 h-[40rem] w-[64rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(255_155_84/0.12),transparent)]" />
      </div>

      <div className="container-page">
        <Link href="/#projects" className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg">
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
          Back home
        </Link>

        <header className="mt-10 max-w-2xl">
          <p className="enter eyebrow">Archive</p>
          <h1
            className="enter text-gradient mt-5 text-[clamp(2.6rem,6.5vw,4.75rem)] leading-[1] font-semibold tracking-[-0.045em]"
            style={delay(60)}
          >
            Project archive
          </h1>
          <p className="enter mt-5 text-lg leading-relaxed text-muted" style={delay(120)}>
            Every project in one place — from client websites to software systems. Filter by category, open a project
            for details, or visit it live.
          </p>
        </header>

        <Suspense fallback={<ArchiveView items={items} />}>
          <ProjectArchive items={items} />
        </Suspense>
      </div>
    </div>
  );
}
