import { Mail } from "@/components/icons";
import { Section } from "@/components/section";
import { contact, links } from "@/content/site";

export function Contact() {
  return (
    <Section id="contact" index="06" label="Contact" className="py-24 lg:py-40">
      <p data-reveal className="max-w-3xl text-[clamp(2rem,5vw,3.75rem)] leading-[1.05] font-semibold tracking-[-0.04em]">
        {contact.line}
      </p>
      <a href={`mailto:${links.email}`} className="btn btn-primary mt-10">
        <Mail className="size-4" />
        {links.email}
      </a>
    </Section>
  );
}
