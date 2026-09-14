import type { FreelanceSite } from "./types";

/**
 * Every client website. Names are taken from each live site's own title
 * (checked Sep 2026). Sites that also appear in built.ts get their own line on
 * the homepage; the rest are listed in one sentence below them.
 */
export const freelance: FreelanceSite[] = [
  { name: "Supriyapa", url: "https://supriyapa.com" },
  { name: "Bombay Lab", url: "https://bombaylab.in" },
  { name: "Aahaar Delux", url: "https://aahaar.com" },
  // TODO(real data): the live site still shows "Lorem ipsum" placeholder text.
  { name: "Cooking Lunch", url: "https://cookinglunch.be" },
  { name: "Shaan Tandoori", url: "https://shaantandoori.be" },
  { name: "La Taj", url: "https://lataj.be" },
  { name: "Nora Indian", url: "https://noraindian.com" },
  { name: "Nani Antwerp", url: "https://naniantwerp.be" },
  { name: "Indian Curry House", url: "https://indiancurryhouse.be" },
  { name: "In Dish", url: "https://indish.be" },
  // TODO(real data): le-soleil.be does not resolve in DNS. Fix the domain or remove this entry.
  { name: "Le Soleil", url: "https://le-soleil.be" },
  { name: "Frango D'Ouro", url: "https://frangodouro.be" },
  { name: "Taste of Tandoori", url: "https://tastetandoori.be" },
  { name: "India Taste", url: "https://indiataste.be" },
];
