export function initWelcomeModal() {
    const welcomeModal = document.getElementById('welcome-modal');
    const welcomeModalBackdrop = document.getElementById('welcome-modal-backdrop');
    const welcomeModalPanel = document.getElementById('welcome-modal-panel');
    const closeWelcomeModalBtn = document.getElementById('close-welcome-modal');
    const tutorialVideo = document.getElementById('tutorial-video');
    const tutorialVideoBox = document.getElementById('tutorial-video-box');
    const tutorialPlayHint = document.getElementById('tutorial-play-hint');
    const timerProgress = document.getElementById('timer-progress');

    if (!welcomeModal || !welcomeModalBackdrop || !welcomeModalPanel || !closeWelcomeModalBtn || !timerProgress) {
        console.warn('[modal] Faltan elementos del modal de bienvenida.');
        return;
    }

    let autoCloseTimeout;
    const TIME_TO_CLOSE = 10000;
    let isVideoPlaying = false;
    let isModalClosed = false;

    const startAutoCloseTimer = () => {
        if (isModalClosed) {
            return;
        }

        timerProgress.style.transition = `stroke-dashoffset ${TIME_TO_CLOSE}ms linear`;
        setTimeout(() => {
            if (!isVideoPlaying && !isModalClosed) {
                timerProgress.style.strokeDashoffset = '113';
            }
        }, 50);

        autoCloseTimeout = setTimeout(() => {
            if (!isVideoPlaying && !isModalClosed) {
                closeWelcomeModal();
            }
        }, TIME_TO_CLOSE);
    };

    const stopAutoCloseTimer = () => {
        clearTimeout(autoCloseTimeout);
        timerProgress.style.transition = 'none';
        timerProgress.style.strokeDashoffset = '0';
    };

    const openWelcomeModal = () => {
        welcomeModal.classList.remove('hidden');
        welcomeModal.classList.add('flex');
        document.body.style.overflow = 'hidden';
        isModalClosed = false;

        setTimeout(() => {
            welcomeModalBackdrop.classList.remove('opacity-0');
            welcomeModalPanel.classList.remove('opacity-0', 'scale-95');
            welcomeModalPanel.classList.add('scale-100');
            startAutoCloseTimer();
        }, 10);
    };

    const closeWelcomeModal = () => {
        isModalClosed = true;
        stopAutoCloseTimer();

        if (tutorialVideo && !tutorialVideo.paused) {
            tutorialVideo.pause();
        }

        welcomeModalBackdrop.classList.add('opacity-0');
        welcomeModalPanel.classList.remove('scale-100');
        welcomeModalPanel.classList.add('opacity-0', 'scale-95');

        setTimeout(() => {
            welcomeModal.classList.remove('flex');
            welcomeModal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }, 500);
    };

    if (tutorialVideo) {
        const playTutorialVideo = () => {
            if (tutorialVideo.paused) {
                tutorialVideo.play().catch((error) => {
                    console.warn('[modal] No se pudo iniciar el video automaticamente:', error);
                });
            }
        };

        if (tutorialVideoBox) {
            tutorialVideoBox.addEventListener('click', playTutorialVideo);
        }

        if (tutorialPlayHint) {
            tutorialPlayHint.addEventListener('click', playTutorialVideo);
        }

        tutorialVideo.addEventListener('play', () => {
            isVideoPlaying = true;
            stopAutoCloseTimer();
            if (tutorialPlayHint) {
                tutorialPlayHint.classList.add('hidden');
            }
        });

        tutorialVideo.addEventListener('pause', () => {
            if (tutorialPlayHint && !tutorialVideo.ended) {
                tutorialPlayHint.classList.remove('hidden');
            }
        });

        tutorialVideo.addEventListener('ended', () => {
            if (tutorialPlayHint) {
                tutorialPlayHint.classList.remove('hidden');
            }
            setTimeout(() => {
                if (!isModalClosed) {
                    closeWelcomeModal();
                }
            }, 1500);
        });
    }

    window.addEventListener('load', () => {
        setTimeout(() => {
            openWelcomeModal();
        }, 800);
    });

    closeWelcomeModalBtn.addEventListener('click', closeWelcomeModal);
    welcomeModalBackdrop.addEventListener('click', closeWelcomeModal);
}
