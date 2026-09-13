import { Section } from "@/components/section";
import { about } from "@/content/site";

export function About() {
  return (
    <Section id="about" index="01" label="About" className="py-16 lg:py-24">
      <p data-reveal className="max-w-4xl text-[clamp(1.3rem,2.5vw,1.875rem)] leading-[1.4] font-light tracking-[-0.01em]">
        {about.join(" ")}
      </p>
    </Section>
  );
}
