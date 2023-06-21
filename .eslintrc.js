// @ts-check

/** @typedef {import('eslint').Linter.Config} */
const config = {
  plugins: ['import', 'unicorn'],
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:unicorn/recommended',
    'next/core-web-vitals',
    'plugin:prettier/recommended',
  ],
  rules: {
    eqeqeq: 'error',
    'import/no-cycle': 'warn',
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
  },
}

module.exports = config
