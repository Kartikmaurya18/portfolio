import { ImageResponse } from "next/og";
import { site } from "@/content/site";
import { categoryLabel, getProject, projects } from "@/lib/projects";
import { displayUrl } from "@/lib/utils";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectOpenGraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  const name = project?.name ?? site.name;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          color: "#ededf0",
          backgroundColor: "#07080a",
          backgroundImage: "radial-gradient(circle at 85% -10%, rgba(255,155,84,0.3), rgba(7,8,10,0) 55%)",
        }}
      >
        <div style={{ display: "flex", fontSize: 26, color: "#a1a1aa" }}>
          {project ? project.categories.map(categoryLabel).join("  ·  ") : site.tagline}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 104, fontWeight: 700, letterSpacing: -4, lineHeight: 1 }}>{name}</div>
          {project && <div style={{ display: "flex", marginTop: 24, fontSize: 36, color: "#ff9b54" }}>{displayUrl(project.url)}</div>}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#82828d" }}>
          <div style={{ display: "flex" }}>{site.name}</div>
          <div style={{ display: "flex" }}>{site.role}</div>
        </div>
      </div>
    ),
    size,
  );
}
