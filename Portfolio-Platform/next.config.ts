import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  turbopack: {
    /** Prefer this app as Turbopack root when multiple lockfiles exist (monorepo). */
    root: path.join(__dirname),
  },
};

export default nextConfig;
