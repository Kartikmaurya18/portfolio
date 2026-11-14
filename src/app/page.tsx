import type { Metadata } from "next";
import { Beliefs } from "@/components/beliefs";
import { CopyEmail } from "@/components/copy-email";
import { CountdownDetail, DayGrid, DaysLeft } from "@/components/countdown";
import { ExternalLink } from "@/components/external-link";
import { SectionHeading } from "@/components/section-heading";
import { SiteHeader } from "@/components/site-header";
import { Timeline } from "@/components/timeline";
import { beliefs } from "@/content/beliefs";
import { contact, hero, links, resumeFileName, road, site } from "@/content/site";
import { timeline } from "@/content/timeline";

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
            <p className="eyebrow">{hero.eyebrow}</p>
            <h1 id="intro-heading" className="sr-only">{site.name}</h1>
            <p className="hero-lead">{hero.lead}</p>
            <p className="big-days"><DaysLeft /></p>
            <CountdownDetail />
            <div className="hero-actions">
              <a className="button button-primary" href="#road">
                View My Work <span aria-hidden="true">↓</span>
              </a>
              <a className="button button-quiet" href="#contact">
                Let&apos;s talk <span aria-hidden="true">→</span>
              </a>
            </div>
          </section>

          <section id="run" className="content-section" aria-labelledby="run-heading">
            <SectionHeading
              id="run-heading"
              title="The run, in days"
              intro={`One square for each day between my first freelance project and ${road.deadline.label}.`}
            />
            <DayGrid />
            <div className="run-foot">
              <p><span className="mono">{road.start.label}</span> · {road.start.note}</p>
              <ul className="run-legend" aria-label="Legend">
                <li><i className="lived" aria-hidden="true" /> lived</li>
                <li><i className="today" aria-hidden="true" /> today</li>
                <li><i aria-hidden="true" /> to go</li>
              </ul>
              <p><span className="mono">{road.deadline.label}</span> · {road.deadline.note}</p>
            </div>
          </section>

          <section id="road" className="content-section" aria-labelledby="road-heading">
            <SectionHeading
              id="road-heading"
              title="How I got here"
              intro="I started with freelance websites, learned backend through Spring Boot, then moved into production work. Now I'm learning to ship AI properly."
            />
            <Timeline steps={timeline} />
          </section>

          <section id="beliefs" className="content-section" aria-labelledby="beliefs-heading">
            <SectionHeading id="beliefs-heading" title="How I work" />
            <Beliefs items={beliefs} />
          </section>

          <section id="contact" className="content-section contact" aria-labelledby="contact-heading">
            <h2 id="contact-heading">{contact.heading}</h2>
            <p className="contact-line">{contact.line}</p>
            <CopyEmail email={links.email} />
            <div className="elsewhere-list">
              <ExternalLink href={links.linkedin} className="elsewhere-link">LinkedIn</ExternalLink>
              <ExternalLink href={links.github} className="elsewhere-link">GitHub</ExternalLink>
              <a href={links.resume} download={resumeFileName} className="elsewhere-link">Resume<span className="ext-icon" aria-hidden="true">↓</span></a>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
