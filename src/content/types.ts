export interface TimelineStep {
  /** Used for ids and keys. */
  id: string;
  title: string;
  /** Job title or kind of work, e.g. "Freelance". */
  kind: string;
  /** Written in full: "Jan 2025 – Jun 2025", "Nov 2025 – Present". */
  period: string;
  /** One to a few short bullets. Use {client} to link `client` inside a bullet. */
  bullets: string[];
  client?: { name: string; url: string };
  /** One line on what the step taught. Shown as "What it taught me". */
  learned?: string;
  /** Slug of a case study in projects.ts, or null. Every step has the field so the layout is the same. */
  caseStudy: string | null;
  /** The step opened first. */
  current?: boolean;
  /** The last step: where the road is heading. */
  goal?: boolean;
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
  /** The one shown as the large card. Only one project should set it. */
  lead?: boolean;
  /** What the application does. */
  description: string;
  /** Lead card only: the problem, in Kartik's words. */
  problem?: string;
  /** Lead card only: what was built, one line each. */
  built?: string[];
  /** Lead card only: the parts the request passes through, left to right. */
  flow?: string[];
  flowNote?: string;
  /** Lead card only: where the demo and the backend run. */
  deployment?: string;
  /** Lead card only: two to four real numbers. */
  metrics?: { value: string; label: string }[];
  /** One short sentence on what Kartik implemented. */
  contribution: string;
  stack: string[];
  /** Live site or demo. Leave out when there is none. */
  demo?: string;
  /** Source code. The repo name is shown next to the link. */
  code?: string;
  /** Slug of a case study in projects.ts, if there is one. */
  caseStudy?: string;
}

export interface FreelanceSite {
  name: string;
  url: string;
  /** Short tag, e.g. "Restaurant", "Online store", "Laboratory". */
  type: string;
  /** One line. Start with "TODO:" to hide it until it is written. */
  description?: string;
  /** A screenshot already in public/. Sites without one get a neutral tile. */
  image?: { src: string; alt: string };
  /** Slug of a case study in projects.ts, if there is one. */
  caseStudy?: string;
}

export interface SkillGroup {
  category: string;
  /** Shown first and emphasised. */
  core?: string[];
  items: string[];
}
