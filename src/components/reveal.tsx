"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/** Fades `[data-reveal]` elements up as they enter the viewport. */
export function Reveal() {
  const pathname = usePathname();

  useEffect(() => {
    const items = document.querySelectorAll("[data-reveal]:not([data-inview])");
    if (!("IntersectionObserver" in window)) {
      items.forEach((el) => el.setAttribute("data-inview", ""));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-inview", "");
          io.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -5% 0px" },
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}

export function CurrentYear() {
  return <span suppressHydrationWarning>{new Date().getFullYear()}</span>;
}
