import { Browser, Server, Spark } from "@/components/icons";
import { SectionHeader } from "@/components/ui/section-header";
import { skills } from "@/content/site";
import { delay } from "@/lib/utils";

const icons = { server: Server, browser: Browser, spark: Spark };

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="py-28 sm:py-36">
      <div className="container-page">
        <SectionHeader id="skills-title" eyebrow="06 — Skills" title="Technical skills" subtitle="The areas I work across." />

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {skills.map((group, i) => {
            const Icon = icons[group.icon];
            return (
              <article key={group.title} data-reveal style={delay(i * 90)} className="spotlight panel p-6 sm:p-7">
                <div className="flex items-center justify-between">
                  <span className="grid size-10 place-items-center rounded-xl bg-white/[0.04] text-accent ring-1 ring-line-strong">
                    <Icon className="size-5" />
                  </span>
                  {"note" in group && (
                    <span className="rounded-full bg-accent/10 px-2.5 py-0.5 font-mono text-[0.625rem] tracking-wider text-accent uppercase ring-1 ring-accent/25">
                      {group.note}
                    </span>
                  )}
                </div>
                <h3 className="mt-6 text-lg font-semibold tracking-tight">{group.title}</h3>
                <ul className="mt-4 space-y-2.5">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-muted">
                      <span aria-hidden="true" className="size-1 rounded-full bg-accent/70" />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
