import { ref, computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { fetchMensas } from '../types/mensaService';
import localforage from '../localforage';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const { t } = useI18n();
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
        console.log('Filters applied successfully');
    });
};
const fetchMensasList = async () => {
    try {
        const data = await fetchMensas();
        mensas.value = data;
        loading.value = false;
        await localforage.setItem('mensaData', data);
        console.log('Mensa data successfully saved in IndexedDB:', data);
    }
    catch (error) {
        console.error('Error fetching or saving mensas:', error);
        loading.value = false;
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
const logMensaData = async () => {
    try {
        const data = await localforage.getItem('mensaData');
        console.log('Mensa data in IndexedDB:', data);
    }
    catch (error) {
        console.error('Error reading mensa data from IndexedDB:', error);
    }
};
onMounted(async () => {
    try {
        const data = await localforage.getItem('mensaData');
        if (data) {
            mensas.value = data;
            loading.value = false;
            console.log('Mensa data successfully loaded from IndexedDB:', data);
        }
        else {
            await fetchMensasList();
        }
    }
    catch (error) {
        console.error('Error fetching mensas from IndexedDB or API:', error);
        await fetchMensasList();
    }
    // Log the mensa data from IndexedDB
    logMensaData();
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({});
    (__VLS_ctx.t('mensaList'));
    // @ts-ignore
    [t,];
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("filters") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ ...{ onInput: (__VLS_ctx.applyFilters) }, placeholder: ("filterName"), });
    (__VLS_ctx.filters.name);
    // @ts-ignore
    [applyFilters, filters,];
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ ...{ onInput: (__VLS_ctx.applyFilters) }, placeholder: ("filterZipcode"), });
    (__VLS_ctx.filters.zipcode);
    // @ts-ignore
    [applyFilters, filters,];
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ ...{ onInput: (__VLS_ctx.applyFilters) }, placeholder: ("filterDistrict"), });
    (__VLS_ctx.filters.district);
    // @ts-ignore
    [applyFilters, filters,];
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ ...{ onInput: (__VLS_ctx.applyFilters) }, placeholder: ("filterOpenAt"), type: ("time"), });
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
                __VLS_elementAsFunction(__VLS_intrinsicElements.img)({ src: ((__VLS_ctx.getImgUrl(mensa.img))), alt: ((__VLS_ctx.Mensa)), __VLS_ctx, : .$ }, { mensa, : .name }, __VLS_ctx.Image);
                loading: ("lazy"), ;
                {
                    class {
                    }
                    ("mensa-image");
                }
            }
            ;
            // @ts-ignore
            [filteredMensas, filteredMensas, getImgUrl, Mensa, $, Image,];
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
            (day.day);
            __VLS_elementAsFunction(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({});
            if (day.businessHours.length > 0) {
                for (const [hour] of __VLS_getVForSourceType((day.businessHours))) {
                    __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({ key: ((__VLS_ctx.$)) }, { hour, : .openAt } - __VLS_ctx.$, { hour, : .closeAt });
                }
                ;
                (hour.openAt);
                (hour.closeAt);
                (hour.businessHourType);
                // @ts-ignore
                [$, $,];
            }
        }
        {
            __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
            (__VLS_ctx.t('closed'));
            // @ts-ignore
            [t,];
        }
    }
}
{
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    (__VLS_ctx.t('noMensasFound'));
    // @ts-ignore
    [t,];
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
let __VLS_name;
let __VLS_defineComponent;
const __VLS_internalComponent = __VLS_defineComponent({
    setup() {
        return {
            Mensa: Mensa,
            t: t,
            loading: loading,
            filters: filters,
            applyFilters: applyFilters,
            filteredMensas: filteredMensas,
            getImgUrl: getImgUrl,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
;
//# sourceMappingURL=MensaList.vue.js.map