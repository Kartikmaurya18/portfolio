import { freelance } from "./freelance";

export interface Stat {
  value: string;
  label: string;
}

/**
 * Numbers in the scrolling strip under the hero. Only facts from the resume or
 * the data files. Entries starting with "TODO:" are hidden until filled in.
 */
export const stats: Stat[] = [
  { value: "100+", label: "REST APIs" },
  { value: String(freelance.length), label: "client sites shipped" },
  { value: "15-person", label: "field team served" },
  // TODO: add one more real number (users, uptime, deployments, ...) and its label.
  { value: "TODO: another real stat", label: "TODO: label" },
];
