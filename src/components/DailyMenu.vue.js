/* __placeholder__ */
import { ref, onMounted } from 'vue';
import { fetchMeals } from '../types/menuService';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const meals = ref([]);
const loading = ref(true);
const fetchMealsList = async () => {
    try {
        meals.value = await fetchMeals();
        console.log('Fetched meals:', meals.value);
        loading.value = false;
    }
    catch (error) {
        console.error('Error fetching meals:', error);
        loading.value = false;
    }
};
onMounted(fetchMealsList);
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("daily-menu-container") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({});
    if (__VLS_ctx.loading) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("loading-spinner") }, });
        // @ts-ignore
        [loading,];
    }
    else if (__VLS_ctx.meals.length > 0) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({ ...{ class: ("meal-list") }, });
        for (const [meal] of __VLS_getVForSourceType((__VLS_ctx.meals))) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({ key: ((meal.ID)), ...{ class: ("meal-item") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("meal-details") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
            (meal.name);
            // @ts-ignore
            [meals, meals,];
            __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
            (meal.category);
            __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
            (meal.prices[0].price);
            (meal.prices[0].priceType);
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
            __VLS_elementAsFunction(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({});
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
    }
    else {
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    }
    if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
        __VLS_styleScopedClasses['daily-menu-container'];
        __VLS_styleScopedClasses['loading-spinner'];
        __VLS_styleScopedClasses['meal-list'];
        __VLS_styleScopedClasses['meal-item'];
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
                meals: meals,
                loading: loading,
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
//# sourceMappingURL=DailyMenu.vue.js.map