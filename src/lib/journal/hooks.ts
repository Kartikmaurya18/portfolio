"use client";

import type { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { db, journalConfigured } from "./supabase.ts";

export { useQuery, useToday } from "./use-query.ts";

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
