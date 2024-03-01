/** @type {import('tailwindcss').Config} */

import theme from "tailwindcss/defaultTheme"

// const defaultTheme = require("tailwindcss/defaultTheme")

export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Inter", ...theme.fontFamily.sans],
			},
			backgroundImage: (theme) => ({
				image: "url('/images/header-calendar2.jpg')",
			}),
		},
		fontFamily: {
			passionOne: ["Passion One", ...theme.fontFamily.sans],
		},
	},
	plugins: [],
}
