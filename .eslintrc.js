// @ts-check

/** @typedef {import('eslint').Linter.Config} */
const config = {
  root: true,
  plugins: ['unicorn', '@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:unicorn/recommended',
    'next/core-web-vitals',
    'plugin:prettier/recommended',
  ],
  rules: {
    eqeqeq: 'error',
    'import/no-duplicates': 'error',
    'import/no-cycle': 'error',
    'unicorn/filename-case': [
      'error',
      {
        cases: {
          camelCase: true,
          pascalCase: true,
        },
      },
    ],
    'unicorn/no-null': 'off',
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal'],
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '*.css',
            group: 'internal',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: ['react'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    'unicorn/prevent-abbreviations': [
      'error',
      {
        ignore: ['Props', 'searchParams'],
      },
    ],
    'unicorn/no-useless-undefined': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
    'react-hooks/exhaustive-deps': 'off',
  },
  overrides: [
    {
      files: ['src/app/*'],
      rules: {
        'unicorn/filename-case': [
          'error',
          {
            cases: {
              kebabCase: true,
            },
          },
        ],
      },
    },
  ],
}

// eslint-disable-next-line unicorn/prefer-module
module.exports = config
