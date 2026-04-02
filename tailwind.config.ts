import type { Config } from "tailwindcss";
import { AppColours } from "./src/app/lib/AppColours";
import colors from "tailwindcss/colors";

const config: Config = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx,mdx}",
        "./app/**/*.{js,jsx,ts,tsx,mdx}",
        "./components/**/*.{js,jsx,ts,tsx,mdx}",
    ],
    important: true,
    corePlugins: {
        preflight: false,
    },
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                grey: colors.gray,
                primary: {
                    main: AppColours.seaGreen,
                },
                secondary: {
                    main: AppColours.deepSkyBlue,
                },
                seaGreen: AppColours.seaGreen,
                deepSkyBlue: AppColours.deepSkyBlue,
                frostedBlue: AppColours.frostedBlue,
                mutedTeal: AppColours.mutedTeal,
                jetBlack: AppColours.jetBlack,
                goldenApricot: AppColours.goldenApricot,
            },
        },
    },
};

export default config;
