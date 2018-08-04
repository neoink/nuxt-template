// vue.config.js
import Vue from 'vue'; // eslint-disable-line

if (process.env.NODE_ENV === 'production') {
  Vue.config.productionTip = false;
  Vue.config.debug = false;
  Vue.config.devtools = false;
}
