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

export const nav = [
  { id: "experience", label: "Experience" },
  { id: "work", label: "Work" },
  { id: "freelance", label: "Freelance" },
  { id: "stack", label: "Stack" },
  { id: "contact", label: "Contact" },
];

export const hero = {
  /** One sentence on what you build. */
  summary:
    "I build Spring Boot services for Punjab National Bank and Saraswat Bank, and websites for restaurants and local businesses in Belgium and India.",
  since: "Nov 2025",
  /** TODO(real data): a real photo of you, e.g. "/kartik.webp" (portrait, at least 480×600). Empty hides it. */
  photo: "",
};

/** Three sentences at most. */
export const about = [
  "At In-Solutions Global I work on core banking software, and I led the migration of PNB Genie from an Apache Struts monolith to Spring Boot microservices.",
  `Outside that job I have shipped ${freelance.length} websites, many of them for Indian restaurants in Belgium, including table reservations for La Taj and a Razorpay checkout for Supriyapa's online store.`,
  "Next I want to build AI agents that call tools and work over real company data, so I'm learning LangGraph and retrieval-augmented generation.",
];

export const freelanceIntro =
  "Alongside my job I build websites for small businesses, mostly restaurants in Belgium, plus a metal testing lab in Mumbai and an online clothing store in India. Each name links to the site.";

export const contact = {
  line: "Hiring for a backend role, or need a website for your business? Email me.",
};

export const footer = {
  /** TODO(real data): a short note in your own words. Empty hides it. */
  note: "",
};
