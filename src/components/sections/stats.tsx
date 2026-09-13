import { stats } from "@/content/site";
import { delay } from "@/lib/utils";

export function Stats() {
  return (
    <section aria-label="At a glance">
      <div className="container-page">
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-line ring-1 ring-line lg:grid-cols-4">
          {stats.map((stat, i) => (
            <div key={stat.label} data-reveal style={delay(i * 80)} className="flex flex-col-reverse gap-2 bg-bg p-5 sm:p-8">
              <dt className="font-mono text-[0.6875rem] tracking-wider text-subtle uppercase">{stat.label}</dt>
              <dd className="text-gradient text-[clamp(1.6rem,3.6vw,2.5rem)] leading-none font-semibold tracking-[-0.035em]">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
