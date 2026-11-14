import type { CSSProperties } from "react";
import { TerminalSkip } from "./terminal-skip";

type Terminal = { command: string; lines: [key: string, value: string][] };

const CHAR_MS = 32;
const GAP_S = 0.18;

/**
 * The status block in the hero. Every line is real text in the HTML; the typing
 * is a CSS width animation that runs once and is turned off by "Skip animation"
 * and by prefers-reduced-motion.
 */
export function TerminalHero({ terminal }: { terminal: Terminal }) {
  const rows = [
    { key: "", prompt: "$", text: terminal.command },
    ...terminal.lines.map(([key, value]) => ({ key: `${key}:`, prompt: "", text: value })),
  ];

  let cursor = 0.35;
  const timed = rows.map((row) => {
    const chars = (row.prompt ? row.prompt.length + 1 : 0) + (row.key ? row.key.length + 1 : 0) + row.text.length;
    const start = cursor;
    cursor += (chars * CHAR_MS) / 1000 + GAP_S;
    return { ...row, chars, start };
  });

  return (
    <div className="terminal" data-terminal style={{ "--total": `${cursor.toFixed(2)}s` } as CSSProperties}>
      <div className="terminal-bar">
        <span className="terminal-dots" aria-hidden="true"><i /><i /><i /></span>
        <span className="terminal-title">~/kartik</span>
        <TerminalSkip />
      </div>
      <div className="terminal-body">
        {timed.map((row, index) => (
          <p
            key={index}
            className={`t-line${row.prompt ? " t-cmd" : ""}`}
            style={{ "--n": row.chars, "--d": `${row.start.toFixed(2)}s`, "--ms": `${CHAR_MS}ms` } as CSSProperties}
          >
            {row.prompt && <span className="t-prompt" aria-hidden="true">{row.prompt} </span>}
            {row.key && <span className="t-key">{row.key} </span>}
            <span className="t-val">{row.text}</span>
          </p>
        ))}
        <span className="t-cursor" aria-hidden="true" />
      </div>
    </div>
  );
}
