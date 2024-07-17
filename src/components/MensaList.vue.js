/* __placeholder__ */
import { defineComponent, ref, computed, onMounted } from 'vue';
import { fetchMensas } from '../types/mensaService';
import localforage from 'localforage'; // Import von localforage hinzugefügt
export default defineComponent({
    name: 'MensaList',
    setup() {
        const mensas = ref([]);
        const loading = ref(true);
        const apiKey = 'EjGTzhCqu7TbBUwpN2x4H7YIRf5LIepS28Uc+Pn2k8IBkc05wDI6F+ZQbA13f67qSlENe8AU3UqL5Zzck+rERaYxrXKqISZQ6ut9/KIgGJoHs1VMlNvp0DfvWa69WzXyvdEEtTUN/3tsfxeGDG//UmzHTps9DnYKemomcgwGEPx+4U/dbv4L/QeHoTph8dLISK9ipWP2By5SjFKPreZoAJWuOy/6+u5uF23irGt5wBVZCFsdrvJUiIN72QURoF6aR9dzT+a8g1i9w9cFnTFxTtewRtm4lFY2ME/nmMIHKkchUuqfT0bNsxZL2dPfIo1E3ahzuNctbqUfdBBv1lslYw==';
        const filters = ref({
            name: '',
            zipcode: '',
            district: '',
            openAt: '',
        });
        const fetchMensasList = async () => {
            try {
                const data = await fetchMensas(apiKey);
                mensas.value = data;
                loading.value = false;
                // Speichern der Daten in IndexedDB
                await localforage.setItem('mensaData', data);
            }
            catch (error) {
                console.error('Error fetching mensas:', error);
                loading.value = false;
            }
        };
        const applyFilters = () => {
            loading.value = true;
            fetchMensasList().then(() => {
                loading.value = false;
            });
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
            // Explicitly type the callback function for getItem
            localforage.getItem('mensaData').then((data) => {
                if (data) {
                    mensas.value = data;
                    loading.value = false;
                }
                else {
                    fetchMensasList(); // Wenn nicht vorhanden, neue Daten abrufen
                }
            }).catch((error) => {
                console.error('Error fetching mensas from IndexedDB:', error);
                fetchMensasList(); // Im Fehlerfall ebenfalls neue Daten abrufen
            });
        });
        return { mensas, loading, filters, filteredMensas, applyFilters, getImgUrl };
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("filters") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ ...{ onInput: (__VLS_ctx.applyFilters) }, placeholder: ("Nach Name filtern"), });
    (__VLS_ctx.filters.name);
    // @ts-ignore
    [applyFilters, filters,];
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ ...{ onInput: (__VLS_ctx.applyFilters) }, placeholder: ("Nach Postleitzahl filtern"), });
    (__VLS_ctx.filters.zipcode);
    // @ts-ignore
    [applyFilters, filters,];
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ ...{ onInput: (__VLS_ctx.applyFilters) }, placeholder: ("Nach Bezirk filtern"), });
    (__VLS_ctx.filters.district);
    // @ts-ignore
    [applyFilters, filters,];
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ ...{ onInput: (__VLS_ctx.applyFilters) }, placeholder: ("Nach Öffnungszeit filtern (HH:MM)"), type: ("time"), });
    (__VLS_ctx.filters.openAt);
    // @ts-ignore
    [applyFilters, filters,];
    if (__VLS_ctx.loading) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("loading-spinner") }, });
        // @ts-ignore
        [loading,];
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
                if (day.businessHours.length > 0) {
                    for (const [hour] of __VLS_getVForSourceType((day.businessHours))) {
                        __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({ key: ((`${hour.openAt}-${hour.closeAt}`)), });
                        (hour.openAt);
                        (hour.closeAt);
                        (hour.businessHourType);
                    }
                }
                else {
                    __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
                }
            }
        }
    }
    else {
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    }
    if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
        __VLS_styleScopedClasses['mensa-list-container'];
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
    const __VLS_name = 'MensaList';
    let __VLS_internalComponent;
}
//# sourceMappingURL=MensaList.vue.js.map