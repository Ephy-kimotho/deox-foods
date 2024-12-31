export default {
  content: ["/index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        openSans: ["Open Sans", "sans-serif"],
        montserrat: ["Montserrat", "sana-serif"],
      },
      colors: {
        gray: {
          100: "#fafafa",
          200: "#faf9f7",
          300: "#f2f2f2",
          400: "#f3f7fa",
          500: "#bcc2d2",
          600: "#7d7d7d",
          700: "#2C3E50",
        },
        red: {
          100: "#ED2939",
        },
        orange: {
          100: "#ff9763",
          200: "#f57710",
          300: "#fd661d",
        },
        night: {
          100: "#15181f",
          200: "#1f232e",
        },
      },
      width: {
        100: "100px",
      },
    },
  },
  plugins: [],
};
