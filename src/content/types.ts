export interface Role {
  company: string;
  /** e.g. "Nov 2025 – now". */
  period: string;
  /** Continues the sentence "At COMPANY (PERIOD), …". */
  text: string;
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

export interface BuiltItem {
  name: string;
  /** One sentence. */
  description: string;
  url: string;
  /** Text of the outbound link. Defaults to "open". */
  linkLabel?: string;
  /** Source code, shown as a second "code" link after the main one. */
  code?: string;
  /** A login for the demo, shown publicly under the description. Use a restricted account. */
  demoLogin?: { username: string; password: string };
  /** Slug of a case study in projects.ts, if there is one. */
  caseStudy?: string;
}

export interface FreelanceSite {
  name: string;
  url: string;
}
