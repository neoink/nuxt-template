import Vue from 'vue'; // eslint-disable-line import/no-extraneous-dependencies
import VueI18n from 'vue-i18n';
{{#if i18nNumeral}}
import Numeral from 'numeral';

// Import locale for numeral browser render
import localFr from 'numeral/locales/fr'; // eslint-disable-line
import localEn from 'numeral/locales/en-gb'; // eslint-disable-line
import localNl from 'numeral/locales/nl-nl'; // eslint-disable-line
{{/if}}

Vue.use(VueI18n);

export default ({ app, store, params }) => {
  const locale = params.lang || 'en';

  // Set locale
  store.commit('SET_LANG', locale);

  app.i18n = new VueI18n({
    locale: store.state.locale,
    fallbackLocale: 'en',
    messages: {
      en: store.state.localeMessage || require('~/server/lang/en-GB.json'), // eslint-disable-line global-require,
      ie: store.state.localeMessage,
      fr: store.state.localMessage,
      de: store.state.localMessage,
      nl: store.state.localMessage,
      be: store.state.localMessage
    }
  });

  app.i18n.path = link => {
    if (app.i18n.locale === app.i18n.fallbackLocale) {
      return `/${link}`;
    }

    return `/${app.i18n.locale}/${link}`;
  };
  {{#if i18nNumeral}}
  let numeralLocale;

  switch (params.lang) {
    case 'fr':
      numeralLocale = 'fr';
      break;
    case 'nl':
      numeralLocale = 'nl-nl';
      break;
    case 'be':
      numeralLocale = 'nl-nl';
      break;
    case 'de':
      numeralLocale = 'fr';
      break;
    default:
      numeralLocale = 'en-gb';
  }

  Numeral.locale(numeralLocale);

  Vue.filter('formatPrice', val => {
    const result = Numeral(val).format('0,0.00');
    return result;
  });
  {{/if}}
};
