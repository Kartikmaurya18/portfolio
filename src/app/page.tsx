import type { Metadata } from "next";
import { About } from "@/components/sections/about";
import { AgenticAI } from "@/components/sections/agentic-ai";
import { Contact } from "@/components/sections/contact";
import { Experience } from "@/components/sections/experience";
import { Freelance } from "@/components/sections/freelance";
import { GitHubActivity } from "@/components/sections/github-activity";
import { Hero } from "@/components/sections/hero";
import { Philosophy } from "@/components/sections/philosophy";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { Stats } from "@/components/sections/stats";
import { experience, site } from "@/content/site";
import { contactLinks } from "@/lib/links";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

function Divider() {
  return (
    <div className="container-page" aria-hidden="true">
      <div className="h-px bg-gradient-to-r from-transparent via-line-strong to-transparent" />
    </div>
  );
}

export default function HomePage() {
  const current = experience.find((job) => job.current);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: site.url,
    jobTitle: current?.role,
    worksFor: current ? { "@type": "Organization", name: current.company } : undefined,
    sameAs: contactLinks.filter((l) => l.href && l.id !== "email").map((l) => l.href),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Hero />
      <Stats />
      <About />
      <Divider />
      <Experience />
      <Divider />
      <Projects />
      <Freelance />
      <AgenticAI />
      <Skills />
      <Divider />
      <Philosophy />
      <GitHubActivity />
      <Contact />
    </>
  );
}
