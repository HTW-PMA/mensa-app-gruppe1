import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../components/HomeView.vue';
import MensaList from '../components/MensaList.vue';
import MensaDetailView from '../components/MensaDetail.vue';
import GerichtList from '../components/GerichtList.vue'; // Import the new component

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/mensa-list',
      name: 'mensa-list',
      component: MensaList
    },
    {
      path: '/mensa/:id',
      name: 'mensa-detail',
      component: MensaDetailView,
      props: true
    },
    {
      path: '/gericht-list',
      name: 'gericht-list',
      component: GerichtList
    }
  ]
});

export default router;