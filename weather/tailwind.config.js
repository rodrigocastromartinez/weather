/** @type {import('tailwindcss').Config} */
import tailwindCustomAppStylesPlugin from "tw-elements/dist/plugin.cjs"

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{html,js}",
    "./node_modules/tw-elements/dist/js/**/*.js"
  ],
  theme: {
    extend: {},
  },
  plugins: [tailwindCustomAppStylesPlugin],
  darkMode: "class"
}

