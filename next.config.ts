import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: the whole site becomes plain HTML/CSS/JS files.
  // Works on Vercel, Netlify, or any normal hosting (cPanel too).
  output: "export",
   devIndicators: false,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
