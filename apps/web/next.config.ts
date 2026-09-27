import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Los placeholders de producto son SVG propios y estáticos (no
    // subidos por usuarios), servidos con CSP restrictiva.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
