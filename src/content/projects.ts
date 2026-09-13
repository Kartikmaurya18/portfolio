import type { Project, ProjectCategory } from "./types";

/**
 * Project database.
 *
 * To add a project: append an entry, then run `npm run previews -- <slug>`
 * to capture its screenshots (or set `images` to your own).
 *
 * Fields you haven't written yet (description, stack, caseStudy) can stay
 * undefined — cards and case study pages hide or label them honestly.
 */
export const projects: Project[] = [
  {
    slug: "supriyapa",
    name: "Supriyapa",
    url: "https://supriyapa.com",
    categories: ["web", "freelance"],
    featured: true,
  },
  {
    slug: "bombay-lab",
    name: "Bombay Lab",
    url: "https://bombaylab.in",
    categories: ["web", "freelance"],
  },
  {
    slug: "yumedics-dashboard",
    name: "YuMedics Dashboard",
    url: "https://yumedics-dashboard.vercel.app",
    categories: ["dashboard", "web", "freelance"],
    featured: true,
  },
  {
    slug: "aahaar",
    name: "Aahaar",
    url: "https://aahaar.com",
    categories: ["web", "freelance"],
    spotlight: true,
  },
  {
    slug: "cooking-lunch",
    name: "Cooking Lunch",
    url: "https://cookinglunch.be",
    categories: ["web", "freelance"],
  },
  {
    slug: "shaant-andoori",
    name: "Shaant Andoori",
    url: "https://shaantandoori.be",
    categories: ["web", "freelance"],
    spotlight: true,
  },
  {
    slug: "lataj",
    name: "Lataj",
    url: "https://lataj.be",
    categories: ["web", "freelance"],
    featured: true,
  },
  {
    slug: "nora-indian",
    name: "Nora Indian",
    url: "https://noraindian.com",
    categories: ["web", "freelance"],
  },
  {
    slug: "nani-antwerp",
    name: "Nani Antwerp",
    url: "https://naniantwerp.be",
    categories: ["web", "freelance"],
  },
  {
    slug: "indian-curry-house",
    name: "Indian Curry House",
    url: "https://indiancurryhouse.be",
    categories: ["web", "freelance"],
  },
  {
    slug: "indish",
    name: "Indish",
    url: "https://indish.be",
    categories: ["web", "freelance"],
  },
  {
    slug: "le-soleil",
    name: "Le Soleil",
    url: "https://le-soleil.be",
    categories: ["web", "freelance"],
  },
  {
    slug: "frango-douro",
    name: "Frango D'Ouro",
    url: "https://frangodouro.be",
    categories: ["web", "freelance"],
    spotlight: true,
  },
  {
    slug: "taste-tandoori",
    name: "Taste Tandoori",
    url: "https://tastetandoori.be",
    categories: ["web", "freelance"],
  },
  {
    slug: "india-taste",
    name: "India Taste",
    url: "https://indiataste.be",
    categories: ["web", "freelance"],
  },
];

export const categoryFilters: { id: ProjectCategory | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "web", label: "Web Development" },
  { id: "full-stack", label: "Full-Stack" },
  { id: "dashboard", label: "Dashboard" },
  { id: "freelance", label: "Freelance" },
  { id: "ai", label: "AI" },
];
