/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0a66c2", // LinkedIn Blue
          light: "#4292d6",
          dark: "#004182",
        },
        accent: {
          DEFAULT: "#0a66c2", // Same as primary for consistency in business app
          light: "#4292d6",
          dark: "#004182",
        },
        platinum: {
          DEFAULT: "#e5e4e2",
          light: "#f5f5f3",
          dark: "#c4c3c0",
        },
        surface: {
          DEFAULT: "#f3f2ef", // LinkedIn Background Gray
          card: "#ffffff",    // White Cards
          hover: "#ebebeb",
        }
      },
      fontFamily: {
        sans: ['"SF Pro Display"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow': '0 0 10px rgba(10, 102, 194, 0.3)',
        'card': '0 0 0 1px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.05)', // Subtle card shadow
      }
    },
  },
  plugins: [],
};
