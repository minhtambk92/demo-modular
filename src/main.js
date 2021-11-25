import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import loadJs from './utilities/load-js';
import VueModular, { registerModule, registerModules } from './register-module'; // eslint-disable-line

window.modules = window.modules || {};

Vue.config.productionTip = false;

Vue.use(VueModular, { store, router });

loadJs('./module-a/module-a.bundle.js')
  .then(() => {
    registerModules(window.modules);
  });

loadJs('./module-b/module-b.bundle.js')
  .then(() => {
    registerModules(window.modules);
  });

// setTimeout(() => {
//   registerModules(window.modules);
// }, 500);

new Vue({
  router,
  data() {
    return {
      modules: window.modules,
    };
  },
  store,
  render: (h) => h(App),
}).$mount('#app');
