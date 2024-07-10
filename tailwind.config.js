/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: "",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      spacing: {
        rem: "16px", // 1rem = 16px
      },
    },
  },
  plugins: [],
};
