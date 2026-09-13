import type { StackGroup } from "./types";

/**
 * Named technologies only. Sources: resume skills, the OptionOS repository
 * (TypeScript) and the Supriyapa build (Vite, Tailwind CSS).
 */
export const stack: StackGroup[] = [
  { group: "Languages", items: ["Java", "Python", "JavaScript", "TypeScript", "SQL"] },
  {
    group: "Backend",
    items: ["Spring Boot", "JPA/Hibernate", "FastAPI", "Django", "Node.js", "Apache Struts", "REST APIs", "WebSockets"],
  },
  { group: "Frontend", items: ["React", "Vite", "Tailwind CSS", "HTML", "CSS"] },
  // TODO(real data): Qdrant and Kafka come from the resume, but no public repo shows them yet.
  { group: "Data", items: ["Oracle SQL", "PostgreSQL", "Redis", "Apache Kafka", "Qdrant", "IndexedDB"] },
  { group: "Tools", items: ["Docker", "Jenkins", "AWS", "Git", "Maven", "Postman", "nginx", "LangGraph"] },
];
