/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", ...defaultTheme.fontFamily.sans],
        geo: ["Geo", ...defaultTheme.fontFamily.sans],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      animation: {
        wiggle: "wiggle 1s ease-in-out infinite",
        tilt: "tilt 10s infinite linear",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": {
            transform: "rotate(-3deg)",
          },
          "50%": {
            transform: "rotate(3deg)",
          },
        },
        tilt: {
          "0%, 50%, 100%": {
            transform: "rotate(0deg)",
          },
          "25%": {
            transform: "rotate(0deg)",
          },
          "75%": {
            transform: "rotate(-0deg)",
          },
        },
      },
    },
  },
  plugins: [
    require("daisyui"),
    require("tailwindcss-fluid-type"),
    require("@tailwindcss/typography"),
  ],
  daisyui: {
    themes: [
      "coffee",
      "cyberpunk",
      "emerald",
      "luxury",
      "synthwave",
      "valentine",
      {
        mrfisch: {
          primary: "#61d2e4",
          secondary: "#fadb31",
          accent: "#ef4444",
          neutral: "#1c1f37",
          "base-100": "#141627",
          info: "#93E6FB",
          success: "#6ded8a",
          warning: "#ff5f85",
          error: "#ed3833",
        },
      },
    ],
  },
};
