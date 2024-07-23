/* __placeholder__ */
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { fetchMensaById } from '../service/mensaService';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const route = useRoute();
const mensa = ref(null);
const apiKey = 'EjGTzhCqu7TbBUwpN2x4H7YIRf5LIepS28Uc+Pn2k8IBkc05wDI6F+ZQbA13f67qSlENe8AU3UqL5Zzck+rERaYxrXKqISZQ6ut9/KIgGJoHs1VMlNvp0DfvWa69WzXyvdEEtTUN/3tsfxeGDG//UmzHTps9DnYKemomcgwGEPx+4U/dbv4L/QeHoTph8dLISK9ipWP2By5SjFKPreZoAJWuOy/6+u5uF23irGt5wBVZCFsdrvJUiIN72QURoF6aR9dzT+a8g1i9w9cFnTFxTtewRtm4lFY2ME/nmMIHKkchUuqfT0bNsxZL2dPfIo1E3ahzuNctbqUfdBBv1lslYw==';
const fetchMensaDetail = async () => {
    try {
        const data = await fetchMensaById(apiKey, route.params.id);
        mensa.value = data;
    }
    catch (error) {
        console.error('Error fetching mensa details:', error);
    }
};
onMounted(fetchMensaDetail);
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
    let __VLS_resolvedLocalAndGlobalComponents;
    if (__VLS_ctx.mensa) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({});
        (__VLS_ctx.mensa.name);
        // @ts-ignore
        [mensa, mensa,];
        __VLS_elementAsFunction(__VLS_intrinsicElements.img)({ src: ((__VLS_ctx.mensa.url)), alt: ((`Mensa ${__VLS_ctx.mensa.name} Image`)), });
        // @ts-ignore
        [mensa, mensa,];
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
        (__VLS_ctx.mensa.address.street);
        (__VLS_ctx.mensa.address.city);
        (__VLS_ctx.mensa.address.zipcode);
        (__VLS_ctx.mensa.address.district);
        // @ts-ignore
        [mensa, mensa, mensa, mensa,];
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
        (__VLS_ctx.mensa.address.geoLocation.latitude);
        (__VLS_ctx.mensa.address.geoLocation.longitude);
        // @ts-ignore
        [mensa, mensa,];
        if (__VLS_ctx.mensa.contactInfo.phone) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
            (__VLS_ctx.mensa.contactInfo.phone);
            // @ts-ignore
            [mensa, mensa,];
        }
        if (__VLS_ctx.mensa.contactInfo.email) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
            (__VLS_ctx.mensa.contactInfo.email);
            // @ts-ignore
            [mensa, mensa,];
        }
        __VLS_elementAsFunction(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({});
        for (const [day] of __VLS_getVForSourceType((__VLS_ctx.mensa.businessDays))) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({ key: ((day.day)), });
            __VLS_elementAsFunction(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
            (day.day);
            // @ts-ignore
            [mensa,];
            __VLS_elementAsFunction(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({});
            for (const [hour] of __VLS_getVForSourceType((day.businessHours))) {
                __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({ key: ((`${hour.openAt}-${hour.closeAt}`)), });
                (hour.openAt);
                (hour.closeAt);
                (hour.businessHourType);
            }
        }
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
        (__VLS_ctx.mensa.lastUpdated);
        // @ts-ignore
        [mensa,];
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
        if (__VLS_ctx.mensa.canteenReviews.length > 0) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
            __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
            (__VLS_ctx.mensa.canteenReviews[0].averageRating);
            // @ts-ignore
            [mensa, mensa,];
            __VLS_elementAsFunction(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({});
            for (const [review] of __VLS_getVForSourceType((__VLS_ctx.mensa.canteenReviews[0].detailRatings))) {
                __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({ key: ((review.name)), });
                (review.name);
                (review.rating);
                // @ts-ignore
                [mensa,];
            }
            __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
            (__VLS_ctx.mensa.canteenReviews[0].comment);
            // @ts-ignore
            [mensa,];
        }
        else {
            __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
        }
    }
    else {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    }
    if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
    }
    var __VLS_slots;
    return __VLS_slots;
    const __VLS_componentsOption = {};
    let __VLS_name;
    let __VLS_defineComponent;
    const __VLS_internalComponent = __VLS_defineComponent({
        setup() {
            return {
                mensa: mensa,
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