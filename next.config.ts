import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Links from the previous version of the site. Redirects run before /public,
  // and the screenshots live in /public/projects, so the catch-all skips any
  // path with a dot in it.
  async redirects() {
    return [
      { source: "/projects/:slug(yumedics-dashboard|supriyapa|lataj)", destination: "/work/:slug", permanent: true },
      { source: "/projects", destination: "/", permanent: true },
      { source: "/projects/:path([^.]*)", destination: "/", permanent: true },
    ];
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
