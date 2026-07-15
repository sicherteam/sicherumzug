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
          DEFAULT: "#064e3b", // emerald-900 (dark green)
          light: "#059669",   // emerald-600
          button: "#059669",
          accent: "#10b981"   // emerald-500
        },
        content: {
          accent: "#059669",
          light: "#047857"
        },
        "background-light": "#f8fafc",
        "background-dark": "#022c22", // emerald-950
        "text-light": "#1e293b",
        "text-dark": "#f8fafc"
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
