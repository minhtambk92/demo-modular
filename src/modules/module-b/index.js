import router from './router';
import store from './store';

window.modules = window.modules || {};
const moduleName = 'module-b';

if (!window.modules.find((mod) => mod.name === moduleName)) {
  window.modules.push({
    name: moduleName,
    router,
    store,
  });
} else {
  console.log(`Module name ${moduleName} has already used.`);
}

export default {
  router,
  store,
};
