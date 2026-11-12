import Link from "next/link";
import type { ReactNode } from "react";
import { ExternalLink } from "@/components/external-link";
import type { TimelineStep } from "@/content/types";
import { hidden } from "@/lib/todo";

function bulletText(text: string, client?: { name: string; url: string }): ReactNode {
  if (!client || !text.includes("{client}")) return text;
  const [before, ...after] = text.split("{client}");
  return (
    <>
      {before}
      <ExternalLink href={client.url} className="text-link" icon={false}>
        {client.name}
      </ExternalLink>
      {after.join("{client}")}
    </>
  );
}

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Step-by-step timeline. On wide screens the steps are a row of radio-backed
 * buttons (arrow keys move between them) and one step shows at a time; on
 * phones every step is stacked. It is plain HTML and CSS: all the text is in
 * the page whether or not JavaScript runs.
 */
export function Timeline({ steps }: { steps: TimelineStep[] }) {
  const visible = steps.filter((step) => !hidden(step.title));
  if (visible.length === 0) return null;
  const total = visible.length;
  const checked = Math.max(0, visible.findIndex((step) => step.current));

  return (
    <fieldset className="tl" data-count={total}>
      <legend className="sr-only">Choose a step on the road</legend>
      {visible.map((step, index) => (
        <input
          key={step.id}
          type="radio"
          name="road-step"
          id={`step-${step.id}`}
          className="tl-radio"
          defaultChecked={index === checked}
          aria-label={`Step ${index + 1} of ${total}: ${step.title}`}
        />
      ))}

      <div className="tl-rail" aria-hidden="true">
        {visible.map((step, index) => (
          <label key={step.id} htmlFor={`step-${step.id}`} className={`tl-step${step.goal ? " tl-step-goal" : ""}`}>
            <span className="tl-num">{pad(index + 1)}</span>
            <span className="tl-name">{step.title}</span>
            <span className="tl-when">{step.period}</span>
          </label>
        ))}
      </div>

      <ol className="tl-panels">
        {visible.map((step, index) => {
          const bullets = step.bullets.filter((bullet) => !hidden(bullet));
          const learnings = (step.learnings ?? []).filter((line) => !hidden(line));
          return (
            <li key={step.id} className={`tl-panel${step.goal ? " tl-goal" : ""}`}>
              <p className="tl-label">Step {pad(index + 1)} / {pad(total)}</p>
              <h3>{step.title}</h3>
              <p className="tl-meta">
                <span>{step.kind}</span>
                <span className="tl-period">{step.period}</span>
              </p>
              <ul className="tl-bullets">
                {bullets.map((bullet) => <li key={bullet}>{bulletText(bullet, step.client)}</li>)}
              </ul>
              {learnings.length > 0 && (
                <div className="tl-learned">
                  <p className="tl-learned-h">Key learnings</p>
                  <ul>
                    {learnings.map((line) => <li key={line}>{line}</li>)}
                  </ul>
                </div>
              )}
              <div className="tl-foot">
                {step.caseStudy && (
                  <Link href={`/work/${step.caseStudy}`} className="inline-action">
                    Read the case study <span aria-hidden="true">↗</span>
                  </Link>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </fieldset>
  );
}
