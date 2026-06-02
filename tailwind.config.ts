import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0A0A0A",
        foreground: "#F8F3E7",
        brand: {
          black: "#0A0A0A",
          gold: "#D4AF37",
          cream: "#F8F3E7",
          chocolate: "#3A2314"
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        serif: ['var(--font-playfair)', 'serif'],
      }
    },
  },
  plugins: [],
} satisfies Config;
