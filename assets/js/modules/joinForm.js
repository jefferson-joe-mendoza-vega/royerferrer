export function initJoinWhatsAppForm() {
    const joinForm = document.getElementById('join-whatsapp-form');
    const joinName = document.getElementById('join-name');
    const joinMessage = document.getElementById('join-message');

    if (!joinForm || !joinName || !joinMessage) {
        console.warn('[join-form] Faltan elementos del formulario de WhatsApp.');
        return;
    }

    joinForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const nameValue = joinName.value.trim();
        const messageValue = joinMessage.value.trim();

        if (!nameValue || !messageValue) {
            alert('Completa tu nombre y mensaje.');
            return;
        }

        const whatsappNumber = '51958377528';
        const text = `Hola, soy ${nameValue}. ${messageValue}`;
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;

        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    });
}
