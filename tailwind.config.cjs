/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        // Main background and surfaces
        'deep-slate': '#ffffff',
        'dark-surface': '#f8fafc',
        'border-gray': '#e5e7eb',

        // Text colors
        'primary-text': '#1f2937',
        'secondary-text': '#1f2937',
        'muted-text': '#64748b',

        // Accent Colors
        'electric-blue': '#2563eb',
        'vibrant-purple': '#7c3aed',
        'light-blue': '#0284c7',
        'bright-teal': '#0f766e',

        // Status Colors
        'success-green': '#16a34a',
        'amber-warning': '#ea580c',

        // Code Colors
        'code-background': '#f1f5f9',

        // Legacy colors kept for compatibility
        'clean-white': '#ffffff',
        'slate-blue': '#475569',
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
