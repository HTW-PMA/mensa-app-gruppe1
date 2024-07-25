/* __placeholder__ */
import { ref, watch, onMounted } from 'vue';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const { t, locale } = useI18n();
import DEIcon from "@/assets/icons/DEIcon.vue";
import ENIcon from "@/assets/icons/ENIcon.vue";
import { useI18n } from "vue-i18n";
// LocalStorage Schlüssel
const FAVORITE_MENSA_KEY = 'favoriteMensas';
const FAVORITE_DISHES_KEY = 'favoriteDishes';
const NOTIFICATION_PREFERENCES_KEY = 'notificationPreferences';
// Reactive Variablen
const favoriteMensas = ref([]);
const favoriteDishes = ref([]);
const notificationPreferences = ref({
    daily: false,
    newDishes: false,
    offers: false
});
// Lade Einstellungen aus LocalStorage
const loadSettings = () => {
    const savedFavoriteMensas = localStorage.getItem(FAVORITE_MENSA_KEY);
    if (savedFavoriteMensas) {
        favoriteMensas.value = JSON.parse(savedFavoriteMensas);
    }
    const savedFavoriteDishes = localStorage.getItem(FAVORITE_DISHES_KEY);
    if (savedFavoriteDishes) {
        favoriteDishes.value = JSON.parse(savedFavoriteDishes);
    }
    const savedNotificationPreferences = localStorage.getItem(NOTIFICATION_PREFERENCES_KEY);
    if (savedNotificationPreferences) {
        notificationPreferences.value = JSON.parse(savedNotificationPreferences);
    }
};
// Funktion zum Entfernen einer Lieblingsspeise
const removeFavoriteDish = (index) => {
    favoriteDishes.value.splice(index, 1);
};
// Funktion zum Entfernen einer Lieblings-Mensa
const removeFavoriteMensa = (index) => {
    favoriteMensas.value.splice(index, 1);
};
// Funktion zum Aktualisieren der Benachrichtigungseinstellungen
const updateNotificationPreferences = () => {
    if (Notification.permission === 'default' || Notification.permission === 'denied') {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                saveNotificationPreferences();
                showNotification('Benachrichtigungen aktiviert', 'Sie erhalten nun Benachrichtigungen gemäß Ihren Einstellungen.');
            }
        });
    }
    else {
        saveNotificationPreferences();
        showNotification('Benachrichtigungen aktualisiert', 'Ihre Benachrichtigungseinstellungen wurden aktualisiert.');
    }
};
// Funktion zum Speichern der Benachrichtigungseinstellungen
const saveNotificationPreferences = () => {
    localStorage.setItem(NOTIFICATION_PREFERENCES_KEY, JSON.stringify(notificationPreferences.value));
};
// Funktion zum Anzeigen einer Benachrichtigung
const showNotification = (title, body) => {
    if (Notification.permission === 'granted') {
        new Notification(title, { body });
    }
};
// Watch und Update localStorage, wenn Änderungen auftreten
watch(favoriteMensas, (newValue) => {
    localStorage.setItem(FAVORITE_MENSA_KEY, JSON.stringify(newValue));
}, { deep: true });
watch(favoriteDishes, (newValue) => {
    localStorage.setItem(FAVORITE_DISHES_KEY, JSON.stringify(newValue));
}, { deep: true });
watch(notificationPreferences, (newValue) => {
    saveNotificationPreferences();
}, { deep: true });
const changeLocale = (lang) => {
    locale.value = lang;
};
// Einstellungen beim Komponent-Mount laden
onMounted(() => {
    loadSettings();
});
const __VLS_fnComponent = (await import('vue')).defineComponent({});
let __VLS_functionalComponentProps;
const __VLS_modelEmitsType = {};
function __VLS_template() {
    let __VLS_ctx;
    /* Components */
    let __VLS_otherComponents;
    let __VLS_own;
    let __VLS_localComponents;
    let __VLS_components;
    let __VLS_styleScopedClasses;
    // CSS variable injection 
    // CSS variable injection end 
    let __VLS_resolvedLocalAndGlobalComponents;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("user-settings-container") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
    if (__VLS_ctx.favoriteMensas.length > 0) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({});
        for (const [mensa, index] of __VLS_getVForSourceType((__VLS_ctx.favoriteMensas))) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({ key: ((index)), });
            (mensa.name);
            __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (...[$event]) => {
                        if (!((__VLS_ctx.favoriteMensas.length > 0)))
                            return;
                        __VLS_ctx.removeFavoriteMensa(index);
                        // @ts-ignore
                        [favoriteMensas, favoriteMensas, removeFavoriteMensa,];
                    } }, });
        }
    }
    if (__VLS_ctx.favoriteMensas.length === 0) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
        // @ts-ignore
        [favoriteMensas,];
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
    if (__VLS_ctx.favoriteDishes.length > 0) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({});
        for (const [dish, index] of __VLS_getVForSourceType((__VLS_ctx.favoriteDishes))) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({ key: ((index)), });
            (dish);
            __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (...[$event]) => {
                        if (!((__VLS_ctx.favoriteDishes.length > 0)))
                            return;
                        __VLS_ctx.removeFavoriteDish(index);
                        // @ts-ignore
                        [favoriteDishes, favoriteDishes, removeFavoriteDish,];
                    } }, });
        }
    }
    if (__VLS_ctx.favoriteDishes.length === 0) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
        // @ts-ignore
        [favoriteDishes,];
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ ...{ onChange: (__VLS_ctx.updateNotificationPreferences) }, type: ("checkbox"), });
    (__VLS_ctx.notificationPreferences.daily);
    // @ts-ignore
    [updateNotificationPreferences, notificationPreferences,];
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ ...{ onChange: (__VLS_ctx.updateNotificationPreferences) }, type: ("checkbox"), });
    (__VLS_ctx.notificationPreferences.newDishes);
    // @ts-ignore
    [updateNotificationPreferences, notificationPreferences,];
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ ...{ onChange: (__VLS_ctx.updateNotificationPreferences) }, type: ("checkbox"), });
    (__VLS_ctx.notificationPreferences.offers);
    // @ts-ignore
    [updateNotificationPreferences, notificationPreferences,];
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("language-container") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("btn-container") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (...[$event]) => {
                __VLS_ctx.changeLocale('en');
                // @ts-ignore
                [changeLocale,];
            } }, ...{ class: (({ 'active-button': __VLS_ctx.locale === 'en' })) }, });
    __VLS_styleScopedClasses = ({ 'active-button': locale === 'en' });
    // @ts-ignore
    [ENIcon, ENIcon,];
    // @ts-ignore
    const __VLS_0 = __VLS_asFunctionalComponent(ENIcon, new ENIcon({}));
    const __VLS_1 = __VLS_0({}, ...__VLS_functionalComponentArgsRest(__VLS_0));
    ({}({}));
    // @ts-ignore
    [locale,];
    const __VLS_4 = __VLS_pickFunctionalComponentCtx(ENIcon, __VLS_1);
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (...[$event]) => {
                __VLS_ctx.changeLocale('de');
                // @ts-ignore
                [changeLocale,];
            } }, ...{ class: (({ 'active-button': __VLS_ctx.locale === 'de' })) }, });
    __VLS_styleScopedClasses = ({ 'active-button': locale === 'de' });
    // @ts-ignore
    [DEIcon, DEIcon,];
    // @ts-ignore
    const __VLS_5 = __VLS_asFunctionalComponent(DEIcon, new DEIcon({}));
    const __VLS_6 = __VLS_5({}, ...__VLS_functionalComponentArgsRest(__VLS_5));
    ({}({}));
    // @ts-ignore
    [locale,];
    const __VLS_9 = __VLS_pickFunctionalComponentCtx(DEIcon, __VLS_6);
    if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
        __VLS_styleScopedClasses['user-settings-container'];
        __VLS_styleScopedClasses['language-container'];
        __VLS_styleScopedClasses['btn-container'];
    }
    var __VLS_slots;
    return __VLS_slots;
    const __VLS_componentsOption = {};
    let __VLS_name;
    let __VLS_defineComponent;
    const __VLS_internalComponent = __VLS_defineComponent({
        setup() {
            return {
                locale: locale,
                DEIcon: DEIcon,
                ENIcon: ENIcon,
                favoriteMensas: favoriteMensas,
                favoriteDishes: favoriteDishes,
                notificationPreferences: notificationPreferences,
                removeFavoriteDish: removeFavoriteDish,
                removeFavoriteMensa: removeFavoriteMensa,
                updateNotificationPreferences: updateNotificationPreferences,
                changeLocale: changeLocale,
            };
        },
    });
}
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
;
//# sourceMappingURL=UserSettings.vue.js.map