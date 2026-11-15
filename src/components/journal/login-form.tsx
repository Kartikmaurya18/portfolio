"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { signIn } from "@/lib/journal/api";
import { useSession } from "@/lib/journal/hooks";
import { journalConfigured } from "@/lib/journal/supabase";
import { SetupNotice } from "./setup-notice";

export function LoginForm() {
  if (!journalConfigured) return <SetupNotice />;
  return <Login />;
}

function Login() {
  const router = useRouter();
  const { owner, ready } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      await signIn(email.trim(), password);
      router.push("/journal");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not log in.");
      setBusy(false);
    }
  }

  if (ready && owner) {
    return (
      <div className="j-form">
        <h1>You are logged in</h1>
        <Link className="button button-primary" href="/journal/write">
          Write an entry
        </Link>
      </div>
    );
  }

  return (
    <form className="j-form j-login" onSubmit={submit}>
      <h1>Log in</h1>
      <p className="j-muted">This is only for me. Reading the journal needs no account.</p>
      <label className="j-field">
        <span>Email</span>
        <input type="email" autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </label>
      <label className="j-field">
        <span>Password</span>
        <input type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </label>
      {error && (
        <p role="alert" className="j-error">
          {error}
        </p>
      )}
      <div className="j-actions">
        <button type="submit" className="button button-primary" disabled={busy}>
          {busy ? "Logging in…" : "Log in"}
        </button>
      </div>
    </form>
  );
}
