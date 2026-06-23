// export default {
//   content: ["./index.html", "./src/**/*.{js,jsx}"],
//   theme: {
//     extend: {
//       colors: { brand: { DEFAULT: "#0c831f", dark: "#066b18", light: "#e6f5e8" }, accent: "#ff5200" },
//       fontFamily: { sans: ["Inter", "system-ui", "sans-serif"] },
//     },
//   },
//   plugins: [],
// };



/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class', // Important for dark mode support
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#0c831f",
          dark: "#066b18",
          light: "#e6f5e8",
          50: "#f0f9f2",
          100: "#d1f0d8",
          500: "#0c831f",
          600: "#0a6f1a",
          700: "#066b18",
        },
        accent: {
          DEFAULT: "#ff5200",
          dark: "#e64a00",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        'soft': '0 10px 15px -3px rgb(0 0 0 / 0.05), 0 4px 6px -4px rgb(0 0 0 / 0.05)',
      }
    },
  },
  plugins: [],
};