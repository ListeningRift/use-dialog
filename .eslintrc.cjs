/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  plugins: ['prettier', '@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'prettier',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'no-console': 'error',
    'no-debugger': 'error',
    'prefer-const': ['warn', { destructuring: 'all', ignoreReadBeforeAssign: true }],

    // prettier
    'prettier/prettier': 'error',

    // import
    'import/first': 'error',
    'import/no-duplicates': 'error',
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
        pathGroups: [
          {
            pattern: 'vue',
            group: 'external',
            position: 'before'
          }
        ],
        pathGroupsExcludedImportTypes: ['type']
      }
    ],
    'import/no-unresolved': 'off',
    'import/no-named-as-default-member': 'off',

    // typescript
    "@typescript-eslint/no-explicit-any": 'off'
  },
  env: {
    browser: true,
    es2021: true,
    node: true
  }
}
