import {ref, watch} from 'vue';
import {setLocalStorageItem} from './storageService';

const FAVORITE_MENSA_KEY = 'favoriteMensa';
const FAVORITE_DISHES_KEY = 'favoriteDishes';
const NOTIFICATIONS_KEY = 'notificationsPreferences';

export const favoriteMensas = ref<string[]>([]);
export const favoriteDishes = ref<string[]>([]);
export const notificationsPreferences = ref<boolean>(false);
watch(favoriteMensas, (newValue) => {
    setLocalStorageItem(FAVORITE_MENSA_KEY, newValue);
});

watch(favoriteDishes, (newValue) => {
    setLocalStorageItem(FAVORITE_DISHES_KEY, newValue);
});

watch(notificationsPreferences, (newValue) => {
    setLocalStorageItem(NOTIFICATIONS_KEY, newValue);
});
