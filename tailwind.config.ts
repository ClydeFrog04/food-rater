import type {Config} from 'tailwindcss';


const config: Config = {
  content:[
    "./src/**/*.{js,jsx,ts,tsx,mdx}",
    "./app/**/*.{js,jsx,ts,tsx,mdx}",
    "./components/**/*.{js,jsx,ts,tsx,mdx}",
  ],
  important:true,
  corePlugins:{
    preflight: false
  },
  darkMode: "class",
}

export default config;