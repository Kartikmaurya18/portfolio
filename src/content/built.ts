import type { BuiltItem } from "./types";

/**
 * "Things I built on the side": client sites worth a line of their own and
 * personal projects. Every other site in freelance.ts is listed in one
 * sentence under this list.
 */
export const built: BuiltItem[] = [
  {
    name: "Supriyapa",
    description:
      "An online clothing store with collections, a wishlist, a B2B page and Razorpay checkout, built with React, Vite and Tailwind CSS.",
    url: "https://supriyapa.com",
    caseStudy: "supriyapa",
  },
  {
    name: "La Taj",
    description:
      "A site for an Indian restaurant in Ieper, in Dutch, English and French, with the menu, online ordering and a table reservation form.",
    url: "https://lataj.be",
    caseStudy: "lataj",
  },
  {
    name: "Stocky",
    // TODO(real data): your resume describes client inquiries and laboratory sample bookings,
    // but the linked repo doesn't contain that code. Link the code that does, then say so here.
    description:
      "A Spring Boot, JPA/Hibernate and Angular business app based on the open-source Stocky project, which I fixed mid-migration, cleaned up and deployed to production with Docker on Railway.",
    url: "https://stocks-production-55e8.up.railway.app",
    linkLabel: "demo",
    code: "https://github.com/Kartikmaurya18/Stocks",
    // TODO(real data): this is the app's system account, which can change any user's password
    // and disable accounts. Create a view-only demo user in Stocky and put its login here instead.
    demoLogin: { username: "system_usr", password: "dummy@Pask" },
  },
  {
    name: "OptionOS",
    description:
      "A live dashboard for BTC option straddles on Delta Exchange, with a FastAPI backend streaming prices over WebSockets to a React app that keeps a day of ticks in IndexedDB.",
    url: "https://github.com/Kartikmaurya18/OptionOS",
    linkLabel: "code",
  },
  {
    name: "Bombay Lab",
    description: "A website for a metal testing lab in Mumbai.",
    url: "https://bombaylab.in",
  },
];
