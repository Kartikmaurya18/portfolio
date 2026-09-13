import { GitHub, LinkedIn, Mail } from "@/components/icons";
import { ButtonLink } from "@/components/ui/button";
import { CopyButton } from "@/components/ui/client-bits";
import { contact, links } from "@/content/site";

export function Contact() {
  const { email } = links;

  return (
    <section id="contact" aria-labelledby="contact-title" className="py-28 sm:py-36">
      <div className="container-page">
        <div data-reveal className="panel relative isolate overflow-hidden px-6 py-16 text-center sm:px-12 sm:py-24">
          <span aria-hidden="true" className="beam" />
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
            <div className="bg-grid mask-radial absolute inset-0" />
            <div className="absolute top-0 left-1/2 h-96 w-[44rem] max-w-[140%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(255_155_84/0.22),transparent)]" />
          </div>

          <p className="eyebrow">08 — Contact</p>
          <h2
            id="contact-title"
            className="text-gradient mx-auto mt-6 max-w-3xl text-[clamp(2.4rem,6vw,4.5rem)] leading-[1.02] font-semibold tracking-[-0.045em]"
          >
            {contact.heading}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted">{contact.text}</p>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <ButtonLink href={email ? `mailto:${email}` : ""} icon={<Mail className="size-4" />}>
              Get in Touch
            </ButtonLink>
            <ButtonLink href={links.github} variant="secondary" icon={<GitHub className="size-4" />}>
              View GitHub
            </ButtonLink>
            <ButtonLink href={links.linkedin} variant="secondary" icon={<LinkedIn className="size-4" />}>
              LinkedIn
            </ButtonLink>
          </div>

          {email && (
            <div className="mt-8 inline-flex items-center gap-3 rounded-full py-1.5 pr-1.5 pl-4 ring-1 ring-line-strong">
              <a href={`mailto:${email}`} className="font-mono text-sm text-muted transition-colors hover:text-fg">
                {email}
              </a>
              <CopyButton value={email} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
