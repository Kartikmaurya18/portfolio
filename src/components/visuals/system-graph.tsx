import { hero } from "@/content/site";
import { cn, pad } from "@/lib/utils";

/**
 * Idea → Code → System → Product → Impact, drawn as a small system diagram.
 * Pure SVG: a signal travels each edge in turn (SMIL, chained by id) and lights
 * up the node it reaches. No client JavaScript.
 */

const nodes = [
  { x: 96, y: 72, w: 128, h: 46, hint: { x: 96, y: 118, anchor: "middle" } },
  { x: 356, y: 140, w: 128, h: 46, hint: { x: 280, y: 144, anchor: "end" } },
  { x: 178, y: 244, w: 150, h: 54, hint: { x: 92, y: 248, anchor: "end" }, core: true },
  { x: 376, y: 336, w: 136, h: 46, hint: { x: 376, y: 300, anchor: "middle" } },
  { x: 124, y: 404, w: 136, h: 46, hint: { x: 124, y: 450, anchor: "middle" } },
] as const;

const edges = [
  "M160 72 C 270 72 356 72 356 117",
  "M356 163 C 356 225 320 244 253 244",
  "M178 271 C 178 318 230 336 308 336",
  "M376 359 C 376 398 300 404 192 404",
];

const SEGMENT_SECONDS = 1.3;
const accent = { stroke: "var(--accent)" };

export function SystemGraph() {
  const steps = hero.pipeline;

  return (
    <figure className="panel relative mx-auto w-full max-w-[33rem] overflow-hidden">
      <figcaption className="flex items-center justify-between border-b border-line px-5 py-3 font-mono text-[0.6875rem] text-subtle">
        <span className="flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-accent shadow-[0_0_10px_var(--accent)]" />
          idea → impact
        </span>
        <span>{steps.length} stages</span>
      </figcaption>

      <div className="relative">
        <div aria-hidden="true" className="bg-dots mask-radial absolute inset-0" />
        <Corner className="top-3 left-3 border-t border-l" />
        <Corner className="top-3 right-3 border-t border-r" />
        <Corner className="bottom-3 left-3 border-b border-l" />
        <Corner className="right-3 bottom-3 border-r border-b" />

        <svg
          viewBox="0 0 480 468"
          role="img"
          aria-label={steps.map((s) => s.label).join(" → ")}
          className="relative block h-auto w-full"
        >
          <defs>
            <radialGradient id="sg-particle">
              <stop offset="0" style={{ stopColor: "#fff" }} />
              <stop offset="0.35" style={{ stopColor: "var(--accent)" }} />
              <stop offset="1" style={{ stopColor: "var(--accent)", stopOpacity: 0 }} />
            </radialGradient>
            <radialGradient id="sg-core">
              <stop offset="0" style={{ stopColor: "var(--accent)", stopOpacity: 0.2 }} />
              <stop offset="1" style={{ stopColor: "var(--accent)", stopOpacity: 0 }} />
            </radialGradient>
          </defs>

          <circle cx="178" cy="244" r="130" fill="url(#sg-core)" />
          <circle
            cx="178"
            cy="244"
            r="96"
            fill="none"
            stroke="rgb(255 255 255 / 0.08)"
            strokeDasharray="2 7"
            style={{ transformOrigin: "178px 244px", transformBox: "view-box", animation: "spin 48s linear infinite" }}
          />
          <circle
            cx="178"
            cy="244"
            r="150"
            fill="none"
            stroke="rgb(255 255 255 / 0.05)"
            strokeDasharray="1 9"
            style={{ transformOrigin: "178px 244px", transformBox: "view-box", animation: "spin 70s linear infinite reverse" }}
          />

          {edges.map((d) => (
            <g key={d}>
              <path d={d} fill="none" stroke="rgb(255 255 255 / 0.12)" />
              <path
                d={d}
                fill="none"
                strokeOpacity="0.5"
                strokeDasharray="3 9"
                style={{ ...accent, animation: "dash 1.4s linear infinite" }}
              />
            </g>
          ))}

          {nodes.map((n, i) => {
            const x = n.x - n.w / 2;
            const y = n.y - n.h / 2;
            return (
              <g key={steps[i].label}>
                <rect x={x} y={y} width={n.w} height={n.h} rx="12" stroke="rgb(255 255 255 / 0.14)" style={{ fill: "var(--raised)" }} />
                <rect
                  x={x}
                  y={y}
                  width={n.w}
                  height={n.h}
                  rx="12"
                  fill="none"
                  strokeWidth="1.25"
                  opacity="0"
                  className="motion-reduce:hidden"
                  style={accent}
                >
                  <animate
                    attributeName="opacity"
                    values="0;1;0.3;0"
                    keyTimes="0;0.2;0.7;1"
                    dur="1.8s"
                    begin={i === 0 ? "sg-m0.begin" : `sg-m${i - 1}.end`}
                  />
                </rect>
                <text x={x + 16} y={n.y + 3.5} className="fill-subtle font-mono text-[10px]">
                  {pad(i + 1)}
                </text>
                <text x={x + 40} y={n.y + 5} className="fill-fg text-[15px] font-medium">
                  {steps[i].label}
                </text>
                {"core" in n && <circle cx={x + n.w - 18} cy={n.y} r="3" style={{ fill: "var(--accent)" }} />}
                <text
                  x={n.hint.x}
                  y={n.hint.y}
                  textAnchor={n.hint.anchor}
                  className="fill-subtle font-mono text-[9.5px] uppercase"
                  style={{ letterSpacing: "0.12em" }}
                >
                  {steps[i].hint}
                </text>
              </g>
            );
          })}

          <g className="motion-reduce:hidden">
            {edges.map((d, i) => (
              <circle key={d} r="7" fill="url(#sg-particle)" opacity="0">
                <animateMotion
                  id={`sg-m${i}`}
                  dur={`${SEGMENT_SECONDS}s`}
                  begin={i === 0 ? "0.8s;sg-m3.end+1.6s" : `sg-m${i - 1}.end`}
                  path={d}
                  calcMode="spline"
                  keyPoints="0;1"
                  keyTimes="0;1"
                  keySplines="0.45 0 0.25 1"
                />
                <animate
                  attributeName="opacity"
                  values="0;1;1;0"
                  keyTimes="0;0.15;0.85;1"
                  dur={`${SEGMENT_SECONDS}s`}
                  begin={`sg-m${i}.begin`}
                />
              </circle>
            ))}
          </g>
        </svg>
      </div>
    </figure>
  );
}

function Corner({ className }: { className: string }) {
  return <span aria-hidden="true" className={cn("absolute size-3 border-accent/40", className)} />;
}
