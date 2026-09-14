import type { Metadata } from "next";
import Link from "next/link";
import { Fragment } from "react";
import { ExternalLink } from "@/components/external-link";
import { Download, GitHub, LinkedIn, Mail } from "@/components/icons";
import { Section } from "@/components/section";
import { built } from "@/content/built";
import { roles } from "@/content/experience";
import { freelance } from "@/content/freelance";
import {
  builtMore,
  contact,
  elsewhere,
  howIGotHere,
  intro,
  links,
  now,
  resumeFileName,
  site,
} from "@/content/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const profiles = [
  { label: "LinkedIn", href: links.linkedin, Icon: LinkedIn },
  { label: "GitHub", href: links.github, Icon: GitHub },
];

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

  const featured = new Set(built.map((item) => item.url));
  const otherSites = freelance.filter((client) => !featured.has(client.url));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <h1 className="text-xl leading-[1.6] font-normal">{intro.lead}</h1>
      <p className="mt-5">{intro.body}</p>

      <div className="mt-8 flex items-center justify-between gap-4 border-y border-rule py-1.5">
        <p className="label">Connect</p>
        <ul className="-mr-3 flex items-center">
          {profiles.map(({ label, href, Icon }) => (
            <li key={label}>
              <ExternalLink
                href={href}
                aria-label={label}
                className="grid size-11 place-items-center transition-colors hover:text-fg"
              >
                <Icon className="size-5" />
              </ExternalLink>
            </li>
          ))}
          <li>
            <a
              href={`mailto:${links.email}`}
              aria-label="Email"
              className="grid size-11 place-items-center transition-colors hover:text-fg"
            >
              <Mail className="size-5" />
            </a>
          </li>
          <li>
            <a
              href={links.resume}
              download={resumeFileName}
              className="flex h-11 items-center gap-2 px-3 text-sm transition-colors hover:text-fg"
            >
              <Download className="size-4" />
              Resume
            </a>
          </li>
        </ul>
      </div>

      <Section id="how" title="How I got here">
        {howIGotHere.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </Section>

      <Section id="work" title="What I've worked on">
        {roles.map((role) => (
          <p key={role.company}>
            At <span className="text-fg">{role.company}</span> ({role.period}), {role.text}
            {role.caseStudy && (
              <>
                {" "}
                <Link href={`/work/${role.caseStudy}`} className="link">
                  Read the case study
                </Link>
              </>
            )}
          </p>
        ))}
      </Section>

      <Section id="built" title="Things I built on the side">
        <ul className="space-y-5">
          {built.map((item) => (
            <li key={item.url} className="relative pl-5">
              <span aria-hidden="true" className="absolute left-0 text-muted">
                -
              </span>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="flex gap-4 text-sm">
                  {item.caseStudy && (
                    <Link href={`/work/${item.caseStudy}`} className="link-muted">
                      case study<span className="sr-only">: {item.name}</span>
                    </Link>
                  )}
                  <ExternalLink href={item.url} className="link-muted">
                    {item.linkLabel ?? "open"}
                    <span className="sr-only">: {item.name}</span>
                    <span aria-hidden="true"> ↗</span>
                  </ExternalLink>
                  {item.code && (
                    <ExternalLink href={item.code} className="link-muted">
                      code
                      <span className="sr-only">: {item.name}</span>
                      <span aria-hidden="true"> ↗</span>
                    </ExternalLink>
                  )}
                </p>
              </div>
              <p className="mt-1">{item.description}</p>
              {item.demoLogin && (
                <p className="mt-1 text-sm text-muted">
                  Demo login: <code className="text-body">{item.demoLogin.username}</code> /{" "}
                  <code className="text-body">{item.demoLogin.password}</code>
                </p>
              )}
            </li>
          ))}
        </ul>
        {otherSites.length > 0 && (
          <p>
            {builtMore.before}{" "}
            {otherSites.map((client, i) => (
              <Fragment key={client.url}>
                {i > 0 && (i < otherSites.length - 1 ? ", " : otherSites.length > 2 ? ", and " : " and ")}
                <ExternalLink href={client.url} className="link">
                  {client.name}
                </ExternalLink>
              </Fragment>
            ))}
            {builtMore.after}
          </p>
        )}
      </Section>

      <Section id="now" title="Now">
        {now.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </Section>

      <Section id="elsewhere" title="Elsewhere">
        <ul className="border-b border-rule">
          {elsewhere.map((row) => {
            const className = "group flex items-baseline justify-between gap-4 py-3.5";
            const content = (
              <>
                <span className="text-fg decoration-rule-strong underline-offset-4 group-hover:underline">
                  {row.label}
                  <span aria-hidden="true" className="ml-2 text-sm text-muted">
                    {row.download ? "↓" : "↗"}
                  </span>
                </span>
                <span className="text-muted">{row.detail}</span>
              </>
            );
            return (
              <li key={row.label} className="border-t border-rule">
                {row.download ? (
                  <a href={row.href} download={resumeFileName} className={className}>
                    {content}
                  </a>
                ) : (
                  <ExternalLink href={row.href} className={className}>
                    {content}
                  </ExternalLink>
                )}
              </li>
            );
          })}
        </ul>
      </Section>

      <section id="contact" aria-label="Contact" className="mt-14">
        <p>
          {contact.line}{" "}
          <a href={`mailto:${links.email}`} className="link">
            {links.email}
          </a>
        </p>
        <p className="mt-5 text-fg">{contact.signOff}</p>
      </section>
    </>
  );
}
