/* eslint-disable comma-dangle */
module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: ["standard", "plugin:react/recommended", "plugin:react/jsx-runtime"],
	overrides: [
		{
			env: {
				node: true,
			},
			files: [".eslintrc.{js,cjs}"],
			parserOptions: {
				sourceType: "script",
			},
		},
	],
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
	},
	plugins: ["react"],
	rules: {
		quotes: ["error", "double"],
		indent: ["error", "tab"],
		"no-tabs": ["off"],
		"react/prop-types": ["off"],
		"space-before-function-paren": ["off"],
		"comma-dangle": ["off"],
		"no-unused-vars": ["warn"],
	},
}
