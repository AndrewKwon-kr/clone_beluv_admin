module.exports = {
  root: true,

  env: {
    node: true,
  },

  plugins: ['vuetify'],

  extends: 'vuetify',

  parserOptions: {
    parser: '@babel/eslint-parser'
  },

  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    // https://github.com/babel/babel-eslint/issues/681#issuecomment-420663038
    'template-curly-spacing': 'off',
    indent: 'off',
    //
    'no-unused-vars': 'warn',
    "prettier/prettier": ['error', {
      singleQuote: true,
      semi: true,
      useTabs: true,
      tabWidth: 2,
      trailingComma: 'all',
      printWidth: 80,
      bracketSpacing: true,
      arrowParens: 'avoid',
  }]
  },

  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],
}
