export interface Role {
  company: string;
  title: string;
  /** e.g. "Nov 2025 – now". */
  period: string;
  /** One to three short bullets. Use {client} to link the optional client below. */
  bullets: string[];
  /** Optional external client linked wherever a bullet contains its name. */
  client?: { name: string; url: string };
  /** Slug of a case study in projects.ts, if there is one. */
  caseStudy?: string;
}

export interface CaseStudy {
  /** URL segment for /work/[slug] and the screenshot filenames. */
  slug: string;
  title: string;
  client: string;
  /** Short label shown above the title, e.g. "Online store". */
  kind: string;
  year?: string;
  role?: string;
  url: string;
  /** One or two sentences for the page intro. */
  summary: string;
  /** The problem in the client's or user's own words. */
  quote?: { text: string; author: string };
  problem?: string;
  approach?: string;
  /** One real technical decision and the reasoning behind it. */
  decision?: { choice: string; reasoning: string };
  stack: string[];
  result?: string;
  /** Describe what each screenshot actually shows. */
  alt: { desktop: string; mobile: string };
}

export interface FeaturedProject {
  name: string;
  /** What the application does, in 25–45 words. */
  description: string;
  /** One short sentence on what Kartik implemented. */
  contribution: string;
  stack: string[];
  /** Live site or demo. Leave out when there is none. */
  demo?: string;
  /** Source code. */
  code?: string;
  /** Slug of a case study in projects.ts, if there is one. */
  caseStudy?: string;
}

export interface FreelanceSite {
  name: string;
  url: string;
}

export interface SkillGroup {
  category: string;
  /** Shown first and emphasised. */
  core?: string[];
  items: string[];
}
