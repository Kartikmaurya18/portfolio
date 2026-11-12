import { LiveClock } from "@/components/live-clock";
import { nav } from "@/content/site";

export function SiteHeader() {
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Kartik Maurya, home">
        <span className="brand-mark">KM</span>
        <span className="brand-name">Kartik Maurya<span>AI &amp; backend</span></span>
      </a>
      <nav className="main-nav" aria-label="Main navigation">
        {nav.map((item) => (
          <a key={item.href} href={item.href}>{item.label}</a>
        ))}
      </nav>
      <div className="header-actions">
        <LiveClock />
        <a className="button button-primary button-sm" href="#contact">Let&apos;s talk</a>
      </div>
    </header>
  );
}
