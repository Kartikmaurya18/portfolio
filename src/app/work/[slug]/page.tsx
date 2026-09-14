import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { ExternalLink } from "@/components/external-link";
import { Section } from "@/components/section";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { getShots } from "@/lib/previews";
import { displayUrl } from "@/lib/utils";

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
      <Link href="/" className="text-sm text-muted transition-colors hover:text-fg">
        <span aria-hidden="true">← </span>
        {site.name}
      </Link>

      <header className="mt-12">
        <p className="label">
          {project.kind}
          {project.year && ` · ${project.year}`}
        </p>
        <h1 className="mt-2 text-[1.75rem] leading-tight font-semibold tracking-[-0.01em]">{project.title}</h1>
        <p className="mt-4 text-xl leading-[1.6] text-fg">{project.summary}</p>
      </header>

      <dl className="mt-8 border-b border-rule">
        <Row label="Client">{project.client}</Row>
        {project.role && <Row label="Role">{project.role}</Row>}
        <Row label="Live">
          <ExternalLink href={project.url} className="link">
            {displayUrl(project.url)}
          </ExternalLink>
        </Row>
      </dl>

      {desktop && (
        <div className="mt-10 grid items-end gap-4 sm:grid-cols-[minmax(0,1fr)_7.5rem]">
          <Image
            src={desktop.src}
            width={desktop.width}
            height={desktop.height}
            alt={project.alt.desktop}
            sizes="(min-width: 42.5rem) 504px, calc(100vw - 2.5rem)"
            loading="eager"
            fetchPriority="high"
            placeholder={desktop.blurDataURL ? "blur" : "empty"}
            blurDataURL={desktop.blurDataURL}
            className="block h-auto w-full rounded-md border border-rule"
          />
          {mobile && (
            <Image
              src={mobile.src}
              width={mobile.width}
              height={mobile.height}
              alt={project.alt.mobile}
              sizes="7.5rem"
              placeholder={mobile.blurDataURL ? "blur" : "empty"}
              blurDataURL={mobile.blurDataURL}
              className="hidden h-auto w-full rounded-xl border border-rule sm:block"
            />
          )}
        </div>
      )}

      {(project.quote || project.problem) && (
        <Section id="problem" title="The problem">
          {project.quote && (
            <figure>
              <blockquote className="text-fg">&ldquo;{project.quote.text}&rdquo;</blockquote>
              <figcaption className="mt-2 text-sm text-muted">{project.quote.author}</figcaption>
            </figure>
          )}
          {project.problem && <p>{project.problem}</p>}
        </Section>
      )}
      {project.approach && (
        <Section id="approach" title="What I built">
          <p>{project.approach}</p>
        </Section>
      )}
      {project.decision && (
        <Section id="decision" title="One decision">
          <p className="text-fg">{project.decision.choice}</p>
          <p>{project.decision.reasoning}</p>
        </Section>
      )}
      <Section id="stack" title="Stack">
        <p>{project.stack.join(" · ")}</p>
      </Section>
      {project.result && (
        <Section id="result" title="Result">
          <p>{project.result}</p>
        </Section>
      )}

      {next.slug !== project.slug && (
        <nav aria-label="Next case study" className="mt-14 border-y border-rule">
          <Link href={`/work/${next.slug}`} className="group flex items-baseline justify-between gap-4 py-3.5">
            <span className="text-muted">Next case study</span>
            <span className="text-fg decoration-rule-strong underline-offset-4 group-hover:underline">
              {next.title}
              <span aria-hidden="true"> →</span>
            </span>
          </Link>
        </nav>
      )}
    </article>
  );
}

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-6 border-t border-rule py-3">
      <dt className="text-muted">{label}</dt>
      <dd className="min-w-0 text-right text-fg">{children}</dd>
    </div>
  );
}
