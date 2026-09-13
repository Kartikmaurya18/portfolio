import previews from "@/content/previews.generated.json";
import { categoryFilters, projects } from "@/content/projects";
import type { Project, ProjectCategory } from "@/content/types";

export interface Preview {
  src: string;
  width?: number;
  height?: number;
  blurDataURL?: string;
}

export interface Previews {
  desktop?: Preview;
  mobile?: Preview;
}

const manifest = previews as Record<string, Previews>;

/** Manual `images` on a project win over auto-captured screenshots. */
export function getPreviews(project: Project): Previews {
  const auto = manifest[project.slug] ?? {};
  return {
    desktop: project.images?.desktop ? { src: project.images.desktop } : auto.desktop,
    mobile: project.images?.mobile ? { src: project.images.mobile } : auto.mobile,
  };
}

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacentProjects(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  return {
    prev: projects[(i - 1 + projects.length) % projects.length],
    next: projects[(i + 1) % projects.length],
  };
}

export function categoryLabel(id: ProjectCategory) {
  return categoryFilters.find((c) => c.id === id)?.label ?? id;
}

export function hasCaseStudy(project: Project) {
  return Object.values(project.caseStudy ?? {}).some(Boolean);
}

export const featuredProjects = projects.filter((p) => p.featured);
export const spotlightProjects = projects.filter((p) => p.spotlight);
export const freelanceProjects = projects.filter((p) => p.categories.includes("freelance"));

export { categoryFilters, projects };
