import Image from "next/image";
import { ProjectCard } from "@/components/projects/project-card";
import { ButtonLink } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";
import { freelanceProjects, getPreviews, spotlightProjects } from "@/lib/projects";
import { delay, displayUrl } from "@/lib/utils";

export function Freelance() {
  const remaining = freelanceProjects.filter((p) => !p.spotlight);

  return (
    <section id="freelance" aria-labelledby="freelance-title" className="relative overflow-hidden py-28 sm:py-36">
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
          <SectionHeader
            id="freelance-title"
            eyebrow="04 — Client work"
            title="Freelance & Client Work"
            subtitle="Real websites. Real businesses. Shipped to production."
          />
          <dl data-reveal className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-line ring-1 ring-line">
            <div className="flex flex-col-reverse gap-2 bg-bg p-5">
              <dt className="font-mono text-[0.6875rem] tracking-wider text-subtle uppercase">Websites delivered</dt>
              <dd className="text-gradient text-3xl font-semibold tracking-tight">{freelanceProjects.length}</dd>
            </div>
            <div className="flex flex-col-reverse gap-2 bg-bg p-5">
              <dt className="font-mono text-[0.6875rem] tracking-wider text-subtle uppercase">For businesses in</dt>
              <dd className="text-gradient text-xl leading-9 font-semibold tracking-tight">Belgium & India</dd>
            </div>
          </dl>
        </div>
      </div>

      <ClientMarquee />

      <div className="container-page">
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {spotlightProjects.map((project, i) => (
            <li key={project.slug} data-reveal style={delay(i * 90)} className={i === 2 ? "md:col-span-2 lg:col-span-1" : undefined}>
              <ProjectCard
                project={project}
                preview={getPreviews(project).desktop}
                sizes="(min-width: 1024px) 380px, (min-width: 768px) 50vw, 100vw"
              />
            </li>
          ))}
        </ul>

        <div data-reveal className="panel mt-8 flex flex-col items-start gap-5 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div className="flex items-center gap-4">
            <div className="flex -space-x-3" aria-hidden="true">
              {remaining.slice(0, 4).map((project) => {
                const preview = getPreviews(project).desktop;
                return (
                  <span key={project.slug} className="relative size-10 overflow-hidden rounded-full bg-raised ring-2 ring-bg">
                    {preview && <Image src={preview.src} alt="" fill sizes="40px" className="object-cover object-top" />}
                  </span>
                );
              })}
            </div>
            <p className="text-sm text-muted">
              <span className="font-medium text-fg">+{remaining.length} more</span> client websites in the archive
            </p>
          </div>
          <ButtonLink href="/projects?category=freelance">View all freelance projects</ButtonLink>
        </div>
      </div>
    </section>
  );
}

function ClientMarquee() {
  const row = (duplicate: boolean) => (
    <ul className="flex shrink-0 items-center gap-3 pr-3" aria-hidden={duplicate || undefined}>
      {freelanceProjects.map((project) => (
        <li key={project.slug}>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={duplicate ? -1 : undefined}
            className="inline-flex h-10 items-center gap-2.5 rounded-full bg-white/[0.02] px-4 text-sm whitespace-nowrap text-muted ring-1 ring-line ring-inset transition hover:text-fg hover:ring-line-strong"
          >
            <span aria-hidden="true" className="size-1.5 rounded-full bg-accent/70" />
            {project.name}
            <span className="font-mono text-xs text-subtle">{displayUrl(project.url)}</span>
          </a>
        </li>
      ))}
    </ul>
  );

  return (
    <div data-reveal className="marquee mask-fade-x my-14 overflow-hidden">
      <div className="marquee-track flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
