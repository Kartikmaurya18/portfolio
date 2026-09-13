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
          backgroundColor: "#0c0c0d",
          color: "#ededea",
        }}
      >
        <div style={{ display: "flex", fontSize: 26, color: "#8a8a85" }}>{site.url.replace(/^https?:\/\//, "")}</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 140, fontWeight: 700, letterSpacing: -7, lineHeight: 0.9 }}>
            <span>{site.name}</span>
            <span style={{ color: "#ff9b54" }}>.</span>
          </div>
          <div style={{ display: "flex", marginTop: 32, fontSize: 40, color: "#a6a6a1" }}>
            {`${site.role} at ${site.company}`}
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#8a8a85" }}>{site.location}</div>
      </div>
    ),
    size,
  );
}
