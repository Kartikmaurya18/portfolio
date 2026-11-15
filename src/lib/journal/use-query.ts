"use client";

import { useEffect, useRef, useState } from "react";
import { useTicking } from "../use-ticking.ts";
import { todayIST } from "./dates.ts";

const message = (error: unknown) =>
  error instanceof Error ? error.message : ((error as { message?: string })?.message ?? "Something went wrong.");

/**
 * Loads something once per `key` (and again after reload()). While a new key
 * loads, the previous result stays in `data` so lists do not flash empty.
 * Kept free of the database library so the homepage can use it cheaply.
 */
export function useQuery<T>(key: string, load: () => Promise<T>) {
  const loadRef = useRef(load);
  useEffect(() => {
    loadRef.current = load;
  });
  const [reloads, setReloads] = useState(0);
  const [result, setResult] = useState<{ id: string; data?: T; error?: string } | null>(null);
  const id = `${key}#${reloads}`;

  useEffect(() => {
    let stale = false;
    loadRef.current().then(
      (data) => {
        if (!stale) setResult({ id, data });
      },
      (error) => {
        if (!stale) setResult({ id, error: message(error) });
      },
    );
    return () => {
      stale = true;
    };
  }, [id]);

  const current = result?.id === id ? result : null;
  return {
    data: (current ?? result)?.data,
    error: current?.error,
    loading: !current,
    reload: () => setReloads((n) => n + 1),
  };
}

/** Today in Mumbai, or "" on the server and the first render so nothing mismatches. */
export function useToday(): string {
  return useTicking(() => todayIST(), "", 60_000);
}
