import './Style.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router'
import i18n from './i18n';

const app = createApp(App)

app.use(router)

app.use(i18n);

app.mount('#app')



if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
            console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch((error) => {
            console.error('Service Worker registration failed:', error);
        });

    navigator.serviceWorker.ready.then((registration) => {
        console.log('Service Worker ready with scope:', registration.scope);
    });
}



