/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'homeFont': ['Space Grotesk', 'sans'],
        'regularText': ['Inter', 'sans']
      }
    },
  },
  plugins: [],
};

