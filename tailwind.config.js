/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./*.md",
    "./_layouts/**/*.html",
    "./_includes/**/*.html",
    "./_services/**/*.md",
    "./_guides/**/*.md",
    "./_districts/**/*.md",
    "./content/**/*.md",
    "./assets/js/**/*.js",
    "./_posts/**/*.md"
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0F172A", // Nordic Slate (Slate-900)
          light: "#334155",   // Slate-700
          button: "#DC2626",  // Crimson Red (Red-600)
          accent: "#B91C1C",  // Darker Crimson (Red-700)
          hover: "#991B1B"    // Red-800
        },
        content: {
          accent: "#DC2626",
          light: "#EF4444"
        },
        // Semantic custom colors matching Design 12
        crimsonRed: "#DC2626",
        crimsonHover: "#B91C1C",
        darkSlate: "#0F172A",
        iceGrayBg: "#F8FAFC",
        "background-light": "#F8FAFC",
        "background-dark": "#0F172A",
        "text-light": "#334155", // Slate-700
        "text-dark": "#F8FAFC"
      },
      fontFamily: {
        display: ["Inter", "system-ui", "-apple-system", "BlinkMacSystemFont", "Roboto", "sans-serif"]
      }
    }
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/container-queries")
  ]
};
