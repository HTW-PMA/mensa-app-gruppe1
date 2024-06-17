import { createApp } from 'vue';
import App from './App.vue';
import MensaList from './components/MensaList.vue';
import './registerServiceWorker'

const app = createApp(App);
app.component('MensaList', MensaList);
app.mount('#app');
