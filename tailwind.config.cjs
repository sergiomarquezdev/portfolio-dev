/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        'deep-slate': '#0f172a',
        'electric-blue': '#0ea5e9',
        'clean-white': '#ffffff',
        'slate-blue': '#475569',
        'dark-surface': '#1e293b',
        'border-gray': '#334155',
        'vibrant-purple': '#8b5cf6',
        'success-green': '#10b981',
        'amber-warning': '#f59e0b',
        'primary-text': '#f1f5f9',
        'secondary-text': '#e2e8f0',
        'muted-text': '#94a3b8',
        'code-background': '#0f172a',
        'syntax-green': '#22c55e',
        'syntax-purple': '#a855f7',
      },
      spacing: {
        'xs': '8px',
        's': '16px',
        'm': '24px',
        'l': '32px',
        'xl': '48px',
        'xxl': '80px',
        '30': '120px',
      },
      fontSize: {
        'h1': ['48px', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'h2': ['32px', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'h3': ['24px', { lineHeight: '1.3', letterSpacing: '-0.005em' }],
        'h4': ['20px', { lineHeight: '1.4', letterSpacing: '0em' }],
        'body-lg': ['18px', { lineHeight: '1.6', letterSpacing: '0em' }],
        'body-reg': ['16px', { lineHeight: '1.6', letterSpacing: '0em' }],
        'small': ['14px', { lineHeight: '1.5', letterSpacing: '0em' }],
      },
      scale: {
        '103': '1.03',
      },
      boxShadow: {
        'avatar': '0 10px 15px -3px rgba(30, 58, 138, 0.3)',
        'card-hover': '0 25px 50px -12px rgba(30, 58, 138, 0.2)',
        'button': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
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
            color: theme("colors.secondary-text"),
            a: {
              color: theme("colors.electric-blue"),
              "&:hover": {
                color: theme("colors.electric-blue"),
              },
            },
            "h1, h2, h3, h4, h5, h6": {
              color: theme("colors.primary-text"),
              fontWeight: 700,
              marginTop: "1.5em",
              marginBottom: "0.5em",
            },
            strong: {
              color: theme("colors.primary-text"),
            },
            code: {
              color: theme("colors.electric-blue"),
              backgroundColor: theme("colors.dark-surface"),
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
