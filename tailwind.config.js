/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        momcake: ["Momcake", "sans-serif"],
        spaceRave: ["Space Rave", "sans-serif"],
        raleway: ["Raleway", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui"), require("@tailwindcss/typography")],
  daisyui: {
    themes: [
      {
        mytheme: {
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
    // darkTheme: "light",
  },
};
