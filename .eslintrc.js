module.exports = {
    env: {
      es6: true,
      node: true
    },
    extends: "eslint:recommended",
    globals: {
      Atomics: "readonly",
      SharedArrayBuffer: "readonly"
    },
    parserOptions: {
      ecmaVersion: 2018,
      sourceType: "module"
    },
    rules: {
        semi: 0,
        'import/no-unresolved': 'off',
        'comma-dangle': 'off',
        'no-new': 0,
        indent: ['error', 2],
        'import/extensions': 'off'
    }
  };