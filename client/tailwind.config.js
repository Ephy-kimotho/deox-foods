/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        openSans: ["Open Sans", "sans-serif"],
        montserrat: ["Montserrat", "sana-serif"],
      },
      colors: {
        cream: "#e3d5ca",
        gray: {
          100: "#fafafa",
          200: "#faf9f7",
          300: "#f2f2f2",
          400: "#f3f7fa",
          500: "#bcc2d2",
          600: "#7d7d7d",
        },
        red: {
          100: "#E63946",
          200: "#f5444a",
          300: "#f7705a",
        },
        orange: {
          100: "#ff9763",
          200: "#f57710",
          300: "#fd661d",
        },
        night: {
          100: "#15181f",
          200: "#1a4383",
        },
      },
    },
  },
  plugins: [],
};
