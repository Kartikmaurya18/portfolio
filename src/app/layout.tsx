import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { ClientEffects } from "@/components/layout/client-effects";
import { CommandPalette } from "@/components/layout/command-palette";
import { Footer } from "@/components/layout/footer";
import { MotionProvider } from "@/components/layout/motion-provider";
import { Nav } from "@/components/layout/nav";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { site } from "@/content/site";
import "./globals.css";

const sans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const serif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s — ${site.name}` },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name }],
  creator: site.name,
  keywords: [
    "Kartik Maurya",
    "Software Engineer",
    "Software Development Engineer",
    "Full-Stack Developer",
    "Web Developer",
    "Agentic AI",
  ],
  openGraph: {
    type: "website",
    siteName: site.name,
    title: site.title,
    description: site.description,
    url: "/",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#07080a",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${sans.variable} ${mono.variable} ${serif.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Enables scroll-reveal styles only when JS is available. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="min-h-dvh overflow-x-clip">
        <a
          href="#main"
          className="fixed left-4 top-3 z-[90] -translate-y-20 rounded-lg bg-fg px-4 py-2 text-sm font-medium text-bg transition focus:translate-y-0"
        >
          Skip to content
        </a>
        <MotionProvider>
          <ScrollProgress />
          <Nav />
          <main id="main">{children}</main>
          <Footer />
          <CommandPalette />
        </MotionProvider>
        <ClientEffects />
        <div aria-hidden="true" className="noise" />
      </body>
    </html>
  );
}
