import { CurrentYear } from "@/components/current-year";
import { footer, site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <p>
          {footer.note} <span aria-hidden="true">·</span> {footer.signOff}
        </p>
        <p>© <CurrentYear buildYear={new Date().getFullYear()} /> {site.name}</p>
      </div>
    </footer>
  );
}
