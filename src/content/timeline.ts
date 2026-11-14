import type { TimelineStep } from "./types";

/**
 * How I got here, in order: freelance, then Spring Boot and backend work, then
 * production, then AI. Keep each step to one short point and one short key
 * learning. The learnings are drafts: rewrite them in your own words.
 * Anything starting with "TODO:" stays hidden until you fill it in.
 */
export const timeline: TimelineStep[] = [
  {
    id: "freelance",
    title: "Freelance at Web-Maken",
    kind: "Freelance",
    period: "Jan 2025 – Jun 2025",
    bullets: [
      "Built 12 websites and API integrations for restaurants and local businesses.",
    ],
    learnings: [
      "Shipping for real clients, on their deadline.",
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
      "Taught myself Java and Spring Boot by building REST backends.",
    ],
    learnings: [
      "How APIs, data and auth fit together.",
    ],
    caseStudy: null,
  },
  {
    id: "in-solutions",
    title: "In-Solutions Global",
    kind: "Software Development Engineer",
    period: "Nov 2025 – Present",
    current: true,
    bullets: [
      "Managing and handling the complete PNB Genie application.",
    ],
    learnings: [
      "Production is different from projects.",
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
      "Built a dashboard that automates invoice intake for a 15-person team.",
    ],
    learnings: [
      "Build around the process the team actually runs.",
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
    period: "By 31 Oct 2027",
    goal: true,
    bullets: [
      "Taking AI from a demo to a customer's production.",
    ],
    caseStudy: null,
  },
];
