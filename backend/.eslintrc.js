module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended'
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
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
