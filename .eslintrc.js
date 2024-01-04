module.exports = {
  parser: '@typescript-eslint/parser',
  extends: '@wagtail/eslint-config-wagtail',
  globals: {
    window: true,
    document: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'react/function-component-definition': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.jsx', '.tsx'] }],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  // ESlint default behaviour ignores file/folders starting with "."
  // https://github.com/eslint/eslint/issues/10341
  ignorePatterns: ['!.*', 'node_modules', 'dist'],
};
