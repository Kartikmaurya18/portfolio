"use client";

import { useEffect, useRef, useState } from "react";

type Status = "idle" | "copied" | "failed";

/** The email address as a mailto link, plus a button that copies it. The result is announced to screen readers. */
export function CopyEmail({ email }: { email: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  async function copy() {
    let next: Status = "copied";
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      next = "failed";
    }
    setStatus(next);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus("idle"), 2500);
  }

  return (
    <div className="email-row">
      <a className="email-link" href={`mailto:${email}`}>{email}</a>
      <button type="button" className="copy-button" onClick={copy}>
        {status === "copied" ? "Copied!" : status === "failed" ? "Copy failed" : "Copy"}
      </button>
      <span className="sr-only" role="status" aria-live="polite">
        {status === "copied" && "Email address copied to the clipboard."}
        {status === "failed" && "Could not copy. The address is a link you can select."}
      </span>
    </div>
  );
}
