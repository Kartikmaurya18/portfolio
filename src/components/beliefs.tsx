import type { Belief } from "@/content/beliefs";
import { hidden, shown } from "@/lib/todo";

const pad = (n: number) => String(n).padStart(2, "0");

/** Numbered belief cards: "01 / 03". Cards that are still TODO are skipped and the count adjusts. */
export function Beliefs({ items }: { items: Belief[] }) {
  const visible = items.filter((item) => !hidden(item.title));
  if (visible.length === 0) return null;
  return (
    <ol className="beliefs">
      {visible.map((item, index) => {
        const body = shown(item.body);
        return (
          <li key={item.title} className="belief">
            <p className="belief-num">{pad(index + 1)} / {pad(visible.length)}</p>
            <h3>{item.title}</h3>
            {body && <p>{body}</p>}
          </li>
        );
      })}
    </ol>
  );
}
