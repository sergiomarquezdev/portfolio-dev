/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#22d3ee",
          light: "#a5f3fc",
          dark: "#06b6d4",
          "text-on-button": "#ffffff",
        },
        secondary: {
          DEFAULT: "#94a3b8",
          light: "#cbd5e1",
          dark: "#64748b",
        },
        body: "#0f172a",
        card: "#1e293b",
        "text-main": "#e2e8f0",
        "text-muted": "#94a3b8",
        link: "#a5f3fc",
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
            color: theme("colors.text-main"),
            a: {
              color: theme("colors.link"),
              "&:hover": {
                color: theme("colors.primary.DEFAULT"),
              },
            },
            "h1, h2, h3, h4, h5, h6": {
              color: theme("colors.text-main"),
              fontWeight: 700,
              marginTop: "1.5em",
              marginBottom: "0.5em",
            },
            strong: {
              color: theme("colors.text-main"),
            },
            code: {
              color: theme("colors.primary.light"),
              backgroundColor: theme("colors.card"),
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
