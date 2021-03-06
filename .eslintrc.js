module.exports = {
  root: true,

  env: {
    node: true
  },

  extends: ["plugin:vue/recommended"],

  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "keyword-spacing": ["error", { "before": true }],
    "no-var": "error",
    "comma-spacing": ["error", { "before": false, "after": true }],
    "array-bracket-spacing": ["error", "never"],
    semi: ["error", "always"],
    quotes: ["error", "double"],
  },

  parserOptions: {
    parser: '@typescript-eslint/parser'
  },

  'extends': [
    'plugin:vue/recommended',
    '@vue/typescript'
  ]
};
