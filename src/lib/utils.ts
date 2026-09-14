/** "https://www.bombaylab.in/" → "bombaylab.in" */
export function displayUrl(url: string) {
  return url
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\/$/, "");
}
