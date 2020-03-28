export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    htmlAttrs: {
      prefix: 'og: http://ogp.me/ns#'
    },
    title: process.env.npm_package_name || 'vrcsnap',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || 'VRCSnap!はTwitterからVRChatのスナップっぽい画像を収集するサイトです' },
      { hid: 'keywords', name: 'keywords', content: 'VRChat, VRC, VRチャット, VR, fahsion, ファッション, Snap, スナップ, photo, 写真', 'xml:lang': 'ja', lang: 'ja' },
      { hid: 'og:site_name', property: 'og:site_name', content: 'VRCSnap' },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:url', property: 'og:url', content: 'https://vrcsnap.com' },
      { hid: 'og:title', property: 'og:title', content: 'VRCSnap' },
      { hid: 'og:description', property: 'og:description', content: process.env.npm_package_description || 'VRCSnap!はTwitterからVRChatのスナップっぽい画像を収集するサイトです' },
      { hid: 'og:image', property: 'og:image', content: 'https://vrcsnap.com/ogp/mainLogo.jpg' },
      { hid: 'twitter:site', name: 'twitter:site', content: '@knotted221' },
      { hid: 'msapplication-TileColor', name: 'msapplication-TileColor', content: '#f3f3f3' },
      { hid: 'theme-color', name: 'theme-color', content: '#f3f3f3' },
      { hid: 'apple-mobile-web-app-title', name: 'apple-mobile-web-app-title', content: 'VRCSnap' },
      { hid: 'application-name', name: 'application-name', content: 'VRCSnap' }
    ],
    script: [
      { src: 'https://platform.twitter.com/widgets.js' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/amplify.js', mode: 'client' },
    { src: '~/plugins/infiniteloading', mode: 'client' },
    { src: '~/plugins/twitter-text', mode: 'server' },
    { src: '~/plugins/vue-awesome-swiper', mode: 'client' },
    { src: '~/plugins/vue-scrollto', mode: 'server' },
    { src: '~/plugins/ga.js', mode: 'client' }
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
    'vue-scrollto/nuxt',
    '@nuxtjs/sitemap'
  ],
  sitemap: {
    path: '/sitemap.xml',
    hostname: 'https://vrcsnap.com',
    cacheTime: 1000 * 60 * 15,
    gzip: true,
    generate: true
  },
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
