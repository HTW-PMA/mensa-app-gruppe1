/* __placeholder__ */
import { computed, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import localforage from 'localforage';
import LocationIcon from "@/assets/icons/LocationIcon.vue";
import ClockIcon from "@/assets/icons/ClockIcon.vue";
import PhoneIcon from "@/assets/icons/PhoneIcon.vue";
import MailIcon from "@/assets/icons/MailIcon.vue";
import ChevronRightIcon from "@/assets/icons/ChevronRightIcon.vue";
import { CANTEEN_DEBUG_DATA } from "@/types/tmpDataMensa";
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const FAVORITE_MENSA_KEY = 'favoriteMensas';
const favoriteMensas = ref([]);
const { t, locale } = useI18n();
const mensas = ref(CANTEEN_DEBUG_DATA);
const loading = ref(true);
const filters = ref({
    search: '',
    openAt: '',
});
const applyFilters = () => {
    loading.value = true;
    fetchMensasList().then(() => {
        loading.value = false;
    });
};
// Lade die Favoriten aus localStorage
const loadFavoriteMensas = () => {
    const storedFavorites = localStorage.getItem(FAVORITE_MENSA_KEY);
    if (storedFavorites) {
        favoriteMensas.value = JSON.parse(storedFavorites);
    }
    else {
        favoriteMensas.value = [];
    }
};
// Speichere die Favoriten in localStorage
const saveFavoriteMensas = () => {
    localStorage.setItem(FAVORITE_MENSA_KEY, JSON.stringify(favoriteMensas.value));
};
const CACHE_KEY = 'mensaData';
const CACHE_TIMESTAMP_KEY = 'mensaDataTimestamp';
const CACHE_EXPIRY_MS = 7 * 24 * 60 * 60 * 1000; // 7 Tage
const fetchMensasList = async () => {
    loadFavoriteMensas();
    try {
        const cachedData = await localforage.getItem(CACHE_KEY);
        const cachedTimestamp = await localforage.getItem(CACHE_TIMESTAMP_KEY);
        const now = Date.now();
        console.log('Cached data:', cachedData);
        console.log('Cached timestamp:', cachedTimestamp);
        console.log('Current time:', now);
        if (cachedData && cachedTimestamp && (now - cachedTimestamp) < CACHE_EXPIRY_MS) {
            mensas.value = cachedData;
        }
        else {
            await localforage.setItem(CACHE_TIMESTAMP_KEY, now);
        }
        loading.value = false;
    }
    catch (apiError) {
        console.error('Error fetching from API, trying to fetch from localforage cache:', apiError);
        try {
            loading.value = false;
        }
        catch (localforageError) {
            console.error('Error fetching from localforage:', localforageError);
            loading.value = false;
        }
    }
};
const filteredMensas = computed(() => {
    const searchLower = filters.value.search.toLowerCase();
    return mensas.value.filter((mensa) => {
        const nameMatch = mensa.name.toLowerCase().includes(searchLower);
        const zipcodeMatch = mensa.address.zipcode.includes(searchLower);
        const districtMatch = mensa.address.district.toLowerCase().includes(searchLower);
        const openAtMatch = filters.value.openAt ? mensa.businessDays.some((day) => day.businessHours.some((hour) => hour.openAt <= filters.value.openAt && hour.closeAt >= filters.value.openAt)) : true;
        return (nameMatch || zipcodeMatch || districtMatch) && openAtMatch;
    });
});
const getCurrentDayName = () => {
    const days = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
    const currentDayIndex = new Date().getDay();
    return days[currentDayIndex];
};
const getCurrentDayHours = (mensa) => {
    const currentDayName = getCurrentDayName();
    const currentDay = mensa.businessDays.find(day => day.day === currentDayName);
    return currentDay ? currentDay.businessHours : null;
};
const toggleFavoriteMensa = (mensa) => {
    const index = favoriteMensas.value.findIndex(fav => fav.id === mensa.id);
    if (index !== -1) {
        favoriteMensas.value.splice(index, 1);
    }
    else {
        favoriteMensas.value.push(mensa);
    }
    saveFavoriteMensas();
};
const isFavorite = (mensa) => {
    return favoriteMensas.value.some(fav => fav.id === mensa.id);
};
onMounted(async () => {
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("mensa-list-container") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("header") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
    (__VLS_ctx.t('mensaList.title'));
    // @ts-ignore
    [t,];
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("filters-container") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ ...{ onInput: (__VLS_ctx.applyFilters) }, placeholder: ((__VLS_ctx.t('Name, PLZ, Bezirk'))), });
    (__VLS_ctx.filters.search);
    // @ts-ignore
    [t, applyFilters, filters,];
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ ...{ onInput: (__VLS_ctx.applyFilters) }, placeholder: ((__VLS_ctx.t('filters.filterOpenAt'))), type: ("time"), });
    (__VLS_ctx.filters.openAt);
    // @ts-ignore
    [t, applyFilters, filters,];
    if (__VLS_ctx.loading) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("loading-spinner") }, });
        // @ts-ignore
        [loading,];
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("mensa-item-container") }, });
    for (const [mensa] of __VLS_getVForSourceType((__VLS_ctx.filteredMensas))) {
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
        const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ to: ((`/mensa/${mensa.id}`)), key: ((mensa.id)), ...{ class: ("mensa-item") }, }));
        const __VLS_2 = __VLS_1({ to: ((`/mensa/${mensa.id}`)), key: ((mensa.id)), ...{ class: ("mensa-item") }, }, ...__VLS_functionalComponentArgsRest(__VLS_1));
        ({}({ to: ((`/mensa/${mensa.id}`)), key: ((mensa.id)), ...{ class: ("mensa-item") }, }));
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("mensa-item-content") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
        (mensa.name);
        // @ts-ignore
        [filteredMensas,];
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("mensa-content-container") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("mensa-content-item") }, });
        // @ts-ignore
        [LocationIcon,];
        // @ts-ignore
        const __VLS_6 = __VLS_asFunctionalComponent(LocationIcon, new LocationIcon({}));
        const __VLS_7 = __VLS_6({}, ...__VLS_functionalComponentArgsRest(__VLS_6));
        ({}({}));
        const __VLS_10 = __VLS_pickFunctionalComponentCtx(LocationIcon, __VLS_7);
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("address-container") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
        (mensa.address.street);
        __VLS_elementAsFunction(__VLS_intrinsicElements.br, __VLS_intrinsicElements.br)({});
        (mensa.address.zipcode);
        (mensa.address.city);
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("mensa-content-item") }, });
        // @ts-ignore
        [ClockIcon,];
        // @ts-ignore
        const __VLS_11 = __VLS_asFunctionalComponent(ClockIcon, new ClockIcon({}));
        const __VLS_12 = __VLS_11({}, ...__VLS_functionalComponentArgsRest(__VLS_11));
        ({}({}));
        const __VLS_15 = __VLS_pickFunctionalComponentCtx(ClockIcon, __VLS_12);
        if (__VLS_ctx.getCurrentDayHours(mensa)) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
            __VLS_elementAsFunction(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
            // @ts-ignore
            [getCurrentDayHours,];
            for (const [hour] of __VLS_getVForSourceType((__VLS_ctx.getCurrentDayHours(mensa)))) {
                __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ key: ((hour.openAt)), });
                (hour.businessHourType);
                (hour.openAt);
                (hour.closeAt);
                // @ts-ignore
                [getCurrentDayHours,];
            }
        }
        else {
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
            (__VLS_ctx.t('closed'));
            // @ts-ignore
            [t,];
        }
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("contact-info") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
        // @ts-ignore
        [PhoneIcon,];
        // @ts-ignore
        const __VLS_16 = __VLS_asFunctionalComponent(PhoneIcon, new PhoneIcon({}));
        const __VLS_17 = __VLS_16({}, ...__VLS_functionalComponentArgsRest(__VLS_16));
        ({}({}));
        const __VLS_20 = __VLS_pickFunctionalComponentCtx(PhoneIcon, __VLS_17);
        (mensa.contactInfo.phone);
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
        // @ts-ignore
        [MailIcon,];
        // @ts-ignore
        const __VLS_21 = __VLS_asFunctionalComponent(MailIcon, new MailIcon({}));
        const __VLS_22 = __VLS_21({}, ...__VLS_functionalComponentArgsRest(__VLS_21));
        ({}({}));
        const __VLS_25 = __VLS_pickFunctionalComponentCtx(MailIcon, __VLS_22);
        (mensa.contactInfo.email);
        __VLS_elementAsFunction(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({});
        // @ts-ignore
        [ChevronRightIcon,];
        // @ts-ignore
        const __VLS_26 = __VLS_asFunctionalComponent(ChevronRightIcon, new ChevronRightIcon({}));
        const __VLS_27 = __VLS_26({}, ...__VLS_functionalComponentArgsRest(__VLS_26));
        ({}({}));
        const __VLS_30 = __VLS_pickFunctionalComponentCtx(ChevronRightIcon, __VLS_27);
        (__VLS_5.slots).default;
        const __VLS_5 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2);
    }
    if (__VLS_ctx.mensas.length === 0) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
        (__VLS_ctx.t('noMensasFound'));
        // @ts-ignore
        [t, mensas,];
    }
    if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
        __VLS_styleScopedClasses['mensa-list-container'];
        __VLS_styleScopedClasses['header'];
        __VLS_styleScopedClasses['filters-container'];
        __VLS_styleScopedClasses['loading-spinner'];
        __VLS_styleScopedClasses['mensa-item-container'];
        __VLS_styleScopedClasses['mensa-item'];
        __VLS_styleScopedClasses['mensa-item-content'];
        __VLS_styleScopedClasses['mensa-content-container'];
        __VLS_styleScopedClasses['mensa-content-item'];
        __VLS_styleScopedClasses['address-container'];
        __VLS_styleScopedClasses['mensa-content-item'];
        __VLS_styleScopedClasses['contact-info'];
    }
    var __VLS_slots;
    return __VLS_slots;
    const __VLS_componentsOption = {};
    let __VLS_name;
    let __VLS_defineComponent;
    const __VLS_internalComponent = __VLS_defineComponent({
        setup() {
            return {
                LocationIcon: LocationIcon,
                ClockIcon: ClockIcon,
                PhoneIcon: PhoneIcon,
                MailIcon: MailIcon,
                ChevronRightIcon: ChevronRightIcon,
                t: t,
                mensas: mensas,
                loading: loading,
                filters: filters,
                applyFilters: applyFilters,
                filteredMensas: filteredMensas,
                getCurrentDayHours: getCurrentDayHours,
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
//# sourceMappingURL=MensaList.vue.js.map