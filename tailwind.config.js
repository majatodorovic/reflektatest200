/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/****/***/**/*.{js,ts,jsx,tsx}",
    "./pages/***/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./pages/*.{js,ts,jsx,tsx}",
    "./components/****/***/**/*.{js,ts,jsx,tsx}",
    "./_components/****/***/**/*.{js,ts,jsx,tsx}",
    "./components/***/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/****/***/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        "3xl": "1680px",
        "4xl": "1920px",
      },
      gridTemplateRows: {
        7: "repeat(7, minmax(0, 1fr))",
        8: "repeat(8, minmax(0, 1fr))",
        9: "repeat(9, minmax(0, 1fr))",
        10: "repeat(10, minmax(0, 1fr))",
        11: "repeat(11, minmax(0, 1fr))",
        12: "repeat(12, minmax(0, 1fr))",
      },
      colors: {
        "croonus-1": "#0B0C10",
        "croonus-2": "#1d2b3d",
        "croonus-3": "#f15923",
        "croonus-4": "#66FCF1",
        "croonus-5": "#45A29E",
        "croonus-gray": "#f0f0f080",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/container-queries"),
  ],
};
