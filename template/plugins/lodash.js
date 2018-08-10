import Vue from 'vue'; // eslint-disable-line import/no-extraneous-dependencies
import { debounce } from 'lodash';
import VueLodash from 'vue-lodash';

Vue.use(VueLodash, {
  debounce,
});
