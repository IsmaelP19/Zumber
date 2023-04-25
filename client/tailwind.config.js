/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      width: {
        "102": "26rem",
        "104": "28rem",
        "106": "30rem",
        "108": "32rem",
        "110": "34rem",
        "112": "36rem",
        "114": "38rem",
        "116": "40rem",
        "118": "42rem",
        "120": "44rem",
      },
      height: {
        "screen-90": "90vh",
        "screen-80": "80vh",
        "screen-70": "70vh",
        "screen-60": "60vh",
        "screen-50": "50vh",
        "screen-40": "40vh",
      },
      colors: {
        "dark-blue": "#112D4E", // Background color
        "light-blue": "#EAF2FA", // Background color
        "medium-blue": "#5895DA", // Card color
        "light-gray": "#D6DADB", // Letter color
        "gold": "#E7B10A", // Button color
        "dark-purple": "#3B1F6E", // Button Letter color
      },
    },
  },
  plugins: [],
};
