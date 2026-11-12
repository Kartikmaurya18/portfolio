/**
 * Content I still need from Kartik is written as a string that starts with
 * "TODO:". Placeholders are hidden from visitors; set NEXT_PUBLIC_SHOW_TODOS=1
 * (for example in .env.local) to preview them while editing.
 */
const showTodos = process.env.NEXT_PUBLIC_SHOW_TODOS === "1";

export function isTodo(value: string | undefined | null): value is string {
  return typeof value === "string" && value.startsWith("TODO:");
}

/** The value, or undefined while it is still a TODO placeholder. */
export function shown(value: string | undefined | null): string | undefined {
  if (value == null) return undefined;
  return isTodo(value) && !showTodos ? undefined : value;
}

/** True when an item is a placeholder that should not be rendered yet. */
export function hidden(value: string | undefined | null): boolean {
  return isTodo(value) && !showTodos;
}
