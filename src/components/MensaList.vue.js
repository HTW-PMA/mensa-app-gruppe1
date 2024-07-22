/* __placeholder__ */
import { ref, computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import localforage from 'localforage';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const FAVORITE_MENSA_KEY = 'favoriteMensas';
const favoriteMensas = ref([]);
const { t, locale } = useI18n();
const mensas = ref([]);
const loading = ref(true);
const filters = ref({
    name: '',
    zipcode: '',
    district: '',
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
const CACHE_EXPIRY_MS = 7 * 24 * 60 * 60 * 1000; // 7Tage
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
    return mensas.value.filter((mensa) => {
        const nameMatch = mensa.name.toLowerCase().includes(filters.value.name.toLowerCase());
        const zipcodeMatch = mensa.address.zipcode.includes(filters.value.zipcode);
        const districtMatch = mensa.address.district.toLowerCase().includes(filters.value.district.toLowerCase());
        const openAtMatch = filters.value.openAt ? mensa.businessDays.some((day) => day.businessHours.some((hour) => hour.openAt <= filters.value.openAt && hour.closeAt >= filters.value.openAt)) : true;
        return nameMatch && zipcodeMatch && districtMatch && openAtMatch;
    });
});
const getImgUrl = (file) => {
    return URL.createObjectURL(file);
};
const changeLanguage = (lang) => {
    locale.value = lang;
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
    try {
        const data = await localforage.getItem('mensaData');
        if (data) {
            mensas.value = data;
            loading.value = false;
        }
        else {
            await fetchMensasList();
        }
    }
    catch (error) {
        console.error('Error fetching mensas from IndexedDB or API:', error);
        await fetchMensasList();
    }
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.img)({ src: ("@/assets/Mensa%20Marvel%20(4).png"), alt: ("Mensa Marvel"), ...{ class: ("mensa-logo") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("header") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({});
    (__VLS_ctx.t('mensaList.title'));
    // @ts-ignore
    [t,];
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("language-switch") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (...[$event]) => {
                __VLS_ctx.changeLanguage('en');
                // @ts-ignore
                [changeLanguage,];
            } }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (...[$event]) => {
                __VLS_ctx.changeLanguage('de');
                // @ts-ignore
                [changeLanguage,];
            } }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("filters") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ ...{ onInput: (__VLS_ctx.applyFilters) }, placeholder: ((__VLS_ctx.t('filters.filterName'))), });
    (__VLS_ctx.filters.name);
    // @ts-ignore
    [t, applyFilters, filters,];
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ ...{ onInput: (__VLS_ctx.applyFilters) }, placeholder: ((__VLS_ctx.t('filters.filterZipcode'))), });
    (__VLS_ctx.filters.zipcode);
    // @ts-ignore
    [t, applyFilters, filters,];
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ ...{ onInput: (__VLS_ctx.applyFilters) }, placeholder: ((__VLS_ctx.t('filters.filterDistrict'))), });
    (__VLS_ctx.filters.district);
    // @ts-ignore
    [t, applyFilters, filters,];
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ ...{ onInput: (__VLS_ctx.applyFilters) }, placeholder: ((__VLS_ctx.t('filters.filterOpenAt'))), type: ("time"), });
    (__VLS_ctx.filters.openAt);
    // @ts-ignore
    [t, applyFilters, filters,];
    if (__VLS_ctx.loading) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("loading-spinner") }, });
        (__VLS_ctx.t('loading'));
        // @ts-ignore
        [t, loading,];
    }
    else if (__VLS_ctx.filteredMensas.length > 0) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({ ...{ class: ("mensa-list") }, });
        for (const [mensa] of __VLS_getVForSourceType((__VLS_ctx.filteredMensas))) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({ key: ((mensa.id)), ...{ class: ("mensa-item") }, });
            if (mensa.img) {
                __VLS_elementAsFunction(__VLS_intrinsicElements.img)({ src: ((__VLS_ctx.getImgUrl(mensa.img))), alt: ((`Mensa ${mensa.name} Image`)), loading: ("lazy"), ...{ class: ("mensa-image") }, });
                // @ts-ignore
                [filteredMensas, filteredMensas, getImgUrl,];
            }
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("mensa-details") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
            (mensa.name);
            __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
            (mensa.address.street);
            (mensa.address.city);
            if (mensa.contactInfo.phone) {
                __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
                (__VLS_ctx.t('phone'));
                (mensa.contactInfo.phone);
                // @ts-ignore
                [t,];
            }
            if (mensa.contactInfo.email) {
                __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
                (__VLS_ctx.t('email'));
                (mensa.contactInfo.email);
                // @ts-ignore
                [t,];
            }
            __VLS_elementAsFunction(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({});
            for (const [day] of __VLS_getVForSourceType((mensa.businessDays))) {
                __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({ key: ((day.day)), });
                __VLS_elementAsFunction(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
                (__VLS_ctx.t(`${day.day}`));
                // @ts-ignore
                [t,];
                __VLS_elementAsFunction(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({});
                if (day.businessHours.length > 0) {
                    for (const [hour] of __VLS_getVForSourceType((day.businessHours))) {
                        __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({ key: ((`${hour.openAt}-${hour.closeAt}`)), });
                        (hour.openAt);
                        (hour.closeAt);
                        (__VLS_ctx.t(`hourTypes.${hour.businessHourType}`));
                        // @ts-ignore
                        [t,];
                    }
                }
                else {
                    __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
                    (__VLS_ctx.t('closed'));
                    // @ts-ignore
                    [t,];
                }
            }
            __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (...[$event]) => {
                        if (!(!((__VLS_ctx.loading))))
                            return;
                        if (!((__VLS_ctx.filteredMensas.length > 0)))
                            return;
                        __VLS_ctx.toggleFavoriteMensa(mensa);
                        // @ts-ignore
                        [toggleFavoriteMensa,];
                    } }, });
            (__VLS_ctx.isFavorite(mensa) ? __VLS_ctx.t('Aus Lieblingsmensa entfernen') : __VLS_ctx.t('Als Lieblingsmensa Hinzufügen'));
            // @ts-ignore
            [t, t, isFavorite,];
        }
    }
    else {
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
        (__VLS_ctx.t('noMensasFound'));
        // @ts-ignore
        [t,];
    }
    if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
        __VLS_styleScopedClasses['mensa-list-container'];
        __VLS_styleScopedClasses['mensa-logo'];
        __VLS_styleScopedClasses['header'];
        __VLS_styleScopedClasses['language-switch'];
        __VLS_styleScopedClasses['filters'];
        __VLS_styleScopedClasses['loading-spinner'];
        __VLS_styleScopedClasses['mensa-list'];
        __VLS_styleScopedClasses['mensa-item'];
        __VLS_styleScopedClasses['mensa-image'];
        __VLS_styleScopedClasses['mensa-details'];
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
                loading: loading,
                filters: filters,
                applyFilters: applyFilters,
                filteredMensas: filteredMensas,
                getImgUrl: getImgUrl,
                changeLanguage: changeLanguage,
                toggleFavoriteMensa: toggleFavoriteMensa,
                isFavorite: isFavorite,
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