/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // `domains` is deprecated; remotePatterns is the supported allowlist.
    remotePatterns: [{ protocol: "https", hostname: "m.media-amazon.com" }],
    // Serve modern formats — typically 60–80% smaller than the source JPEGs.
    formats: ["image/avif", "image/webp"],
    // Required in Next 16; we only ever request the default quality.
    qualities: [75],
    // Posters render small (≤240px CSS, ~2× DPR). Give the optimizer
    // fine-grained widths so it never ships more pixels than a card shows.
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [96, 128, 160, 200, 240, 320, 384],
  },
};

module.exports = nextConfig;
