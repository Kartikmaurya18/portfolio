import type { Role } from "./types";

/** Experience shown in the homepage work section. Keep it in step with the resume PDF. */
export const roles: Role[] = [
  {
    company: "In-Solutions Global",
    title: "Software Development Engineer",
    period: "Nov 2025 – now",
    client: { name: "Consumer Choice Payments", url: "https://consumerchoicepayments.com/" },
    bullets: [
      "Led the migration of PNB Genie from an Apache Struts monolith to Spring Boot microservices.",
      "Shipped 100+ REST APIs in Java, Spring Boot and Oracle SQL for core banking workflows.",
      "Building a Bharat Connect (BBPS) Customer Operating Unit for the {client} app.",
    ],
  },
  {
    company: "Yumedics Labs",
    title: "AI Engineer Intern",
    period: "Jun – Oct 2025",
    bullets: [
      "Built an operations dashboard that automates invoice intake from Gmail and WhatsApp for a 15-person field team.",
      "Added role-based access control and real-time activity tracking.",
    ],
    caseStudy: "yumedics-dashboard",
  },
];
