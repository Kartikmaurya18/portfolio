import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "@/components/external-link";
import type { FreelanceSite } from "@/content/types";
import { shown } from "@/lib/todo";
import { displayUrl } from "@/lib/utils";

/** One card per client site: screenshot (or a neutral tile), type tag, a line about it and the link. */
export function ClientGrid({ sites }: { sites: FreelanceSite[] }) {
  return (
    <ul className="client-grid">
      {sites.map((site) => {
        const description = shown(site.description);
        return (
          <li key={site.url} className="client-card">
            <div className={`client-thumb${site.image ? "" : " client-thumb-empty"}`}>
              {site.image ? (
                <Image
                  src={site.image.src}
                  alt={site.image.alt}
                  fill
                  sizes="(max-width: 680px) 100vw, (max-width: 1100px) 50vw, 360px"
                />
              ) : (
                <div className="client-placeholder" aria-hidden="true">
                  <span>{displayUrl(site.url)}</span>
                </div>
              )}
            </div>
            <div className="client-body">
              <div className="client-head">
                <h3>{site.name}</h3>
                <span className="client-type">{site.type}</span>
              </div>
              {description && <p>{description}</p>}
              <div className="client-links">
                <ExternalLink href={site.url} className="project-link">
                  {displayUrl(site.url)} <span aria-hidden="true">↗</span>
                </ExternalLink>
                {site.caseStudy && (
                  <Link href={`/work/${site.caseStudy}`} className="project-link">
                    Case study <span aria-hidden="true">↗</span>
                  </Link>
                )}
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
