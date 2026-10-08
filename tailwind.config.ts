import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: "#14213D", soft: "#3B4763", mute: "#5E6880" },
        paper: { DEFAULT: "#F4F6F5", deep: "#E8ECEA" },
        line: "#D5DBD8",
        cobalt: { DEFAULT: "#2443B8", deep: "#1A3290", wash: "#E6EBFA" },
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
