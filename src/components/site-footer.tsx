import { footer, site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <p>{footer.note}</p>
        <p>© {new Date().getFullYear()} {site.name}</p>
      </div>
    </footer>
  );
}
