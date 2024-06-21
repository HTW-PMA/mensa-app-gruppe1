import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import MensaList from './components/MensaList.vue';


const app = createApp(App);
app.component('MensaList', MensaList);
app.mount('#app');
