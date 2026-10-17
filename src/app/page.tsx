import type { Metadata } from "next";
import Link from "next/link";
import { Fragment } from "react";
import { ExternalLink } from "@/components/external-link";
import { Download, GitHub, LinkedIn } from "@/components/icons";
import { featured } from "@/content/built";
import { roles } from "@/content/experience";
import { freelance } from "@/content/freelance";
import { about, clientSites, contact, hero, links, resumeFileName, site, skills } from "@/content/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const profiles = [
  { label: "LinkedIn", href: links.linkedin, Icon: LinkedIn },
  { label: "GitHub", href: links.github, Icon: GitHub },
];

function bulletText(text: string, client?: { name: string; url: string }) {
  if (!client || !text.includes("{client}")) return text;
  const [before, ...after] = text.split("{client}");
  return (
    <>
      {before}
      <ExternalLink href={client.url} className="text-link">
        {client.name}
      </ExternalLink>
      {after.join("{client}")}
    </>
  );
}

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
        <header className="site-header">
          <a className="brand" href="#top" aria-label="Kartik Maurya, home">
            <span className="brand-mark">KM</span>
            <span className="brand-name">Kartik Maurya<span>AI engineer</span></span>
          </a>
          <nav className="main-nav" aria-label="Main navigation">
            <a href="#experience">Experience</a>
            <a href="#projects">Projects</a>
            <a href="#skills">Skills</a>
            <a href="#contact">Contact <span aria-hidden="true">↗</span></a>
          </nav>
        </header>

        <div>
          <section className="hero" aria-labelledby="intro-heading">
            <p className="eyebrow"><span className="status-dot" /> {hero.eyebrow}</p>
            <h1 id="intro-heading">{hero.headline[0]} <span>{hero.headline[1]}</span></h1>
            <p className="hero-description">{hero.body}</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#projects">
                View My Work <span aria-hidden="true">↓</span>
              </a>
              <ExternalLink className="button button-quiet" href={links.resume}>
                <Download aria-hidden="true" /> View Resume
              </ExternalLink>
            </div>
            <div className="social-links" aria-label="Social links">
              {profiles.map(({ label, href, Icon }) => (
                <ExternalLink key={label} href={href} className="social-link">
                  <Icon /> {label} <span aria-hidden="true">↗</span>
                </ExternalLink>
              ))}
            </div>
          </section>

          <section id="about" className="content-section" aria-labelledby="about-heading">
            <div className="section-heading">
              <h2 id="about-heading">About<span className="heading-dot">.</span></h2>
            </div>
            <p className="about-text">{about}</p>
          </section>

          <section id="experience" className="content-section" aria-labelledby="experience-heading">
            <div className="section-heading">
              <h2 id="experience-heading">Experience<span className="heading-dot">.</span></h2>
            </div>
            <div className="experience-list">
              {roles.map((role) => (
                <article className="experience-card" key={role.company}>
                  <div className="experience-title-row">
                    <h3>{role.company}</h3>
                    <span className="date-chip">{role.period}</span>
                  </div>
                  <p className="experience-role">{role.title}</p>
                  <ul>
                    {role.bullets.map((bullet) => <li key={bullet}>{bulletText(bullet, role.client)}</li>)}
                  </ul>
                  {role.caseStudy && (
                    <Link href={`/work/${role.caseStudy}`} className="inline-action">
                      Read the case study <span aria-hidden="true">↗</span>
                    </Link>
                  )}
                </article>
              ))}
            </div>
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
