import router from './router';
import store from './store';

window.modules = window.modules || {};
const moduleName = 'module-a';
if (!window.modules[moduleName]) {
  Object.assign(window.modules, { [moduleName]: { router, store } });
} else {
  console.log('Module name has already used.');
}

export default {
  router,
  store,
};
