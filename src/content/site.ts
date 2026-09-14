import { freelance } from "./freelance";

export const links = {
  email: "kartikmaurya18@gmail.com",
  github: "https://github.com/Kartikmaurya18",
  linkedin: "https://www.linkedin.com/in/kartik-maurya-0a8271259",
  /** PDF in /public. Replace the file to update the resume. */
  resume: "/Kartik-Maurya-Resume.pdf",
};

export const resumeFileName = "Kartik-Maurya-Resume.pdf";

export const site = {
  name: "Kartik Maurya",
  role: "Software Development Engineer",
  company: "In-Solutions Global",
  location: "Mumbai, India",
  /** Set NEXT_PUBLIC_SITE_URL to override, e.g. for a preview deployment. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://kartikm.in",
  title: "Kartik Maurya · Software Development Engineer",
  description:
    "Software Development Engineer at In-Solutions Global. I build Spring Boot services for Punjab National Bank and Saraswat Bank, and websites for restaurants and local businesses in Belgium and India.",
};

/*
 * Homepage copy, top to bottom. Roles are in experience.ts and projects in
 * built.ts. Drafts written from the resume are marked TODO(real data):
 * rewrite those in your own words.
 */

export const intro = {
  /** The opening sentence, shown larger. It is the page's h1. */
  lead: "I'm Kartik. I build backend services for banks, and websites for restaurants and small businesses in Belgium and India.",
  body: `I'm a Software Development Engineer at In-Solutions Global in Mumbai, where I work in Java and Spring Boot on core banking software. Alongside that I've built ${freelance.length} websites for clients, and I'm learning to build AI agents that call tools and work over real data.`,
};

// TODO(real data): how you actually got into software, in your own words.
export const howIGotHere = [
  "I studied Information Technology at TCET, University of Mumbai, and learned most of what I know by building things: Django and MERN projects first, then websites for real clients.",
  "After that I picked up whatever the next job needed: Google Apps Script for an operations dashboard, React and Tailwind CSS for client sites, and Spring Boot and Oracle SQL for banking software.",
];

/** The sentence under "Things I built", around the list of remaining client sites. */
export const builtMore = {
  before: "I've also built sites for",
  after: ", most of them restaurants in Belgium.",
};

export const now = [
  "I'm based in Mumbai, working on core banking services at In-Solutions Global. Next I want to build AI agents that call tools and work over real company data, so I'm learning LangGraph and retrieval-augmented generation.",
];

export const elsewhere = [
  { label: "Resume", href: links.resume, detail: "PDF", download: true },
  { label: "GitHub", href: links.github, detail: "code" },
  { label: "LinkedIn", href: links.linkedin, detail: "work history" },
];

export const contact = {
  line: "If you're hiring for a backend role or need a website for your business, email me at",
  signOff: "Kartik",
};

export const footer = {
  note: "Built in Mumbai",
};
