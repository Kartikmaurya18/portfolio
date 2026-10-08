import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { ExternalLink } from "@/components/external-link";
import { Download, GitHub, LinkedIn } from "@/components/icons";
import { built } from "@/content/built";
import { roles } from "@/content/experience";
import { freelance } from "@/content/freelance";
import { builtMore, contact, elsewhere, intro, links, now, resumeFileName, site } from "@/content/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const profiles = [
  { label: "LinkedIn", href: links.linkedin, Icon: LinkedIn },
  { label: "GitHub", href: links.github, Icon: GitHub },
];

const projectPreviews: Record<string, { src: string; alt: string }> = {
  Supriyapa: {
    src: "/projects/supriyapa-desktop.webp",
    alt: "Supriyapa online clothing store homepage",
  },
  "La Taj": {
    src: "/projects/lataj-desktop.webp",
    alt: "La Taj restaurant website homepage",
  },
};

function linkedClientText(text: string, clientUrl?: string) {
  const clientName = "Consumer Choice Payments";
  if (!clientUrl || !text.includes(clientName)) return text;
  const [before, ...after] = text.split(clientName);
  return (
    <>
      {before}
      <ExternalLink href={clientUrl} className="text-link">
        {clientName}
      </ExternalLink>
      {after.join(clientName)}
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
  };
  const featuredSites = new Set(built.map((item) => item.url));
  const otherSites = freelance.filter((client) => !featuredSites.has(client.url));

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
            <span className="brand-name">Kartik Maurya<span>Software engineer</span></span>
          </a>
          <nav className="main-nav" aria-label="Main navigation">
            <a href="#experience">Experience</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact <span aria-hidden="true">↗</span></a>
          </nav>
        </header>

        <div>
          <section className="hero" aria-labelledby="intro-heading">
            <div className="hero-copy">
              <p className="eyebrow"><span className="status-dot" /> Based in Mumbai, India</p>
              <h1 id="intro-heading">
                I&apos;m Kartik. I build <span>backend services for banks and payment products</span>, and websites for restaurants and small businesses in Belgium and India.
              </h1>
              <p className="hero-description">{intro.body}</p>
              <div className="hero-actions">
                <a className="button button-primary" href={`mailto:${links.email}`}>
                  Let&apos;s talk <span aria-hidden="true">↗</span>
                </a>
                <a className="button button-quiet" href={links.resume} download={resumeFileName}>
                  <Download aria-hidden="true" /> Resume
                </a>
              </div>
              <div className="social-links" aria-label="Social links">
                {profiles.map(({ label, href, Icon }) => (
                  <ExternalLink key={label} href={href} className="social-link">
                    <Icon /> {label} <span aria-hidden="true">↗</span>
                  </ExternalLink>
                ))}
              </div>
            </div>

            <aside className="hero-art" aria-label="A snapshot of my work">
              <div className="art-orbit orbit-one" />
              <div className="art-orbit orbit-two" />
              <div className="art-spark spark-one">✳</div>
              <div className="art-spark spark-two">✳</div>
              <div className="hero-card">
                <div className="hero-card-top"><span>BUILDING WITH</span><span className="live-chip">● NOW</span></div>
                <p className="hero-card-title">Systems that<br /><em>move things</em></p>
                <div className="hero-card-stack">
                  <span>JAVA</span><span>SPRING BOOT</span><span>PAYMENTS</span>
                </div>
                <div className="hero-card-bottom"><span>Backend &amp; the web</span><span aria-hidden="true">↗</span></div>
              </div>
              <div className="orbit-caption">MUMBAI · INDIA</div>
            </aside>
          </section>

          <div className="quick-facts" aria-label="At a glance">
            <div><strong>{freelance.length}</strong><span>websites built for clients</span></div>
            <div><strong>100<span>+</span></strong><span>REST APIs delivered</span></div>
            <div><strong>2</strong><span>worlds: banking &amp; small business</span></div>
          </div>

          <section id="experience" className="content-section">
            <div className="section-heading">
              <p className="section-kicker">01 <span>—</span> EXPERIENCE</p>
              <h2>What I&apos;ve worked on<span className="heading-dot">.</span></h2>
            </div>
            <div className="experience-list">
              {roles.map((role, index) => (
                <article className="experience-card" key={role.company}>
                  <div className="experience-index">0{index + 1}</div>
                  <div className="experience-content">
                    <div className="experience-title-row">
                      <h3>{role.company}</h3>
                      <span className="date-chip">{role.period}</span>
                    </div>
                    <p>{linkedClientText(role.text, role.client)}</p>
                    {role.details?.map((detail) => <p key={detail}>{detail}</p>)}
                    {role.caseStudy && (
                      <Link href={`/work/${role.caseStudy}`} className="inline-action">
                        Read the case study <span aria-hidden="true">↗</span>
                      </Link>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section id="projects" className="content-section">
            <div className="section-heading section-heading-row">
              <div>
                <p className="section-kicker">02 <span>—</span> SELECTED WORK</p>
                <h2>Things I built<span className="heading-dot">.</span></h2>
              </div>
              <span className="section-side-note">A few things from the web, retail &amp; fintech.</span>
            </div>
            <div className="project-grid">
              {built.map((item, index) => {
                const preview = projectPreviews[item.name];
                return (
                  <article className={`project-card project-card-${index + 1}`} key={item.name}>
                    <div className={`project-visual${preview ? " has-preview" : ` visual-${index + 1}`}`}>
                      {preview ? (
                        <Image src={preview.src} alt={preview.alt} fill sizes="(max-width: 720px) 100vw, (max-width: 1080px) 50vw, 520px" />
                      ) : (
                        <div className="visual-placeholder" aria-hidden="true">
                          <span className="visual-orb" />
                          <span className="visual-label">{item.name}</span>
                          <div className="visual-lines"><i /><i /><i /></div>
                          {item.name === "OptionOS" && <div className="visual-chart"><i /><i /><i /><i /><i /><i /><i /><i /></div>}
                        </div>
                      )}
                      <span className="project-count">0{index + 1} / 05</span>
                    </div>
                    <div className="project-card-body">
                      <div className="project-title-row">
                        <h3>{item.name}</h3>
                        <ExternalLink href={item.url} className="round-arrow" aria-label={`${item.linkLabel ?? "Open"} ${item.name}`}>
                          <span aria-hidden="true">↗</span>
                        </ExternalLink>
                      </div>
                      <p>{item.description}</p>
                      {item.demoLogin && (
                        <p className="demo-login">Demo login: <code>{item.demoLogin.username}</code> / <code>{item.demoLogin.password}</code></p>
                      )}
                      <div className="project-links">
                        {item.caseStudy && <Link href={`/work/${item.caseStudy}`} className="project-link">Case study <span aria-hidden="true">↗</span></Link>}
                        <ExternalLink href={item.url} className="project-link">{item.linkLabel ?? "Open"} <span aria-hidden="true">↗</span></ExternalLink>
                        {item.code && <ExternalLink href={item.code} className="project-link">Code <span aria-hidden="true">↗</span></ExternalLink>}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
            <p className="client-list">
              <span className="client-list-label">ALSO ON THE WEB</span><br />
              {builtMore.before}{" "}
              {otherSites.map((client, index) => (
                <Fragment key={client.url}>
                  {index > 0 && (index < otherSites.length - 1 ? ", " : ", and ")}
                  <ExternalLink href={client.url} className="text-link">{client.name}</ExternalLink>
                </Fragment>
              ))}{builtMore.after}
            </p>
          </section>

          <section className="now-contact-grid">
            <div id="now" className="now-card">
              <p className="section-kicker">03 <span>—</span> RIGHT NOW</p>
              <h2>Curious about what&apos;s next<span className="heading-dot">?</span></h2>
              {now.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <div className="learning-tags"><span>LangGraph</span><span>RAG</span><span>AI agents</span></div>
            </div>
            <div id="contact" className="contact-card">
              <p className="section-kicker">04 <span>—</span> ELSEWHERE</p>
              <h2>Find me around<span className="heading-dot">.</span></h2>
              <div className="elsewhere-list">
                {elsewhere.map((row) => {
                  const content = <><span>{row.label}<small>{row.detail}</small></span><span className="elsewhere-arrow">{row.download ? "↓" : "↗"}</span></>;
                  return row.download ? (
                    <a key={row.label} href={row.href} download={resumeFileName} className="elsewhere-link">{content}</a>
                  ) : (
                    <ExternalLink key={row.label} href={row.href} className="elsewhere-link">{content}</ExternalLink>
                  );
                })}
              </div>
              <p className="contact-prompt">{contact.line}</p>
              <a className="email-link" href={`mailto:${links.email}`}>{links.email}<span aria-hidden="true">↗</span></a>
            </div>
          </section>

          <p className="sign-off">{contact.signOff}<span> ✳</span></p>
        </div>
      </div>
    </>
  );
}
