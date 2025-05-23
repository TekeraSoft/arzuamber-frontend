import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "480px",
      },

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
        background: "#ffffff",
        foreground: "#1f2937", // örnek: Tailwind gray-800
      },
      container: {
        center: true, // Ortada hizalamak için
        padding: "2rem", // Her iki tarafta padding ekler
        screens: {
          sm: "100%", // Küçük ekranlarda %100 genişlik
          md: "960px", // Orta ekranlarda genişlik sınırı
          lg: "1140px", // Büyük ekranlarda genişlik sınırı
          xl: "1280px", // Çok büyük ekranlarda genişlik sınırı
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
} satisfies Config;
