import { createApp } from 'vue';
import './Style.css';
import App from './App.vue';
import MensaList from './components/MensaList.vue';
import router from './routers/router';
const app = createApp(App);
app.component('MensaList', MensaList);
app.mount('#app');
app.use(router);
//# sourceMappingURL=main.js.map