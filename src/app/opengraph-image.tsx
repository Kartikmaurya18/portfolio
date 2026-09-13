import { ImageResponse } from "next/og";
import { hero, site } from "@/content/site";

export const alt = site.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
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
          backgroundImage: "radial-gradient(circle at 85% -10%, rgba(255,155,84,0.32), rgba(7,8,10,0) 55%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 64,
              height: 64,
              borderRadius: 16,
              border: "1px solid rgba(255,255,255,0.18)",
              background: "rgba(255,255,255,0.06)",
              fontSize: 24,
              fontWeight: 700,
            }}
          >
            {site.initials}
          </div>
          <div style={{ display: "flex", fontSize: 26, color: "#a1a1aa" }}>{site.tagline}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 96, fontWeight: 700, letterSpacing: -4, lineHeight: 1 }}>{site.name}</div>
          <div style={{ display: "flex", marginTop: 20, fontSize: 44, color: "#ff9b54" }}>{site.role}</div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 24, color: "#82828d" }}>
          {hero.pipeline.map((step, i) => (
            <div key={step.label} style={{ display: "flex", alignItems: "center", gap: 18 }}>
              {i > 0 && <div style={{ display: "flex", width: 36, height: 2, background: "rgba(255,155,84,0.6)" }} />}
              <div style={{ display: "flex" }}>{step.label}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
