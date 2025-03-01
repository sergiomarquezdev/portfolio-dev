/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#3b82f6",
          dark: "#2563eb",
          light: "#60a5fa",
        },
        secondary: {
          DEFAULT: "#4b5563",
          dark: "#1f2937",
        },
        dark: {
          DEFAULT: "#111827", // Actualizado para un tono más suave
          card: "#1f2937",
          secondary: "#374151",
          primary: "#f9fafb",
          secondary: "#e5e7eb",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["Fira Code", "ui-monospace", "SFMono-Regular", "monospace"],
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
            color: theme("colors.dark.primary"),
            a: {
              color: theme("colors.primary.light"),
              "&:hover": {
                color: theme("colors.primary.DEFAULT"),
              },
            },
            "h1, h2, h3, h4, h5, h6": {
              color: theme("colors.dark.primary"),
            },
            strong: {
              color: theme("colors.dark.primary"),
            },
            code: {
              color: theme("colors.primary.light"),
              backgroundColor: theme("colors.dark.card"),
            },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
