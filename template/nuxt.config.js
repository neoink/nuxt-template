require('dotenv').config();

const { join } = require('path');
{{#if multiSite}}
// Multisite 🐫
const typeSite = process.env.TYPE_SITE || '';
{{/if}}

// __Global CSS vars setting 🐫
const globalCssVars = require('./assets/config/config_global');
{{#if multiSite}}
const typeCssVars = require(`./assets/config/config_${typeSite}`);
const CSSVars = _.merge(globalCssVars, typeCssVars);
{{else}}
const CSSVars = globalCssVars;
{{/if}}

module.exports = {
  /**
   * Middlewares
   */
  router: {
    middleware: [
      {{#if i18n}}
      'i18n-parameter'
      {{/if}}
    ],
  },
  /*
  ** Headers of the page
  */
  head: {
    title: 'starter',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#218DB0' },
  /**
   /*
  ** Loading Modules
  */
  modules: [
    {{#if deviceDetect}}
    'nuxt-device-detect',
    {{/if}}
    '@nuxtjs/axios',
    '~/modules/errorHandler'
  ],
  /**
   ** Axios setting
  */
  axios: {
    baseURL: 'http://127.0.0.1:3000/api/v1/',
    credentials: true,
    retry: {
      retries: 2,
      retryDelay: retryCount => retryCount * 2000,
      retryCondition: error => {
        const errorMap = [408, 503, 504];
        if (typeof error.response && errorMap.indexOf(error.response.status) !== -1) {
          return true;
        }
      },
    },
  },
  /*
  ** Global CSS
  */
  css: [join(__dirname, 'assets/css/normalize.css'), join(__dirname, 'assets/css/main.css')],
  /**
   ** Load plugin
   */
  plugins: [
    '~/vue.config.js',
    {{#if i18n}}
    '~/plugins/i18n.js',
    {{/if}}
    {{#if elementUi}}
    '~/plugins/element-ui',
    {{/if}}
    {{#if lodash}}
    '~/plugins/lodash',
    {{/if}}
    {{#if GA}}
    { src: '~/plugins/ga.js', ssr: false },
    {{/if}}
  ],
  /*
  ** Add axios globally
  */
  build: {
    analyze: false,
    /**
     * Vendor
     */
    vendor: [
      'axios',
      {{#if i18n}}
      'vue-i18n',
      {{/if}}
    ],
    // __Use for splitting files (https://github.com/nuxt/nuxt.js/pull/2687)
    maxChunkSize: 300000,
    publicPath: '/dist/', // __CDN config or rewrite path
    // __Lazyload Components
    babel: {
      plugins: [
        {{#if elementUi}}
        [
          'component',
          {
            libraryName: 'element-ui',
            styleLibraryName: 'theme-chalk',
          },
        ],
        {{/if}}
        {{#if lodash}}
        'lodash',
        {{/if}}
      ],
    },
    // __Extract CSS for production env
    extractCSS: {
      allChunks: true,
    },
    // __PostCSS setting
    postcss: [
      // eslint-disable-next-line
      require('postcss-cssnext')({        
        features: CSSVars, // 🐫
      }),
      require('postcss-nested')(), // eslint-disable-line global-require
      require('css-mqpacker')(), // eslint-disable-line global-require
    ],
    filenames: {
      app: '[name].[chunkhash].js',
    },
    /*
    ** Run ESLINT on save
    */
    extend (config, ctx) {
      const urlLoader = config.module.rules.find(rule => rule.loader === 'url-loader');
      urlLoader.test = /\.(png|jpe?g|gif)$/;

      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
};
