import type { Metadata } from "next";
import { CopyEmail } from "@/components/copy-email";
import { CountdownDetail, DaysLeft } from "@/components/countdown";
import { ExternalLink } from "@/components/external-link";
import { HomeCalendar } from "@/components/journal/home-calendar";
import { SectionHeading } from "@/components/section-heading";
import { SiteHeader } from "@/components/site-header";
import { TerminalHero } from "@/components/terminal-hero";
import { Timeline } from "@/components/timeline";
import { contact, hero, journal, links, resumeFileName, road, site } from "@/content/site";
import { timeline } from "@/content/timeline";
import { journalConfigured } from "@/lib/journal/supabase";

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
            <div className="hero-copy">
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
            </div>
            <TerminalHero terminal={hero.terminal} />
          </section>

          {journalConfigured && (
            <section id="learning" className="content-section" aria-labelledby="learning-heading">
              <SectionHeading
                id="learning-heading"
                title="What I learned, day by day"
                intro={`A square for each day from ${journal.startLabel} to ${road.deadline.label}. A lit square means I wrote down what I learned that day. Pick one to read it.`}
              />
              <HomeCalendar start={journal.start} end={road.deadline.iso.slice(0, 10)} />
            </section>
          )}

          <section id="road" className="content-section" aria-labelledby="road-heading">
            <SectionHeading
              id="road-heading"
              title="How I got here"
              intro="I started with freelance websites, learned backend through Spring Boot, then moved into production work. Now I'm learning to ship AI properly."
            />
            <Timeline steps={timeline} />
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
