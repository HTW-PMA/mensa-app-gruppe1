import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '../components/HomeView.vue';
import MensaList from '../components/MensaList.vue';
import MensaDetailView from '../components/MensaDetail.vue';
import DailyMenu from '../components/DailyMenu.vue';

const routes: RouteRecordRaw[] = [
  { path: '/', component: HomeView },
  { path: '/mensa/:id', component: MensaDetailView, props: true },
  { path: '/daily-menu', component: DailyMenu },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
