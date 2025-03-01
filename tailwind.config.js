/** @type {import('tailwindcss').Config} */
export default {
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
    },
  },
  plugins: [],
}
