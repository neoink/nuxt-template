{{#if GA}}
import { gaErrorHandler } from './../utils/utils';
{{/if}}

export const state = () => ({
  locales: [
    'en',
    {{#each i18nConfig as |value key|}}
    {{#if_eq key 'FR'}}
    'fr',
    {{/if_eq}}
    {{#if_eq key 'DE'}}
    'de',
    {{/if_eq}}
    {{#if_eq key 'NL'}}
    'nl',
    {{/if_eq}}
    {{#if_eq key 'BE'}}
    'be',
    {{/if_eq}}
    {{#if_eq key 'IE'}}
    'ie',
    {{/if_eq}}
    {{#if_eq key 'ES'}}
    'es',
    {{/if_eq}}
    {{#if_eq key 'IT'}}
    'it',
    {{/if_eq}}
    {{/each}}
  ],
  locale: 'en',
  localMessage: {},
});

export const mutations = {
  SET_LANG(state, locale) {
    if (state.locales.indexOf(locale) !== -1) {
      state.locale = locale;
    }
  },  
};

export const actions = {
  async nuxtServerInit({ commit }, { app, params, error }) {
    try {
      if (typeof params.lang === 'undefined' || params.lang === 'en') {
        return false;
      }

      // Get i18n translation
      const { data } = await app.$axios.get('interface-i18n', {
        params: { lang: params.lang },
      });

      app.i18n.setLocaleMessage(params.lang, data);
      commit('SET_LOCALE_MESSAGES', data);
    } catch (err) {
      return error({
        message: err.response.data,
        statusCode: err.response.status,
      });
    }
  },
  async SAVE_IN_SESSION(state, { payload }) {
    try {
      await this.$axios.post('/set-session', payload);
    } catch (err) {
      {{#if GAReport}}
      gaErrorHandler('SAVE_IN_SESSION', err.response);
      {{/if}}
      throw new Error('SAVE_IN_SESSION Failed');
    }
  },  
};
