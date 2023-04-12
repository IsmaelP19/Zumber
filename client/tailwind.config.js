/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        "dark-blue": "#112D4E", // Background color
        "light-gray": "#D6DADB", // Letter color
        "gold": "#E7B10A", // Button color
        "dark-purple": "#3B1F6E", // Button Letter color
      },
    },
  },
  plugins: [],
};
