module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: ['react-app', 'eslint:recommended', 'eslint-config-react-app'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['tsconfig.json'],
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['@typescript-eslint', 'import'],
  rules: {
    quotes: ['warn', 'single'],
    'import/no-unresolved': 0,
    'import/no-default-export': 0,
    'no-any': 0,
    'explicit-module-boundary-types': 0,
    'valid-describe-callback': 0,
    'no-unused-expressions': 0,
    'import/order': [
      'warn',
      {
        'newlines-between': 'always',
        groups: ['builtin', 'external', 'internal'],
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before',
          },
        ],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
  },
};
