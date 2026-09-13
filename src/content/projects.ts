import type { CaseStudy } from "./types";

/**
 * Selected work: three case studies, each with a page at /work/[slug].
 *
 * Stack and approach for the client sites were read from the live sites
 * (bundles, headers, forms) in Sep 2026. Fields left undefined are not
 * rendered. Every TODO needs real data from you.
 *
 * Screenshots: `npm run previews` (see scripts/capture-previews.mjs).
 */
export const projects: CaseStudy[] = [
  {
    slug: "yumedics-dashboard",
    title: "Yumedics Command Center",
    client: "Yumedics and Yuderma",
    kind: "Operations dashboard",
    year: "2025",
    role: "AI Engineer Intern, Yumedics Labs",
    url: "https://yumedics-dashboard.vercel.app",
    summary:
      "An operations dashboard for a 15-person field team that brings in invoices from Gmail and WhatsApp, so nobody retypes them.",
    // TODO(real data): the problem in the founders' own words, e.g. { text: "…", author: "Name, role" }.
    quote: undefined,
    problem: "Invoices reached the field team through Gmail and WhatsApp, and each one had to be entered by hand.",
    approach:
      "I built the dashboard as a web app on Vercel that uses Google Sheets as its data store through a Google Apps Script endpoint, with SheetJS for Excel files. Role-based access control limits what each person can see, and activity is tracked in real time.",
    // TODO(real data): one decision and why, e.g. why Google Sheets and Apps Script instead of a database.
    decision: undefined,
    stack: ["JavaScript", "HTML", "CSS", "Google Apps Script", "Google Sheets", "SheetJS", "Vercel"],
    // TODO(real data): add a number, e.g. invoices processed per week or hours saved.
    result: "Manual data entry is gone from the invoicing workflow.",
    alt: {
      desktop:
        "Yumedics Command Center on desktop: a stock overview synced live from Google Sheets, with summary counts above a list of products and their stock levels.",
      mobile: "Yumedics Command Center on a phone: the same stock summary and product list with a bottom tab bar.",
    },
  },
  {
    slug: "supriyapa",
    title: "Supriyapa",
    client: "Supriyapa",
    kind: "Online clothing store",
    // TODO(real data): launch year.
    url: "https://supriyapa.com",
    summary: "An online clothing store with product collections, a wishlist, a B2B page and payments through Razorpay.",
    // TODO(real data): the client's problem in their words.
    approach:
      "The storefront is a React single-page app built with Vite and Tailwind CSS. It loads products from the store's own REST API, hands checkout to Razorpay, and is served by nginx on an Ubuntu server.",
    // TODO(real data): one decision and why, plus the backend language and database.
    stack: ["React", "Vite", "Tailwind CSS", "Axios", "REST API", "Razorpay", "nginx", "Ubuntu"],
    // TODO(real data): result, e.g. orders in the first month.
    alt: {
      desktop:
        "Supriyapa homepage on desktop: navigation for the collection, wishlist, about and B2B pages, and a featured t-shirt with a Shop Now button and its price in rupees.",
      mobile: "Supriyapa on a phone: the featured t-shirt slide above the latest collection.",
    },
  },
  {
    slug: "lataj",
    title: "La Taj",
    client: "La Taj, Indian restaurant in Ieper",
    kind: "Restaurant website",
    // TODO(real data): launch year.
    url: "https://lataj.be",
    summary: "A restaurant site in Dutch, English and French with the menu, an online ordering page and a table reservation form.",
    // TODO(real data): the owner's problem in their words.
    approach:
      "Pages are rendered on the server in Dutch, English and French, and hreflang tags point search engines to the right language for each visitor. The reservation form asks for name, phone, email, date, time and party size, and posts to the server with a CSRF token. Google Analytics 4 tracks visits.",
    // TODO(real data): one decision and why, plus the backend language.
    stack: ["Server-rendered HTML", "nginx", "Google Analytics 4"],
    // TODO(real data): result, e.g. reservations per week through the form.
    alt: {
      desktop:
        "La Taj homepage on desktop, in Dutch: the headline 'Een vleugje India in het hart van Ieper' over a spread of Indian dishes, with buttons to reserve a table, open the menu and order online.",
      mobile: "La Taj on a phone: call, reservation and order buttons above the opening hours and address.",
    },
  },
];
