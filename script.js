document.addEventListener("DOMContentLoaded", () => {
    
    const ACCESS_PIN = "0707"; 

    // Image Configuration setup (Direct from Root)
    const totalImages = 56;
    const imgExtension = ".jpg"; // Agar aapki images .png hain to ise ".png" kar dein

    const unlockBtn = document.getElementById("unlock-trigger");
    const pinField = document.getElementById("pin-field");
    const lockScreen = document.getElementById("lock-screen-gate");
    const mainApp = document.getElementById("main-application-hub");
    const errAlert = document.getElementById("error-alert");
    
    const birthdayKey = document.getElementById("birthday-key");
    const secretVault = document.getElementById("secret-story-content");

    // GATEWAY SECURITY CHECK EXECUTER
    function checkSystemPin() {
        if(pinField.value === ACCESS_PIN) {
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

    if(unlockBtn && pinField) {
        unlockBtn.addEventListener("click", checkSystemPin);
        pinField.addEventListener("keypress", (e) => {
            if(e.key === "Enter") checkSystemPin();
        });
    }

    // CALENDAR 07 DATE CLICK UNLOCK MECHANISM
    if(birthdayKey && secretVault) {
        birthdayKey.addEventListener("click", () => {
            if(!secretVault.classList.contains("revealed-vault")) {
                secretVault.classList.add("revealed-vault");
                birthdayKey.classList.add("activated-pulse");
                
                // Set initial main frame random image from 1 to 56
                const mainHeroImg = document.getElementById("main-hero-img");
                if (mainHeroImg) {
                    const randomNum = Math.floor(Math.random() * totalImages) + 1;
                    mainHeroImg.src = randomNum + imgExtension;
                }

                // Smoothly scroll down to show unlocked content
                setTimeout(() => {
                    secretVault.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 300);
            }
        });
    }

    // MAIN PLATFORM EFFECTS MATRIX
    function initializeCoreEffects() {
        // Typewriter Engine
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

        // Floating Petals Engine
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

    // Ambient Mouse Glow Track Engine
    window.addEventListener("mousemove", (e) => {
        const glow = document.getElementById("cursor-glow");
        if (glow && lockScreen.style.display === "none") {
            glow.style.left = e.clientX + "px";
            glow.style.top = e.clientY + "px";
        }
    });

    // Simulated Audio Media Controller
    const musicPlayer = document.getElementById("music-player");
    const musicToggle = document.getElementById("music-toggle");
    if (musicToggle && musicPlayer) {
        musicToggle.addEventListener("click", () => {
            musicPlayer.classList.toggle("paused");
            const textSpan = musicPlayer.querySelector('.status-text');
            textSpan.innerText = musicPlayer.classList.contains("paused") ? "Paused" : "Playing";
        });
    }

    // Alert Message Event Fire
    const surpriseBtn = document.getElementById("final-action-fire");
    if(surpriseBtn) {
        surpriseBtn.addEventListener("click", () => {
            alert('Happy Birthday Meri Jaan! 🎂🎉 I Love You Forever!');
        });
    }
});

// Structural UI Window Modal Methods
function openModal(modalId) {
    const targetModal = document.getElementById(modalId);
    if (targetModal) {
        // If opening memories modal, load a fresh random image from 1 to 56 direct root
        if (modalId === 'modal-memories') {
            const memoryImg = document.getElementById("dynamic-memory-img");
            if (memoryImg) {
                const totalImages = 56;
                const imgExtension = ".jpg"; 
                const randomNum = Math.floor(Math.random() * totalImages) + 1;
                memoryImg.src = randomNum + imgExtension;
            }
        }
        targetModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

// Global modal close operations
function closeModal(modalId) {
    const targetModal = document.getElementById(modalId);
    if (targetModal) {
        targetModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) {
        e.target.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});
