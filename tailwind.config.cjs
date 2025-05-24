/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1d4e89',
          light: '#2c6cb0',
          dark: '#123456',
        },
        secondary: {
          DEFAULT: '#34495e',
          light: '#4a6b8a',
          dark: '#2c3e50',
        },
        dark: {
          DEFAULT: '#111827', // Actualizado para un tono más suave
          card: '#1f2937',
          secondary: '#374151',
          primary: '#f9fafb',
          secondary: '#e5e7eb',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Roboto',
          'Oxygen',
          'Ubuntu',
          'Cantarell',
          'Fira Sans',
          'Droid Sans',
          'Helvetica Neue',
          'sans-serif',
        ],
        heading: [
          'Montserrat',
          'Gill Sans',
          'Segoe UI',
          'Helvetica Neue',
          'sans-serif',
        ],
        mono: ["Fira Code", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      backgroundColor: {
        dark: '#121212',
        'dark-card': '#1e1e1e',
      },
      textColor: {
        dark: {
          primary: '#e0e0e0',
          secondary: '#a0a0a0',
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
