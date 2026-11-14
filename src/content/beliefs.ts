export interface Belief {
  /** The short line. Start with "TODO:" to hide the card until it is written. */
  title: string;
  /** One or two sentences that back it up. Start with "TODO:" to hide it. */
  body?: string;
}

/**
 * How I work. Written from what Kartik has actually done (the Homecheff
 * backend, the PNB Genie work, Yumedics) and nothing invented. These are
 * opinions, not stories: change any line to say it the way you would.
 */
export const beliefs: Belief[] = [
  {
    title: "A demo isn't a product until it has a backend.",
    body: "Anyone can wire a prompt to a chat box. The real work is logins, saved data, and what happens when something breaks.",
  },
  {
    title: "Check it works before you say it works.",
    body: "An answer that sounds right can still be wrong. I'd rather write the test first than hear it from a user.",
  },
  {
    title: "Keep the boring parts boring.",
    body: "Banks run on plain, well-tested Java for a reason. When I build with AI, I want the model to be the only new thing in the system.",
  },
  {
    title: "Ask the people who'll use it.",
    body: "At Yumedics I worked straight with the founders. Nothing beats hearing what the team really does all day.",
  },
];
