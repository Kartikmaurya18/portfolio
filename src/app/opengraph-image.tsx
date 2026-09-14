import { ImageResponse } from "next/og";
import { site } from "@/content/site";

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
          padding: 80,
          backgroundColor: "#0a0a0a",
          color: "#f2f2f2",
        }}
      >
        <div style={{ display: "flex", fontSize: 26, color: "#8a8a8a" }}>{site.url.replace(/^https?:\/\//, "")}</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 120, fontWeight: 600, letterSpacing: -4, lineHeight: 0.95 }}>
            {site.name}
          </div>
          <div style={{ display: "flex", marginTop: 32, fontSize: 40, color: "#c9c9c9" }}>
            {`${site.role} at ${site.company}`}
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#8a8a8a" }}>{site.location}</div>
      </div>
    ),
    size,
  );
}
