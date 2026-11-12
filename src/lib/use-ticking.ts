import { useSyncExternalStore } from "react";

/**
 * A value that is recomputed on an interval in the browser. The server and the
 * first client render both use `serverValue`, so hydration never mismatches and
 * the layout only changes once the real value arrives.
 */
export function useTicking<T extends string | number>(read: () => T, serverValue: T, ms: number): T {
  return useSyncExternalStore(
    (notify) => {
      const id = setInterval(notify, ms);
      return () => clearInterval(id);
    },
    read,
    () => serverValue,
  );
}
