import Link from "next/link";
import { Download } from "@/components/icons";
import { links, nav, resumeFileName, site } from "@/content/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-bg">
      <div className="page flex h-14 items-center justify-between gap-6">
        <Link href="/" className="font-semibold tracking-[-0.02em]">
          {site.name}
        </Link>
        <div className="flex items-center gap-6">
          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-6 text-sm">
              {nav.map((item) => (
                <li key={item.id}>
                  <Link href={`/#${item.id}`} className="text-muted transition-colors hover:text-fg">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <a
            href={links.resume}
            download={resumeFileName}
            className="inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-sm text-muted ring-1 ring-rule-strong transition-colors ring-inset hover:text-fg hover:ring-fg/60"
          >
            <Download className="size-3.5" />
            Resume
          </a>
        </div>
      </div>
    </header>
  );
}
