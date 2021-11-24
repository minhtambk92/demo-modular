import Module from '../Module.vue';
import HomeB from '../views/HomeB.vue';

export default {
  routes: [
    {
      path: '/module-b',
      component: Module,
      children: [
        {
          path: '/',
          name: 'home',
          component: HomeB,
        },
      ],
    },
  ],
};
