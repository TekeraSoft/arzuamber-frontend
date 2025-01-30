import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#441752",
        primaryLight: "#5C216B",
        primaryDark: "#310C3A",

        secondary: "#8174A0",
        secondaryLight: "#9A8BB6",
        secondaryDark: "#675B84",

        third: "#A888B5",
        thirdLight: "#C1A0CC",
        thirdDark: "#8F6E95",

        fourth: "#EFB6C8",
        fourthLight: "#F6CDD8",
        fourthDark: "#D89DAC",

        ratingcolor: "#FAAF00",

        mywhite: "#FFFFFF",
        myblack: "#000000",
      },
    },
  },
  plugins: [],
} satisfies Config;
