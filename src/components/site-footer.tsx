import { footer, site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="column">
      <div className="flex flex-wrap justify-between gap-x-6 gap-y-1 border-t border-rule py-8 text-[0.8125rem] leading-5 text-muted">
        <p>{footer.note}</p>
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
      </div>
    </footer>
  );
}
