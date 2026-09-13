import Link from "next/link";

export default function NotFound() {
  return (
    <section className="page py-32 lg:py-48">
      <p className="meta">404</p>
      <h1 className="mt-4 text-[clamp(2.5rem,6vw,4.5rem)] leading-none font-semibold tracking-[-0.04em]">
        Nothing at this address.
      </h1>
      <p className="mt-6 text-lg text-muted">
        <Link href="/" className="link text-fg">
          Back to the homepage
        </Link>
      </p>
    </section>
  );
}
