import Link from "next/link";
import { CommandPaletteHint, CurrentYear } from "@/components/ui/client-bits";
import { Logo } from "@/components/ui/logo";
import { SocialLinks } from "@/components/ui/social-links";
import { footer, site } from "@/content/site";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line">
      <div className="container-page relative z-10 flex flex-col gap-10 py-14 md:flex-row md:items-end md:justify-between">
        <div>
          <Link href="/" className="inline-flex items-center gap-3 rounded-lg">
            <Logo />
            <span className="font-semibold tracking-tight">{site.name}</span>
          </Link>
          <p className="mt-3 text-sm text-muted">{site.tagline}</p>
          <SocialLinks className="mt-6" />
        </div>
        <div className="flex flex-col gap-2 text-sm text-subtle md:items-end">
          <p>{footer.note}</p>
          <p>
            © <CurrentYear /> {site.name}
          </p>
          <CommandPaletteHint className="mt-2 hidden md:inline-flex" />
        </div>
      </div>
      <p
        aria-hidden="true"
        className="pointer-events-none -mb-[0.22em] text-center text-[clamp(4rem,17vw,15rem)] leading-none font-semibold tracking-[-0.06em] whitespace-nowrap text-white/[0.025] select-none"
      >
        {site.name}
      </p>
    </footer>
  );
}
