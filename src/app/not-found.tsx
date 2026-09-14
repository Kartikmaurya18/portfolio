import Link from "next/link";

export default function NotFound() {
  return (
    <section>
      <p className="label">404</p>
      <h1 className="mt-2 text-[1.75rem] leading-tight font-semibold">Nothing at this address.</h1>
      <p className="mt-4">
        <Link href="/" className="link">
          Back to the homepage
        </Link>
      </p>
    </section>
  );
}
