import type { FeaturedProject } from "./types";

/**
 * Featured projects, shown in this order. Client sites without a card here are
 * listed in one sentence under the cards (see freelance.ts).
 */
export const featured: FeaturedProject[] = [
  {
    name: "Supriyapa",
    description: "An online clothing store with collections, a wishlist, a B2B page and Razorpay checkout.",
    contribution: "Built the React storefront.",
    stack: ["React", "Vite", "Tailwind CSS", "Razorpay"],
    demo: "https://supriyapa.com",
    caseStudy: "supriyapa",
  },
  {
    name: "OptionOS",
    description:
      "A live dashboard for BTC option straddles on Delta Exchange. A FastAPI backend streams prices over WebSockets to a React app.",
    contribution: "Built the streaming backend and the dashboard.",
    stack: ["Python", "FastAPI", "WebSockets", "React"],
    code: "https://github.com/Kartikmaurya18/OptionOS",
  },
  {
    name: "Stocky",
    description:
      "A multi-store retail and inventory system with point of sale, covering stock, sales, customers, employees and reports behind role-based access.",
    contribution: "Fixed a broken migration, removed legacy code and deployed the open-source base with Docker on Railway.",
    stack: ["Java", "Spring Boot", "Angular", "Docker"],
    // TODO(real data): the Railway demo returned "Application not found" on 2026-10-17. Redeploy it,
    // then add `demo` back, with a view-only login rather than the app's system account.
    code: "https://github.com/Kartikmaurya18/Stocks",
  },
  {
    name: "Homecheff",
    description:
      "A personalised health and recipe app. It generates recipes from text or a photo with an LLM and answers questions in a chat assistant.",
    contribution: "Built the Spring Boot backend: REST APIs, JWT auth, Groq LLM integration and WebSocket chat, deployed on Render.",
    stack: ["Groq LLM API", "Java", "Spring Boot", "PostgreSQL", "React"],
    demo: "https://finalyear-ebon.vercel.app",
    code: "https://github.com/Kartikmaurya18/finalyear",
  },
];
