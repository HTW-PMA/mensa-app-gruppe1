/* __placeholder__ */
import { useI18n } from 'vue-i18n';
import { ref, onMounted } from 'vue';
import localforage from "localforage";
import { fetchMensas } from "@/types/mensaService";
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const { t, locale } = useI18n();
const location = ref(null);
const nearestMensa = ref(null);
const mensas = ref([]);
const loading = ref(true);
const CACHE_KEY = 'mensaData';
const CACHE_TIMESTAMP_KEY = 'mensaDataTimestamp';
const CACHE_EXPIRY_MS = 24 * 60 * 60 * 1000; // 24 Stunden
const fetchMensasList = async () => {
    try {
        const cachedData = await localforage.getItem(CACHE_KEY);
        const cachedTimestamp = await localforage.getItem(CACHE_TIMESTAMP_KEY);
        const now = Date.now();
        if (cachedData && cachedTimestamp && (now - cachedTimestamp) < CACHE_EXPIRY_MS) {
            mensas.value = cachedData;
        }
        else {
            const data = await fetchMensas();
            mensas.value = data;
            await localforage.setItem(CACHE_KEY, data);
            await localforage.setItem(CACHE_TIMESTAMP_KEY, now);
        }
        loading.value = false;
    }
    catch (error) {
        console.error('Error fetching or saving mensas:', error);
        loading.value = false;
    }
};
const getLocation = () => {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                location.value = `Latitude: ${latitude}, Longitude: ${longitude}`;
                resolve({ latitude, longitude });
            }, (error) => {
                console.error('Error getting location:', error);
                location.value = 'Unable to retrieve location';
                reject(error);
            });
        }
        else {
            location.value = 'Geolocation is not supported by this browser.';
            reject(new Error('Geolocation is not supported by this browser.'));
        }
    });
};
const findNearestMensa = (userLat, userLng) => {
    let minDistance = Infinity;
    let closestMensa = null;
    mensas.value.forEach((mensa) => {
        if (mensa.address && mensa.address.geoLocation) {
            const { latitude: mensaLat, longitude: mensaLng } = mensa.address.geoLocation;
            if (typeof mensaLat === 'number' && typeof mensaLng === 'number') {
                const distance = getDistance(userLat, userLng, mensaLat, mensaLng);
                if (distance < minDistance) {
                    minDistance = distance;
                    closestMensa = mensa;
                }
            }
        }
    });
    nearestMensa.value = closestMensa;
    console.log('Nearest Mensa:', closestMensa);
};
const getDistance = (lat1, lng1, lat2, lng2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371; // Radius of the Earth in km
    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
};
onMounted(async () => {
    try {
        const data = await localforage.getItem('mensaData');
        if (data) {
            mensas.value = data;
            loading.value = false;
        }
        else {
            await fetchMensasList();
        }
        const userLocation = await getLocation();
        findNearestMensa(userLocation.latitude, userLocation.longitude);
    }
    catch (error) {
        console.error('Error fetching Mensas or getting location:', error);
    }
});
const changeLocale = (lang) => {
    locale.value = lang;
};
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("home-view") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.header, __VLS_intrinsicElements.header)({ ...{ class: ("header") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({});
    (__VLS_ctx.t('welcome'));
    // @ts-ignore
    [t,];
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    (__VLS_ctx.t('discover'));
    // @ts-ignore
    [t,];
    __VLS_elementAsFunction(__VLS_intrinsicElements.img)({ src: ("@/assets/Mensa%20Marvel%20(4).png"), alt: ("Mensa Marvel"), ...{ class: ("mensa-logo") }, });
    if (__VLS_ctx.nearestMensa) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
        (__VLS_ctx.t('nearest'));
        // @ts-ignore
        [t, nearestMensa,];
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
        (__VLS_ctx.nearestMensa.name);
        // @ts-ignore
        [nearestMensa,];
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
        (__VLS_ctx.nearestMensa.address.street);
        (__VLS_ctx.nearestMensa.address.city);
        // @ts-ignore
        [nearestMensa, nearestMensa,];
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.footer, __VLS_intrinsicElements.footer)({ ...{ class: ("footer") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.nav, __VLS_intrinsicElements.nav)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (...[$event]) => {
                __VLS_ctx.changeLocale('en');
                // @ts-ignore
                [changeLocale,];
            } }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (...[$event]) => {
                __VLS_ctx.changeLocale('de');
                // @ts-ignore
                [changeLocale,];
            } }, });
    if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
        __VLS_styleScopedClasses['home-view'];
        __VLS_styleScopedClasses['header'];
        __VLS_styleScopedClasses['mensa-logo'];
        __VLS_styleScopedClasses['footer'];
    }
    var __VLS_slots;
    return __VLS_slots;
    const __VLS_componentsOption = {};
    let __VLS_name;
    let __VLS_defineComponent;
    const __VLS_internalComponent = __VLS_defineComponent({
        setup() {
            return {
                t: t,
                nearestMensa: nearestMensa,
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
//# sourceMappingURL=HomeView.vue.js.map