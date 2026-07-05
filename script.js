document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Typewriter Animation Script
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

    // 2. Ambient Falling Rose Petals Engine
    const petalsContainer = document.getElementById('petals-container');
    if (petalsContainer) {
        const totalPetals = 40;
        for (let i = 0; i < totalPetals; i++) {
            const petal = document.createElement('div');
            petal.className = 'petal';
            petal.style.left = Math.random() * 100 + 'vw';
            petal.style.animationDelay = Math.random() * 10 + 's';
            petal.style.animationDuration = (Math.random() * 5 + 6) + 's';
            petal.style.width = Math.random() * 8 + 6 + 'px';
            petal.style.height = petal.style.width;
            petalsContainer.appendChild(petal);
        }
    }

    // 3. Ambient Tracker Glow Effect
    window.addEventListener("mousemove", (e) => {
        const glow = document.getElementById("cursor-glow");
        if (glow) {
            glow.style.left = e.clientX + "px";
            glow.style.top = e.clientY + "px";
        }
    });

    // 4. Audio Mock Control Toggle
    const musicPlayer = document.getElementById("music-player");
    const musicToggle = document.getElementById("music-toggle");
    if (musicToggle && musicPlayer) {
        musicToggle.addEventListener("click", () => {
            musicPlayer.classList.toggle("paused");
            const textSpan = musicPlayer.querySelector('.status-text');
            if(musicPlayer.classList.contains("paused")) {
                textSpan.innerText = "Paused";
            } else {
                textSpan.innerText = "Playing";
            }
        });
    }
});

// Global Modal Control Engines
function openModal(modalId) {
    const targetModal = document.getElementById(modalId);
    if (targetModal) {
        targetModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Stop background scrolling
    }
}

function closeModal(modalId) {
    const targetModal = document.getElementById(modalId);
    if (targetModal) {
        targetModal.classList.remove('active');
        document.body.style.overflow = 'auto'; // Restore scroll
    }
}

// Close modals automatically if overlay clicked
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) {
        e.target.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});
