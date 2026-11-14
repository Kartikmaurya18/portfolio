import type { FreelanceSite } from "./types";

/**
 * Every client website. Names come from each live site's own title (checked
 * Sep 2026, links re-checked Nov 2026). The type tags and the few one-line
 * descriptions below come from those titles or from copy already on this site.
 * Descriptions starting with "TODO:" are hidden until you write them.
 * `image` is a screenshot already in public/projects (no hotlinking).
 */
export const freelance: FreelanceSite[] = [
  {
    name: "Supriyapa",
    url: "https://supriyapa.com",
    type: "Online store",
    description: "Online clothing store with collections, a wishlist, a B2B page and Razorpay checkout.",
    image: { src: "/projects/supriyapa-desktop.webp", alt: "Supriyapa homepage with a featured t-shirt" },
    caseStudy: "supriyapa",
  },
  {
    name: "Bombay Lab",
    url: "https://bombaylab.in",
    type: "Laboratory",
    description: "Website for an XRF metal testing lab in Mumbai.",
  },
  { name: "Aahaar Delux", url: "https://aahaar.com", type: "Restaurant", description: "TODO: one line about this site." },
  {
    name: "Shaan Tandoori",
    url: "https://shaantandoori.be",
    type: "Restaurant",
    description: "Website for an Indian restaurant in Roeselare, Belgium.",
  },
  {
    name: "La Taj",
    url: "https://lataj.be",
    type: "Restaurant",
    description: "Dutch, English and French site with the menu, online ordering and table reservations.",
    image: { src: "/projects/lataj-desktop.webp", alt: "La Taj homepage over a spread of Indian dishes" },
    caseStudy: "lataj",
  },
  {
    name: "Nora Indian",
    url: "https://noraindian.com",
    type: "Restaurant",
    description: "Website for an Indian restaurant in Antwerp.",
  },
  { name: "Nani Antwerp", url: "https://naniantwerp.be", type: "Restaurant", description: "TODO: one line about this site." },
  {
    name: "Indian Curry House",
    url: "https://indiancurryhouse.be",
    type: "Restaurant",
    description: "Website for an Indian restaurant in Gent.",
  },
  { name: "In Dish", url: "https://indish.be", type: "Restaurant", description: "TODO: one line about this site." },
  { name: "Frango D'Ouro", url: "https://frangodouro.be", type: "Restaurant", description: "TODO: one line about this site." },
  { name: "Taste of Tandoori", url: "https://tastetandoori.be", type: "Restaurant", description: "TODO: one line about this site." },
  { name: "India Taste", url: "https://indiataste.be", type: "Restaurant", description: "TODO: one line about this site." },
  // Cooking Lunch removed at Kartik's request. Le Soleil (le-soleil.be) removed Oct 2026: the domain no longer resolves.
];
