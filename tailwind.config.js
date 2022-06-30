/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        logo: ["Press Start", "sans-serif"],
        Roboto: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      // {
      //   mytheme: {
      //     "primary": "#00feff",
      //     "secondary": "#f0f14e",
      //     "accent": "#fe288d",
      //     "neutral": "#021431",
      //     "base-100": "#241556",
      //     "info": "#93E6FB",
      //     "success": "#6ded8a",
      //     "warning": "#EFD8BD",
      //     "error": "#ed3833",
      //   },
      // },
      "dracula"
    ],
  },
};
