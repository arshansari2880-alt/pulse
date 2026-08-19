import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#0A0C08",
          2: "#11140E",
          3: "#1A1F14",
        },
        accent: "#BAFF26",
        ink: "#F4F1EA",
        mute: "#8A8D80",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        meta: "0.08em",
      },
      borderRadius: {
        sheet: "16px",
        chip: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
