import { FeaturedProjectCard } from "@/components/projects/project-card";
import { ButtonLink } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";
import { featuredProjects, getPreviews, projects } from "@/lib/projects";

export function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="py-28 sm:py-36">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeader
            id="projects-title"
            eyebrow="03 — Projects"
            title="Things I've built"
            subtitle="From client websites to software systems."
          />
          <div data-reveal>
            <ButtonLink href="/projects" variant="secondary" size="sm">
              Browse all {projects.length} projects
            </ButtonLink>
          </div>
        </div>

        <div className="mt-16 space-y-8 lg:space-y-10">
          {featuredProjects.map((project, i) => (
            <FeaturedProjectCard key={project.slug} project={project} previews={getPreviews(project)} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
