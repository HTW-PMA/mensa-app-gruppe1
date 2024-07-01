import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../components/HomeView.vue';
import MensaDetailView from '../components/MensaDetail.vue';
import DailyMenu from '../components/DailyMenu.vue';
const routes = [
    { path: '/', component: HomeView },
    { path: '/mensa/:id', component: MensaDetailView, props: true },
    { path: '/daily-menu', component: DailyMenu },
];
const router = createRouter({
    history: createWebHistory(),
    routes,
});
export default router;
//# sourceMappingURL=router.js.map