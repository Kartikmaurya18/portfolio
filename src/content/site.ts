import { freelance } from "./freelance";

export const links = {
  email: "kartikmaurya18@gmail.com",
  github: "https://github.com/Kartikmaurya18",
  linkedin: "https://www.linkedin.com/in/kartik-maurya-0a8271259",
  resume: "/Kartik-Maurya-Resume.pdf",
};

export const resumeFileName = "Kartik-Maurya-Resume.pdf";

export const site = {
  name: "Kartik Maurya",
  role: "Software Development Engineer",
  company: "In-Solutions Global",
  location: "Mumbai, India",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://kartikm.in",
  title: "Kartik Maurya · Software Development Engineer",
  description:
    "Software Development Engineer at In-Solutions Global, building core banking and payments services including a Bharat Connect COU. I build websites for restaurants and small businesses in Belgium and India.",
};

export const intro = {
  lead: "I'm Kartik. I build backend services for banks and payment products, and websites for restaurants and small businesses in Belgium and India.",
  body: `I'm a Software Development Engineer at In-Solutions Global in Mumbai, where I work in Java and Spring Boot on core banking and payments software. Alongside that I've built ${freelance.length} websites for clients, and I'm learning to build AI agents that call tools and work over real data.`,
};

export const builtMore = {
  before: "I've also built sites for",
  after: ", most of them restaurants in Belgium.",
};

export const now = [
  "I'm based in Mumbai, working on core banking and payments services at In-Solutions Global, including a Bharat Connect COU for Consumer Choice Payments. Next I want to build AI agents that call tools and work over real company data, so I'm learning LangGraph and retrieval-augmented generation.",
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

export const footer = { note: "Built in Mumbai" };
