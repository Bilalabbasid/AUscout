import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        carbon: "#0C0D10",
        "carbon-light": "#14151A",
        "carbon-lighter": "#1A1C22",
        orange: {
          court: "#FF5A1F",
          "court-hover": "#E64A0F",
        },
        steel: "#5B6472",
        ash: "#9CA0AB",
        white: "#FFFFFF",
      },
      fontFamily: {
        display: ["Archivo", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      letterSpacing: {
        expanded: "0.12em",
        "expanded-lg": "0.2em",
      },
      backgroundImage: {
        "reticle-pattern": "url('/reticle.svg')",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
        "pulse-orange": "pulseOrange 2s infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseOrange: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(255, 90, 31, 0.4)" },
          "50%": { boxShadow: "0 0 0 12px rgba(255, 90, 31, 0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
