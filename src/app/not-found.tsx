import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="relative isolate grid min-h-[85dvh] place-items-center overflow-hidden px-5 pt-24 pb-16 text-center">
      <div aria-hidden="true" className="bg-grid mask-radial absolute inset-0 -z-10" />
      <div>
        <p className="font-mono text-sm text-accent">404</p>
        <h1 className="text-gradient mt-4 text-5xl font-semibold tracking-[-0.04em] sm:text-6xl">This page doesn&apos;t exist.</h1>
        <p className="mt-4 text-muted">The link may be broken, or the page may have moved.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/">Back home</ButtonLink>
          <ButtonLink href="/projects" variant="secondary">
            View projects
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
