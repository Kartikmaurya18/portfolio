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
  tagline: "AI Engineer · LLM products and Java backends",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://kartikm.in",
  title: "Kartik Maurya · AI Engineer, LLM Products and Java Backends",
  description:
    "Kartik Maurya is an AI Engineer in Mumbai building LLM-powered products on a Java and Spring Boot backend foundation.",
};

export const hero = {
  eyebrow: "AI Engineer · Mumbai, India",
  /** Plain text, then the part set in the accent colour. */
  headline: ["I build AI products that", "solve real problems."],
  body: "LLM-powered apps on a solid Java and Spring Boot backend foundation.",
};

export const about =
  "I'm an AI engineer with a backend foundation. At In-Solutions Global I build Java and Spring Boot banking services; on my own I build LLM-powered products and am learning RAG and agents.";

export const clientSites = {
  before: "Client websites:",
  after: ".",
};

export const skills: SkillGroup[] = [
  {
    category: "AI and LLMs",
    core: ["LLMs"],
    items: ["RAG", "LangGraph", "AI agents"],
  },
  {
    category: "Languages",
    core: ["Python", "Java"],
    items: ["SQL", "TypeScript"],
  },
  {
    category: "Backend and APIs",
    core: ["Spring Boot", "REST APIs"],
    items: ["FastAPI", "JPA/Hibernate", "Microservices", "Spring Security", "WebSockets"],
  },
  {
    category: "Frontend",
    items: ["React", "Angular"],
  },
  {
    category: "Databases and Infrastructure",
    items: ["PostgreSQL", "Oracle SQL", "Docker", "Kafka", "AWS", "Git", "Maven", "Postman"],
  },
];

export const contact = {
  heading: "Have a project or engineering opportunity?",
  line: "Let's connect.",
};

export const footer = { note: "Built in Mumbai" };
