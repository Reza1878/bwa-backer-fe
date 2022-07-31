const plugin = require("tailwindcss/plugin");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3B41E3",
        secondary: "#FF872E",
        success: "#1ABC9C",
      },
      fontFamily: {
        sans: ["Poppins", "'sans-serif'"],
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        ".header__bg": {
          "background-color": "#3B41E3",
          position: "absolute",
          top: "0",
          bottom: "0",
          left: "0",
          right: "0",
          width: "100%",
          "background-image": 'url("/image/auth-background.svg")',
          "background-position-x": "right",
          "background-position-y": "top",
          "background-repeat": "no-repeat",
        },
        ".decoration-secondary": {
          "text-decoration-color": "#1ABC9C",
        },
      };

      addUtilities(newUtilities);
    }),
  ],
};
