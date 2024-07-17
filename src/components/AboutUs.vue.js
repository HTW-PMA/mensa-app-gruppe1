/* __placeholder__ */
import { useI18n } from 'vue-i18n';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const { t } = useI18n();
// Beispieltexte für die Übersetzung
const aboutUsTexts = {
    title: 'Über Uns',
    description: 'Willkommen auf unserer Unternehmensseite. Hier finden Sie alle Informationen über unsere Mission, Vision und Werte.'
};
// Marvel-App spezifische Texte
const marvelAppTexts = {
    title: 'Unsere Marvel-App',
    description: 'Erfahren Sie mehr über unsere innovative Marvel-App, die Ihnen Zugang zu den neuesten Comics, Charakteren und vielem mehr bietet.',
    feature1: 'Zugang zu über 25.000 Comics und Grafikromanen',
    feature2: 'Suche nach Lieblingscharakteren und Serien',
    feature3: 'Erhalten Sie Benachrichtigungen über neue Veröffentlichungen und Events'
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("about-us") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({});
    (__VLS_ctx.t('aboutUs.title'));
    // @ts-ignore
    [t,];
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    (__VLS_ctx.t('aboutUs.description'));
    // @ts-ignore
    [t,];
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("marvel-app-info") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
    (__VLS_ctx.t('marvelApp.title'));
    // @ts-ignore
    [t,];
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    (__VLS_ctx.t('marvelApp.description'));
    // @ts-ignore
    [t,];
    __VLS_elementAsFunction(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
    (__VLS_ctx.t('marvelApp.feature1'));
    // @ts-ignore
    [t,];
    __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
    (__VLS_ctx.t('marvelApp.feature2'));
    // @ts-ignore
    [t,];
    __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
    (__VLS_ctx.t('marvelApp.feature3'));
    // @ts-ignore
    [t,];
    if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
        __VLS_styleScopedClasses['about-us'];
        __VLS_styleScopedClasses['marvel-app-info'];
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
//# sourceMappingURL=AboutUs.vue.js.map