/* global Vue */

import App from './vue/App';
import store from './js/store';
import router from './js/router';
import http from './js/http';
import './js/global';

console.log('process.env.NODE_ENV', process.env.NODE_ENV);

Vue.config.devtools = (process.env.NODE_ENV === 'development');

export default new Vue({
  $name: 'app.js',
  el: '#app',
  store,
  router,
  http,
  render: h => h(App),
  // render: (h) => {
  //   const data = {};
  //   return h(App, {
  //     props: data,
  //   });
  // },
});
