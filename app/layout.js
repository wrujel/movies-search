import "./globals.css";
import { Plus_Jakarta_Sans, Outfit } from "next/font/google";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "Movie Search — Discover films",
  description:
    "A cinematic movie discovery experience. Search the OMDB catalog, filter by year, save favorites.",
  icons: { icon: "/icon.svg" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`dark ${jakarta.variable} ${outfit.variable}`}>
      <head>
        {/* Warm the connection to the OMDB API so the first search round-trip
            skips DNS + TLS setup. */}
        <link rel="preconnect" href="https://www.omdbapi.com" />
        {/* Posters are proxied through the Next image optimizer (same origin),
            but the optimizer still fetches sources from Amazon — a DNS hint is
            cheap insurance for the cold path. */}
        <link rel="dns-prefetch" href="https://m.media-amazon.com" />
      </head>
      <body className="font-sans text-text bg-bg antialiased">{children}</body>
    </html>
  );
}
