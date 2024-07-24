/* __placeholder__ */
import { RouterLink, RouterView } from 'vue-router';
import { SMALL_BREAKPOINT, windowService } from "@/service/windowService";
import HomeIcon from './assets/icons/HomeIcon.vue';
import ListIcon from './assets/icons/ListIcon.vue';
import UserIcon from './assets/icons/UserIcon.vue';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const { width } = windowService();
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ id: ("app"), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.header, __VLS_intrinsicElements.header)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.img, __VLS_intrinsicElements.img)({ src: ("/src/assets/logo.svg"), alt: ("logo"), });
    if (__VLS_ctx.width > __VLS_ctx.SMALL_BREAKPOINT) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.nav, __VLS_intrinsicElements.nav)({ ...{ class: ("desktop-nav") }, });
        // @ts-ignore
        const __VLS_0 = {}
            .RouterLink;
        ({}.RouterLink);
        ({}.RouterLink);
        __VLS_components.RouterLink;
        __VLS_components.routerLink;
        __VLS_components.RouterLink;
        __VLS_components.routerLink;
        // @ts-ignore
        [RouterLink, RouterLink,];
        // @ts-ignore
        const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ to: ("/"), }));
        const __VLS_2 = __VLS_1({ to: ("/"), }, ...__VLS_functionalComponentArgsRest(__VLS_1));
        ({}({ to: ("/"), }));
        // @ts-ignore
        [width, SMALL_BREAKPOINT,];
        (__VLS_5.slots).default;
        const __VLS_5 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2);
        // @ts-ignore
        const __VLS_6 = {}
            .RouterLink;
        ({}.RouterLink);
        ({}.RouterLink);
        __VLS_components.RouterLink;
        __VLS_components.routerLink;
        __VLS_components.RouterLink;
        __VLS_components.routerLink;
        // @ts-ignore
        [RouterLink, RouterLink,];
        // @ts-ignore
        const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({ to: ("/mensa-list"), }));
        const __VLS_8 = __VLS_7({ to: ("/mensa-list"), }, ...__VLS_functionalComponentArgsRest(__VLS_7));
        ({}({ to: ("/mensa-list"), }));
        (__VLS_11.slots).default;
        const __VLS_11 = __VLS_pickFunctionalComponentCtx(__VLS_6, __VLS_8);
        // @ts-ignore
        const __VLS_12 = {}
            .RouterLink;
        ({}.RouterLink);
        ({}.RouterLink);
        __VLS_components.RouterLink;
        __VLS_components.routerLink;
        __VLS_components.RouterLink;
        __VLS_components.routerLink;
        // @ts-ignore
        [RouterLink, RouterLink,];
        // @ts-ignore
        const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({ to: ("/Gerichtlist"), }));
        const __VLS_14 = __VLS_13({ to: ("/Gerichtlist"), }, ...__VLS_functionalComponentArgsRest(__VLS_13));
        ({}({ to: ("/Gerichtlist"), }));
        (__VLS_17.slots).default;
        const __VLS_17 = __VLS_pickFunctionalComponentCtx(__VLS_12, __VLS_14);
        // @ts-ignore
        const __VLS_18 = {}
            .RouterLink;
        ({}.RouterLink);
        ({}.RouterLink);
        __VLS_components.RouterLink;
        __VLS_components.routerLink;
        __VLS_components.RouterLink;
        __VLS_components.routerLink;
        // @ts-ignore
        [RouterLink, RouterLink,];
        // @ts-ignore
        const __VLS_19 = __VLS_asFunctionalComponent(__VLS_18, new __VLS_18({ to: ("/about"), }));
        const __VLS_20 = __VLS_19({ to: ("/about"), }, ...__VLS_functionalComponentArgsRest(__VLS_19));
        ({}({ to: ("/about"), }));
        (__VLS_23.slots).default;
        const __VLS_23 = __VLS_pickFunctionalComponentCtx(__VLS_18, __VLS_20);
        // @ts-ignore
        const __VLS_24 = {}
            .RouterLink;
        ({}.RouterLink);
        ({}.RouterLink);
        __VLS_components.RouterLink;
        __VLS_components.routerLink;
        __VLS_components.RouterLink;
        __VLS_components.routerLink;
        // @ts-ignore
        [RouterLink, RouterLink,];
        // @ts-ignore
        const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({ to: ("/settings"), }));
        const __VLS_26 = __VLS_25({ to: ("/settings"), }, ...__VLS_functionalComponentArgsRest(__VLS_25));
        ({}({ to: ("/settings"), }));
        // @ts-ignore
        [UserIcon, UserIcon,];
        // @ts-ignore
        const __VLS_30 = __VLS_asFunctionalComponent(UserIcon, new UserIcon({}));
        const __VLS_31 = __VLS_30({}, ...__VLS_functionalComponentArgsRest(__VLS_30));
        ({}({}));
        const __VLS_34 = __VLS_pickFunctionalComponentCtx(UserIcon, __VLS_31);
        (__VLS_29.slots).default;
        const __VLS_29 = __VLS_pickFunctionalComponentCtx(__VLS_24, __VLS_26);
    }
    if (__VLS_ctx.width < __VLS_ctx.SMALL_BREAKPOINT) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.nav, __VLS_intrinsicElements.nav)({ ...{ class: ("mobile-nav") }, });
        // @ts-ignore
        const __VLS_35 = {}
            .RouterLink;
        ({}.RouterLink);
        ({}.RouterLink);
        __VLS_components.RouterLink;
        __VLS_components.routerLink;
        __VLS_components.RouterLink;
        __VLS_components.routerLink;
        // @ts-ignore
        [RouterLink, RouterLink,];
        // @ts-ignore
        const __VLS_36 = __VLS_asFunctionalComponent(__VLS_35, new __VLS_35({ to: ("/"), }));
        const __VLS_37 = __VLS_36({ to: ("/"), }, ...__VLS_functionalComponentArgsRest(__VLS_36));
        ({}({ to: ("/"), }));
        // @ts-ignore
        [HomeIcon, HomeIcon,];
        // @ts-ignore
        const __VLS_41 = __VLS_asFunctionalComponent(HomeIcon, new HomeIcon({}));
        const __VLS_42 = __VLS_41({}, ...__VLS_functionalComponentArgsRest(__VLS_41));
        ({}({}));
        // @ts-ignore
        [width, SMALL_BREAKPOINT,];
        const __VLS_45 = __VLS_pickFunctionalComponentCtx(HomeIcon, __VLS_42);
        (__VLS_40.slots).default;
        const __VLS_40 = __VLS_pickFunctionalComponentCtx(__VLS_35, __VLS_37);
        // @ts-ignore
        const __VLS_46 = {}
            .RouterLink;
        ({}.RouterLink);
        ({}.RouterLink);
        __VLS_components.RouterLink;
        __VLS_components.routerLink;
        __VLS_components.RouterLink;
        __VLS_components.routerLink;
        // @ts-ignore
        [RouterLink, RouterLink,];
        // @ts-ignore
        const __VLS_47 = __VLS_asFunctionalComponent(__VLS_46, new __VLS_46({ to: ("/mensa-list"), }));
        const __VLS_48 = __VLS_47({ to: ("/mensa-list"), }, ...__VLS_functionalComponentArgsRest(__VLS_47));
        ({}({ to: ("/mensa-list"), }));
        // @ts-ignore
        [ListIcon, ListIcon,];
        // @ts-ignore
        const __VLS_52 = __VLS_asFunctionalComponent(ListIcon, new ListIcon({}));
        const __VLS_53 = __VLS_52({}, ...__VLS_functionalComponentArgsRest(__VLS_52));
        ({}({}));
        const __VLS_56 = __VLS_pickFunctionalComponentCtx(ListIcon, __VLS_53);
        (__VLS_51.slots).default;
        const __VLS_51 = __VLS_pickFunctionalComponentCtx(__VLS_46, __VLS_48);
        // @ts-ignore
        const __VLS_57 = {}
            .RouterLink;
        ({}.RouterLink);
        ({}.RouterLink);
        __VLS_components.RouterLink;
        __VLS_components.routerLink;
        __VLS_components.RouterLink;
        __VLS_components.routerLink;
        // @ts-ignore
        [RouterLink, RouterLink,];
        // @ts-ignore
        const __VLS_58 = __VLS_asFunctionalComponent(__VLS_57, new __VLS_57({ to: ("/Gerichtlist"), }));
        const __VLS_59 = __VLS_58({ to: ("/Gerichtlist"), }, ...__VLS_functionalComponentArgsRest(__VLS_58));
        ({}({ to: ("/Gerichtlist"), }));
        (__VLS_62.slots).default;
        const __VLS_62 = __VLS_pickFunctionalComponentCtx(__VLS_57, __VLS_59);
        // @ts-ignore
        const __VLS_63 = {}
            .RouterLink;
        ({}.RouterLink);
        ({}.RouterLink);
        __VLS_components.RouterLink;
        __VLS_components.routerLink;
        __VLS_components.RouterLink;
        __VLS_components.routerLink;
        // @ts-ignore
        [RouterLink, RouterLink,];
        // @ts-ignore
        const __VLS_64 = __VLS_asFunctionalComponent(__VLS_63, new __VLS_63({ to: ("/about"), }));
        const __VLS_65 = __VLS_64({ to: ("/about"), }, ...__VLS_functionalComponentArgsRest(__VLS_64));
        ({}({ to: ("/about"), }));
        (__VLS_68.slots).default;
        const __VLS_68 = __VLS_pickFunctionalComponentCtx(__VLS_63, __VLS_65);
        // @ts-ignore
        const __VLS_69 = {}
            .RouterLink;
        ({}.RouterLink);
        ({}.RouterLink);
        __VLS_components.RouterLink;
        __VLS_components.routerLink;
        __VLS_components.RouterLink;
        __VLS_components.routerLink;
        // @ts-ignore
        [RouterLink, RouterLink,];
        // @ts-ignore
        const __VLS_70 = __VLS_asFunctionalComponent(__VLS_69, new __VLS_69({ to: ("/settings"), }));
        const __VLS_71 = __VLS_70({ to: ("/settings"), }, ...__VLS_functionalComponentArgsRest(__VLS_70));
        ({}({ to: ("/settings"), }));
        // @ts-ignore
        [UserIcon, UserIcon,];
        // @ts-ignore
        const __VLS_75 = __VLS_asFunctionalComponent(UserIcon, new UserIcon({}));
        const __VLS_76 = __VLS_75({}, ...__VLS_functionalComponentArgsRest(__VLS_75));
        ({}({}));
        const __VLS_79 = __VLS_pickFunctionalComponentCtx(UserIcon, __VLS_76);
        (__VLS_74.slots).default;
        const __VLS_74 = __VLS_pickFunctionalComponentCtx(__VLS_69, __VLS_71);
    }
    // @ts-ignore
    const __VLS_80 = {}
        .RouterView;
    ({}.RouterView);
    __VLS_components.RouterView;
    // @ts-ignore
    [RouterView,];
    // @ts-ignore
    const __VLS_81 = __VLS_asFunctionalComponent(__VLS_80, new __VLS_80({}));
    const __VLS_82 = __VLS_81({}, ...__VLS_functionalComponentArgsRest(__VLS_81));
    ({}({}));
    const __VLS_85 = __VLS_pickFunctionalComponentCtx(__VLS_80, __VLS_82);
    if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
        __VLS_styleScopedClasses['desktop-nav'];
        __VLS_styleScopedClasses['mobile-nav'];
    }
    var __VLS_slots;
    return __VLS_slots;
    const __VLS_componentsOption = {};
    let __VLS_name;
    let __VLS_defineComponent;
    const __VLS_internalComponent = __VLS_defineComponent({
        setup() {
            return {
                RouterLink: RouterLink,
                RouterView: RouterView,
                SMALL_BREAKPOINT: SMALL_BREAKPOINT,
                HomeIcon: HomeIcon,
                ListIcon: ListIcon,
                UserIcon: UserIcon,
                width: width,
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

//# sourceMappingURL=App.vue.js.map