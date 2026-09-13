import Image from "next/image";
import Link from "next/link";
import { Download, GitHub, LinkedIn, Mail } from "@/components/icons";
import { hero, links, resumeFileName, site } from "@/content/site";

const profiles = [
  { label: "GitHub", href: links.github, Icon: GitHub, external: true },
  { label: "LinkedIn", href: links.linkedin, Icon: LinkedIn, external: true },
  { label: "Email", href: `mailto:${links.email}`, Icon: Mail, external: false },
];

export function Hero() {
  const [first, ...rest] = site.name.split(" ");

  return (
    <section aria-labelledby="hero-heading" className="page pt-14 pb-20 sm:pt-20 lg:pt-28 lg:pb-32">
      <div className="grid-editorial">
        <div className="min-w-0 lg:col-span-9 lg:col-start-4 lg:row-start-1">
          <h1
            id="hero-heading"
            className="text-[clamp(3.5rem,13vw,9.5rem)] leading-[0.86] font-semibold tracking-[-0.06em]"
          >
            {first} <br />
            {rest.join(" ")}
            <span className="text-accent">.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-[clamp(1.375rem,2.8vw,2rem)] leading-[1.2] tracking-[-0.02em]">
            {site.role} at <span className="whitespace-nowrap">{site.company}.</span>
          </p>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">{hero.summary}</p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link href="/#work" className="btn btn-primary">
              View Work
            </Link>
            <a href={links.resume} download={resumeFileName} className="btn btn-outline">
              <Download className="size-4" />
              Resume
            </a>
            <ul className="flex items-center sm:ml-2">
              {profiles.map(({ label, href, Icon, external }) => (
                <li key={label}>
                  <a
                    href={href}
                    aria-label={label}
                    className="grid size-11 place-items-center text-muted transition-colors hover:text-fg"
                    {...(external && { target: "_blank", rel: "noopener noreferrer" })}
                  >
                    <Icon className="size-5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-4 lg:col-span-3 lg:col-start-1 lg:row-start-1 lg:self-end lg:pt-0">
          {hero.photo && (
            <Image
              src={hero.photo}
              alt={`Photo of ${site.name}`}
              width={480}
              height={600}
              sizes="(min-width: 1024px) 14rem, 10rem"
              className="mb-6 h-auto w-40 lg:w-56"
            />
          )}
          <dl className="meta grid grid-cols-[4rem_1fr] gap-y-1">
            <dt>Based</dt>
            <dd className="text-muted">{site.location}</dd>
            <dt>Role</dt>
            <dd className="text-muted">SDE, {site.company}</dd>
            <dt>Since</dt>
            <dd className="text-muted">{hero.since}</dd>
          </dl>
        </div>
      </div>
    </section>
  );
}
