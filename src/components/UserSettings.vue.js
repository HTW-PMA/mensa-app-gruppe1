/* __placeholder__ */
import { ref, onMounted } from 'vue';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const favoriteMensas = ref([]);
const favoriteMeals = ref([]);
const FAVORITE_MENSA_KEY = 'favoriteMensas';
const FAVORITE_MEALS_KEY = 'favoriteMeals';
const loadFavoriteMensas = () => {
    const storedFavorites = localStorage.getItem(FAVORITE_MENSA_KEY);
    if (storedFavorites) {
        favoriteMensas.value = JSON.parse(storedFavorites);
    }
    else {
        favoriteMensas.value = [];
    }
};
const loadFavoriteMeals = () => {
    const storedFavorites = localStorage.getItem(FAVORITE_MEALS_KEY);
    if (storedFavorites) {
        favoriteMeals.value = JSON.parse(storedFavorites);
    }
    else {
        favoriteMeals.value = [];
    }
};
const removeFavoriteMensa = (index) => {
    favoriteMensas.value.splice(index, 1);
    localStorage.setItem(FAVORITE_MENSA_KEY, JSON.stringify(favoriteMensas.value));
};
const removeFavoriteMeal = (index) => {
    favoriteMeals.value.splice(index, 1);
    localStorage.setItem(FAVORITE_MEALS_KEY, JSON.stringify(favoriteMeals.value));
};
onMounted(() => {
    loadFavoriteMensas();
    loadFavoriteMeals();
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
    if (__VLS_ctx.favoriteMeals.length > 0) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({});
        for (const [meal, index] of __VLS_getVForSourceType((__VLS_ctx.favoriteMeals))) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({ key: ((index)), });
            (meal.name);
            __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (...[$event]) => {
                        if (!((__VLS_ctx.favoriteMeals.length > 0)))
                            return;
                        __VLS_ctx.removeFavoriteMeal(index);
                        // @ts-ignore
                        [favoriteMeals, favoriteMeals, removeFavoriteMeal,];
                    } }, });
        }
    }
    if (__VLS_ctx.favoriteMeals.length === 0) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
        // @ts-ignore
        [favoriteMeals,];
    }
    if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
        __VLS_styleScopedClasses['user-settings-container'];
    }
    var __VLS_slots;
    return __VLS_slots;
    const __VLS_componentsOption = {};
    let __VLS_name;
    let __VLS_defineComponent;
    const __VLS_internalComponent = __VLS_defineComponent({
        setup() {
            return {
                favoriteMensas: favoriteMensas,
                favoriteMeals: favoriteMeals,
                removeFavoriteMensa: removeFavoriteMensa,
                removeFavoriteMeal: removeFavoriteMeal,
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