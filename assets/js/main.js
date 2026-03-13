import { initMobileMenu } from './modules/menu.js';
import { initShareButton } from './modules/share.js';
import { initJoinWhatsAppForm } from './modules/joinForm.js';
import { initWelcomeModal } from './modules/modal.js';
import { initAos } from './modules/aos.js';

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initShareButton();
    initJoinWhatsAppForm();
    initWelcomeModal();
    initAos();

    console.log('[web_royer] Modulos inicializados correctamente.');
});
