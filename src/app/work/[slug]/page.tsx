import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { ArrowRight } from "@/components/icons";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { getShots } from "@/lib/previews";
import { cn, displayUrl } from "@/lib/utils";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const title = `${project.title} · ${site.name}`;
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: { type: "article", title, description: project.summary, url: `/work/${project.slug}` },
    twitter: { title, description: project.summary },
  };
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const { desktop, mobile } = getShots(project.slug);
  const next = projects[(projects.indexOf(project) + 1) % projects.length];

  return (
    <article>
      <header className="page pt-10 pb-14 lg:pt-16 lg:pb-20">
        <Link href="/#work" className="meta link">
          Selected work
        </Link>
        <div className="grid-editorial mt-12">
          <div className="min-w-0 lg:col-span-9 lg:col-start-4 lg:row-start-1">
            <p className="meta">{project.kind}</p>
            <h1 className="mt-3 text-[clamp(2.75rem,8vw,6.5rem)] leading-[0.92] font-semibold tracking-[-0.055em]">
              {project.title}
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-relaxed text-muted">{project.summary}</p>
          </div>
          <dl className="meta grid grid-cols-[4rem_1fr] gap-y-1 lg:col-span-3 lg:col-start-1 lg:row-start-1 lg:self-end">
            <dt>Client</dt>
            <dd className="text-muted">{project.client}</dd>
            {project.role && (
              <>
                <dt>Role</dt>
                <dd className="text-muted">{project.role}</dd>
              </>
            )}
            {project.year && (
              <>
                <dt>Year</dt>
                <dd className="text-muted">{project.year}</dd>
              </>
            )}
            <dt>Live</dt>
            <dd>
              <a href={project.url} target="_blank" rel="noopener noreferrer" className="link text-fg">
                {displayUrl(project.url)}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </dd>
          </dl>
        </div>
      </header>

      <div className="bg-stage">
        <div className="mx-auto grid max-w-[96rem] items-start gap-8 px-4 py-8 sm:grid-cols-[minmax(0,1fr)_minmax(0,15rem)] sm:px-10 sm:py-14 lg:gap-12 lg:px-20 lg:py-20">
          {desktop && (
            <figure className="min-w-0">
              <Image
                src={desktop.src}
                width={desktop.width}
                height={desktop.height}
                alt={project.alt.desktop}
                sizes="(min-width: 1536px) 1100px, (min-width: 640px) 72vw, 92vw"
                loading="eager"
                fetchPriority="high"
                placeholder={desktop.blurDataURL ? "blur" : "empty"}
                blurDataURL={desktop.blurDataURL}
                className="block h-auto w-full rounded-[3px]"
              />
              <figcaption className="meta mt-3">Desktop, 1440px wide</figcaption>
            </figure>
          )}
          {mobile && (
            <figure className="mx-auto w-3/5 max-w-[15rem] sm:w-full">
              <Image
                src={mobile.src}
                width={mobile.width}
                height={mobile.height}
                alt={project.alt.mobile}
                sizes="(min-width: 640px) 15rem, 60vw"
                placeholder={mobile.blurDataURL ? "blur" : "empty"}
                blurDataURL={mobile.blurDataURL}
                className="block h-auto w-full rounded-[10px]"
              />
              <figcaption className="meta mt-3">Phone, 390px wide</figcaption>
            </figure>
          )}
        </div>
      </div>

      <div className="page pt-10 pb-6 lg:pt-16">
        {(project.quote || project.problem) && (
          <Block label="The problem">
            {project.quote && (
              <figure>
                <blockquote className="text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.3] font-light">
                  &ldquo;{project.quote.text}&rdquo;
                </blockquote>
                <figcaption className="meta mt-4">{project.quote.author}</figcaption>
              </figure>
            )}
            {project.problem && (
              <p className={cn("max-w-2xl text-xl leading-relaxed", project.quote && "mt-8 text-muted")}>{project.problem}</p>
            )}
          </Block>
        )}
        {project.approach && (
          <Block label="What I built">
            <p className="max-w-2xl text-xl leading-relaxed">{project.approach}</p>
          </Block>
        )}
        {project.decision && (
          <Block label="One decision">
            <p className="max-w-2xl text-xl leading-relaxed">{project.decision.choice}</p>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">{project.decision.reasoning}</p>
          </Block>
        )}
        <Block label="Stack">
          <p className="text-lg leading-relaxed">{project.stack.join(" · ")}</p>
        </Block>
        {project.result && (
          <Block label="Result">
            <p className="max-w-3xl text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.3] font-light">{project.result}</p>
          </Block>
        )}
      </div>

      {next.slug !== project.slug && (
        <nav aria-label="Next case study" className="border-t border-rule">
          <Link href={`/work/${next.slug}`} className="page group flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 py-12 lg:py-16">
            <span className="meta">Next case study</span>
            <span className="flex items-center gap-3 text-[clamp(1.75rem,4vw,3rem)] font-semibold tracking-[-0.04em] transition-colors group-hover:text-accent">
              {next.title}
              <ArrowRight className="size-6 shrink-0" />
            </span>
          </Link>
        </nav>
      )}
    </article>
  );
}

function Block({ label, children }: { label: string; children: ReactNode }) {
  return (
    <section data-reveal className="grid-editorial border-t border-rule py-10 first:border-t-0 lg:py-14">
      <h2 className="meta tracking-[0.12em] uppercase lg:col-span-3 lg:pt-2">{label}</h2>
      <div className="min-w-0 lg:col-span-9">{children}</div>
    </section>
  );
}
