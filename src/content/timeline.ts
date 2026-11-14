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
      "A client doesn't care how it's built. They care that orders and stock stay correct.",
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
      "A backend is mostly data and security. The endpoints are the easy part.",
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
      "In a bank, 'it works on my machine' means nothing. It has to pass SIT and UAT.",
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
      "Automate the process a team really follows, not the one they describe.",
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
      "Scaling applications: system design, load and reliability.",
    ],
    caseStudy: null,
  },
];
