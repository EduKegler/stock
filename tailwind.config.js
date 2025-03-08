/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./index.html"],
  theme: {
    extend: {
      colors: {
        "custom-yellow": "#BAA333",
        primary: "#1bc461",
        // foreground: "#201f22",
        foreground: {
          muted: "#a4a8ab",
        },
      },
    },
  },
  plugins: [],
};
