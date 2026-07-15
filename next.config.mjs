/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export → a plain `out/` folder of HTML/CSS/JS, no Node server.
  // Deploys as-is to Render Static Sites (publish dir: `out`), Cloudflare
  // Pages, Vercel, or any CDN.
  output: "export",
  // No Next Image optimizer in a static export — serve images directly.
  images: { unoptimized: true },
  // Emit /privacy/index.html etc. so static hosts serve clean nested URLs.
  trailingSlash: true,
};

export default nextConfig;
