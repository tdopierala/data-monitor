module.exports = {
	root: true,
	env: { node: true },
	extends: ['plugin:vue/vue3-essential', 'eslint:recommended', '@vue/typescript/recommended', 'plugin:prettier/recommended'],
	parserOptions: {
		ecmaVersion: 2020,
	},
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',

		'prettier/prettier': ['error', {}, { usePrettierrc: true }],

		'spaced-comment': ['error', 'always'],
		'semi': ['error', 'always'],
		'semi-spacing': 'error',
		'no-extra-semi': 'error',
		'no-unexpected-multiline': 'error',
		'max-len': ['error', { code: 160 }],
		'comma-style': ['error', 'last'],
		'comma-dangle': ['error', 'always-multiline'],
		'indent': ['error', 'tab'],
		'space-infix-ops': 'error',
		'brace-style': 'error',
		'space-before-blocks': 'error',
		'keyword-spacing': 'error',
		'arrow-spacing': 'error',
		'space-before-function-paren': ['error', { anonymous: 'always', named: 'never', asyncArrow: 'always' }],

		'space-in-parens': ['error', 'never'],
		'array-bracket-spacing': ['error', 'never'],
		'object-curly-spacing': ['error', 'always'],

		'comma-spacing': ['error', { before: false, after: true }],
		'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1 }],
	},
	overrides: [
		{
			files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
			env: {
				jest: true,
			},
		},
	],
};
