import type { Metadata } from "next";
import { ExternalLink } from "@/components/external-link";
import { Beliefs } from "@/components/beliefs";
import { CountdownDetail, DayGrid, DaysLeft } from "@/components/countdown";
import { CopyEmail } from "@/components/copy-email";
import { SectionHeading } from "@/components/section-heading";
import { SiteHeader } from "@/components/site-header";
import { TerminalHero } from "@/components/terminal-hero";
import { Ticker } from "@/components/ticker";
import { Timeline } from "@/components/timeline";
import { beliefs } from "@/content/beliefs";
import { stats } from "@/content/stats";
import { timeline } from "@/content/timeline";
import { contact, hero, road, links, resumeFileName, site } from "@/content/site";

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
              <p className="eyebrow"><span className="status-dot" aria-hidden="true" /> {hero.eyebrow}</p>
              <h1 id="intro-heading" className="sr-only">{site.name}</h1>
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

          <Ticker items={stats} />

          <section id="run" className="content-section" aria-labelledby="run-heading">
            <SectionHeading
              id="run-heading"
              eyebrow="// the run"
              title="The run, in days"
              intro={`One square per day, from my first freelance project to ${road.deadline.label}. Every lit square is a day spent getting better.`}
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
              eyebrow="// the road"
              title="How I got here"
              intro="Freelance first, then Spring Boot and backends, then production. Now I'm learning to take AI from a demo to a customer's production."
            />
            <Timeline steps={timeline} />
          </section>

          <section id="beliefs" className="content-section" aria-labelledby="beliefs-heading">
            <SectionHeading id="beliefs-heading" eyebrow="// how i build" title="How I build" />
            <Beliefs items={beliefs} />
          </section>

          <section id="contact" className="content-section contact-card" aria-labelledby="contact-heading">
            <p className="section-eyebrow">{"// contact"}</p>
            <h2 id="contact-heading">{contact.heading}</h2>
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
