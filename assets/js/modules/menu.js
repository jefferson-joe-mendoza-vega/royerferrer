export function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuBackdrop = document.getElementById('mobile-menu-backdrop');
    const menuPanel = document.getElementById('mobile-menu-panel');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    if (!menuBtn || !closeMenuBtn || !mobileMenu || !menuBackdrop || !menuPanel) {
        console.warn('[menu] Elementos faltantes para menu movil.');
        return;
    }

    const openMenu = () => {
        mobileMenu.classList.remove('hidden');
        setTimeout(() => {
            menuBackdrop.classList.remove('opacity-0');
            menuPanel.classList.remove('-translate-x-full');
        }, 10);
        document.body.style.overflow = 'hidden';
    };

    const closeMenu = () => {
        menuBackdrop.classList.add('opacity-0');
        menuPanel.classList.add('-translate-x-full');
        setTimeout(() => {
            mobileMenu.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }, 300);
    };

    menuBtn.addEventListener('click', openMenu);
    closeMenuBtn.addEventListener('click', closeMenu);
    menuBackdrop.addEventListener('click', closeMenu);
    mobileLinks.forEach((link) => link.addEventListener('click', closeMenu));
}
