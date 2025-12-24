/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Cores padrão Android Material
        android: {
          blue: '#1a73e8',
          dark: '#202124',
          gray: '#5f6368',
          bg: '#f8f9fa'
        }
      }
    },
  },
  plugins: [],
}