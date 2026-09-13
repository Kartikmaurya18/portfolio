import { Section } from "@/components/section";
import { stack } from "@/content/stack";

export function Stack() {
  return (
    <Section id="stack" index="05" label="Stack" className="py-16 lg:py-24">
      <dl data-reveal className="grid gap-x-12 gap-y-8 sm:grid-cols-2">
        {stack.map(({ group, items }) => (
          <div key={group}>
            <dt className="meta">{group}</dt>
            <dd className="mt-2 text-lg leading-relaxed">{items.join(" · ")}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
