import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueModular, { registerModule, registerModules } from './register-module'; // eslint-disable-line

window.modules = window.modules || {};

Vue.config.productionTip = false;

Vue.use(VueModular, { store, router });

setTimeout(() => {
  registerModules(window.modules);
}, 500);

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
