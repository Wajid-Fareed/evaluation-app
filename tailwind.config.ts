import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        cta: "var(--cta)",
        ctaHover: "var(--ctaHover)",
        primary: "var(--primary)",
        light: "var(--light)",
      },
      screens: {
        xs: '480px',
        xsm: '380px'
      },
      fontSize: {
        10: '10px',
        11: '11px',
        12: '12px',
        13: '13px',
      }
    },
  },
  plugins: [],
};
export default config;
