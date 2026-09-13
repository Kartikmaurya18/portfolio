import { Download, GitHub, LinkedIn, Mail } from "@/components/icons";
import { links } from "@/content/site";
import { contactLinks, type ContactLinkId } from "@/lib/links";
import { cn } from "@/lib/utils";

const icons: Record<ContactLinkId, typeof GitHub> = { github: GitHub, linkedin: LinkedIn, email: Mail };

export function SocialLinks({ className }: { className?: string }) {
  return (
    <ul className={cn("flex flex-wrap items-center gap-x-6 gap-y-3 text-sm", className)}>
      {contactLinks.map(({ id, label, href }) => {
        const Icon = icons[id];
        const inner = (
          <>
            <Icon className="size-4" />
            {label}
          </>
        );
        return (
          <li key={id}>
            {href ? (
              <a
                href={href}
                className="inline-flex items-center gap-2 text-muted transition-colors hover:text-fg"
                {...(id !== "email" && { target: "_blank", rel: "noopener noreferrer" })}
              >
                {inner}
              </a>
            ) : (
              <span
                aria-disabled="true"
                title={`${label} link coming soon`}
                className="inline-flex cursor-default items-center gap-2 text-subtle/60"
              >
                {inner}
              </span>
            )}
          </li>
        );
      })}
      {links.resume && (
        <li>
          <a
            href={links.resume}
            download="Kartik-Maurya-Resume.pdf"
            className="inline-flex items-center gap-2 text-muted transition-colors hover:text-fg"
          >
            <Download className="size-4" />
            Resume
          </a>
        </li>
      )}
    </ul>
  );
}
