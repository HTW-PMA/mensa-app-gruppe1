import { ref, watch } from 'vue';
import { setLocalStorageItem } from '../types/storageService';
const FAVORITE_MENSA_KEY = 'favoriteMensa';
const FAVORITE_DISHES_KEY = 'favoriteDishes';
const NOTIFICATIONS_KEY = 'notificationsPreferences';
export const favoriteMensas = ref([]);
export const favoriteDishes = ref([]);
export const notificationsPreferences = ref(false);
watch(favoriteMensas, (newValue) => {
    setLocalStorageItem(FAVORITE_MENSA_KEY, newValue);
});
watch(favoriteDishes, (newValue) => {
    setLocalStorageItem(FAVORITE_DISHES_KEY, newValue);
});
watch(notificationsPreferences, (newValue) => {
    setLocalStorageItem(NOTIFICATIONS_KEY, newValue);
});
//# sourceMappingURL=userSettings.js.map