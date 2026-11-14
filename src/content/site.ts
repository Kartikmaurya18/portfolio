export const links = {
  email: "kartikmaurya18@gmail.com",
  github: "https://github.com/Kartikmaurya18",
  linkedin: "https://www.linkedin.com/in/kartik-maurya-0a8271259",
  resume: "/Kartik-Maurya-Resume.pdf",
};

export const resumeFileName = "Kartik-Maurya-Resume.pdf";

export const site = {
  name: "Kartik Maurya",
  /** Job title at the current employer. */
  role: "Software Development Engineer",
  company: "In-Solutions Global",
  location: "Mumbai, India",
  tagline: "A backend engineer learning to ship AI properly.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://kartikm.in",
  title: "Kartik Maurya · AI and Java Backend Engineer in Mumbai",
  description:
    "Kartik Maurya builds Java and Spring Boot backends and LLM-powered apps in Mumbai, and is learning to take AI from a demo to a customer's production.",
};

/** Header links. Each href is a section id on the homepage. */
export const nav = [
  { label: "The run", href: "#run" },
  { label: "Road", href: "#road" },
  { label: "How I work", href: "#beliefs" },
];

/**
 * The road the countdown measures. The start is the first freelance month
 * (exact day unknown, so the 1st); the deadline is the goal date.
 */
export const road = {
  start: { iso: "2025-01-01T00:00:00+05:30", label: "Jan 2025", note: "started freelancing" },
  deadline: { iso: "2027-10-31T23:59:59+05:30", label: "31.10.2027", note: "deadline" },
};

export const hero = {
  eyebrow: "Mumbai, India",
  lead: "The days I've given myself to get properly good at taking AI from a demo to real customers.",
  /** The status block next to the number. Typed out on load; every value is real text in the HTML. */
  terminal: {
    command: "kartik --status",
    lines: [
      ["role", "Software Development Engineer"],
      ["company", "In-Solutions Global"],
      ["learning", "AI, from demo to production"],
      ["apis_built", "100+"],
      ["deadline", "31.10.2027"],
      ["location", "Mumbai, IN"],
    ] as [string, string][],
  },
};


export const contact = {
  heading: "Get in touch",
  line: "If you're building something with AI, or just want to talk engineering, write to me.",
};

export const footer = { note: "Built in Mumbai" };
