import type { Role } from "./types";

/**
 * Most detailed section on the page. Bullets follow
 * "Built WHAT using STACK, which OUTCOME". Source: resume.
 */
export const experience: Role[] = [
  {
    company: "In-Solutions Global",
    title: "Software Development Engineer",
    start: "Nov 2025",
    end: "Present",
    bullets: [
      // TODO(real data): add a number, e.g. release time or deploy frequency before and after.
      "Led the migration of PNB Genie from a monolithic Apache Struts application to Spring Boot microservices for its App, User, SI and Admin services, which made each service faster to deploy and easier to maintain.",
      "Built 100+ REST APIs in Java, Spring Boot and Oracle SQL with JPA/Hibernate for Punjab National Bank and Saraswat Bank, which run core banking transaction workflows in production.",
      "Fixed SIT and UAT defects across core banking modules and shipped production releases, validating every build with Maven and Postman regression suites.",
    ],
    stack: ["Java", "Spring Boot", "Oracle SQL", "JPA/Hibernate", "Apache Struts", "Maven", "Postman"],
  },
  {
    company: "Yumedics Labs",
    title: "AI Engineer Intern",
    start: "Jun 2025",
    end: "Oct 2025",
    bullets: [
      "Built an AI-powered operations dashboard for Yumedics and Yuderma on Google Sheets and Apps Script that ingests invoices from Gmail and WhatsApp, which removed manual data entry from invoicing for a 15-person field team.",
      "Added role-based access control and real-time activity tracking, working with the founders to turn their requirements into automation workflows for the field team.",
      // TODO(real data): a third bullet with a number, e.g. invoices processed per week.
    ],
    stack: ["JavaScript", "Google Apps Script", "Google Sheets", "SheetJS", "Vercel"],
  },
];
