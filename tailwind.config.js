/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "rgb(var(--color-bg) / <alpha-value>)",
        surface: "rgb(var(--color-surface) / <alpha-value>)",
        "surface-2": "rgb(var(--color-surface-2) / <alpha-value>)",
        border: "rgb(var(--color-border) / <alpha-value>)",
        text: "rgb(var(--color-text) / <alpha-value>)",
        "text-muted": "rgb(var(--color-text-muted) / <alpha-value>)",
        accent: "rgb(var(--color-accent) / <alpha-value>)",
        "accent-2": "rgb(var(--color-accent-2) / <alpha-value>)",
        danger: "rgb(var(--color-danger) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "sans-serif"],
      },
      letterSpacing: {
        "tight-2": "-0.02em",
      },
      boxShadow: {
        glow: "0 0 40px -10px rgb(var(--color-accent) / 0.55)",
        "glow-lg": "0 0 80px -20px rgb(var(--color-accent) / 0.7)",
        card: "0 8px 30px rgb(0 0 0 / 0.35)",
      },
      backgroundImage: {
        hero: "radial-gradient(ellipse 80% 60% at 50% -10%, rgb(var(--color-accent) / 0.25), transparent 60%), radial-gradient(ellipse 60% 50% at 100% 100%, rgb(var(--color-accent-2) / 0.18), transparent 70%), linear-gradient(180deg, rgb(var(--color-bg)) 0%, rgb(var(--color-surface)) 100%)",
        "gradient-text": "linear-gradient(90deg, rgb(var(--color-accent)), rgb(var(--color-accent-2)))",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgb(var(--color-accent) / 0.4)" },
          "50%": { boxShadow: "0 0 30px 8px rgb(var(--color-accent) / 0.0)" },
        },
      },
      animation: {
        shimmer: "shimmer 2.2s linear infinite",
        "fade-in": "fade-in 0.4s ease-out both",
        "slide-up": "slide-up 0.5s cubic-bezier(0.22, 1, 0.36, 1) both",
        "glow-pulse": "glow-pulse 2.4s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
