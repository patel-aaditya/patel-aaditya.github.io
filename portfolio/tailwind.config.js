/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        void: "#07080d",
        forest: "#0d1f14",
        bruise: "#1a0f2e",
        violet: {
          soft: "#a78bfa",
          glow: "#c4b5fd",
          dim: "#7c3aed",
        },
        sage: "#6b8f71",
        ash: "#e2e8f0",
        mist: "#94a3b8",
        glass: "rgba(167,139,250,0.06)",
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
      },
      animation: {
        "spore-float": "sporeFloat 12s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4,0,0.6,1) infinite",
        "fade-in": "fadeIn 0.8s ease forwards",
      },
      keyframes: {
        sporeFloat: {
          "0%, 100%": { transform: "translateY(0) translateX(0) scale(1)", opacity: "0.4" },
          "33%": { transform: "translateY(-18px) translateX(8px) scale(1.05)", opacity: "0.7" },
          "66%": { transform: "translateY(-8px) translateX(-6px) scale(0.95)", opacity: "0.5" },
        },
        fadeIn: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
}
