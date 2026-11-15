"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "@/lib/journal/api";
import { useSession } from "@/lib/journal/hooks";
import { journalConfigured } from "@/lib/journal/supabase";

/** Top bar for every journal page. The owner gets "New entry" and "Log out"; visitors get a quiet "Log in". */
export function JournalHeader() {
  const { owner, ready } = useSession();
  const router = useRouter();

  async function logOut() {
    await signOut();
    router.push("/journal");
  }

  return (
    <header className="site-header j-header">
      <Link className="brand" href="/" aria-label="Kartik Maurya, back to the portfolio">
        <span className="brand-mark">KM</span>
        <span className="brand-name">
          Kartik Maurya<span>Back to portfolio</span>
        </span>
      </Link>
      <nav className="main-nav" aria-label="Journal">
        <Link href="/journal">Journal</Link>
        {owner && <Link href="/journal/write">New entry</Link>}
      </nav>
      <div className="header-actions">
        {journalConfigured && ready && (owner ? (
          <button type="button" className="button button-quiet button-sm" onClick={logOut}>
            Log out
          </button>
        ) : (
          <Link className="j-login-link" href="/journal/login">
            Log in
          </Link>
        ))}
      </div>
    </header>
  );
}
