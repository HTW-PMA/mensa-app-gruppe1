/* __placeholder__ */
import { useI18n } from 'vue-i18n';
import { ref, onMounted, computed } from 'vue';
import { SMALL_BREAKPOINT, windowService } from "@/service/windowService";
import LocationIcon from '../assets/icons/LocationIcon.vue';
import ChevronRightIcon from '../assets/icons/ChevronRightIcon.vue';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const { t } = useI18n();
const location = ref(null);
const nearestMensa = ref(null);
const mensas = ref([]);
import { CANTEEN_DEBUG_DATA } from '@/types/tmpDataMensa';
const distanceToNearestMensa = ref(null);
const loading = ref(true);
const { width } = windowService();
const CACHE_KEY = 'mensaData';
const CACHE_TIMESTAMP_KEY = 'mensaDataTimestamp';
const CACHE_EXPIRY_MS = 24 * 60 * 60 * 1000; // 24 Stunden
const fetchMensasList = async () => {
    try {
        mensas.value = CANTEEN_DEBUG_DATA;
        loading.value = false;
    }
    catch (error) {
        console.error('Error fetching mensas:', error);
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
            const distance = getDistance(userLat, userLng, mensaLat, mensaLng);
            if (distance < minDistance) {
                minDistance = distance;
                closestMensa = mensa;
            }
        }
    });
    distanceToNearestMensa.value = minDistance;
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
        // Direktes Laden der temporären Daten
        await fetchMensasList();
        const userLocation = await getLocation();
        findNearestMensa(userLocation.latitude, userLocation.longitude);
    }
    catch (error) {
        console.error('Error fetching Mensas or getting location:', error);
    }
});
const firstThreeMensas = computed(() => {
    return mensas.value.slice(0, 3); // Beachte den Index hier, um die richtigen Elemente anzuzeigen
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
    if (__VLS_ctx.width > __VLS_ctx.SMALL_BREAKPOINT) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("home-view") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("heading-container") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({});
        (__VLS_ctx.t('welcome'));
        // @ts-ignore
        [width, SMALL_BREAKPOINT, t,];
        __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
        (__VLS_ctx.t('discover'));
        // @ts-ignore
        [t,];
        if (__VLS_ctx.nearestMensa) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("next-meal-container") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("next-meal-content") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
            (__VLS_ctx.t('nearest'));
            // @ts-ignore
            [t, nearestMensa,];
            __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
            (__VLS_ctx.nearestMensa.name);
            (__VLS_ctx.distanceToNearestMensa?.toFixed(2));
            // @ts-ignore
            [nearestMensa, distanceToNearestMensa,];
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
            // @ts-ignore
            [LocationIcon,];
            // @ts-ignore
            const __VLS_0 = __VLS_asFunctionalComponent(LocationIcon, new LocationIcon({}));
            const __VLS_1 = __VLS_0({}, ...__VLS_functionalComponentArgsRest(__VLS_0));
            ({}({}));
            const __VLS_4 = __VLS_pickFunctionalComponentCtx(LocationIcon, __VLS_1);
            (__VLS_ctx.nearestMensa.address.street);
            (__VLS_ctx.nearestMensa.address.city);
            // @ts-ignore
            [nearestMensa, nearestMensa,];
            // @ts-ignore
            [ChevronRightIcon,];
            // @ts-ignore
            const __VLS_5 = __VLS_asFunctionalComponent(ChevronRightIcon, new ChevronRightIcon({}));
            const __VLS_6 = __VLS_5({}, ...__VLS_functionalComponentArgsRest(__VLS_5));
            ({}({}));
            const __VLS_9 = __VLS_pickFunctionalComponentCtx(ChevronRightIcon, __VLS_6);
        }
        __VLS_elementAsFunction(__VLS_intrinsicElements.img)({ src: ("@/assets/home_vector.svg"), alt: ("Mensa Marvel"), ...{ class: ("mensa-logo") }, });
    }
    if (__VLS_ctx.width < __VLS_ctx.SMALL_BREAKPOINT) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
        if (__VLS_ctx.nearestMensa) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("next-meal-container") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("next-meal-content") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
            (__VLS_ctx.t('nearest'));
            // @ts-ignore
            [width, SMALL_BREAKPOINT, t, nearestMensa,];
            __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
            (__VLS_ctx.nearestMensa.name);
            (__VLS_ctx.distanceToNearestMensa?.toFixed(2));
            // @ts-ignore
            [nearestMensa, distanceToNearestMensa,];
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
            // @ts-ignore
            [LocationIcon,];
            // @ts-ignore
            const __VLS_10 = __VLS_asFunctionalComponent(LocationIcon, new LocationIcon({}));
            const __VLS_11 = __VLS_10({}, ...__VLS_functionalComponentArgsRest(__VLS_10));
            ({}({}));
            const __VLS_14 = __VLS_pickFunctionalComponentCtx(LocationIcon, __VLS_11);
            (__VLS_ctx.nearestMensa.address.street);
            (__VLS_ctx.nearestMensa.address.city);
            // @ts-ignore
            [nearestMensa, nearestMensa,];
        }
        // @ts-ignore
        [ChevronRightIcon,];
        // @ts-ignore
        const __VLS_15 = __VLS_asFunctionalComponent(ChevronRightIcon, new ChevronRightIcon({}));
        const __VLS_16 = __VLS_15({}, ...__VLS_functionalComponentArgsRest(__VLS_15));
        ({}({}));
        const __VLS_19 = __VLS_pickFunctionalComponentCtx(ChevronRightIcon, __VLS_16);
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("header-container") }, });
        for (const [mensa] of __VLS_getVForSourceType((__VLS_ctx.firstThreeMensas))) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ key: ((mensa.id)), ...{ class: ("mensen-container") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("content-wrapper") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
            (mensa.name);
            // @ts-ignore
            [firstThreeMensas,];
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("address-info") }, });
            // @ts-ignore
            [LocationIcon,];
            // @ts-ignore
            const __VLS_20 = __VLS_asFunctionalComponent(LocationIcon, new LocationIcon({}));
            const __VLS_21 = __VLS_20({}, ...__VLS_functionalComponentArgsRest(__VLS_20));
            ({}({}));
            const __VLS_24 = __VLS_pickFunctionalComponentCtx(LocationIcon, __VLS_21);
            __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
            (mensa.address.street);
            (mensa.address.city);
            // @ts-ignore
            [ChevronRightIcon,];
            // @ts-ignore
            const __VLS_25 = __VLS_asFunctionalComponent(ChevronRightIcon, new ChevronRightIcon({}));
            const __VLS_26 = __VLS_25({}, ...__VLS_functionalComponentArgsRest(__VLS_25));
            ({}({}));
            const __VLS_29 = __VLS_pickFunctionalComponentCtx(ChevronRightIcon, __VLS_26);
        }
    }
    if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
        __VLS_styleScopedClasses['home-view'];
        __VLS_styleScopedClasses['heading-container'];
        __VLS_styleScopedClasses['next-meal-container'];
        __VLS_styleScopedClasses['next-meal-content'];
        __VLS_styleScopedClasses['mensa-logo'];
        __VLS_styleScopedClasses['next-meal-container'];
        __VLS_styleScopedClasses['next-meal-content'];
        __VLS_styleScopedClasses['header-container'];
        __VLS_styleScopedClasses['mensen-container'];
        __VLS_styleScopedClasses['content-wrapper'];
        __VLS_styleScopedClasses['address-info'];
    }
    var __VLS_slots;
    return __VLS_slots;
    const __VLS_componentsOption = {};
    let __VLS_name;
    let __VLS_defineComponent;
    const __VLS_internalComponent = __VLS_defineComponent({
        setup() {
            return {
                SMALL_BREAKPOINT: SMALL_BREAKPOINT,
                LocationIcon: LocationIcon,
                ChevronRightIcon: ChevronRightIcon,
                t: t,
                nearestMensa: nearestMensa,
                distanceToNearestMensa: distanceToNearestMensa,
                width: width,
                firstThreeMensas: firstThreeMensas,
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