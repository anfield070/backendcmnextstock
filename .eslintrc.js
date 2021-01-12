module.exports = {
	parser: '@typescript-eslint/parser',
	extends: [
		'airbnb-base',
		'plugin:@typescript-eslint/recommended',
		'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
		'plugin:prettier/recommended',
	],
	plugins: ['@typescript-eslint'],
	parserOptions: {
		ecmaVersion: 2018,
		sourceType: 'module',
	},
	rules: {
		'prefer-destructuring': 0,
		'import/prefer-default-export': 0,
		'import/extensions': 0,
		'lines-between-class-members': 0,
		'class-methods-use-this': 0,
		'no-useless-constructor': 0,
		'no-plusplus': 0,
		'no-underscore-dangle': 0,
		'no-return-assign': 0,
		'no-restricted-globals': 0,
		'import/no-unresolved': 0,
		'consistent-return': 0,
		'no-case-declarations': 0,
		'no-restricted-syntax': 0,
		'@typescript-eslint/camelcase': 0,
		'@typescript-eslint/no-unused-vars': 0,
		'no-console': [
			'error',
			{
				allow: ['warn', 'info', 'error'],
			},
		],
		'no-undef': 0,
		'@typescript-eslint/interface-name-prefix': 0,
		'@typescript-eslint/ban-ts-ignore': 0,
		'@typescript-eslint/explicit-function-return-type': 0,
	},
	settings: {
		'import/resolver': {
			node: {
				extensions: ['.js', '.jsx', '.ts', '.tsx'],
			},
		},
	},
};
