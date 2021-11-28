/* eslint-disable */

const defaultOptions = {
  vmProperty: '$modules',
};
window.modules = window.modules || [];
let modules = {};
let store = null;
let router = null;

/**
 * Install the plugin with Vue.use(VueModular, options)
 * @param {Object} Vue
 * @param {Object} [options]
 * @param {Object} [options.modules] - an object containing modules you want to register
 * @param {Object} [options.store] - a Vuex store instance
 * @param {Object} [options.router] - a Vue Router instance
 */
export default function (Vue, options = {}) {
  options = { ...defaultOptions, ...options };
  if (options.store) store = options.store;
  if (options.router) router = options.router;
  if (options.vmProperty) registerVmProperty(Vue, options.vmProperty);
  if (isModuleShape(options.modules)) registerModules(options.modules);
  registerModules(window.modules);
}

/**
 * Helper to assure that shape of object is module definition(s)
 * @param {Object} mod
 */
const isModuleShape = (mod) => Array.isArray(mod) && mod.length > 0;

/**
 * Define a vm instance property shorthand
 * @param {Object} Vue
 */
export function registerVmProperty(Vue, name) {
  if (name in Vue.prototype) return;
  Vue.prototype[name] = modules;
}

/**
 * Register one or more modules
 * @param {Object} mods
 */
export function registerModules(mods) {
  if (!isModuleShape(mods)) return;
  mods.forEach(mod => {
    registerModule(mod);
  });
}

export function registerModule(mod) {
  if (!!modules[mod.name]) return;
  console.log('register module', mod);
  modules = Object.assign(modules, { [mod.name]: { store: mod.store, router: mod.router } });
  if (store) registerModuleStore(mod);
  if (router) registerModuleRouter(mod);
}

/**
 * Return all registered modules
 * @returns {object} modules
 */
export function getModules() {
  return modules;
}

/**
 * Resets all values (helpful for testing)
 */
export function reset() {
  modules = {};
  store = null;
  router = null;
}

/**
 * Extract and register a module store
 * @param {string} key
 * @param {Object} mod
 * @param {Object} store
 */
export function registerModuleStore(mod) {
  if ('store' in mod === false) return;
  store.registerModule(mod.name, mod.store);
}

/**
 * Extract and register a module router
 * @param {Object} mod
 * @param {Object} router
 */
export function registerModuleRouter(mod) {
  if ('router' in mod === false) return;
  const {
    routes: moduleRoutes,
    ...moduleMethods
  } = mod.router;
  if (moduleRoutes) {
    router.addRoutes(moduleRoutes);
  }
  if (moduleMethods && Object.keys(moduleMethods).length > 0) {
    Object.keys(moduleMethods).forEach((moduleMethod) => {
      const methodName = moduleMethods[moduleMethod].name || moduleMethod;
      if (typeof mod.router[methodName] !== 'function') return;
      router[methodName].call(router, moduleMethods[methodName]);
    });
  }
}
