import { CurrentYear } from "@/components/reveal";
import { footer, links, resumeFileName, site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-rule">
      <div className="page flex flex-col gap-5 py-10 sm:flex-row sm:items-center sm:justify-between">
        <p className="meta">
          © <CurrentYear /> {site.name} · {site.location}
        </p>
        {footer.note && <p className="text-sm text-muted">{footer.note}</p>}
        <ul className="meta flex flex-wrap gap-x-5 gap-y-2">
          <li>
            <a href={links.github} target="_blank" rel="noopener noreferrer" className="link">
              GitHub
            </a>
          </li>
          <li>
            <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="link">
              LinkedIn
            </a>
          </li>
          <li>
            <a href={`mailto:${links.email}`} className="link">
              Email
            </a>
          </li>
          <li>
            <a href={links.resume} download={resumeFileName} className="link">
              Resume
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
