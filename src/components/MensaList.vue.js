/* __placeholder__ */
import { computed, onMounted, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { CANTEEN_DEBUG_DATA } from '../types/tmpDataMensa';
import { MENUE_DEBUG_DATA } from '../types/tmpDataMeal';
import LocationIcon from '../assets/icons/LocationIcon.vue';
import ClockIcon from '../assets/icons/ClockIcon.vue';
import PhoneIcon from '../assets/icons/PhoneIcon.vue';
import MailIcon from '../assets/icons/MailIcon.vue';
import RatingIcon from '../assets/icons/RatingIcon.vue';
import localforage from 'localforage';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const selectedDate = ref(new Date().toISOString().split('T')[0]);
const selectedCanteenId = ref(null);
const menuItems = ref([]);
const FAVORITE_MENSA_KEY = 'favoriteMensas';
const MENSA_DATA_KEY = 'mensaData';
const favoriteMensas = ref([]);
const { t } = useI18n();
const mensas = ref(CANTEEN_DEBUG_DATA);
const loading = ref(false);
const filters = ref({
    search: '',
    openAt: '',
});
// Funktion zum Initialisieren der Datenbank
const initializeDatabase = async () => {
    try {
        const existingData = await localforage.getItem(MENSA_DATA_KEY);
        if (!existingData) {
            console.log("No existing data found. Adding default data...");
            await localforage.setItem(MENSA_DATA_KEY, CANTEEN_DEBUG_DATA);
            mensas.value = CANTEEN_DEBUG_DATA;
        }
        else {
            console.log("Existing data found.");
            mensas.value = existingData;
        }
    }
    catch (error) {
        console.error('Error initializing database:', error);
    }
};
// Filter anwenden
const applyFilters = () => {
    loading.value = true;
    setTimeout(() => {
        loading.value = false;
    }, 300); // Simuliere Ladeverzögerung
};
// Favoriten aus localStorage laden
const loadFavoriteMensas = () => {
    const storedFavorites = localStorage.getItem(FAVORITE_MENSA_KEY);
    if (storedFavorites) {
        favoriteMensas.value = JSON.parse(storedFavorites);
    }
    else {
        favoriteMensas.value = [];
    }
};
// Favoriten in localStorage speichern
const saveFavoriteMensas = () => {
    localStorage.setItem(FAVORITE_MENSA_KEY, JSON.stringify(favoriteMensas.value));
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
// Menü für die ausgewählte Mensa und Datum abrufen
const getMenuForCanteenAndDate = (canteenId, date) => {
    const menuForDate = MENUE_DEBUG_DATA.find(menu => menu.canteenId === canteenId && menu.date === date);
    return menuForDate ? menuForDate.meals : [];
};
// Menü abrufen
const fetchMenu = () => {
    if (selectedCanteenId.value && selectedDate.value) {
        menuItems.value = getMenuForCanteenAndDate(selectedCanteenId.value, selectedDate.value);
    }
};
// Favoriten-Menü umschalten
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
watch([selectedDate, selectedCanteenId], fetchMenu);
onMounted(async () => {
    applyFilters();
    await initializeDatabase();
    loadFavoriteMensas();
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("mensa-selector row mb-4") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("col-md-6 mb-3") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({ for: ("canteen-select"), ...{ class: ("form-label") }, });
    (__VLS_ctx.t('selectCanteen'));
    // @ts-ignore
    [t,];
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("input-group") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({ ...{ onChange: (__VLS_ctx.fetchMenu) }, id: ("canteen-select"), value: ((__VLS_ctx.selectedCanteenId)), ...{ class: ("form-select") }, });
    for (const [mensa] of __VLS_getVForSourceType((__VLS_ctx.mensas))) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({ key: ((mensa.id)), value: ((mensa.id)), });
        (mensa.name);
        // @ts-ignore
        [fetchMenu, selectedCanteenId, mensas,];
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("input-group-text") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)({ ...{ class: ("bi bi-chevron-down") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("col-md-6 mb-3") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({ for: ("date-select"), ...{ class: ("form-label") }, });
    (__VLS_ctx.t('selectDate'));
    // @ts-ignore
    [t,];
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ ...{ onChange: (__VLS_ctx.fetchMenu) }, type: ("date"), id: ("date-select"), ...{ class: ("form-control") }, });
    (__VLS_ctx.selectedDate);
    // @ts-ignore
    [fetchMenu, selectedDate,];
    if (__VLS_ctx.loading) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("loading-spinner") }, });
        (__VLS_ctx.t('loading'));
        // @ts-ignore
        [t, loading,];
    }
    if (__VLS_ctx.selectedCanteenId) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("menu-container") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
        (__VLS_ctx.t('MENÜ', { day: __VLS_ctx.selectedDate }));
        // @ts-ignore
        [t, selectedCanteenId, selectedDate,];
        if (__VLS_ctx.menuItems.length) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("row") }, });
            for (const [item] of __VLS_getVForSourceType((__VLS_ctx.menuItems))) {
                __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ key: ((item.id)), ...{ class: ("menu-item col-md-6 mb-4") }, });
                __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("card") }, });
                __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("card-body") }, });
                __VLS_elementAsFunction(__VLS_intrinsicElements.h5, __VLS_intrinsicElements.h5)({ ...{ class: ("card-title") }, });
                (item.name);
                // @ts-ignore
                [menuItems, menuItems,];
                __VLS_elementAsFunction(__VLS_intrinsicElements.h6, __VLS_intrinsicElements.h6)({ ...{ class: ("card-subtitle mb-2 text-muted") }, });
                for (const [price] of __VLS_getVForSourceType((item.prices))) {
                    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ key: ((price.priceType)), });
                    (price.priceType);
                    (price.price);
                }
                if (item.additives.length) {
                    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("mt-2") }, });
                    __VLS_elementAsFunction(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
                    __VLS_elementAsFunction(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({ ...{ class: ("list-group list-group-flush") }, });
                    for (const [additive] of __VLS_getVForSourceType((item.additives))) {
                        __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({ key: ((additive.id)), ...{ class: ("list-group-item") }, });
                        (additive.text);
                    }
                }
                if (item.badges.length) {
                    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("mt-2") }, });
                    __VLS_elementAsFunction(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
                    __VLS_elementAsFunction(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({ ...{ class: ("list-group list-group-flush") }, });
                    for (const [badge] of __VLS_getVForSourceType((item.badges))) {
                        __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({ key: ((badge.id)), ...{ class: ("list-group-item") }, });
                        __VLS_elementAsFunction(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
                        (badge.name);
                        (badge.description);
                    }
                }
            }
        }
        else {
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("alert alert-info") }, });
            (__VLS_ctx.t('Keine Speisen vorhanden'));
            // @ts-ignore
            [t,];
        }
    }
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
        (__VLS_ctx.t('loading'));
        // @ts-ignore
        [t, loading,];
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("mensa-item-container") }, });
    for (const [mensa] of __VLS_getVForSourceType((__VLS_ctx.filteredMensas))) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ key: ((mensa.id)), ...{ class: ("mensa-item") }, });
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
        const __VLS_0 = __VLS_asFunctionalComponent(LocationIcon, new LocationIcon({}));
        const __VLS_1 = __VLS_0({}, ...__VLS_functionalComponentArgsRest(__VLS_0));
        ({}({}));
        const __VLS_4 = __VLS_pickFunctionalComponentCtx(LocationIcon, __VLS_1);
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
        const __VLS_5 = __VLS_asFunctionalComponent(ClockIcon, new ClockIcon({}));
        const __VLS_6 = __VLS_5({}, ...__VLS_functionalComponentArgsRest(__VLS_5));
        ({}({}));
        const __VLS_9 = __VLS_pickFunctionalComponentCtx(ClockIcon, __VLS_6);
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
        const __VLS_10 = __VLS_asFunctionalComponent(PhoneIcon, new PhoneIcon({}));
        const __VLS_11 = __VLS_10({}, ...__VLS_functionalComponentArgsRest(__VLS_10));
        ({}({}));
        const __VLS_14 = __VLS_pickFunctionalComponentCtx(PhoneIcon, __VLS_11);
        (mensa.contactInfo.phone);
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
        // @ts-ignore
        [MailIcon,];
        // @ts-ignore
        const __VLS_15 = __VLS_asFunctionalComponent(MailIcon, new MailIcon({}));
        const __VLS_16 = __VLS_15({}, ...__VLS_functionalComponentArgsRest(__VLS_15));
        ({}({}));
        const __VLS_19 = __VLS_pickFunctionalComponentCtx(MailIcon, __VLS_16);
        (mensa.contactInfo.email);
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("mensa-content-item") }, });
        // @ts-ignore
        [RatingIcon,];
        // @ts-ignore
        const __VLS_20 = __VLS_asFunctionalComponent(RatingIcon, new RatingIcon({}));
        const __VLS_21 = __VLS_20({}, ...__VLS_functionalComponentArgsRest(__VLS_20));
        ({}({}));
        const __VLS_24 = __VLS_pickFunctionalComponentCtx(RatingIcon, __VLS_21);
        (mensa.canteenReviews.length);
        __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (...[$event]) => {
                    __VLS_ctx.toggleFavoriteMensa(mensa);
                    // @ts-ignore
                    [toggleFavoriteMensa,];
                } }, });
        (__VLS_ctx.isFavorite(mensa) ? __VLS_ctx.t('removeFavorite') : __VLS_ctx.t('addFavorite'));
        // @ts-ignore
        [t, t, isFavorite,];
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
        __VLS_styleScopedClasses['mensa-selector'];
        __VLS_styleScopedClasses['row'];
        __VLS_styleScopedClasses['mb-4'];
        __VLS_styleScopedClasses['col-md-6'];
        __VLS_styleScopedClasses['mb-3'];
        __VLS_styleScopedClasses['form-label'];
        __VLS_styleScopedClasses['input-group'];
        __VLS_styleScopedClasses['form-select'];
        __VLS_styleScopedClasses['input-group-text'];
        __VLS_styleScopedClasses['bi'];
        __VLS_styleScopedClasses['bi-chevron-down'];
        __VLS_styleScopedClasses['col-md-6'];
        __VLS_styleScopedClasses['mb-3'];
        __VLS_styleScopedClasses['form-label'];
        __VLS_styleScopedClasses['form-control'];
        __VLS_styleScopedClasses['loading-spinner'];
        __VLS_styleScopedClasses['menu-container'];
        __VLS_styleScopedClasses['row'];
        __VLS_styleScopedClasses['menu-item'];
        __VLS_styleScopedClasses['col-md-6'];
        __VLS_styleScopedClasses['mb-4'];
        __VLS_styleScopedClasses['card'];
        __VLS_styleScopedClasses['card-body'];
        __VLS_styleScopedClasses['card-title'];
        __VLS_styleScopedClasses['card-subtitle'];
        __VLS_styleScopedClasses['mb-2'];
        __VLS_styleScopedClasses['text-muted'];
        __VLS_styleScopedClasses['mt-2'];
        __VLS_styleScopedClasses['list-group'];
        __VLS_styleScopedClasses['list-group-flush'];
        __VLS_styleScopedClasses['list-group-item'];
        __VLS_styleScopedClasses['mt-2'];
        __VLS_styleScopedClasses['list-group'];
        __VLS_styleScopedClasses['list-group-flush'];
        __VLS_styleScopedClasses['list-group-item'];
        __VLS_styleScopedClasses['alert'];
        __VLS_styleScopedClasses['alert-info'];
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
        __VLS_styleScopedClasses['mensa-content-item'];
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
                RatingIcon: RatingIcon,
                selectedDate: selectedDate,
                selectedCanteenId: selectedCanteenId,
                menuItems: menuItems,
                t: t,
                mensas: mensas,
                loading: loading,
                filters: filters,
                applyFilters: applyFilters,
                filteredMensas: filteredMensas,
                getCurrentDayHours: getCurrentDayHours,
                fetchMenu: fetchMenu,
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