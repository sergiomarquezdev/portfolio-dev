/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        'fondo-principal': '#030712',
        'fondo-secundario': '#111827',
        'fondo-tarjetas': 'rgba(17, 24, 39, 0.8)',
        'fondo-hover': '#374151',
        'texto-principal': '#F9FAFB',
        'texto-secundario': '#D1D5DB',
        'texto-desactivado': '#A1A1AA',
        'texto-sutil': '#6B7280',
        'azul-principal': '#60A5FA',
        'azul-hover': '#3B82F6',
        'azul-oscuro': '#2563EB',
        'cian-acento': '#67E8F9',
        'cian-secundario': '#22D3EE',
        'borde-principal': '#374151',
        'borde-secundario': '#1F2937',
        'borde-hover': 'rgba(96, 165, 250, 0.6)',
        'badge-fondo': 'rgba(30, 58, 138, 0.5)',
        'badge-texto': '#93C5FD',
        'badge-borde': 'rgba(96, 165, 250, 0.3)',
      },
      spacing: {
        'xs': '8px',
        's': '16px',
        'm': '24px',
        'l': '32px',
        'xl': '48px',
        'xxl': '80px',
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
            color: theme("colors.texto-secundario"),
            a: {
              color: theme("colors.cian-acento"),
              "&:hover": {
                color: theme("colors.azul-principal"),
              },
            },
            "h1, h2, h3, h4, h5, h6": {
              color: theme("colors.texto-principal"),
              fontWeight: 700,
              marginTop: "1.5em",
              marginBottom: "0.5em",
            },
            strong: {
              color: theme("colors.texto-principal"),
            },
            code: {
              color: theme("colors.cian-acento"),
              backgroundColor: theme("colors.fondo-secundario"),
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
