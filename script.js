document.addEventListener("DOMContentLoaded", () => {

    const ACCESS_PIN = "0707";

    // Image Configuration (matches actual uploaded file names: 1.JPG.jpg, 2.JPG.jpg, ...)
    const totalImages = 56;
    const imgSuffix = ".jpg";

    function getImgSrc(n) {
        return n + imgSuffix;
    }

    function shuffle(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    const unlockBtn = document.getElementById("unlock-trigger");
    const pinField = document.getElementById("pin-field");
    const lockScreen = document.getElementById("lock-screen-gate");
    const mainApp = document.getElementById("main-application-hub");
    const errAlert = document.getElementById("error-alert");

    const birthdayKey = document.getElementById("birthday-key");
    const secretVault = document.getElementById("secret-story-content");

    // GATEWAY SECURITY CHECK EXECUTER
    function checkSystemPin() {
        if (pinField.value === ACCESS_PIN) {
            lockScreen.classList.add("fade-out-lock");
            setTimeout(() => {
                lockScreen.style.display = "none";
                mainApp.classList.remove("hidden-layout");
                mainApp.classList.add("fade-in-app");
                initializeCoreEffects();
            }, 600);
        } else {
            errAlert.classList.remove("hidden-alert");
            pinField.value = "";
            pinField.focus();
            setTimeout(() => { errAlert.classList.add("hidden-alert"); }, 3000);
        }
    }

    if (unlockBtn && pinField) {
        unlockBtn.addEventListener("click", checkSystemPin);
        pinField.addEventListener("keypress", (e) => {
            if (e.key === "Enter") checkSystemPin();
        });
    }

    // CALENDAR 07 DATE CLICK UNLOCK MECHANISM
    // Clicking the "7" reveals the rest of the site (path grid, slideshow, footer).
    if (birthdayKey && secretVault) {
        birthdayKey.addEventListener("click", () => {
            if (!secretVault.classList.contains("revealed-vault")) {
                secretVault.classList.add("revealed-vault");
                birthdayKey.classList.add("activated-pulse");

                // Fire up the premium slideshow the moment the vault opens
                initMainSlideshow();

                setTimeout(() => {
                    secretVault.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 300);
            }
        });
    }

    // MAIN PLATFORM EFFECTS MATRIX
    function initializeCoreEffects() {
        const typewriterTarget = document.getElementById("typewriter-text");
        if (typewriterTarget) {
            let text = "Ant Al Hayat";
            let index = 0;
            function playTypewriter() {
                if (index < text.length) {
                    typewriterTarget.innerHTML += text.charAt(index);
                    index++;
                    setTimeout(playTypewriter, 150);
                }
            }
            playTypewriter();
        }

        const petalsContainer = document.getElementById('petals-container');
        if (petalsContainer) {
            petalsContainer.innerHTML = '';
            for (let i = 0; i < 45; i++) {
                const petal = document.createElement('div');
                petal.className = 'petal';
                petal.style.left = Math.random() * 100 + 'vw';
                petal.style.animationDelay = Math.random() * 8 + 's';
                petal.style.animationDuration = (Math.random() * 5 + 6) + 's';
                petal.style.width = Math.random() * 10 + 6 + 'px';
                petal.style.height = petal.style.width;
                petalsContainer.appendChild(petal);
            }
        }
    }

    window.addEventListener("mousemove", (e) => {
        const glow = document.getElementById("cursor-glow");
        if (glow && lockScreen.style.display === "none") {
            glow.style.left = e.clientX + "px";
            glow.style.top = e.clientY + "px";
        }
    });

    const musicPlayer = document.getElementById("music-player");
    const musicToggle = document.getElementById("music-toggle");
    if (musicToggle && musicPlayer) {
        musicToggle.addEventListener("click", () => {
            musicPlayer.classList.toggle("paused");
            const textSpan = musicPlayer.querySelector('.status-text');
            textSpan.innerText = musicPlayer.classList.contains("paused") ? "Paused" : "Playing";
        });
    }

    const surpriseBtn = document.getElementById("final-action-fire");
    if (surpriseBtn) {
        surpriseBtn.addEventListener("click", () => {
            alert('Happy Birthday Meri Jaan! 🎂🎉 I Love You Forever!');
        });
    }

    // =====================================================
    // PREMIUM SLIDESHOW ENGINE (shared logic, two instances)
    // =====================================================
    const AUTOPLAY_MS = 4500;

    function createSlideshow({ imgId, counterId, prevId, nextId, frameId, progressFillId }) {
        const img = document.getElementById(imgId);
        const counter = document.getElementById(counterId);
        const prevBtn = document.getElementById(prevId);
        const nextBtn = document.getElementById(nextId);
        const frame = document.getElementById(frameId);
        const progressFill = progressFillId ? document.getElementById(progressFillId) : null;

        let order = shuffle(Array.from({ length: totalImages }, (_, i) => i + 1));
        let index = 0;
        let timer = null;

        function render(instant) {
            if (!img) return;
            const apply = () => {
                img.src = getImgSrc(order[index]);
                void img.offsetWidth; // reflow: restarts the ken-burns animation cleanly
                img.classList.add('active');
            };
            img.classList.remove('active');
            if (instant) {
                apply();
            } else {
                setTimeout(apply, 350);
            }
            if (counter) counter.textContent = (index + 1) + ' / ' + order.length;
            restartProgress();
        }

        function goTo(newIndex) {
            index = (newIndex + order.length) % order.length;
            render(false);
        }

        function restartProgress() {
            if (!progressFill) return;
            progressFill.style.transition = 'none';
            progressFill.style.width = '0%';
            void progressFill.offsetWidth;
            progressFill.style.transition = 'width ' + AUTOPLAY_MS + 'ms linear';
            progressFill.style.width = '100%';
        }

        function start() {
            stop();
            timer = setInterval(() => goTo(index + 1), AUTOPLAY_MS);
            restartProgress();
        }

        function stop() {
            if (timer) clearInterval(timer);
            timer = null;
        }

        if (nextBtn) nextBtn.addEventListener('click', () => { goTo(index + 1); start(); });
        if (prevBtn) prevBtn.addEventListener('click', () => { goTo(index - 1); start(); });

        // Swipe support for mobile
        if (frame) {
            let touchStartX = 0;
            frame.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            }, { passive: true });
            frame.addEventListener('touchend', (e) => {
                const dx = e.changedTouches[0].screenX - touchStartX;
                if (Math.abs(dx) > 40) {
                    if (dx < 0) goTo(index + 1); else goTo(index - 1);
                    start();
                }
            }, { passive: true });
        }

        return {
            init() { order = shuffle(Array.from({ length: totalImages }, (_, i) => i + 1)); index = 0; render(true); start(); },
            start,
            stop
        };
    }

    const mainSlideshow = createSlideshow({
        imgId: 'slide-img',
        counterId: 'slide-counter',
        prevId: 'slide-prev',
        nextId: 'slide-next',
        frameId: 'slide-frame',
        progressFillId: 'slide-progress-fill'
    });

    const modalSlideshow = createSlideshow({
        imgId: 'modal-slide-img',
        counterId: 'modal-slide-counter',
        prevId: 'modal-slide-prev',
        nextId: 'modal-slide-next',
        frameId: 'modal-slide-frame',
        progressFillId: null
    });

    // Exposed globally so the calendar-unlock and modal open/close handlers can trigger them
    window.initMainSlideshow = () => mainSlideshow.init();
    window.__modalSlideshow = modalSlideshow;
});

// Structural UI Window Modal Methods
function openModal(modalId) {
    const targetModal = document.getElementById(modalId);
    if (targetModal) {
        if (modalId === 'modal-memories' && window.__modalSlideshow) {
            window.__modalSlideshow.init();
        }
        targetModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const targetModal = document.getElementById(modalId);
    if (targetModal) {
        targetModal.classList.remove('active');
        document.body.style.overflow = 'auto';
        if (modalId === 'modal-memories' && window.__modalSlideshow) {
            window.__modalSlideshow.stop();
        }
    }
}

window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) {
        e.target.classList.remove('active');
        document.body.style.overflow = 'auto';
        if (e.target.id === 'modal-memories' && window.__modalSlideshow) {
            window.__modalSlideshow.stop();
        }
    }
});
