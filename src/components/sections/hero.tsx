import { Fragment } from "react";
import { ButtonLink } from "@/components/ui/button";
import { SocialLinks } from "@/components/ui/social-links";
import { SystemGraph } from "@/components/visuals/system-graph";
import { hero } from "@/content/site";
import { delay } from "@/lib/utils";

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative isolate overflow-hidden pt-32 pb-16 sm:pt-40 lg:pb-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid mask-radial-top absolute inset-0" />
        <div className="absolute -top-56 left-1/2 h-[44rem] w-[72rem] -translate-x-1/2 animate-[aurora_18s_ease-in-out_infinite_alternate] rounded-full bg-[radial-gradient(closest-side,rgb(255_155_84/0.15),transparent)]" />
        <div className="absolute top-24 -right-40 h-[32rem] w-[32rem] animate-[aurora_24s_ease-in-out_infinite_alternate-reverse] rounded-full bg-[radial-gradient(closest-side,rgb(150_160_255/0.08),transparent)]" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-bg" />
      </div>

      <div className="container-page grid items-center gap-16 lg:grid-cols-[1.12fr_0.88fr] lg:gap-12">
        <div>
          <p className="enter inline-flex flex-wrap items-center gap-x-2 gap-y-1 rounded-full bg-white/[0.03] py-1.5 pr-4 pl-3 text-xs text-muted ring-1 ring-line-strong ring-inset backdrop-blur sm:text-[0.8125rem]">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-accent shadow-[0_0_10px_var(--accent)]" />
            {hero.badge.map((item, i) => (
              <Fragment key={item}>
                {i > 0 && (
                  <span aria-hidden="true" className="text-subtle/70">
                    ·
                  </span>
                )}
                <span>{item}</span>
              </Fragment>
            ))}
          </p>

          <h1
            id="hero-title"
            className="enter mt-7 text-[clamp(2.75rem,7.2vw,5.4rem)] leading-[0.98] font-semibold tracking-[-0.045em]"
            style={delay(80)}
          >
            <span className="text-gradient">{hero.heading.lead}</span>{" "}
            <span className="text-accent-gradient font-serif text-[1.08em] font-normal tracking-[-0.02em] italic">
              {hero.heading.accent}
            </span>
          </h1>

          <p className="enter mt-7 max-w-xl text-[1.0625rem] leading-relaxed text-muted sm:text-lg" style={delay(160)}>
            {hero.intro}
          </p>

          <div className="enter mt-9 flex flex-wrap items-center gap-3" style={delay(240)}>
            <ButtonLink href={hero.primaryCta.href}>{hero.primaryCta.label}</ButtonLink>
            <ButtonLink href={hero.secondaryCta.href} variant="secondary">
              {hero.secondaryCta.label}
            </ButtonLink>
          </div>

          <div className="enter mt-10" style={delay(320)}>
            <SocialLinks />
          </div>
        </div>

        <div className="enter" style={delay(200)}>
          <SystemGraph />
        </div>
      </div>
    </section>
  );
}
