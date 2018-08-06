const resolve = require('path').resolve;

module.exports = {
  root: true,
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true,
  },
  extends: ['airbnb-base'],
  // required to lint *.vue files
  plugins: ['html'],
  // add your custom rules here
  rules: {
    'space-before-function-paren': ['error', 'never'],
    'function-paren-newline': ['error', 'consistent'],
    'linebreak-style': 0,
    'arrow-parens': ['error', 'as-needed'],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: false,
        optionalDependencies: false,
        peerDependencies: false,
      },
    ],
    'import/no-unresolved': 2,
    'import/no-dynamic-require': 0,
    'no-shadow': 'off',
    'no-param-reassign': ['error', { props: false }],
    'consistent-return': 0,
    'no-mixed-operators': [
      'error',
      {
        groups: [
          ['+', '-', '*', '/', '%', '**'],
          ['&', '|', '^', '~', '<<', '>>', '>>>'],
          ['==', '!=', '===', '!==', '>', '>=', '<', '<='],
          ['&&', '||'],
          ['in', 'instanceof'],
        ],
        allowSamePrecedence: true,
      },
    ],
  },
  globals: {},
  settings: {
    'import/resolver': {
      webpack: {
        config: {
          resolve: {
            alias: {
              '~': __dirname,
              static: resolve(__dirname, 'static'),
              '~static': resolve(__dirname, 'static'),
              assets: resolve(__dirname, 'assets'),
              '~assets': resolve(__dirname, 'assets'),
              '~plugins': resolve(__dirname, 'plugins'),
              '~store': resolve(__dirname, '.nuxt/store'),
              '~router': resolve(__dirname, '.nuxt/router'),
              '~pages': resolve(__dirname, 'pages'),
              '~components': resolve(__dirname, 'components'),
              '~modules': resolve(__dirname, 'modules'),
            },
          },
        },
      },
    },
  },
};
