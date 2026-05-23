/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        military: {
          bg: '#0a0f14',
          surface: '#121a24',
          accent: '#c5a46e',
          text: '#ffffff',
          muted: '#a0aec0',
        },
      },
    },
  },
  plugins: [],
};