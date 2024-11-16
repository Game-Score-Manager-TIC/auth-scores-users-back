import type { Config } from "tailwindcss";
import { iconsPlugin, getIconCollections } from "@egoist/tailwindcss-icons";
import { nextui } from "@nextui-org/react";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "d-blue": "#18192F",
        "d-green": "#4CCB87",
        "d-red": "#cb4c4c",
        'd-gray': '#E5E7EB',
        "d-saphire-50": "#18192F",
        "d-gold-20": "#FAAF3A",
        "d-black-20": "#18192F",
        "d-pearl-100-75": "#FFFFFFBF",
        "d-sapphire-20": "#282B4F",
      },
      backgroundImage: {
        "gradient-1": "linear-gradient(to top, #18192F, #2B2F58)",
        "gradient-2": "linear-gradient(to right, #18192F, #2B2F58)",
        "gradient-3": "linear-gradient(to bottom, #977DFE, #63C5FA)",
        "gradient-4": "linear-gradient(to bottom, #18192F, #2B2F58)",
        "gradient-5": "linear-gradient(to left, #18192F, #2B2F58)",

      },
      fontSize: {
        heading1: "70px",
        heading2: "58px",
        heading3: "48px",
        heading4: "42px",
        paragraph1: "30px",
        paragraph2: "20px",
        paragraph3: "16px",
        paragraph4: "14px",
        label1: "0.8rem",
        label2: "8px",
      },
    },
  },
  plugins: [
    iconsPlugin({
      collections: getIconCollections(["mdi"]),
    }),
    nextui(),
  ],
};

export default config;
