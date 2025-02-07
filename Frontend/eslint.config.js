import nextPlugin from '@next/eslint-plugin-next'
import tseslint from '@typescript-eslint/eslint-plugin'
import tsparser from '@typescript-eslint/parser'

const config = [
	// Config for JavaScript files (including eslint.config.js)
	{
		files: ['**/*.js'],
		ignores: ['.next/**/*', 'node_modules/**/*'],
		rules: {
			semi: ['error', 'never'],
			// quotes: ['error', 'single'],
			quotes: ['error', 'single', { avoidEscape: true, allowTemplateLiterals: true }],
			//'indent': ['error', 'tab'],
			// 'arrow-parens': ['error', 'always'],
			'max-len': 'off',
			'arrow-parens': 'off',
			'object-curly-spacing': ['error', 'always']
		}
	},
	// Config for TypeScript/React files
	{
		files: ['**/*.{ts,tsx}'],
		ignores: ['.next/**/*', 'node_modules/**/*'],
		plugins: {
			'@typescript-eslint': tseslint,
			'@next/next': nextPlugin
		},
		languageOptions: {
			parser: tsparser,
			parserOptions: {
				project: './tsconfig.json'
			},
			ecmaVersion: 'latest',
			sourceType: 'module'
		},
		linterOptions: {
			reportUnusedDisableDirectives: true
		},
		rules: {
			semi: ['error', 'never'],
			// quotes: ['error', 'single'],
			quotes: ['error', 'single', { avoidEscape: true, allowTemplateLiterals: true }],

			'comma-dangle': ['error', 'never'],
			//'indent': ['error', 'tab'],
			// 'arrow-parens': ['error', 'always'],
			'arrow-parens': 'off',
			'jsx-quotes': ['error', 'prefer-double'],
			'max-len': 'off',
			'object-curly-spacing': ['error', 'always']
		}
	}
]

export default config
