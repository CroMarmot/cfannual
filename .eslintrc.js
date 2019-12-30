module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  // add your custom rules here
  rules: {
    'space-before-function-paren': 0,
    'object-curly-spacing': 0,
    'vue/html-closing-bracket-spacing': 0,
    'vue/no-unused-components': 1 // 方便注释调试
  }
}
