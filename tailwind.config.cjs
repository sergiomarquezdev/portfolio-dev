/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#22d3ee",
          light: "#67e8f9",
          dark: "#06b6d4",
        },
        secondary: {
          DEFAULT: "#334155",
          light: "#475569",
          dark: "#1e293b",
        },
        dark: {
          DEFAULT: "#0f172a",
          card: "#1e293b",
          text: "#94a3b8",
          primary: "#e2e8f0",
        },
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
      backgroundColor: {
        dark: "#0f172a",
        "dark-card": "#1e293b",
      },
      textColor: {
        dark: {
          primary: "#e2e8f0",
          secondary: "#94a3b8",
        },
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            a: {
              color: theme("colors.primary.DEFAULT"),
              "&:hover": {
                color: theme("colors.primary.dark"),
              },
            },
            "h1, h2, h3, h4, h5, h6": {
              fontWeight: 700,
              marginTop: "1.5em",
              marginBottom: "0.5em",
            },
            code: {
              color: theme("colors.primary.dark"),
              backgroundColor: theme("colors.gray.100"),
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
        dark: {
          css: {
            color: theme("textColor.dark.primary"),
            a: {
              color: theme("colors.primary.light"),
              "&:hover": {
                color: theme("colors.primary.DEFAULT"),
              },
            },
            "h1, h2, h3, h4, h5, h6": {
              color: theme("textColor.dark.primary"),
            },
            strong: {
              color: theme("textColor.dark.primary"),
            },
            code: {
              color: theme("colors.primary.light"),
              backgroundColor: theme("backgroundColor.dark-card"),
            },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
