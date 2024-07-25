import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../components/HomeView.vue';
import MensaList from '../components/MensaList.vue';
import AboutUs from '../components/AboutUs.vue';
import UserSettings from '../components/UserSettings.vue';
import MensaDetail from "@/components/MensaDetail.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutUs
    },
    {
      path: '/mensa-list',
      name: 'mensa-list',
      component: MensaList
    },

    {
      path: '/mensa/:id',
      name: 'mensa-detail',
      component: MensaDetail,
      props: true
    },
    {
      path: '/settings',
      name: 'settings',
      component: UserSettings
    }
  ]
});

export default router;
