import type { TimelineStep } from "./types";

/**
 * The road, in order. Steps whose title starts with "TODO:" are hidden until
 * you fill them in. Dates are the ones you gave me: write them in full.
 * Nothing here names a job title as the goal; the last step only lists what
 * is being learned.
 */
export const timeline: TimelineStep[] = [
  {
    id: "start",
    title: "TODO: how I started",
    kind: "TODO: e.g. first line of code, first project",
    period: "TODO: year",
    bullets: ["TODO: one or two honest sentences about how you started coding."],
    caseStudy: null,
  },
  {
    id: "web-maken",
    title: "Web-Maken",
    kind: "Freelance",
    period: "Jan 2025 – Jun 2025",
    bullets: [
      "Built REST API integrations for client projects, including a real-time restaurant ordering system.",
      "Automated inventory sync between e-commerce platforms through REST APIs.",
    ],
    learned: "Shipping integrations for real clients.",
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
    learned: "Production systems: SIT and UAT cycles, releases and defects.",
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
    learned: "Turning a customer's manual process into automation.",
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
