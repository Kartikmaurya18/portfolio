import type { Metadata } from "next";
import Link from "next/link";
import { Fragment } from "react";
import { ExternalLink } from "@/components/external-link";
import { Countdown } from "@/components/countdown";
import { SectionHeading } from "@/components/section-heading";
import { SiteHeader } from "@/components/site-header";
import { TerminalHero } from "@/components/terminal-hero";
import { Ticker } from "@/components/ticker";
import { Timeline } from "@/components/timeline";
import { featured } from "@/content/built";
import { freelance } from "@/content/freelance";
import { stats } from "@/content/stats";
import { timeline } from "@/content/timeline";
import { clientSites, contact, hero, links, resumeFileName, site, skills } from "@/content/site";

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
  const featuredUrls = new Set(featured.flatMap((item) => (item.demo ? [item.demo] : [])));
  const otherSites = freelance.filter((client) => !featuredUrls.has(client.url));

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
            <div className="section-heading">
              <h2 id="projects-heading">Featured projects<span className="heading-dot">.</span></h2>
            </div>
            <div className="project-grid">
              {featured.map((item) => (
                <article className="project-card" key={item.name}>
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <p className="project-contribution"><strong>My contribution:</strong> {item.contribution}</p>
                  <ul className="tag-list" aria-label={`${item.name} tech stack`}>
                    {item.stack.map((tech) => <li key={tech}>{tech}</li>)}
                  </ul>
                  <div className="project-links">
                    {item.demo && <ExternalLink href={item.demo} className="project-link">Live Demo <span aria-hidden="true">↗</span></ExternalLink>}
                    {item.code && <ExternalLink href={item.code} className="project-link">Source Code <span aria-hidden="true">↗</span></ExternalLink>}
                    {item.caseStudy && <Link href={`/work/${item.caseStudy}`} className="project-link">Case study <span aria-hidden="true">↗</span></Link>}
                  </div>
                </article>
              ))}
            </div>
            <p className="client-list">
              {clientSites.before}{" "}
              {otherSites.map((client, index) => (
                <Fragment key={client.url}>
                  {index > 0 && ", "}
                  <ExternalLink href={client.url} className="text-link">{client.name}</ExternalLink>
                </Fragment>
              ))}{clientSites.after}
            </p>
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
