/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        // Palette from RESTYLE.md
        background: {
          DEFAULT: "#ffffff", // Pure White
          surface: "#f8fafc", // Light Gray
          code: "#f1f5f9",    // Code Light
        },
        text: {
          DEFAULT: "#1f2937", // Rich Charcoal
          muted: "#64748b",   // Slate Gray
        },
        border: {
          DEFAULT: "#e5e7eb", // Border Gray
        },
        primary: {
          DEFAULT: "#0f766e", // Deep Teal
        },
        secondary: {
          blue: "#2563eb",    // Professional Blue (for links)
          purple: "#7c3aed",  // AI Purple
          cloud: "#0284c7",   // Cloud Blue
        },
        status: {
          success: "#16a34a",
          warning: "#ea580c",
        },
        accent: {
          cta: "#ea580c",      // Warm Orange
          success: "#16a34a",  // Success Green
          pink: "#db2777",     // For Purple-to-Pink gradient
        },
      },
      spacing: {
        xs: "8px",
        s: "16px",
        m: "24px",
        l: "32px",
        xl: "48px",
        xxl: "80px",
        30: "120px",
      },
      fontSize: {
        h1: ["48px", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        h2: ["32px", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        h3: ["24px", { lineHeight: "1.3", letterSpacing: "-0.005em" }],
        h4: ["20px", { lineHeight: "1.4", letterSpacing: "0em" }],
        "body-lg": ["18px", { lineHeight: "1.6", letterSpacing: "0em" }],
        "body-reg": ["16px", { lineHeight: "1.6", letterSpacing: "0em" }],
        small: ["14px", { lineHeight: "1.5", letterSpacing: "0em" }],
      },
      scale: {
        103: "1.03",
      },
      boxShadow: {
        avatar: "0 10px 15px -3px rgba(15, 118, 110, 0.3)", // Adjusted to new primary color
        "card-hover": "0 25px 50px -12px rgba(15, 118, 110, 0.2)", // Adjusted to new primary color
        button: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Roboto",
          "Oxygen",
          "Ubuntu",
          "Cantarell",
          "Fira Sans",
          "Droid Sans",
          "Helvetica Neue",
          "sans-serif",
        ],
        heading: ["Montserrat", "Gill Sans", "Segoe UI", "Helvetica Neue", "sans-serif"],
        mono: ["Fira Code", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme("colors.text.DEFAULT"),
            a: {
              color: theme("colors.secondary.blue"),
              "&:hover": {
                color: theme("colors.secondary.blue"),
              },
            },
            "h1, h2, h3, h4, h5, h6": {
              color: theme("colors.text.DEFAULT"),
              fontWeight: 700,
              marginTop: "1.5em",
              marginBottom: "0.5em",
            },
            strong: {
              color: theme("colors.text.DEFAULT"),
            },
            code: {
              color: theme("colors.primary.DEFAULT"),
              backgroundColor: theme("colors.background.code"),
              borderRadius: "0.25rem",
              padding: "0.25rem 0.5rem",
              fontWeight: 500,
            },
            "code::before": {
              content: '""',
            },
            "code::after": {
              content: '""',
            },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};