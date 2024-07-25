import { ref, onMounted, onUnmounted } from 'vue';
export const SMALL_BREAKPOINT = 690;
export const MEDIUM_BREAKPOINT = 1025;
export const LARGE_BREAKPOINT = 1200;
export function windowService() {
    const width = ref(window.innerWidth);
    const handleResize = () => {
        width.value = window.innerWidth;
    };
    onMounted(() => {
        window.addEventListener('resize', handleResize);
    });
    onUnmounted(() => {
        window.removeEventListener('resize', handleResize);
    });
    return {
        width,
    };
}
//# sourceMappingURL=windowService.js.map