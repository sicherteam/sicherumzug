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
    // Container'ı extend dışına alıyoruz çünkü temel bir yapılandırma
    container: {
      center: true,
      padding: {
        DEFAULT: "1.5rem",
        lg: "2rem",
      },
    },

    extend: {
      /* =====================================================
         COLORS (RGB Bridge for Opacity Support)
      ====================================================== */
      colors: {
        // 'rgb(var(--color-name) / <alpha-value>)' kullanımı 
        // bg-primary/50 gibi opacity sınıflarının çalışmasını sağlar.
        background: "rgb(var(--color-bg) / <alpha-value>)",
        surface: {
          DEFAULT: "rgb(var(--color-surface) / <alpha-value>)",
          soft: "rgb(var(--color-surface-soft) / <alpha-value>)",
          elevated: "rgb(var(--color-surface-2) / <alpha-value>)",
          card: "rgb(var(--color-card) / <alpha-value>)",
        },
        border: {
          DEFAULT: "rgb(var(--color-border) / <alpha-value>)",
          light: "rgb(var(--color-border-light) / <alpha-value>)",
        },
        text: {
          DEFAULT: "rgb(var(--color-text) / <alpha-value>)",
          soft: "rgb(var(--color-text-soft) / <alpha-value>)",
          muted: "rgb(var(--color-text-muted) / <alpha-value>)",
        },
        primary: {
          DEFAULT: "rgb(var(--color-primary) / <alpha-value>)",
          hover: "rgb(var(--color-primary-hover) / <alpha-value>)",
          soft: "rgb(var(--color-primary-soft) / <alpha-value>)",
        },
        success: "rgb(var(--color-success) / <alpha-value>)",
        danger: "rgb(var(--color-danger) / <alpha-value>)",
        warning: "rgb(var(--color-warning) / <alpha-value>)",
        info: "rgb(var(--color-info) / <alpha-value>)",
      },

      /* =====================================================
         TYPOGRAPHY
      ====================================================== */
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        display: ["Inter", "system-ui", "sans-serif"],
      },

      /* =====================================================
         RADIUS (Mapped to CSS Variables)
      ====================================================== */
      borderRadius: {
        xs: "var(--radius-xs)",
        sm: "var(--radius-sm)",
        DEFAULT: "var(--radius)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        "2xl": "var(--radius-2xl)",
        full: "var(--radius-full)",
      },

      /* =====================================================
         SHADOWS (Mapped to CSS Variables)
      ====================================================== */
      boxShadow: {
        xs: "var(--shadow-xs)",
        soft: "var(--shadow-sm)",
        DEFAULT: "var(--shadow)",
        large: "var(--shadow-lg)",
        xl: "var(--shadow-xl)",
        glow: "0 0 40px rgb(var(--color-primary) / 0.18)", // Dinamik glow
      },

      /* =====================================================
         ANIMATION & KEYFRAMES
      ====================================================== */
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        }
      },
      animation: {
        marquee: "marquee 25s linear infinite",
        fadeUp: "fadeUp 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)",
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 1.6s infinite",
      },
    },
  },

  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/container-queries"),
    require("@tailwindcss/typography"), // Zengin metinler (richtext) için önemli
  ],
};
