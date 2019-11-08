module.exports = {
  root: true,

  env: {
    node: true,
  },

  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'comma-dangle': ['error', 'always-multiline'],
    'array-element-newline': [
      'error',  {
        "multiline": true,
        "minItems": 2,
      },
    ],
    'array-bracket-newline': [
      'error',  {
        "multiline": true,
        "minItems": 2,
      },
    ],
    'array-bracket-spacing': ['error', 'never'],
    'object-curly-newline': [
      'error',  {
        'consistent': true,
      },
    ],
    'object-curly-spacing': ['error', 'always'],
  },

  parserOptions: {
    parser: 'babel-eslint',
  },

  extends: [
    'plugin:vue/essential',
    '@vue/standard',
  ],
}
