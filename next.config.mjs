/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  // Set by the deploy workflow from GitHub Pages: "" on the custom domain,
  // "/fitrank-website" while the site is served from yaseenyk.github.io.
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;
