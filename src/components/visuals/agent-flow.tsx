"use client";

import { AnimatePresence, useReducedMotion } from "motion/react";
import * as m from "motion/react-m";
import { useEffect, useRef, useState } from "react";
import { Agent, Bolt, Branches, CheckCircle, Database, Pause, Play, Plug, Server, Spark, Target, Wrench } from "@/components/icons";
import { cn, pad } from "@/lib/utils";

interface Stage {
  id: string;
  title: string;
  text: string;
  tags: readonly string[];
  trace: string;
  nodes?: readonly string[];
}

const stageIcons: Record<string, typeof Agent> = {
  goal: Target,
  agent: Agent,
  reasoning: Branches,
  tools: Wrench,
  action: Bolt,
  result: CheckCircle,
};
const systemIcons = [Plug, Database, Server];

const STEP_MS = 2800;
const NODE = 3.5; // rem — every node has a fixed height so the loop-back line can be positioned
const LINK = 1.75; // rem — connector height

export function AgentFlow({ stages }: { stages: readonly Stage[] }) {
  const reducedMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [userPlaying, setUserPlaying] = useState<boolean | null>(null);
  const [inView, setInView] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  const playing = userPlaying ?? !reducedMotion;
  const running = playing && inView;
  const stage = stages[active];

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!running) return;
    const last = active === stages.length - 1;
    const id = setTimeout(() => setActive((a) => (a + 1) % stages.length), last ? STEP_MS + 1600 : STEP_MS);
    return () => clearTimeout(id);
  }, [running, active, stages.length]);

  const select = (i: number) => {
    setActive(i);
    setUserPlaying(false);
  };

  const systemsIndex = stages.findIndex((s) => s.nodes);
  const reasoningIndex = stages.findIndex((s) => s.id === "reasoning");
  const actionIndex = stages.findIndex((s) => s.id === "action");
  const loopTop = reasoningIndex * (NODE + LINK) + NODE / 2;
  const loopHeight = (actionIndex - reasoningIndex) * (NODE + LINK);

  return (
    <div ref={root} className="panel overflow-hidden">
      <div className="flex items-center justify-between gap-4 border-b border-line px-4 py-3 sm:px-6">
        <div className="flex min-w-0 items-center gap-3 font-mono text-xs text-subtle">
          <span
            aria-hidden="true"
            className={cn("size-2 rounded-full transition-colors", running ? "bg-accent shadow-[0_0_10px_var(--accent)]" : "bg-white/20")}
          />
          <span className="truncate">agent.run(goal)</span>
          <span className="hidden rounded-full px-2 py-0.5 text-[0.625rem] tracking-wider uppercase ring-1 ring-line sm:inline">
            Illustrative
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-subtle tabular-nums">
            {pad(active + 1)} / {pad(stages.length)}
          </span>
          <button
            type="button"
            onClick={() => setUserPlaying(!playing)}
            aria-label={playing ? "Pause the walkthrough" : "Play the walkthrough"}
            className="grid size-8 place-items-center rounded-full text-muted ring-1 ring-line-strong transition hover:text-fg"
          >
            {playing ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Flow */}
        <div className="relative border-b border-line px-4 py-8 sm:px-10 lg:border-r lg:border-b-0">
          <div aria-hidden="true" className="bg-dots mask-radial absolute inset-0 opacity-70" />
          <ol aria-label="Agent workflow" className="relative mx-auto max-w-[26rem] pr-12">
            {stages.map((s, i) => {
              const state = i === active ? "active" : i < active ? "done" : "idle";
              const Icon = stageIcons[s.id] ?? Spark;
              const connector = i === systemsIndex ? "split" : i === systemsIndex + 1 ? "merge" : "straight";
              return (
                <li key={s.id}>
                  {i > 0 && <Connector variant={connector} lit={i <= active} flowing={i === active} />}
                  <button
                    type="button"
                    onClick={() => select(i)}
                    aria-label={s.title}
                    aria-current={i === active ? "step" : undefined}
                    style={{ height: `${NODE}rem` }}
                    className={cn(
                      "relative flex w-full items-center gap-3 rounded-xl px-2.5 text-left ring-1 transition-[background-color,box-shadow] duration-500 ring-inset",
                      state === "active" && "bg-accent/[0.08] shadow-[0_0_40px_-12px_rgb(255_155_84/0.55)] ring-accent/45",
                      state === "done" && "bg-white/[0.035] ring-line-strong",
                      state === "idle" && "bg-bg/60 ring-line hover:ring-line-strong",
                    )}
                  >
                    {s.nodes ? (
                      <span className="grid w-full grid-cols-3 gap-2">
                        {s.nodes.map((node, n) => {
                          const NodeIcon = systemIcons[n] ?? Server;
                          return (
                            <span
                              key={node}
                              className={cn(
                                "flex h-9 min-w-0 items-center justify-center gap-1.5 rounded-lg font-mono text-[0.6875rem] ring-1 transition-colors duration-500",
                                state === "active" ? "text-fg ring-accent/35" : state === "done" ? "text-muted ring-line-strong" : "text-subtle ring-line",
                              )}
                            >
                              <NodeIcon className={cn("size-3.5 shrink-0", state === "active" && "text-accent")} />
                              <span className="truncate">{node}</span>
                            </span>
                          );
                        })}
                      </span>
                    ) : (
                      <>
                        <span
                          className={cn(
                            "grid size-9 shrink-0 place-items-center rounded-lg ring-1 transition-colors duration-500",
                            state === "active" ? "bg-accent/10 text-accent ring-accent/40" : state === "done" ? "text-fg/80 ring-line-strong" : "text-subtle ring-line",
                          )}
                        >
                          <Icon className="size-4" />
                        </span>
                        <span className={cn("flex-1 text-sm font-medium transition-colors", state === "idle" ? "text-muted" : "text-fg")}>
                          {s.title}
                        </span>
                        <span className="pr-1 font-mono text-[0.625rem] text-subtle">{pad(i + 1)}</span>
                      </>
                    )}
                  </button>
                </li>
              );
            })}

            {reasoningIndex >= 0 && actionIndex > reasoningIndex && (
              <li aria-hidden="true" className="pointer-events-none absolute right-2 w-8" style={{ top: `${loopTop}rem`, height: `${loopHeight}rem` }}>
                <span
                  className={cn(
                    "absolute inset-y-0 left-0 w-5 rounded-r-xl border-y border-r border-dashed transition-colors duration-500",
                    active === actionIndex ? "border-accent/60" : "border-white/15",
                  )}
                />
                <span
                  className={cn(
                    "absolute top-0 -left-1 size-2 -translate-y-1/2 rotate-45 border-b border-l transition-colors duration-500",
                    active === actionIndex ? "border-accent/80" : "border-white/25",
                  )}
                />
                <span className="absolute top-1/2 right-0 -translate-y-1/2 rotate-180 font-mono text-[0.5625rem] tracking-[0.2em] text-subtle uppercase [writing-mode:vertical-rl]">
                  observe · iterate
                </span>
              </li>
            )}
          </ol>
        </div>

        {/* Inspector */}
        <div className="flex flex-col gap-8 p-6 sm:p-10">
          <div className="min-h-[13.5rem]">
            <AnimatePresence mode="wait" initial={false}>
              <m.div
                key={stage.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="font-mono text-xs text-accent">Stage {pad(active + 1)}</p>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">{stage.title}</h3>
                <p className="mt-3 max-w-md leading-relaxed text-muted">{stage.text}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {stage.tags.map((tag) => (
                    <li key={tag} className="rounded-full bg-white/[0.04] px-3 py-1 text-xs text-muted ring-1 ring-line">
                      {tag}
                    </li>
                  ))}
                </ul>
              </m.div>
            </AnimatePresence>
          </div>

          <div className="mt-auto overflow-hidden rounded-xl bg-black/40 ring-1 ring-line">
            <div className="flex items-center justify-between border-b border-line px-4 py-2 font-mono text-[0.625rem] tracking-wider text-subtle uppercase">
              <span>Trace</span>
              <span>Example run</span>
            </div>
            <ol className="min-h-[12.5rem] overflow-x-auto px-4 py-3 font-mono text-[0.75rem] leading-6">
              {stages.slice(0, active + 1).map((s, i) => (
                <li key={s.id} className={cn("flex gap-3 whitespace-pre transition-colors", i === active ? "text-fg" : "text-subtle")}>
                  <span className="text-subtle/60 tabular-nums">{pad(i + 1)}</span>
                  {s.trace}
                </li>
              ))}
              <li aria-hidden="true" className="h-6">
                <span className="inline-block h-3.5 w-1.5 translate-y-0.5 animate-[blink_1s_steps(2,start)_infinite] bg-accent" />
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

const SPLIT = "M150 0 V12 M50 28 V12 H250 V28 M150 12 V28";
const MERGE = "M50 0 V16 H250 V0 M150 0 V16 M150 16 V28";

function Connector({ variant, lit, flowing }: { variant: "straight" | "split" | "merge"; lit: boolean; flowing: boolean }) {
  const drops = variant === "split" ? ["16.667%", "50%", "83.333%"] : ["50%"];
  return (
    <div aria-hidden="true" className="relative" style={{ height: `${LINK}rem` }}>
      {variant === "straight" ? (
        <span className={cn("absolute top-0 left-1/2 h-full w-px -translate-x-1/2 transition-colors duration-500", lit ? "bg-accent/55" : "bg-white/15")} />
      ) : (
        <svg className="absolute inset-0 size-full overflow-visible" viewBox="0 0 300 28" preserveAspectRatio="none">
          <path
            d={variant === "split" ? SPLIT : MERGE}
            fill="none"
            vectorEffect="non-scaling-stroke"
            className={cn("transition-[stroke] duration-500", lit ? "stroke-accent/55" : "stroke-white/15")}
          />
        </svg>
      )}
      {flowing &&
        drops.map((left) => (
          <span
            key={left}
            className="absolute top-0 size-1.5 animate-[flow-down_0.7s_ease-out_both] rounded-full bg-accent shadow-[0_0_12px_2px_var(--accent)]"
            style={{ left }}
          />
        ))}
    </div>
  );
}
