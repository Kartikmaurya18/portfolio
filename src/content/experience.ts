import type { Role } from "./types";

/** Experience shown in the homepage work section. */
export const roles: Role[] = [
  {
    company: "In-Solutions Global",
    period: "Nov 2025 – now",
    client: "https://consumerchoicepayments.com/",
    text: "I'm building a Customer Operating Unit (COU) on Bharat Connect, the NPCI bill payment network formerly known as BBPS, for Consumer Choice Payments, the company's own prepaid and UPI payments app. The COU is the part customers actually use: they find a biller, fetch their bill and pay it from inside the app, and the payment runs through the national network.",
    details: ["On the banking side, I led the migration of PNB Genie from an Apache Struts monolith to Spring Boot microservices for its App, User, SI and Admin services. I've built more than 100 REST APIs in Java, Spring Boot and Oracle SQL with JPA/Hibernate for Punjab National Bank and Saraswat Bank, and I fix SIT and UAT defects and ship the production releases."],
  },
  {
    company: "Yumedics Labs",
    period: "Jun – Oct 2025",
    text: "I was an AI engineering intern. I built an operations dashboard that brings in invoices from Gmail and WhatsApp for a 15-person field team, so nobody types them in by hand, with role-based access and live activity tracking.",
    caseStudy: "yumedics-dashboard",
  },
];
