import Module from '../Module.vue';
// import HomeB from '../views/HomeB.vue';

export default {
  routes: [
    {
      path: '/module-b',
      component: Module,
      children: [
        {
          path: '/',
          name: 'homeB',
          component: () => import(/* webpackChunkName: "home-b" */'../views/HomeB.vue'),
        },
      ],
    },
  ],
};
