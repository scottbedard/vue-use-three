module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
    node: true,
  },
  overrides: [
    {
      extends: [
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
      ],
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
      plugins: [
        '@typescript-eslint',
      ],
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      modules: true,
    },
    ecmaVersion: 2017,
    sourceType: 'module',
  },
  plugins: [
    'markdown',
    'jest',
  ],
  root: true,
  rules: {
    'brace-style': 'error',
    'comma-dangle': ['error', 'always-multiline'],
    'curly': 'error',
    'eol-last': ['error', 'always'],
    'indent': ['error', 2],
    'keyword-spacing': 'error',
    'semi': ['error', 'always', { omitLastInOneLineBlock: true }],
    'space-before-function-paren': ['error', 'never'],
  },
};
