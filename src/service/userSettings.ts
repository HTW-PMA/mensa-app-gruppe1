import {ref, watch} from 'vue';
import {setLocalStorageItem} from './storageService';

const FAVORITE_MENSA_KEY = 'favoriteMensa';
const FAVORITE_DISHES_KEY = 'favoriteDishes';
const NOTIFICATIONS_KEY = 'notificationsPreferences';

export const Mensa = ref<any[]>([]);
export const MenuItem = ref<String[]>([]);
export const notificationsPreferences = ref<boolean>(false);
watch(Mensa, (newValue) => {
    setLocalStorageItem(FAVORITE_MENSA_KEY, newValue);
});

watch(MenuItem, (newValue) => {
    setLocalStorageItem(FAVORITE_DISHES_KEY, newValue);
});

watch(notificationsPreferences, (newValue) => {
    setLocalStorageItem(NOTIFICATIONS_KEY, newValue);
});
