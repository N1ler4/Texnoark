/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        red: "text-red-500",
        blue: "#D55200",
      },
    },
  },
  plugins: [],
};
