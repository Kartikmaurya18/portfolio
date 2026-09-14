import { ImageResponse } from "next/og";
import { projects } from "@/content/projects";
import { site } from "@/content/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function CaseStudyOpenGraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          backgroundColor: "#0a0a0a",
          color: "#f2f2f2",
        }}
      >
        <div style={{ display: "flex", fontSize: 26, color: "#8a8a8a" }}>{`Case study · ${project?.kind ?? ""}`}</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 112, fontWeight: 600, letterSpacing: -4, lineHeight: 0.95 }}>
            {project?.title ?? site.name}
          </div>
          <div style={{ display: "flex", marginTop: 28, fontSize: 36, color: "#c9c9c9" }}>{project?.client ?? ""}</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#8a8a8a" }}>
          <div style={{ display: "flex" }}>{site.name}</div>
          <div style={{ display: "flex" }}>{project ? project.url.replace(/^https?:\/\//, "") : ""}</div>
        </div>
      </div>
    ),
    size,
  );
}
