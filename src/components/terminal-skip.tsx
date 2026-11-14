"use client";

/** Finishes the hero typing animation immediately. Without JavaScript it is not rendered. */
export function TerminalSkip() {
  return (
    <button
      type="button"
      className="terminal-skip"
      onClick={(event) => event.currentTarget.closest("[data-terminal]")?.setAttribute("data-skip", "")}
    >
      Skip animation
    </button>
  );
}
