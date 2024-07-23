/* __placeholder__ */
import { useI18n } from 'vue-i18n';
import { ref, onMounted, computed } from 'vue';
import localforage from "localforage";
import { fetchMensas } from "@/service/mensaService";
import { SMALL_BREAKPOINT, windowService } from "@/service/windowService";
import LocationIcon from '../assets/icons/LocationIcon.vue';
import ChevronRightIcon from '../assets/icons/ChevronRightIcon.vue';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const { t, locale } = useI18n();
const location = ref(null);
const nearestMensa = ref(null);
const mensas = ref([]);
const distanceToNearestMensa = ref(null);
const loading = ref(true);
const { width } = windowService();
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
const firstThreeMensas = computed(() => {
    return mensas.value.slice(0, 4);
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
            // @ts-ignore
            const __VLS_0 = {}
                .RouterLink;
            ({}.RouterLink);
            ({}.RouterLink);
            __VLS_components.RouterLink;
            __VLS_components.RouterLink;
            // @ts-ignore
            [RouterLink, RouterLink,];
            // @ts-ignore
            const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ to: ((`/mensa/${__VLS_ctx.nearestMensa.id}`)), ...{ class: ("next-meal-container") }, }));
            const __VLS_2 = __VLS_1({ to: ((`/mensa/${__VLS_ctx.nearestMensa.id}`)), ...{ class: ("next-meal-container") }, }, ...__VLS_functionalComponentArgsRest(__VLS_1));
            ({}({ to: ((`/mensa/${__VLS_ctx.nearestMensa.id}`)), ...{ class: ("next-meal-container") }, }));
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("next-meal-content") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
            (__VLS_ctx.t('nearest'));
            // @ts-ignore
            [t, nearestMensa, nearestMensa,];
            __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
            (__VLS_ctx.nearestMensa.name);
            (__VLS_ctx.distanceToNearestMensa?.toFixed(2));
            // @ts-ignore
            [nearestMensa, distanceToNearestMensa,];
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
            // @ts-ignore
            [LocationIcon,];
            // @ts-ignore
            const __VLS_6 = __VLS_asFunctionalComponent(LocationIcon, new LocationIcon({}));
            const __VLS_7 = __VLS_6({}, ...__VLS_functionalComponentArgsRest(__VLS_6));
            ({}({}));
            const __VLS_10 = __VLS_pickFunctionalComponentCtx(LocationIcon, __VLS_7);
            (__VLS_ctx.nearestMensa.address.street);
            (__VLS_ctx.nearestMensa.address.city);
            // @ts-ignore
            [nearestMensa, nearestMensa,];
            // @ts-ignore
            [ChevronRightIcon,];
            // @ts-ignore
            const __VLS_11 = __VLS_asFunctionalComponent(ChevronRightIcon, new ChevronRightIcon({}));
            const __VLS_12 = __VLS_11({}, ...__VLS_functionalComponentArgsRest(__VLS_11));
            ({}({}));
            const __VLS_15 = __VLS_pickFunctionalComponentCtx(ChevronRightIcon, __VLS_12);
            (__VLS_5.slots).default;
            const __VLS_5 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2);
        }
        __VLS_elementAsFunction(__VLS_intrinsicElements.img)({ src: ("@/assets/home_vector.svg"), alt: ("Mensa Marvel"), ...{ class: ("mensa-logo") }, });
    }
    if (__VLS_ctx.width < __VLS_ctx.SMALL_BREAKPOINT) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("home-view") }, });
        if (__VLS_ctx.nearestMensa) {
            // @ts-ignore
            const __VLS_16 = {}
                .RouterLink;
            ({}.RouterLink);
            ({}.RouterLink);
            __VLS_components.RouterLink;
            __VLS_components.RouterLink;
            // @ts-ignore
            [RouterLink, RouterLink,];
            // @ts-ignore
            const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({ to: ((`/mensa/${__VLS_ctx.nearestMensa.id}`)), ...{ class: ("next-meal-container") }, }));
            const __VLS_18 = __VLS_17({ to: ((`/mensa/${__VLS_ctx.nearestMensa.id}`)), ...{ class: ("next-meal-container") }, }, ...__VLS_functionalComponentArgsRest(__VLS_17));
            ({}({ to: ((`/mensa/${__VLS_ctx.nearestMensa.id}`)), ...{ class: ("next-meal-container") }, }));
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("next-meal-content") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
            (__VLS_ctx.t('nearest'));
            // @ts-ignore
            [width, SMALL_BREAKPOINT, t, nearestMensa, nearestMensa,];
            __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
            (__VLS_ctx.nearestMensa.name);
            (__VLS_ctx.distanceToNearestMensa?.toFixed(2));
            // @ts-ignore
            [nearestMensa, distanceToNearestMensa,];
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
            // @ts-ignore
            [LocationIcon,];
            // @ts-ignore
            const __VLS_22 = __VLS_asFunctionalComponent(LocationIcon, new LocationIcon({}));
            const __VLS_23 = __VLS_22({}, ...__VLS_functionalComponentArgsRest(__VLS_22));
            ({}({}));
            const __VLS_26 = __VLS_pickFunctionalComponentCtx(LocationIcon, __VLS_23);
            (__VLS_ctx.nearestMensa.address.street);
            (__VLS_ctx.nearestMensa.address.city);
            // @ts-ignore
            [nearestMensa, nearestMensa,];
            // @ts-ignore
            [ChevronRightIcon,];
            // @ts-ignore
            const __VLS_27 = __VLS_asFunctionalComponent(ChevronRightIcon, new ChevronRightIcon({}));
            const __VLS_28 = __VLS_27({}, ...__VLS_functionalComponentArgsRest(__VLS_27));
            ({}({}));
            const __VLS_31 = __VLS_pickFunctionalComponentCtx(ChevronRightIcon, __VLS_28);
            (__VLS_21.slots).default;
            const __VLS_21 = __VLS_pickFunctionalComponentCtx(__VLS_16, __VLS_18);
        }
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("header-container") }, });
        // @ts-ignore
        const __VLS_32 = {}
            .RouterLink;
        ({}.RouterLink);
        ({}.RouterLink);
        __VLS_components.RouterLink;
        __VLS_components.routerLink;
        __VLS_components.RouterLink;
        __VLS_components.routerLink;
        // @ts-ignore
        [RouterLink, RouterLink,];
        // @ts-ignore
        const __VLS_33 = __VLS_asFunctionalComponent(__VLS_32, new __VLS_32({ to: ("/mensa-list"), }));
        const __VLS_34 = __VLS_33({ to: ("/mensa-list"), }, ...__VLS_functionalComponentArgsRest(__VLS_33));
        ({}({ to: ("/mensa-list"), }));
        (__VLS_37.slots).default;
        const __VLS_37 = __VLS_pickFunctionalComponentCtx(__VLS_32, __VLS_34);
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
            const __VLS_38 = __VLS_asFunctionalComponent(LocationIcon, new LocationIcon({}));
            const __VLS_39 = __VLS_38({}, ...__VLS_functionalComponentArgsRest(__VLS_38));
            ({}({}));
            const __VLS_42 = __VLS_pickFunctionalComponentCtx(LocationIcon, __VLS_39);
            __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
            (mensa.address.street);
            (mensa.address.city);
            // @ts-ignore
            [ChevronRightIcon,];
            // @ts-ignore
            const __VLS_43 = __VLS_asFunctionalComponent(ChevronRightIcon, new ChevronRightIcon({}));
            const __VLS_44 = __VLS_43({}, ...__VLS_functionalComponentArgsRest(__VLS_43));
            ({}({}));
            const __VLS_47 = __VLS_pickFunctionalComponentCtx(ChevronRightIcon, __VLS_44);
        }
    }
    if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
        __VLS_styleScopedClasses['home-view'];
        __VLS_styleScopedClasses['heading-container'];
        __VLS_styleScopedClasses['next-meal-container'];
        __VLS_styleScopedClasses['next-meal-content'];
        __VLS_styleScopedClasses['mensa-logo'];
        __VLS_styleScopedClasses['home-view'];
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