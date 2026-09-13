import { projects } from "./projects";
import type { Experience } from "./types";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  All personal content lives in this file.
 *  Empty strings / arrays mean "not provided yet" — the UI hides or disables
 *  those elements instead of showing made-up data.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const links = {
  email: "kartikmaurya18@gmail.com",
  github: "https://github.com/Kartikmaurya18",
  linkedin: "https://www.linkedin.com/in/kartik-maurya-0a8271259",
};

export const site = {
  name: "Kartik Maurya",
  initials: "KM",
  role: "Software Engineer & AI Builder",
  tagline: "Software Engineer · AI Builder",
  title: "Kartik Maurya — Software Engineer & AI Builder",
  description:
    "Portfolio of Kartik Maurya, Software Development Engineer, full-stack developer and AI builder.",
  /** Set NEXT_PUBLIC_SITE_URL in production so Open Graph URLs are absolute. */
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),
};

export const nav = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "freelance", label: "Freelance" },
  { id: "ai", label: "AI" },
  { id: "contact", label: "Contact" },
];

export const hero = {
  badge: ["Software Engineer", "AI Builder", "Full-Stack Developer"],
  heading: { lead: "Building software, products &", accent: "intelligent systems." },
  intro:
    "I'm Kartik Maurya, a Software Development Engineer at Insolutions Global. I build production-ready applications, scalable systems and modern digital experiences — while exploring Agentic AI and intelligent automation.",
  primaryCta: { label: "View My Work", href: "/#projects" },
  secondaryCta: { label: "Let's Connect", href: "/#contact" },
  pipeline: [
    { label: "Idea", hint: "problem" },
    { label: "Code", hint: "build" },
    { label: "System", hint: "architecture" },
    { label: "Product", hint: "ship" },
    { label: "Impact", hint: "people" },
  ],
};

const websitesShipped = projects.filter((p) => p.categories.includes("web")).length;

export const stats = [
  { value: `${websitesShipped}+`, label: "Websites Shipped" },
  { value: "SDE", label: "Insolutions Global" },
  { value: "Full-Stack", label: "Development" },
  { value: "AI", label: "Agentic AI Exploration" },
];

export const about = {
  title: "A little about me",
  lede: "I build software that solves real problems.",
  /** Wrap words in **double asterisks** to emphasise them. */
  paragraphs: [
    "I'm a Software Development Engineer who enjoys turning ideas into working products.",
    "My experience spans software engineering, full-stack development, backend systems, web applications and freelance product development.",
    "Alongside my professional work, I have built and delivered multiple websites for businesses, particularly restaurants and local businesses in **Belgium and India**.",
    "Currently, I'm also exploring **Agentic AI** — building systems where AI can reason, use tools, interact with external systems and accomplish multi-step tasks.",
  ],
  process: [
    { title: "Learn", text: "Understand the problem, the people and the constraints." },
    { title: "Build", text: "Turn the idea into working, maintainable software." },
    { title: "Ship", text: "Get it into production, in front of real people." },
    { title: "Improve", text: "Listen, refine and make the next version better." },
  ],
};

export const experience: Experience[] = [
  {
    company: "Insolutions Global",
    role: "Software Development Engineer",
    current: true,
    period: "",
    location: "",
    url: "",
    summary:
      "Working as a Software Development Engineer, building software systems and working across application development, backend engineering and modern technologies.",
    highlights: [],
    stack: [],
  },
  {
    company: "Freelance",
    role: "Web Developer",
    period: "",
    summary:
      "Building and delivering websites for businesses — particularly restaurants and local businesses in Belgium and India.",
    highlights: [],
    stack: [],
    link: { label: "See client work", href: "/#freelance" },
  },
];

