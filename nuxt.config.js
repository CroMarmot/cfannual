export default {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    title: '我的Codeforces年度报告',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    '~/assets/css/global.scss',
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~plugins/filters.js',
    '~plugins/globle.js',
    { src: '~/plugins/i18n.js' },
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // Doc: https://i18n.nuxtjs.org/setup
    ['nuxt-i18n',
      {
        langDir: './i18n/',
        lazy: true,
        strategy: 'prefix_except_default',
        locales: [
          {
            code: 'en', iso: 'en-US', file: 'en.js', name: 'English',
          },
          {
            code: 'zh', iso: 'zh-CN', file: 'zh.js', name: '中文',
          },
        ],
        defaultLocale: 'zh',
        detectBrowserLanguage: {
          useCookie: true,
          alwaysRedirect: true,
          fallbackLocale: 'zh',
          onlyOnRoot: true,
        },
      },
    ],
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: { },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    },
  },
  router: {
    base: '/cfannual/',
    mode: 'hash',
  },
}
