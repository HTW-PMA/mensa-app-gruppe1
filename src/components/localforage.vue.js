/* __placeholder__ */
import localforage from 'localforage';
import { ref, onMounted } from 'vue';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const storedItems = ref([]);
const key = ref('');
const value = ref('');
// LocalForage konfigurieren (optional)
localforage.config({
    driver: localforage.INDEXEDDB,
    name: 'myApp',
    version: 1.0,
    storeName: 'myData',
});
// Gespeicherte Daten beim Laden der Komponente abrufen
onMounted(async () => {
    try {
        const keys = await localforage.keys();
        const items = await Promise.all(keys.map(async (key) => {
            const value = await localforage.getItem(key);
            return { key, value };
        }));
        storedItems.value = items;
    }
    catch (error) {
        console.error('Fehler beim Abrufen der gespeicherten Daten:', error);
    }
});
// Funktion zum Speichern von Daten
const saveData = async () => {
    try {
        await localforage.setItem(key.value, value.value);
        storedItems.value.push({ key: key.value, value: value.value });
        key.value = '';
        value.value = '';
    }
    catch (error) {
        console.error('Fehler beim Speichern der Daten:', error);
    }
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
    let __VLS_resolvedLocalAndGlobalComponents;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.form, __VLS_intrinsicElements.form)({ ...{ onSubmit: (__VLS_ctx.saveData) }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
    // @ts-ignore
    [saveData,];
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ required: (true), });
    (__VLS_ctx.key);
    // @ts-ignore
    [key,];
    __VLS_elementAsFunction(__VLS_intrinsicElements.br)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ required: (true), });
    (__VLS_ctx.value);
    // @ts-ignore
    [value,];
    __VLS_elementAsFunction(__VLS_intrinsicElements.br)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ type: ("submit"), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({});
    for (const [item] of __VLS_getVForSourceType((__VLS_ctx.storedItems))) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({ key: ((item.key)), });
        (item.key);
        (item.value);
        // @ts-ignore
        [storedItems,];
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
                storedItems: storedItems,
                key: key,
                value: value,
                saveData: saveData,
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
//# sourceMappingURL=localforage.vue.js.map