export const agenticAI = {
  title: "Exploring Agentic AI",
  subtitle: "Building systems where AI doesn't just answer — it acts.",
  intro:
    "I'm currently exploring Agentic AI and intelligent systems: how an agent can take a goal, reason about it, call tools, work with real APIs and data, and carry a task through to a result.",
  /** The interactive flow. `trace` lines form an illustrative example run. */
  stages: [
    {
      id: "goal",
      title: "User Goal",
      text: "A person describes the outcome they want — not the steps to get there.",
      tags: ["Natural language"],
      trace: 'goal     "Summarise this week\'s open support tickets"',
    },
    {
      id: "agent",
      title: "AI Agent",
      text: "An LLM-powered agent takes ownership of the goal, keeping context and memory as it works.",
      tags: ["LLMs", "Memory"],
      trace: "agent    context loaded · memory attached",
    },
    {
      id: "reasoning",
      title: "Reasoning",
      text: "It breaks the goal into steps, decides what information it needs and plans the next move.",
      tags: ["Multi-step workflows", "Orchestration"],
      trace: "plan     fetch tickets → group by topic → summarise",
    },
    {
      id: "tools",
      title: "Tools",
      text: "Instead of guessing, it calls tools — functions with clear inputs and structured outputs.",
      tags: ["Tool Calling"],
      trace: 'tool     tickets.list({ status: "open" })',
    },
    {
      id: "systems",
      title: "APIs / Databases / Systems",
      text: "Tools reach real systems: APIs, databases and knowledge sources the agent can retrieve from.",
      tags: ["APIs", "RAG"],
      nodes: ["APIs", "Databases", "Systems"],
      trace: "fetch    api ✓   db ✓   retrieve docs ✓",
    },
    {
      id: "action",
      title: "Action",
      text: "The agent acts on what it learned, observes the outcome and iterates if something is missing.",
      tags: ["Autonomous task execution"],
      trace: "act      group · summarise · draft report",
    },
    {
      id: "result",
      title: "Result",
      text: "The goal is completed and handed back — ready for a person to review.",
      tags: ["Automation"],
      trace: "done     summary ready for review ✓",
    },
  ],
  concepts: [
    { title: "AI Agents", text: "Systems that pursue a goal, not just a prompt." },
    { title: "Tool Calling", text: "Letting models invoke functions with structured inputs." },
    { title: "Multi-step Workflows", text: "Breaking a goal into steps and executing them in order." },
    { title: "Autonomous Execution", text: "Carrying a task forward with minimal hand-holding." },
    { title: "RAG", text: "Grounding responses in retrieved, relevant data." },
    { title: "LLMs", text: "The reasoning engine underneath it all." },
    { title: "APIs", text: "How agents reach and act on real systems." },
    { title: "Memory", text: "Keeping context across steps and sessions." },
    { title: "Orchestration", text: "Coordinating models, tools and agents together." },
    { title: "Automation", text: "Turning repeatable work into reliable flows." },
  ],
  /** Leave empty to fall back to your GitHub profile, then to the contact section. */
  cta: { label: "Explore what I'm building", href: "" },
};

export const skills = [
  {
    title: "Software Engineering",
    icon: "server",
    items: ["Backend Development", "API Development", "System Design", "Database Design", "Distributed Systems"],
  },
  {
    title: "Web Development",
    icon: "browser",
    items: ["Frontend", "Full-Stack Applications", "Responsive Web Development"],
  },
  {
    title: "AI",
    icon: "spark",
    note: "Exploring",
    items: ["Generative AI", "Agentic AI", "LLM Applications", "AI Agents", "Tool Calling", "RAG"],
  },
] as const;

export const principles = [
  { title: "Build for the user", text: "Technology is useful only when it solves a real problem." },
  { title: "Keep it simple", text: "Good engineering is often about removing unnecessary complexity." },
  { title: "Ship", text: "A working product teaches more than a perfect idea." },
  { title: "Keep learning", text: "Technology changes constantly. Curiosity is part of the job." },
];

export const githubActivity = {
  /** Rendered only when links.github is set and GitHub responds — never with fake data. */
  enabled: true,
  /** Repository names to feature, e.g. ["my-agent"]. Empty = most-starred public repos. */
  featuredRepos: [] as string[],
};

export const contact = {
  heading: "Have an idea worth building?",
  text: "Whether it's a product, website, software system or an AI-powered workflow, let's talk.",
};

export const footer = {
  note: "Built with curiosity and too much coffee.",
};
