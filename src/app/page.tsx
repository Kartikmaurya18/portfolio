import type { Metadata } from "next";
import { ExternalLink } from "@/components/external-link";
import { ClientGrid } from "@/components/client-grid";
import { Countdown } from "@/components/countdown";
import { LeadProject, ProjectCard } from "@/components/projects";
import { SectionHeading } from "@/components/section-heading";
import { SiteHeader } from "@/components/site-header";
import { TerminalHero } from "@/components/terminal-hero";
import { Ticker } from "@/components/ticker";
import { Timeline } from "@/components/timeline";
import { featured } from "@/content/built";
import { freelance } from "@/content/freelance";
import { stats } from "@/content/stats";
import { timeline } from "@/content/timeline";
import { contact, hero, links, resumeFileName, site, skills } from "@/content/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: site.url,
    jobTitle: site.role,
    worksFor: { "@type": "Organization", name: site.company },
    homeLocation: { "@type": "Place", name: site.location },
    email: `mailto:${links.email}`,
    sameAs: [links.github, links.linkedin],
    knowsAbout: ["LLM applications", "AI agents", "RAG", "Java", "Spring Boot", "REST APIs"],
  };
  const lead = featured.find((project) => project.lead);
  const others = featured.filter((project) => !project.lead);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <div className="portfolio-shell" id="top">
        <SiteHeader />

        <div>
          <section className="hero" aria-labelledby="intro-heading">
            <div className="hero-copy">
              <p className="eyebrow"><span className="status-dot" aria-hidden="true" /> {hero.eyebrow}</p>
              <h1 id="intro-heading">{hero.headline[0]} <span>{hero.headline[1]}</span></h1>
              <p className="countdown">
                <Countdown deadlineIso={hero.deadline.iso} /> days left on the road to {hero.deadline.label}
              </p>
              <div className="hero-actions">
                <a className="button button-primary" href="#projects">
                  View My Work <span aria-hidden="true">↓</span>
                </a>
                <a className="button button-quiet" href="#contact">
                  Let&apos;s talk <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
            <TerminalHero terminal={hero.terminal} />
          </section>

          <Ticker items={stats} />

          <section id="road" className="content-section" aria-labelledby="road-heading">
            <SectionHeading
              id="road-heading"
              eyebrow="// the road"
              title="The road, step by step"
              intro="Client sites and Java backends first. Now I'm learning to take AI from a demo to a customer's production."
            />
            <Timeline steps={timeline} />
          </section>

          <section id="projects" className="content-section" aria-labelledby="projects-heading">
            <SectionHeading id="projects-heading" eyebrow="// projects" title="Things I've built" />
            {lead && <LeadProject project={lead} />}
            <div className="project-grid">
              {others.map((project) => <ProjectCard key={project.name} project={project} />)}
            </div>
          </section>

          <section id="sites" className="content-section" aria-labelledby="sites-heading">
            <SectionHeading
              id="sites-heading"
              eyebrow="// client sites"
              title="Client websites"
              intro={`Shipped ${freelance.length} sites for restaurants and local businesses.`}
            />
            <ClientGrid sites={freelance} />
          </section>

          <section id="skills" className="content-section" aria-labelledby="skills-heading">
            <div className="section-heading">
              <h2 id="skills-heading">Technical skills<span className="heading-dot">.</span></h2>
            </div>
            <dl className="skills-list">
              {skills.map((group) => (
                <div key={group.category}>
                  <dt>{group.category}</dt>
                  <dd>
                    <ul className="tag-list">
                      {group.core?.map((name) => <li key={name} className="tag-core">{name}</li>)}
                      {group.items.map((name) => <li key={name}>{name}</li>)}
                    </ul>
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <section id="contact" className="content-section contact-card" aria-labelledby="contact-heading">
            <h2 id="contact-heading">{contact.heading}</h2>
            <p className="contact-prompt">{contact.line}</p>
            <a className="email-link" href={`mailto:${links.email}`}>{links.email}<span aria-hidden="true">↗</span></a>
            <div className="elsewhere-list">
              <ExternalLink href={links.linkedin} className="elsewhere-link">LinkedIn<span className="elsewhere-arrow" aria-hidden="true">↗</span></ExternalLink>
              <ExternalLink href={links.github} className="elsewhere-link">GitHub<span className="elsewhere-arrow" aria-hidden="true">↗</span></ExternalLink>
              <a href={links.resume} download={resumeFileName} className="elsewhere-link">Resume<span className="elsewhere-arrow" aria-hidden="true">↓</span></a>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
