export interface Belief {
  /** The short, opinionated line. Start with "TODO:" to hide the card until it is written. */
  title: string;
  /** Optional one or two sentences that back it up. Start with "TODO:" to hide it. */
  body?: string;
}

/**
 * How I build. The first three are placeholder wording from Kartik's brief:
 * replace them with your own. Cards starting with "TODO:" are hidden.
 */
export const beliefs: Belief[] = [
  { title: "A demo isn't a product until it has a backend.", body: "TODO: one or two sentences backing this up, from a project you built." },
  { title: "Evals before vibes.", body: "TODO: one or two sentences backing this up." },
  { title: "Boring infra, interesting models.", body: "TODO: one or two sentences backing this up." },
  { title: "TODO: belief 04" },
  { title: "TODO: belief 05" },
];
