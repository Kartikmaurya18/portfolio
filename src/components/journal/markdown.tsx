"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

/**
 * Renders notes. react-markdown does not allow raw HTML, so pasted notes cannot
 * inject scripts. Only https images are shown, and links open in a new tab.
 */
export function Markdown({ children }: { children: string }) {
  if (!children.trim()) return null;
  return (
    <div className="md">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ href, children: label }) => (
            <a href={href} target="_blank" rel="noopener noreferrer" className="text-link">
              {label}
            </a>
          ),
          img: ({ src, alt }) =>
            typeof src === "string" && src.startsWith("https://") ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={src} alt={alt ?? ""} loading="lazy" />
            ) : null,
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
