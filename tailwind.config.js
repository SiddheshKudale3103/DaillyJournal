/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        neon: {
          pink: "#ff2cdf",
          blue: "#4cc9f0",
          purple: "#8a2be2",
        }
      }
    },
  },
  plugins: [],
}
