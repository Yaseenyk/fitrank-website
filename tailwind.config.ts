import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: "#1C1A33", soft: "#47445F", mute: "#6B6987" },
        paper: { DEFAULT: "#EFEDF9", deep: "#E6E3F5" },
        line: "#E3E0F2",
        // Same indigo-violet primary as the app (ADR 028).
        cobalt: { DEFAULT: "#6551F0", deep: "#4B38D6", wash: "#EFECFE" },
        // Band colours carry meaning: use them only for shortlist / review / hidden.
        shortlist: { DEFAULT: "#0E7C66", wash: "#DDF1EB" },
        review: { DEFAULT: "#B7791F", wash: "#F7ECD9" },
        hidden: { DEFAULT: "#8A94A6", wash: "#ECEEF2" },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "sans-serif"],
      },
      maxWidth: { page: "76rem" },
    },
  },
  plugins: [],
};

export default config;
