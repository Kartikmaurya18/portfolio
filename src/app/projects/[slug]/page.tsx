import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, GitHub } from "@/components/icons";
import { ButtonLink } from "@/components/ui/button";
import { BrowserFrame, PhoneFrame } from "@/components/ui/frames";
import { TagList } from "@/components/ui/tag-list";
import { site } from "@/content/site";
import { categoryLabel, getAdjacentProjects, getPreviews, getProject, projects } from "@/lib/projects";
import { delay, displayUrl } from "@/lib/utils";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const description = project.description ?? `${project.name} (${displayUrl(project.url)}) — a project by ${site.name}.`;
  return {
    title: project.name,
    description,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: { title: `${project.name} — ${site.name}`, description, url: `/projects/${project.slug}` },
    twitter: { title: `${project.name} — ${site.name}`, description },
  };
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const previews = getPreviews(project);
  const { prev, next } = getAdjacentProjects(project.slug);
  const study = project.caseStudy ?? {};
  const sections = [
    { id: "overview", title: "Overview", body: study.overview },
    { id: "problem", title: "Problem", body: study.problem },
    { id: "solution", title: "Solution", body: study.solution },
    { id: "development", title: "Development", body: study.development },
    { id: "result", title: "Result", body: study.result },
  ].filter((section) => section.body);
  const hasStack = !!project.stack?.length;
  const categories = project.categories.map(categoryLabel).join(" · ");

  return (
    <article className="relative isolate overflow-hidden pt-28 pb-28 sm:pt-36">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid mask-radial-top absolute inset-0" />
        <div className="absolute -top-64 left-1/2 h-[40rem] w-[64rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(255_155_84/0.12),transparent)]" />
      </div>

      <div className="container-page">
        <Link href="/projects" className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg">
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
          All projects
        </Link>

        <header className="mt-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="enter eyebrow">{categories}</p>
            <h1
              className="enter text-gradient mt-5 text-[clamp(2.6rem,7vw,5rem)] leading-[1] font-semibold tracking-[-0.045em]"
              style={delay(60)}
            >
              {project.name}
            </h1>
            <p className="enter mt-4 font-mono text-sm text-subtle" style={delay(100)}>
              {displayUrl(project.url)}
              {project.year && ` · ${project.year}`}
            </p>
            {project.description && (
              <p className="enter mt-6 text-lg leading-relaxed text-muted" style={delay(140)}>
                {project.description}
              </p>
            )}
          </div>
          <div className="enter flex flex-wrap gap-3" style={delay(160)}>
            <ButtonLink href={project.url} arrow="up-right">
              Live Project
            </ButtonLink>
            {project.github && (
              <ButtonLink href={project.github} variant="secondary" arrow="up-right" icon={<GitHub className="size-4" />}>
                GitHub
              </ButtonLink>
            )}
          </div>
        </header>

        <div className="enter relative mt-14 pb-8" style={delay(220)}>
          <BrowserFrame project={project} preview={previews.desktop} sizes="(min-width: 1216px) 1152px, 100vw" eager />
          <PhoneFrame
            project={project}
            preview={previews.mobile}
            sizes="(min-width: 1024px) 200px, 18vw"
            className="absolute right-4 bottom-0 hidden w-[18%] max-w-[12.5rem] sm:block lg:right-10"
          />
        </div>

        <div className="mt-20 grid gap-12 lg:grid-cols-[15rem_1fr] lg:gap-20">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <dl className="grid grid-cols-2 gap-6 text-sm lg:grid-cols-1">
              <Fact label="Project">{project.name}</Fact>
              <Fact label="Category">{categories}</Fact>
              <Fact label="Website">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 break-all text-fg transition-colors hover:text-accent"
                >
                  {displayUrl(project.url)}
                  <ArrowUpRight className="size-3.5 shrink-0" />
                </a>
              </Fact>
              {project.year && <Fact label="Year">{project.year}</Fact>}
            </dl>
          </aside>

          <div>
            {sections.length > 0 || hasStack ? (
              <div className="space-y-14">
                {sections.map((section) => (
                  <section key={section.id} aria-labelledby={`cs-${section.id}`} data-reveal>
                    <h2 id={`cs-${section.id}`} className="eyebrow">
                      {section.title}
                    </h2>
                    <p className="mt-4 text-lg leading-relaxed whitespace-pre-line text-muted">{section.body}</p>
                  </section>
                ))}
                {hasStack && (
                  <section aria-labelledby="cs-stack" data-reveal>
                    <h2 id="cs-stack" className="eyebrow">
                      Tech Stack
                    </h2>
                    <TagList tags={project.stack} className="mt-4" />
                  </section>
                )}
                <div data-reveal>
                  <ButtonLink href={project.url} arrow="up-right">
                    Live Project
                  </ButtonLink>
                </div>
              </div>
            ) : (
              <div data-reveal className="panel relative overflow-hidden p-8 sm:p-12">
                <div aria-hidden="true" className="bg-dots mask-radial absolute inset-0 opacity-60" />
                <div className="relative">
                  <p className="font-mono text-[0.6875rem] tracking-wider text-subtle uppercase">
                    Overview · Problem · Solution · Development · Result · Tech Stack
                  </p>
                  <h2 className="text-gradient mt-5 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">Case study coming soon.</h2>
                  <p className="mt-4 max-w-lg leading-relaxed text-muted">
                    The full write-up for this project is on its way. Until then, the best way to see it is live.
                  </p>
                  <div className="mt-8">
                    <ButtonLink href={project.url} arrow="up-right">
                      Live Project
                    </ButtonLink>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {projects.length > 1 && (
          <nav aria-label="More projects" className="mt-28 grid gap-px overflow-hidden rounded-2xl bg-line ring-1 ring-line sm:grid-cols-2">
            <Link href={`/projects/${prev.slug}`} className="group bg-bg p-6 transition-colors hover:bg-[#0b0c0f] sm:p-8">
              <span className="inline-flex items-center gap-2 font-mono text-xs text-subtle">
                <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" /> Previous
              </span>
              <span className="mt-3 block text-xl font-semibold tracking-tight">{prev.name}</span>
            </Link>
            <Link href={`/projects/${next.slug}`} className="group bg-bg p-6 text-right transition-colors hover:bg-[#0b0c0f] sm:p-8">
              <span className="inline-flex items-center gap-2 font-mono text-xs text-subtle">
                Next <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
              <span className="mt-3 block text-xl font-semibold tracking-tight">{next.name}</span>
            </Link>
          </nav>
        )}
      </div>
    </article>
  );
}

function Fact({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="font-mono text-[0.6875rem] tracking-wider text-subtle uppercase">{label}</dt>
      <dd className="mt-1.5 text-fg">{children}</dd>
    </div>
  );
}
