import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  { path: '/', name: 'HomeView', component: () => import('@/views/Home') },
  { path: '/play', name: 'PlayView', component: () => import('@/views/Play') },
];

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
});

export default router;
