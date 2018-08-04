module.exports = {
  helpers: {
    raw: function(options) {
      return options.fn(this);
    }
  },
  prompts: {
    name: {
      type: 'string',
      required: true,
      message: 'Project name'
    },
    description: {
      type: 'string',
      required: false,
      message: 'Project description',
      default: 'Nuxt.js project'
    },
    author: {
      type: 'string',
      message: 'Author'
    },
    redisSecret: {
      type: 'string',
      message: 'redis secret'
    },
    multiSite: {
      type: 'confirm',
      message: 'Use Multi sites ?'
    },
    i18n: {
      type: 'confirm',
      message: 'Use vue-i18n ?'
    },
    i18nNumeral: {
      when: 'i18n',
      type: 'confirm',
      message: 'I18n: Use NumeralJs ?'
    },
    elementUi: {
      type: 'confirm',
      message: 'Use element-ui ?'
    },
    lodash: {
      type: 'confirm',
      message: 'Use lodash ?'
    },
    deviceDetect: {
      type: 'confirm',
      message: 'Use nuxt-device-detect ?'
    }
  },
  filters: {
    'cli/**/*': 'i18n',
    'plugins/i18n.js': 'i18n',
    'middleware/i18n-parameter.js': 'i18n',
    'server/api/routes/interface-i18n.js': 'i18n',
    'pages/_lang/**/*': 'i18n',
    'plugins/element-ui.js': 'elementUi',
    'plugins/lodash.js': 'lodash'
  },
  completeMessage:
    '{{#inPlace}}To get started:\n\n  npm install # Or yarn\n  npm run dev{{else}}To get started:\n\n  cd {{destDirName}}\n  npm install # Or yarn\n  npm run dev{{/inPlace}}'
};
