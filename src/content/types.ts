export type ProjectCategory = "web" | "full-stack" | "dashboard" | "freelance" | "ai";

export interface CaseStudy {
  /** What was built. */
  overview?: string;
  /** What problem the project solved. */
  problem?: string;
  /** How it was approached. */
  solution?: string;
  /** Important technical decisions. */
  development?: string;
  /** Outcome. */
  result?: string;
}

export interface Project {
  /** URL-safe id. Used for /projects/[slug] and preview image filenames. */
  slug: string;
  name: string;
  /** Live website. */
  url: string;
  categories: ProjectCategory[];
  /** Large card in "Things I've built". */
  featured?: boolean;
  /** Large card at the top of "Freelance & Client Work". */
  spotlight?: boolean;
  /** One or two sentences. Leave undefined until written — the UI adapts. */
  description?: string;
  /** Technologies used. Leave empty until confirmed. */
  stack?: string[];
  /** Repository URL, if public. */
  github?: string;
  year?: string;
  /** When any field is filled, the case study page renders it. */
  caseStudy?: CaseStudy;
  /**
   * Override the auto-captured previews with your own screenshots,
   * e.g. { desktop: "/projects/my-shot.webp" }. Any aspect ratio works.
   */
  images?: { desktop?: string; mobile?: string };
}

export interface Experience {
  company: string;
  role: string;
  current?: boolean;
  /** e.g. "2024 — Present". Omitted from the UI when empty. */
  period?: string;
  location?: string;
  url?: string;
  summary: string;
  /** Bullet points. Omitted from the UI when empty. */
  highlights?: string[];
  stack?: string[];
  link?: { label: string; href: string };
}
