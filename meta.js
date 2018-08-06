module.exports = {
  helpers: {
    raw: options => options.fn(this),
    arrayOf: function(v1, v2, options) {
      const v2Arr = v2.split(',');
      const result = Object.keys(v1).some(
        value => (v2Arr.indexOf(value) > -1 ? true : false)
      );
      return result ? options.fn(this) : options.inverse(this);
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
      required: true,
      message: 'Redis secret'
    },
    JWTSecret: {
      type: 'string',
      required: true,
      message: 'JWT secret'
    },
    multiSite: {
      type: 'confirm',
      message: 'Use Multi sites ?'
    },
    i18n: {
      type: 'confirm',
      message: 'Use vue-i18n ?'
    },
    i18nConfig: {
      when: 'i18n',
      type: 'checkbox',
      message: 'Additionals countries (EN by default) ?',
      choices: ['FR', 'DE', 'NL', 'IE', 'BE', 'ES', 'IT']
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
    },
    docs: {
      type: 'confirm',
      message: 'Use documentation ?'
    },
    GA: {
      type: 'confirm',
      message: 'Use Google Analytics ?'
    },
    GACode: {
      when: 'GA',
      type: 'string',
      required: true,
      message: 'Google Analytics tag code'
    }
  },
  filters: {
    'cli/**/*': 'i18n',
    'plugins/i18n.js': 'i18n',
    'middleware/i18n-parameter.js': 'i18n',
    'server/api/routes/interface-i18n.js': 'i18n',
    'pages/_lang/**/*': 'i18n',
    'plugins/element-ui.js': 'elementUi',
    'plugins/lodash.js': 'lodash',
    'jsdoc.json': 'docs',
    'plugins/ga.js': 'GA'
  },
  completeMessage:
    '{{#inPlace}}To get started:\n\n  npm install # Or yarn\n  npm run dev{{else}}To get started:\n\n  cd {{destDirName}}\n  npm install # Or yarn\n  npm run dev{{/inPlace}}'
};
