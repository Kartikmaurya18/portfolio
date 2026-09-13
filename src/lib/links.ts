import { agenticAI, links } from "@/content/site";

export type ContactLinkId = "github" | "linkedin" | "email";

/** Contact links with hrefs resolved. An empty href means "not provided yet". */
export const contactLinks: { id: ContactLinkId; label: string; href: string }[] = [
  { id: "github", label: "GitHub", href: links.github },
  { id: "linkedin", label: "LinkedIn", href: links.linkedin },
  { id: "email", label: "Email", href: links.email ? `mailto:${links.email}` : "" },
];

export const aiCtaHref = agenticAI.cta.href || links.github || "/#contact";
