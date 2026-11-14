/** Mono eyebrow, the section title and an optional one-line intro. */
export function SectionHeading({
  id,
  eyebrow,
  title,
  intro,
}: {
  id: string;
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <div className="section-heading">
      <p className="section-eyebrow">{eyebrow}</p>
      <h2 id={id}>{title}<span className="heading-dot">.</span></h2>
      {intro && <p className="section-intro">{intro}</p>}
    </div>
  );
}
