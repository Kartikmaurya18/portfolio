import type { Metadata } from "next";
import { About } from "@/components/home/about";
import { Contact } from "@/components/home/contact";
import { Experience } from "@/components/home/experience";
import { Freelance } from "@/components/home/freelance";
import { Hero } from "@/components/home/hero";
import { Stack } from "@/components/home/stack";
import { Work } from "@/components/home/work";
import { links, site } from "@/content/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: site.url,
    jobTitle: site.role,
    worksFor: { "@type": "Organization", name: site.company },
    homeLocation: { "@type": "Place", name: site.location },
    email: `mailto:${links.email}`,
    sameAs: [links.github, links.linkedin],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Hero />
      <About />
      <Experience />
      <Work />
      <Freelance />
      <Stack />
      <Contact />
    </>
  );
}
