"use client";

import type { Session } from "@supabase/supabase-js";
import { useEffect, useRef, useState } from "react";
import { useTicking } from "../use-ticking.ts";
import { todayIST } from "./dates.ts";
import { db, journalConfigured } from "./supabase.ts";

const message = (error: unknown) =>
  error instanceof Error ? error.message : ((error as { message?: string })?.message ?? "Something went wrong.");

/**
 * Loads something once per `key` (and again after reload()). While a new key
 * loads, the previous result stays in `data` so lists do not flash empty.
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

/** The signed-in session. With sign-ups turned off in Supabase, any session is the owner. */
export function useSession() {
  const [state, setState] = useState<{ ready: boolean; session: Session | null }>({
    ready: !journalConfigured,
    session: null,
  });
  useEffect(() => {
    if (!journalConfigured) return;
    const client = db();
    let on = true;
    client.auth.getSession().then(({ data }) => {
      if (on) setState({ ready: true, session: data.session });
    });
    const { data } = client.auth.onAuthStateChange((_event, session) => setState({ ready: true, session }));
    return () => {
      on = false;
      data.subscription.unsubscribe();
    };
  }, []);
  return { ready: state.ready, session: state.session, owner: Boolean(state.session) };
}

/** Today in Mumbai, or "" on the server and the first render so nothing mismatches. */
export function useToday(): string {
  return useTicking(() => todayIST(), "", 60_000);
}
