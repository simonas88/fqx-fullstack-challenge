module.exports = {
	"env": {
		"browser": true,
		"es2021": true,
	},
	"extends": [
		"eslint:recommended",
		"react-app",
		"react-app/jest",
		"plugin:react/recommended",
		"plugin:@typescript-eslint/recommended",
	],
	"parser": "@typescript-eslint/parser",
	"parserOptions": {
		"ecmaFeatures": {
			"jsx": true,
		},
		"ecmaVersion": 12,
		"sourceType": "module",
	},
	"plugins": [
		"react",
		"@typescript-eslint",
	],
	"rules": {
		"indent": ["warn", "tab", { SwitchCase: 1 }],
		"linebreak-style": ["warn", "unix" ],
		"quotes": ["warn", "double"],
		"semi": ["warn", "always"],
		"react/react-in-jsx-scope": ["off"],
		"@typescript-eslint/explicit-module-boundary-types": ["off"],
		"eol-last": ["warn", "always"],
		"comma-dangle": ["warn", "only-multiline"],
		"no-trailing-spaces": ["warn"]
	},
};
