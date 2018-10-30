module.exports = {
  extends: ['airbnb-base', 'plugin:jest/recommended'],
  plugins: ['jest'],
  rules: {
    'no-use-before-define': ['error', { functions: false }],
    'no-underscore-dangle': 'off',
    'no-param-reassign': 'off',
    'max-len': [
      'error',
      {
        code: 160,
        tabWidth: 2,
        ignoreComments: true,
        ignoreUrls: true
      }
    ]
  },
  parser: 'babel-eslint',
  parserOptions: {
    allowImportExportEverywhere: true,
    ecmaFeatures: {
      ecmaVersion: 2017,
      impliedStrict: true
    }
  },
  env: {
    browser: true
  },
  overrides: [
    {
      files: ['packages/**/*spec.js'],
      rules: {
        'max-len': [
          'error',
          {
            code: 80,
            tabWidth: 2,
            ignorePattern: '^\\s*it\\(',
            ignoreComments: true,
            ignoreUrls: true
          }
        ]
      },
      globals: {
        describe: true,
        beforeEach: true,
        inject: true,
        it: true,
        test: true,
        expect: true,
        afterEach: true
      },
      env: {
        'jest/globals': true
      }
    }
  ]
};
