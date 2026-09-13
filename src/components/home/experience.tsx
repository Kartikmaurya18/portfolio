import { Section } from "@/components/section";
import { experience } from "@/content/experience";

export function Experience() {
  return (
    <Section id="experience" index="02" label="Experience" className="py-20 lg:py-32">
      <ol className="divide-y divide-rule">
        {experience.map((role) => (
          <li
            key={`${role.company}-${role.title}`}
            data-reveal
            className="grid gap-x-8 gap-y-3 py-10 first:pt-0 last:pb-0 md:grid-cols-[10rem_minmax(0,1fr)]"
          >
            <p className="meta md:pt-2">
              {role.start} – {role.end}
            </p>
            <div>
              <h3 className="text-2xl font-semibold tracking-[-0.02em] sm:text-3xl">{role.title}</h3>
              <p className="mt-1 text-lg text-muted">{role.company}</p>
              <ul className="mt-6 max-w-3xl list-disc space-y-3 pl-5 text-[1.0625rem] leading-relaxed marker:text-subtle">
                {role.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
              {!!role.stack?.length && <p className="meta mt-6">{role.stack.join(" · ")}</p>}
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
