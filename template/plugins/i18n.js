import Vue from 'vue'; // eslint-disable-line import/no-extraneous-dependencies
import VueI18n from 'vue-i18n';
{{#if i18nNumeral}}
import Numeral from 'numeral';

// Import locale for numeral browser render
{{#arrayOf i18nConfig 'FR,NL,BE,DE,ES,IT,IE'}}
import localFr from 'numeral/locales/fr'; // eslint-disable-line
{{/arrayOf}}
import localEn from 'numeral/locales/en-gb'; // eslint-disable-line
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
      {{#each i18nConfig as |value key|}}
      {{#if_eq key 'IE'}}      
      ie: store.state.localeMessage,      
      {{/if_eq}}
      {{#if_eq key 'FR'}}      
      fr: store.state.localMessage,      
      {{/if_eq}}
      {{#if_eq key 'DE'}}      
      de: store.state.localMessage,      
      {{/if_eq}}
      {{#if_eq key 'NL'}}      
      nl: store.state.localMessage,      
      {{/if_eq}}
      {{#if_eq key 'BE'}}      
      be: store.state.localMessage,      
      {{/if_eq}}
      {{#if_eq key 'ES'}}      
      es: store.state.localMessage,      
      {{/if_eq}}
      {{#if_eq key 'IT'}}      
      it: store.state.localMessage,      
      {{/if_eq}}
      {{/each}}      
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
    {{#each i18nConfig as |value key|}}
    {{#if_eq key 'FR'}}    
    case 'fr':
      numeralLocale = 'fr';
      break;    
    {{/if_eq}}
    {{#if_eq key 'NL'}}    
    case 'nl':
      numeralLocale = 'fr';
      break;    
    {{/if_eq}}
    {{#if_eq key 'BE'}}    
    case 'be':
      numeralLocale = 'fr';
      break;    
    {{/if_eq}}
    {{#if_eq key 'DE'}}    
    case 'de':
      numeralLocale = 'fr';
      break;    
    {{/if_eq}}
    {{#if_eq key 'IE'}}    
    case 'ie':
      numeralLocale = 'fr';
      break;    
    {{/if_eq}}
    {{#if_eq key 'ES'}}    
    case 'es':
      numeralLocale = 'fr';
      break;    
    {{/if_eq}}
    {{#if_eq key 'IT'}}    
    case 'it':
      numeralLocale = 'fr';
      break;    
    {{/if_eq}}
    {{/each}}                
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
