import type { FeaturedProject } from "./types";

/**
 * Projects, in the order shown. The one marked `lead` gets the large card; the
 * rest are small cards in this order. Fields starting with "TODO:" are hidden
 * until you fill them in.
 */
export const featured: FeaturedProject[] = [
  {
    name: "Homecheff",
    lead: true,
    description:
      "A personalised health and recipe app. It generates recipes from text or a photo with an LLM and answers questions in a chat assistant.",
    problem: "TODO: the problem Homecheff solves, in your words (who is it for, what was hard before?).",
    built: [
      "A Spring Boot REST API for recipes, favourites, history, profiles, health and wearable data.",
      "JWT sign-in with Spring Security, so each user's data stays their own.",
      "Recipe generation from text or a photo through the Groq LLM API.",
      "A WebSocket chat assistant with a simple keyword-based retrieval step.",
    ],
    flow: ["React app (Vercel)", "Spring Boot API (Render)", "PostgreSQL"],
    flowNote: "Groq generates recipes and chat replies. Chat runs over a WebSocket.",
    deployment:
      "The live demo is the React frontend on Vercel. It calls the Spring Boot API, which is deployed separately on Render with PostgreSQL.",
    metrics: [
      { value: "TODO: a real number", label: "TODO: what it counts" },
      { value: "TODO: a real number", label: "TODO: what it counts" },
    ],
    contribution: "Built the Spring Boot backend: REST APIs, JWT auth, Groq LLM integration and WebSocket chat, deployed on Render.",
    stack: ["Groq LLM API", "Java", "Spring Boot", "PostgreSQL", "React"],
    demo: "https://finalyear-ebon.vercel.app",
    code: "https://github.com/Kartikmaurya18/finalyear",
  },
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
    // The GitHub repo is called "Stocks"; the card shows that name next to the source link.
    code: "https://github.com/Kartikmaurya18/Stocks",
  },
];
