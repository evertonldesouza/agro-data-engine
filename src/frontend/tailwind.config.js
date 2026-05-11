/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        agro: {
          green: '#2D5A27', 
          graphite: '#1C1C1C', 
        }
      }
    },
  },
  plugins: [],
}