import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import loadJs from './utilities/load-js';
import Modular, {
  registerModules,
} from './register-module'; // eslint-disable-line

Vue.config.productionTip = false;

Vue.use(Modular, {
  // modules: [],
  store,
  router,
});

const config = {
  modules: ['module-a'],
};

install(config); // eslint-disable-line

setTimeout(() => {
  const modName = 'module-b';
  loadModule(modName); // eslint-disable-line
}, 3000);

new Vue({
  router,
  data() {
    return {
      modules: window.modules,
      config,
    };
  },
  watch: {
    modules(mods) {
      registerModules(mods);
    },
  },
  store,
  render: (h) => h(App),
}).$mount('#app');

function install(conf) {
  if (Array.isArray(conf.modules) && conf.modules.length > 0) {
    conf.modules.forEach((modName) => {
      loadModule(modName); // eslint-disable-line
    });
  }
}

function loadModule(modName) {
  loadJs(`./${modName}/${modName}.bundle.js`)
    .then(() => {
      registerModules(window.modules);
    });
}
