/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  theme: {
  extend: {
    animation: {
      scroll: "scrollLeft 25s linear infinite",
    },
    keyframes: {
      scrollLeft: {
        "0%": { transform: "translateX(0)" },
        "100%": { transform: "translateX(-50%)" }
      }
    }
  }
}
}