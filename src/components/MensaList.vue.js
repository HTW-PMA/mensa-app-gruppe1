/* __placeholder__ */
import { defineComponent, ref, onMounted } from 'vue';
import { fetchMensas } from '../types/mensaService';
export default defineComponent({
    name: 'MensaList',
    setup() {
        const mensas = ref([]);
        const loading = ref(true); // State to track loading state
        const apiKey = 'EjGTzhCqu7TbBUwpN2x4H7YIRf5LIepS28Uc+Pn2k8IBkc05wDI6F+ZQbA13f67qSlENe8AU3UqL5Zzck+rERaYxrXKqISZQ6ut9/KIgGJoHs1VMlNvp0DfvWa69WzXyvdEEtTUN/3tsfxeGDG//UmzHTps9DnYKemomcgwGEPx+4U/dbv4L/QeHoTph8dLISK9ipWP2By5SjFKPreZoAJWuOy/6+u5uF23irGt5wBVZCFsdrvJUiIN72QURoF6aR9dzT+a8g1i9w9cFnTFxTtewRtm4lFY2ME/nmMIHKkchUuqfT0bNsxZL2dPfIo1E3ahzuNctbqUfdBBv1lslYw==';
        const fetchMensasList = async () => {
            try {
                const data = await fetchMensas(apiKey);
                mensas.value = data;
                loading.value = false; // Mark loading as complete
            }
            catch (error) {
                console.error('Error fetching mensas:', error);
                // Implement error handling logic here
                loading.value = false; // Ensure loading state is updated in case of error
            }
        };
        onMounted(() => {
            const intersectionObserver = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    fetchMensasList();
                    intersectionObserver.disconnect();
                }
            });
            const target = document.querySelector('.mensa-list-container');
            if (target) {
                intersectionObserver.observe(target);
            }
            else {
                console.warn('IntersectionObserver target not found');
            }
        });
        return { mensas, loading };
    },
});
;
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({});
    if (__VLS_ctx.loading) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("loading-spinner") }, });
        // @ts-ignore
        [loading,];
    }
    else if (__VLS_ctx.mensas.length > 0) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({ ...{ class: ("mensa-list") }, });
        for (const [mensa] of __VLS_getVForSourceType((__VLS_ctx.mensas))) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({ key: ((mensa.id)), ...{ class: ("mensa-item") }, });
            if (mensa.url && mensa.url !== '') {
                __VLS_elementAsFunction(__VLS_intrinsicElements.img)({ src: ((mensa.url)), alt: ((`Mensa ${mensa.name} Image`)), loading: ("lazy"), ...{ class: ("mensa-image") }, });
                // @ts-ignore
                [mensas, mensas,];
            }
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("mensa-details") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
            (mensa.name);
            __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
            (mensa.address.street);
            (mensa.address.city);
            if (mensa.contactInfo.phone) {
                __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
                (mensa.contactInfo.phone);
            }
            if (mensa.contactInfo.email) {
                __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
                (mensa.contactInfo.email);
            }
            __VLS_elementAsFunction(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({});
            for (const [day] of __VLS_getVForSourceType((mensa.businessDays))) {
                __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({ key: ((day.day)), });
                __VLS_elementAsFunction(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
                (day.day);
                __VLS_elementAsFunction(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({});
                for (const [hour] of __VLS_getVForSourceType((day.businesshours))) {
                    __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({ key: ((`${hour.openAt}-${hour.closeAt}`)), });
                    (hour.openAt);
                    (hour.closeAt);
                }
            }
        }
    }
    else {
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    }
    if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
        __VLS_styleScopedClasses['mensa-list-container'];
        __VLS_styleScopedClasses['loading-spinner'];
        __VLS_styleScopedClasses['mensa-list'];
        __VLS_styleScopedClasses['mensa-item'];
        __VLS_styleScopedClasses['mensa-image'];
        __VLS_styleScopedClasses['mensa-details'];
    }
    var __VLS_slots;
    return __VLS_slots;
    const __VLS_componentsOption = {};
    const __VLS_name = 'MensaList';
    const __VLS_internalComponent = (await import('./MensaList.vue')).default;
}
//# sourceMappingURL=MensaList.vue.js.map