import type { ComponentProps } from "react";

/**
 * Opens in a new tab. A small arrow marks it for sighted visitors; screen
 * readers get one shared "Opens in a new tab" note (see the root layout)
 * through aria-describedby, so the words are not repeated in every link.
 * Pass icon={false} for a link that sits inside a sentence.
 */
export function ExternalLink({ children, icon = true, ...props }: ComponentProps<"a"> & { icon?: boolean }) {
  return (
    <a target="_blank" rel="noopener noreferrer" aria-describedby="new-tab-note" {...props}>
      {children}
      {icon && <span className="ext-icon" aria-hidden="true">↗</span>}
    </a>
  );
}
