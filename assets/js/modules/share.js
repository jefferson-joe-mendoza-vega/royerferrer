export function initShareButton() {
    const shareBtn = document.getElementById('share-btn');
    if (!shareBtn) {
        console.warn('[share] No se encontro #share-btn');
        return;
    }

    shareBtn.addEventListener('click', async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Royer Ferrer Tarazona - Libertad Popular',
                    text: 'Conoce las propuestas de Royer Ferrer Tarazona, postulante a Diputado por Huanuco.',
                    url: window.location.href,
                });
                return;
            } catch (error) {
                console.log('[share] Compartir cancelado o con error:', error);
            }
        }

        try {
            await navigator.clipboard.writeText(window.location.href);
            alert('Enlace copiado al portapapeles.');
        } catch (error) {
            console.error('[share] No se pudo copiar el enlace:', error);
        }
    });
}
