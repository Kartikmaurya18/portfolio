export interface Role {
  company: string;
  title: string;
  start: string;
  end: string;
  /** Aim for three, shaped "Built WHAT using STACK, which OUTCOME". */
  bullets: string[];
  stack?: string[];
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
  /** One or two sentences for the homepage and page intro. */
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

export interface FreelanceSite {
  name: string;
  url: string;
  /** Slug of a case study in projects.ts, if there is one. */
  caseStudy?: string;
}

export interface StackGroup {
  group: "Languages" | "Backend" | "Frontend" | "Data" | "Tools";
  items: string[];
}
