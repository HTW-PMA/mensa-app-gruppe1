/* __placeholder__ */
import { onMounted, ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { fetchMensaById } from '@/service/mensaService';
import { fetchMenueByMensaId } from '@/service/menueService';
import LocationIcon from "@/assets/icons/LocationIcon.vue";
import ClockIcon from "@/assets/icons/ClockIcon.vue";
import MailIcon from "@/assets/icons/MailIcon.vue";
import PhoneIcon from "@/assets/icons/PhoneIcon.vue";
import BookmarkIcon from "@/assets/icons/BookmarkIcon.vue";
import UnBookmarkIcon from "@/assets/icons/UnBookmarkIcon.vue";
import { CANTEEN_DEBUG_DATA } from "@/types/tmpDataMensa";
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const route = useRoute();
const mensa = ref(null);
const menue = ref(null);
const loading = ref(true);
const error = ref(null);
const selectedDate = ref(new Date().toISOString().split('T')[0]);
const FAVORITE_MENSA_KEY = 'favoriteMensas';
const FAVORITE_DISHES_KEY = 'favoriteDishes';
const favoriteMensas = ref([]);
const favoriteDishes = ref([]);
const fetchMensaDetail = async () => {
    try {
        mensa.value = await fetchMensaById(route.params.id);
    }
    catch (err) {
        error.value = 'Error fetching mensa details';
    }
};
const fetchMenue = async () => {
    try {
        const today = new Date().toISOString().split('T')[0];
        menue.value = await fetchMenueByMensaId(route.params.id, selectedDate.value, selectedDate.value);
        console.log("data changed ");
    }
    catch (err) {
        error.value = 'Error fetching menue details';
    }
};
const isMensaBookmarked = computed(() => {
    return mensa.value ? favoriteMensas.value.some(favMensa => favMensa.id === mensa.value.id) : false;
});
const isMealBookmarked = (meal) => {
    return meal ? favoriteDishes.value.some(favMeal => favMeal.ID === meal.ID) : false;
};
const handleMensaBookmark = () => {
    if (!mensa.value)
        return;
    const index = favoriteMensas.value.findIndex(favMensa => favMensa.id === mensa.value.id);
    if (index === -1) {
        favoriteMensas.value.push(mensa.value);
    }
    else {
        favoriteMensas.value.splice(index, 1);
    }
    saveFavoriteMensas();
};
const handleMealBookmark = (meal) => {
    if (!meal)
        return;
    const index = favoriteDishes.value.findIndex(favMeal => favMeal.ID === meal.ID);
    if (index === -1) {
        favoriteDishes.value.push(meal);
    }
    else {
        favoriteDishes.value.splice(index, 1);
    }
    saveFavoriteDishes();
};
const loadFavoriteMensas = () => {
    const storedFavorites = localStorage.getItem(FAVORITE_MENSA_KEY);
    if (storedFavorites) {
        favoriteMensas.value = JSON.parse(storedFavorites);
    }
    else {
        favoriteMensas.value = [];
    }
};
const saveFavoriteMensas = () => {
    localStorage.setItem(FAVORITE_MENSA_KEY, JSON.stringify(favoriteMensas.value));
};
// Lade die Favoriten aus localStorage
const loadFavoriteDishes = () => {
    const storedFavorites = localStorage.getItem(FAVORITE_DISHES_KEY);
    if (storedFavorites) {
        favoriteDishes.value = JSON.parse(storedFavorites);
    }
    else {
        favoriteDishes.value = [];
    }
};
// Speichere die Favoriten in localStorage
const saveFavoriteDishes = () => {
    localStorage.setItem(FAVORITE_DISHES_KEY, JSON.stringify(favoriteDishes.value));
};
const fetchData = async () => {
    error.value = null;
    loading.value = true;
    mensa.value = CANTEEN_DEBUG_DATA.find(canteen => canteen.id === route.params.id) || null;
    await fetchMenue();
    loading.value = false;
};
onMounted(async () => {
    loadFavoriteMensas();
    loadFavoriteDishes();
    await fetchData();
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("mensa-detail-container") }, });
    if (__VLS_ctx.loading) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("loading-state") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
        // @ts-ignore
        [loading,];
    }
    if (__VLS_ctx.error) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("error-state") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
        (__VLS_ctx.error);
        // @ts-ignore
        [error, error,];
        __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (__VLS_ctx.fetchData) }, });
        // @ts-ignore
        [fetchData,];
    }
    if (__VLS_ctx.mensa && !__VLS_ctx.loading && !__VLS_ctx.error) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("mensa-details") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("heading") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
        (__VLS_ctx.mensa.name);
        // @ts-ignore
        [loading, error, mensa, mensa,];
        __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (__VLS_ctx.handleMensaBookmark) }, });
        if (__VLS_ctx.isMensaBookmarked) {
            // @ts-ignore
            [UnBookmarkIcon,];
            // @ts-ignore
            const __VLS_0 = __VLS_asFunctionalComponent(UnBookmarkIcon, new UnBookmarkIcon({}));
            const __VLS_1 = __VLS_0({}, ...__VLS_functionalComponentArgsRest(__VLS_0));
            ({}({}));
            // @ts-ignore
            [handleMensaBookmark, isMensaBookmarked,];
            const __VLS_4 = __VLS_pickFunctionalComponentCtx(UnBookmarkIcon, __VLS_1);
        }
        else {
            // @ts-ignore
            [BookmarkIcon,];
            // @ts-ignore
            const __VLS_5 = __VLS_asFunctionalComponent(BookmarkIcon, new BookmarkIcon({}));
            const __VLS_6 = __VLS_5({}, ...__VLS_functionalComponentArgsRest(__VLS_5));
            ({}({}));
            const __VLS_9 = __VLS_pickFunctionalComponentCtx(BookmarkIcon, __VLS_6);
        }
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("mensa-details-content") }, });
        // @ts-ignore
        [LocationIcon,];
        // @ts-ignore
        const __VLS_10 = __VLS_asFunctionalComponent(LocationIcon, new LocationIcon({}));
        const __VLS_11 = __VLS_10({}, ...__VLS_functionalComponentArgsRest(__VLS_10));
        ({}({}));
        const __VLS_14 = __VLS_pickFunctionalComponentCtx(LocationIcon, __VLS_11);
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("address-container") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
        (__VLS_ctx.mensa.address.street);
        __VLS_elementAsFunction(__VLS_intrinsicElements.br)({});
        // @ts-ignore
        [mensa,];
        (__VLS_ctx.mensa.address.zipcode);
        (__VLS_ctx.mensa.address.city);
        // @ts-ignore
        [mensa, mensa,];
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("mensa-details-content") }, });
        // @ts-ignore
        [ClockIcon,];
        // @ts-ignore
        const __VLS_15 = __VLS_asFunctionalComponent(ClockIcon, new ClockIcon({}));
        const __VLS_16 = __VLS_15({}, ...__VLS_functionalComponentArgsRest(__VLS_15));
        ({}({}));
        const __VLS_19 = __VLS_pickFunctionalComponentCtx(ClockIcon, __VLS_16);
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("address-container") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
        for (const [openTime] of __VLS_getVForSourceType((__VLS_ctx.mensa.businessDays))) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ key: ((openTime.day)), ...{ class: ("open-time-container") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
            (openTime.day);
            // @ts-ignore
            [mensa,];
            for (const [times] of __VLS_getVForSourceType((openTime.businessHours))) {
                __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ key: ((times.openAt)), ...{ class: ("times") }, });
                (times.businessHourType);
                (times.openAt);
                (times.closeAt);
            }
            if (openTime.businessHours.length === 0) {
                __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
            }
        }
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("mensa-contact-info") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
        // @ts-ignore
        [PhoneIcon,];
        // @ts-ignore
        const __VLS_20 = __VLS_asFunctionalComponent(PhoneIcon, new PhoneIcon({}));
        const __VLS_21 = __VLS_20({}, ...__VLS_functionalComponentArgsRest(__VLS_20));
        ({}({}));
        const __VLS_24 = __VLS_pickFunctionalComponentCtx(PhoneIcon, __VLS_21);
        (__VLS_ctx.mensa.contactInfo.phone);
        // @ts-ignore
        [mensa,];
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
        // @ts-ignore
        [MailIcon,];
        // @ts-ignore
        const __VLS_25 = __VLS_asFunctionalComponent(MailIcon, new MailIcon({}));
        const __VLS_26 = __VLS_25({}, ...__VLS_functionalComponentArgsRest(__VLS_25));
        ({}({}));
        const __VLS_29 = __VLS_pickFunctionalComponentCtx(MailIcon, __VLS_26);
        (__VLS_ctx.mensa.contactInfo.email);
        // @ts-ignore
        [mensa,];
    }
    if (__VLS_ctx.menue && !__VLS_ctx.loading && !__VLS_ctx.error) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("menue-container") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("menue-heading") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
        // @ts-ignore
        [loading, error, menue,];
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("col-md-6 mb-3") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({ for: ("date-select"), ...{ class: ("form-label") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ ...{ onChange: (__VLS_ctx.fetchMenue) }, type: ("date"), id: ("date-select"), ...{ class: ("form-control") }, });
        (__VLS_ctx.selectedDate);
        // @ts-ignore
        [fetchMenue, selectedDate,];
        if (__VLS_ctx.menue.meals.length === 0) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
            // @ts-ignore
            [menue,];
        }
        for (const [meal] of __VLS_getVForSourceType((__VLS_ctx.menue.meals))) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ key: ((meal.ID)), ...{ class: ("meal-container") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("meal-heading") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({});
            (meal.name);
            // @ts-ignore
            [menue,];
            __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (() => __VLS_ctx.handleMealBookmark(meal)) }, });
            if (__VLS_ctx.isMealBookmarked(meal)) {
                // @ts-ignore
                [UnBookmarkIcon,];
                // @ts-ignore
                const __VLS_30 = __VLS_asFunctionalComponent(UnBookmarkIcon, new UnBookmarkIcon({}));
                const __VLS_31 = __VLS_30({}, ...__VLS_functionalComponentArgsRest(__VLS_30));
                ({}({}));
                // @ts-ignore
                [handleMealBookmark, isMealBookmarked,];
                const __VLS_34 = __VLS_pickFunctionalComponentCtx(UnBookmarkIcon, __VLS_31);
            }
            else {
                // @ts-ignore
                [BookmarkIcon,];
                // @ts-ignore
                const __VLS_35 = __VLS_asFunctionalComponent(BookmarkIcon, new BookmarkIcon({}));
                const __VLS_36 = __VLS_35({}, ...__VLS_functionalComponentArgsRest(__VLS_35));
                ({}({}));
                const __VLS_39 = __VLS_pickFunctionalComponentCtx(BookmarkIcon, __VLS_36);
            }
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("meal-details") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
            __VLS_elementAsFunction(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
            (meal.category);
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
            __VLS_elementAsFunction(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
            __VLS_elementAsFunction(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({});
            for (const [price] of __VLS_getVForSourceType((meal.prices))) {
                __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({ key: ((price.priceType)), });
                (price.priceType);
                (price.price);
            }
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
            __VLS_elementAsFunction(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
            __VLS_elementAsFunction(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({});
            for (const [additive] of __VLS_getVForSourceType((meal.additives))) {
                __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({ key: ((additive.ID)), });
                (additive.text);
            }
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
            __VLS_elementAsFunction(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
            __VLS_elementAsFunction(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({});
            for (const [badge] of __VLS_getVForSourceType((meal.badges))) {
                __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({ key: ((badge.ID)), });
                (badge.name);
                (badge.description);
            }
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
            __VLS_elementAsFunction(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
            (meal.waterBilanz);
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
            __VLS_elementAsFunction(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
            (meal.co2Bilanz);
        }
    }
    if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
        __VLS_styleScopedClasses['mensa-detail-container'];
        __VLS_styleScopedClasses['loading-state'];
        __VLS_styleScopedClasses['error-state'];
        __VLS_styleScopedClasses['mensa-details'];
        __VLS_styleScopedClasses['heading'];
        __VLS_styleScopedClasses['mensa-details-content'];
        __VLS_styleScopedClasses['address-container'];
        __VLS_styleScopedClasses['mensa-details-content'];
        __VLS_styleScopedClasses['address-container'];
        __VLS_styleScopedClasses['open-time-container'];
        __VLS_styleScopedClasses['times'];
        __VLS_styleScopedClasses['mensa-contact-info'];
        __VLS_styleScopedClasses['menue-container'];
        __VLS_styleScopedClasses['menue-heading'];
        __VLS_styleScopedClasses['col-md-6'];
        __VLS_styleScopedClasses['mb-3'];
        __VLS_styleScopedClasses['form-label'];
        __VLS_styleScopedClasses['form-control'];
        __VLS_styleScopedClasses['meal-container'];
        __VLS_styleScopedClasses['meal-heading'];
        __VLS_styleScopedClasses['meal-details'];
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
                MailIcon: MailIcon,
                PhoneIcon: PhoneIcon,
                BookmarkIcon: BookmarkIcon,
                UnBookmarkIcon: UnBookmarkIcon,
                mensa: mensa,
                menue: menue,
                loading: loading,
                error: error,
                selectedDate: selectedDate,
                fetchMenue: fetchMenue,
                isMensaBookmarked: isMensaBookmarked,
                isMealBookmarked: isMealBookmarked,
                handleMensaBookmark: handleMensaBookmark,
                handleMealBookmark: handleMealBookmark,
                fetchData: fetchData,
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
//# sourceMappingURL=MensaDetail.vue.js.map