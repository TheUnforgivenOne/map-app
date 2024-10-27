import { createRouter, createWebHistory } from 'vue-router';

const Paths = {
  ABOUT: '/about',
  MAP: '/map',
};

export const routes = [
  {
    path: '/',
    redirect: Paths.ABOUT,
  },
  {
    path: Paths.ABOUT,
    name: 'about',
    component: () => import('../views/AboutView.vue'),
  },
  {
    path: Paths.MAP,
    name: 'map',
    component: () => import('../views/HomeView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
