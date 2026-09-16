/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./content/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#16294A",
          deep: "#0D1B33",
          soft: "#23406E",
          mist: "#6E82A6",
        },
        brass: {
          DEFAULT: "#C2A04A",
          light: "#D9BE78",
          deep: "#9A7C2E",
        },
        parchment: {
          DEFAULT: "#F7F3EA",
          warm: "#EFE7D6",
        },
      },
      fontFamily: {
        display: ["'Playfair Display'", "Georgia", "serif"],
        body: ["Karla", "system-ui", "sans-serif"],
      },
      maxWidth: {
        reading: "38rem",
      },
      boxShadow: {
        plate: "0 18px 50px -24px rgba(13, 27, 51, 0.55)",
      },
    },
  },
  plugins: [],
};
