import type { TimelineStep } from "./types";

/**
 * How I got here, in order: freelance, then Spring Boot and backend work, then
 * production, then AI. Each step carries its key learnings. The learnings are
 * drafts written from the facts in each step: rewrite them in your own words.
 * Anything starting with "TODO:" stays hidden until you fill it in.
 */
export const timeline: TimelineStep[] = [
  {
    id: "freelance",
    title: "Freelance at Web-Maken",
    kind: "Freelance",
    period: "Jan 2025 – Jun 2025",
    bullets: [
      "Built 12 websites for restaurants and local businesses in Belgium and India.",
      "Wrote REST API integrations, including a real-time restaurant ordering system and inventory sync between e-commerce platforms.",
    ],
    learnings: [
      "Turning a client's request into something live, on their deadline.",
      "The website is the easy part; ordering and inventory had to stay in sync behind it.",
    ],
    caseStudy: null,
  },
  {
    id: "backend",
    title: "Finding the backend",
    kind: "Java and Spring Boot",
    // From the dates of the Java repos on GitHub (fsdbackend, jwtsecurity, microservice).
    period: "2025",
    bullets: [
      "Taught myself Java and Spring Boot by building REST backends, JWT security and small microservices.",
    ],
    learnings: [
      "How APIs, data models and authentication fit together.",
      "Splitting one app into services, and what that costs.",
    ],
    caseStudy: null,
  },
  {
    id: "in-solutions",
    title: "In-Solutions Global",
    kind: "Software Development Engineer",
    period: "Nov 2025 – Present",
    current: true,
    client: { name: "Consumer Choice Payments", url: "https://consumerchoicepayments.com/" },
    bullets: [
      "Led the migration of PNB Genie from an Apache Struts monolith to Spring Boot microservices.",
      "Shipped 100+ REST APIs in Java, Spring Boot and Oracle SQL for core banking workflows.",
      "Building a Bharat Connect (BBPS) Customer Operating Unit for the {client} app.",
    ],
    learnings: [
      "Production is different: SIT and UAT cycles, releases and fixing defects.",
      "Moving a legacy system to services one piece at a time.",
    ],
    caseStudy: null,
  },
  {
    id: "yumedics",
    title: "Yumedics and Yuderma",
    kind: "AI Engineer Intern",
    // Dates as given by Kartik on 2026-11-13. The resume PDF still says Jun – Oct 2025.
    period: "Apr 2026 – May 2026",
    bullets: [
      "Built an operations dashboard that automates invoice intake from Gmail and WhatsApp for a 15-person field team.",
      "Added role-based access control and real-time activity tracking.",
      "TODO: what triggered the move into AI (one sentence, your words).",
    ],
    learnings: [
      "Sitting with a customer's team and automating the process they actually run.",
      "Working straight with founders, from their problem to a tool in daily use.",
    ],
    caseStudy: "yumedics-dashboard",
  },
  {
    id: "setback",
    title: "TODO: one honest setback or lesson",
    kind: "TODO: what went wrong",
    period: "TODO: when",
    bullets: ["TODO: what happened and what you changed afterwards."],
    caseStudy: null,
  },
  {
    id: "next",
    title: "What I'm learning next",
    kind: "Where I'm headed",
    period: "By 31 Dec 2027",
    goal: true,
    bullets: [
      "Scoping a problem with a customer, not just building the solution.",
      "Connecting LLM apps to messy real systems: APIs, SQL databases and authentication.",
      "Evaluating LLM apps before they ship.",
      "Deploying, monitoring and supporting them in production.",
      "Writing up the results with real numbers.",
    ],
    caseStudy: null,
  },
];
