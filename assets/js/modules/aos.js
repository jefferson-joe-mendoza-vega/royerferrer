export function initAos() {
    if (!window.AOS) {
        console.warn('[aos] Libreria AOS no disponible.');
        return;
    }

    window.AOS.init({
        once: true,
        offset: 100,
        duration: 800,
        easing: 'ease-out-cubic',
    });
}
