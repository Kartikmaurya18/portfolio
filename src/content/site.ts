import type { SkillGroup } from "./types";

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
  tagline: "Learning to ship AI where it actually runs.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://kartikm.in",
  title: "Kartik Maurya · AI and Java Backend Engineer in Mumbai",
  description:
    "Kartik Maurya builds Java and Spring Boot backends and LLM-powered apps in Mumbai, and is learning to take AI from a demo to a customer's production.",
};

/** Header links. Each href is a section id on the homepage. */
export const nav = [
  { label: "Road", href: "#road" },
  { label: "How I build", href: "#beliefs" },
  { label: "Skills", href: "#skills" },
];

export const hero = {
  eyebrow: "// Mumbai, India",
  headline: ["Learning to ship AI", "where it actually runs."],
  /** The goal date. The page counts down to it; it never names a job title. */
  deadline: { iso: "2027-12-31T23:59:59+05:30", label: "31.12.2027" },
  /** Typed out on load. Every value is real text in the HTML. */
  terminal: {
    command: "kartik --status",
    lines: [
      ["role", "Software Development Engineer"],
      ["company", "In-Solutions Global"],
      ["learning", "AI, from demo to production"],
      ["apis_built", "100+"],
      ["deadline", "31.12.2027"],
      ["location", "Mumbai, IN"],
    ] as [string, string][],
  },
};

export const skills: SkillGroup[] = [
  {
    category: "AI and LLMs",
    context: "Recipe generation and chat in Homecheff.",
    core: ["LLMs"],
    items: ["RAG", "LangGraph", "AI agents"],
  },
  {
    category: "Languages",
    context: "Java at work, Python in OptionOS.",
    core: ["Python", "Java"],
    items: ["SQL", "TypeScript"],
  },
  {
    category: "Backend and APIs",
    context: "100+ banking APIs and the Homecheff API.",
    core: ["Spring Boot", "REST APIs"],
    items: ["FastAPI", "JPA/Hibernate", "Microservices", "Spring Security", "WebSockets"],
  },
  {
    category: "Frontend",
    context: "Angular in Stocky, React in OptionOS and Supriyapa.",
    items: ["React", "Angular"],
  },
  {
    category: "Databases and Infrastructure",
    context: "Oracle at work, Docker on Railway and Render.",
    items: ["PostgreSQL", "Oracle SQL", "Docker", "Kafka", "AWS", "Git", "Maven", "Postman"],
  },
];

export const contact = {
  heading: "Building something with AI? Let's talk.",
};

export const footer = { note: "Built in Mumbai", signOff: "Built by hand." };
