import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from 'vue-router';

export const Paths = {
  ABOUT: '/about',
  MAP: '/map',
};

export const routes: RouteRecordRaw[] = [
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
    path: `${Paths.MAP}/:markerId?`,
    name: 'map',
    component: () => import('../views/MapView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
