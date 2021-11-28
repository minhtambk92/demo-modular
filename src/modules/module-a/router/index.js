import Module from '../Module.vue';
import HomeA from '../views/HomeA.vue';

export default {
  routes: [
    {
      path: '/module-a',
      component: Module,
      children: [
        {
          path: '/',
          name: 'homeA',
          component: HomeA,
        },
      ],
    },
  ],
  beforeEach: (to, from, next) => {
    next();
  },
};
