/* __placeholder__ */
import { ref, onMounted, computed } from 'vue';
import { fetchMeal } from '../types/GerichteService';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const meals = ref([]);
const loading = ref(true);
const apiKey = 'EjGTzhCqu7TbBUwpN2x4H7YIRf5LIepS28Uc+Pn2k8IBkc05wDI6F+ZQbA13f67qSlENe8AU3UqL5Zzck+rERaYxrXKqISZQ6ut9/KIgGJoHs1VMlNvp0DfvWa69WzXyvdEEtTUN/3tsfxeGDG//UmzHTps9DnYKemomcgwGEPx+4U/dbv4L/QeHoTph8dLISK9ipWP2By5SjFKPreZoAJWuOy/6+u5uF23irGt5wBVZCFsdrvJUiIN72QURoF6aR9dzT+a8g1i9w9cFnTFxTtewRtm4lFY2ME/nmMIHKkchUuqfT0bNsxZL2dPfIo1E3ahzuNctbqUfdBBv1lslYw==';
const fetchMealsList = async () => {
    try {
        const data = await fetchMeal(apiKey);
        console.log('Fetched meals:', data);
        meals.value = data.map(meal => ({
            ...meal,
            showDetails: false // Initialize showDetails flag for each meal
        }));
        loading.value = false;
    }
    catch (error) {
        console.error('Error fetching meals:', error);
        loading.value = false;
    }
};
const toggleDetails = (meal) => {
    meal.showDetails = !meal.showDetails;
};
onMounted(() => {
    fetchMealsList();
});
// Reactive search and sorting
const searchQuery = ref('');
const sortOption = ref('name'); // Default sorting option
const filteredMeals = computed(() => {
    let filteredList = meals.value;
    // Filter by search query
    if (searchQuery.value) {
        const lowerCaseQuery = searchQuery.value.toLowerCase();
        filteredList = filteredList.filter(meal => meal.name.toLowerCase().includes(lowerCaseQuery));
    }
    // Sort by selected option
    if (sortOption.value === 'name') {
        filteredList.sort((a, b) => a.name.localeCompare(b.name));
    }
    else if (sortOption.value === 'category') {
        filteredList.sort((a, b) => a.category.localeCompare(b.category));
    }
    return filteredList;
});
const applyFilters = () => {
    // Nothing to do here, since computed property `filteredMeals` handles the filtering and sorting
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("GerichtList") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.img)({ src: ("@/assets/Mensa%20Marvel%20(2).jpg"), alt: ("Mensa Marvel"), ...{ class: ("mensa-logo") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("filters") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ ...{ onInput: (__VLS_ctx.applyFilters) }, placeholder: ("Nach Gericht suchen"), });
    (__VLS_ctx.searchQuery);
    // @ts-ignore
    [applyFilters, searchQuery,];
    __VLS_elementAsFunction(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({ ...{ onChange: (__VLS_ctx.applyFilters) }, value: ((__VLS_ctx.sortOption)), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({ value: ("name"), });
    // @ts-ignore
    [applyFilters, sortOption,];
    __VLS_elementAsFunction(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({ value: ("category"), });
    if (__VLS_ctx.loading) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("loading-spinner") }, });
        // @ts-ignore
        [loading,];
    }
    else if (__VLS_ctx.filteredMeals.length > 0) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({ ...{ class: ("gericht-list") }, });
        for (const [meal] of __VLS_getVForSourceType((__VLS_ctx.filteredMeals))) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({ key: ((meal.ID)), ...{ class: ("meal-item") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("meal-details") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
            (meal.name);
            // @ts-ignore
            [filteredMeals, filteredMeals,];
            __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
            (meal.category);
            __VLS_elementAsFunction(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({});
            for (const [price] of __VLS_getVForSourceType((meal.prices))) {
                __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({ key: ((price.priceType)), });
                (price.priceType);
                (price.price);
            }
            __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (...[$event]) => {
                        if (!(!((__VLS_ctx.loading))))
                            return;
                        if (!((__VLS_ctx.filteredMeals.length > 0)))
                            return;
                        __VLS_ctx.toggleDetails(meal);
                        // @ts-ignore
                        [toggleDetails,];
                    } }, ...{ class: ("btn-show-details") }, });
            if (meal.showDetails) {
                __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("detailed-info") }, });
                __VLS_elementAsFunction(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({});
                for (const [additive] of __VLS_getVForSourceType((meal.additives))) {
                    __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({ key: ((additive.ID)), });
                    (additive.text);
                }
                __VLS_elementAsFunction(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({});
                for (const [badge] of __VLS_getVForSourceType((meal.badges))) {
                    __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({ key: ((badge.ID)), });
                    (badge.name);
                    (badge.description);
                }
                __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
                (meal.waterBilanz);
                __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
                (meal.co2Bilanz);
                if (meal.mealReviews.length > 0) {
                    __VLS_elementAsFunction(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({});
                }
                if (meal.mealReviews.length > 0) {
                    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
                    for (const [review] of __VLS_getVForSourceType((meal.mealReviews))) {
                        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ key: ((review.ID)), });
                        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
                        (review.averageRating);
                        __VLS_elementAsFunction(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({});
                        for (const [rating] of __VLS_getVForSourceType((review.detailRatings))) {
                            __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({ key: ((rating.name)), });
                            (rating.name);
                            (rating.rating);
                        }
                        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
                        (review.comment);
                    }
                }
                else {
                    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
                }
            }
        }
    }
    else {
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    }
    if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
        __VLS_styleScopedClasses['GerichtList'];
        __VLS_styleScopedClasses['mensa-logo'];
        __VLS_styleScopedClasses['filters'];
        __VLS_styleScopedClasses['loading-spinner'];
        __VLS_styleScopedClasses['gericht-list'];
        __VLS_styleScopedClasses['meal-item'];
        __VLS_styleScopedClasses['meal-details'];
        __VLS_styleScopedClasses['btn-show-details'];
        __VLS_styleScopedClasses['detailed-info'];
    }
    var __VLS_slots;
    return __VLS_slots;
    const __VLS_componentsOption = {};
    let __VLS_name;
    let __VLS_defineComponent;
    const __VLS_internalComponent = __VLS_defineComponent({
        setup() {
            return {
                loading: loading,
                toggleDetails: toggleDetails,
                searchQuery: searchQuery,
                sortOption: sortOption,
                filteredMeals: filteredMeals,
                applyFilters: applyFilters,
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
//# sourceMappingURL=GerichtList.vue.js.map