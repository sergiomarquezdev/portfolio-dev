module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        // New Semantic Color Palette
        background: {
          DEFAULT: "#ffffff", // Formerly deep-slate and clean-white
          surface: "#f8fafc", // Formerly dark-surface
          code: "#f1f5f9", // Formerly code-background
        },
        text: {
          DEFAULT: "#1f2937", // Formerly primary-text and secondary-text
          muted: "#64748b", // Formerly muted-text
          slate: "#475569", // Formerly slate-blue
        },
        primary: {
          DEFAULT: "#2563eb", // Formerly electric-blue
          light: "#0284c7", // Formerly light-blue
        },
        secondary: {
          DEFAULT: "#7c3aed", // Formerly vibrant-purple
          teal: "#0f766e", // Formerly bright-teal
        },
        status: {
          success: "#16a34a", // Formerly success-green
          warning: "#ea580c", // Formerly amber-warning
        },
        syntax: {
          green: "#22c55e", // Formerly syntax-green
          purple: "#a855f7", // Formerly syntax-purple
        },
        border: {
          DEFAULT: "#e5e7eb", // Formerly border-gray
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
        avatar: "0 10px 15px -3px rgba(30, 58, 138, 0.3)",
        "card-hover": "0 25px 50px -12px rgba(30, 58, 138, 0.2)",
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
              color: theme("colors.primary.DEFAULT"),
              "&:hover": {
                color: theme("colors.primary.DEFAULT"),
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
