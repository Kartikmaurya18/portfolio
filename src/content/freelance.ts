import type { FreelanceSite } from "./types";

/**
 * Every client website. Names are taken from each live site's own title
 * (checked Sep 2026, links re-checked Oct 2026). Sites that are featured in
 * built.ts get a card on the homepage; the rest are listed in one sentence
 * below the cards.
 */
export const freelance: FreelanceSite[] = [
  { name: "Supriyapa", url: "https://supriyapa.com" },
  { name: "Bombay Lab", url: "https://bombaylab.in" },
  { name: "Aahaar Delux", url: "https://aahaar.com" },
  { name: "Shaan Tandoori", url: "https://shaantandoori.be" },
  { name: "La Taj", url: "https://lataj.be" },
  { name: "Nora Indian", url: "https://noraindian.com" },
  { name: "Nani Antwerp", url: "https://naniantwerp.be" },
  { name: "Indian Curry House", url: "https://indiancurryhouse.be" },
  { name: "In Dish", url: "https://indish.be" },
  // Le Soleil (le-soleil.be) removed Oct 2026: the domain no longer resolves. Re-add it with the right URL.
  { name: "Frango D'Ouro", url: "https://frangodouro.be" },
  { name: "Taste of Tandoori", url: "https://tastetandoori.be" },
  { name: "India Taste", url: "https://indiataste.be" },
];
