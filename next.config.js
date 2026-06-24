/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Required on Next 13.3.x to enable the app/ directory. Removed in Phase 3
    // when Next is upgraded to 14/15 (App Router is stable there).
    appDir: true,
  },
  images: {
    // `domains` is deprecated; remotePatterns is the supported allowlist.
    remotePatterns: [{ protocol: "https", hostname: "m.media-amazon.com" }],
    // Serve modern formats — typically 60–80% smaller than the source JPEGs.
    formats: ["image/avif", "image/webp"],
    // Posters render small (≤240px CSS, ~2× DPR). Give the optimizer
    // fine-grained widths so it never ships more pixels than a card shows.
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [96, 128, 160, 200, 240, 320, 384],
  },
};

module.exports = nextConfig;
