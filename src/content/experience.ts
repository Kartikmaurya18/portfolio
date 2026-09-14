import type { Role } from "./types";

/**
 * "What I've worked on". Each role renders as one paragraph that starts
 * "At COMPANY (PERIOD), …". Source: resume.
 */
export const roles: Role[] = [
  {
    company: "In-Solutions Global",
    period: "Nov 2025 – now",
    // TODO(real data): add a number, e.g. release time or deploy frequency before and after the migration.
    text: "I led the migration of PNB Genie from an Apache Struts monolith to Spring Boot microservices for its App, User, SI and Admin services. I've built more than 100 REST APIs in Java, Spring Boot and Oracle SQL with JPA/Hibernate for Punjab National Bank and Saraswat Bank, and I fix SIT and UAT defects and ship the production releases.",
  },
  {
    company: "Yumedics Labs",
    period: "Jun – Oct 2025",
    text: "I was an AI engineering intern. I built an operations dashboard that brings in invoices from Gmail and WhatsApp for a 15-person field team, so nobody types them in by hand, with role-based access and live activity tracking.",
    caseStudy: "yumedics-dashboard",
  },
];
