/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        logo: ["Fast Hand", "sans-serif"],
        spaceMission: ["SPACE MISSION"],
        momcake: ["Momcake", "sans-serif"],
        edge: ["Edge of the Galaxy", "sans-serif"],
        edgePoster: ["Edge of the Galaxy Poster", "sans-serif"],
        spaceQuest: ["Space Quest", "sans-serif"],
        spaceRave: ["Space Rave", "sans-serif"],
        raleway: ["Raleway", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      // {
      //   mytheme: {
      //     primary: "#27ccdf",
      //
      //     secondary: "#fadb31",
      //
      //     accent: "#ed3833",
      //
      //     neutral: "#021431",
      //
      //     "base-100": "#241556",
      //
      //     info: "#93E6FB",
      //
      //     success: "#6ded8a",
      //
      //     warning: "#ff5f85",
      //
      //     error: "#fe2a8d",
      //   },
      // },
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
    ],
    // darkTheme: "light",
  },
};
