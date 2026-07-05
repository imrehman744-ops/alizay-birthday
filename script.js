document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Array of Images (Macth with your actual folder files)
    const allImages = [
        "images/pic1.jpg", "images/pic2.jpg", "images/pic3.jpg", "images/pic4.jpg",
        "images/pic5.jpg", "images/pic6.jpg", "images/pic7.jpg", "images/pic8.jpg",
        "images/pic1.jpg", "images/pic2.jpg", "images/pic3.jpg", "images/pic4.jpg"
    ];

    // 2. Kinetic Cascade Engine
    function launchMemoriesExplosion() {
        const stage = document.getElementById('memory-cascade-stage');
        if (!stage) return;
        
        stage.innerHTML = ''; 
        const entryDirections = ['fly-from-top', 'fly-from-bottom', 'fly-from-left', 'fly-from-right'];
        
        allImages.forEach((imageSrc, index) => {
            const wrapper = document.createElement('div');
            wrapper.className = 'cascade-card-wrap';
            
            const randomDirection = entryDirections[Math.floor(Math.random() * entryDirections.length)];
            wrapper.classList.add(randomDirection);
            
            const staggerDelay = (index * 120) + (Math.random() * 50); 
            wrapper.style.animationDelay = `${staggerDelay}ms`;
            
            const randomTilt = (Math.random() * 12) - 6; 
            wrapper.style.setProperty('--tilt-deg', `${randomTilt}deg`);
            
            const img = document.createElement('img');
            img.src = imageSrc;
            img.alt = `Memory ${index + 1}`;
            
            img.onerror = () => {
                wrapper.innerHTML = `<div style="height:100%; display:flex; align-items:center; justify-content:center; background:rgba(212,175,55,0.05); color:#d4af37; font-family:'Poppins'; font-size:12px;">📸 Memory Bundle</div>`;
            };
            
            wrapper.appendChild(img);
            stage.appendChild(wrapper);
        });
    }

    launchMemoriesExplosion();
    
    const exploreTrigger = document.getElementById('explore-trigger');
    if(exploreTrigger) {
        exploreTrigger.addEventListener('click', () => {
            launchMemoriesExplosion();
        });
    }

    // 3. Dynamic Typewriter Config
    const textTarget = document.getElementById("typewriter-text");
    if(textTarget) {
        let text = "Ant Al Hayat";
        let i = 0;
        function type() {
            if (i < text.length) {
                textTarget.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, 120);
            }
        }
        type();
    }

    // 4. Rose Petals Fall Engine
    const petalsContainer = document.getElementById('petals-container');
    if(petalsContainer) {
        for (let i = 0; i < 25; i++) {
            const petal = document.createElement('div');
            petal.className = 'petal';
            petal.style.left = Math.random() * 100 + 'vw';
            petal.style.animationDelay = Math.random() * 8 + 's';
            petal.style.animationDuration = (Math.random() * 6 + 6) + 's';
            petalsContainer.appendChild(petal);
        }
    }

    // 5. Interactive Aura Tracker
    window.addEventListener("mousemove", (e) => {
        const cursorGlow = document.getElementById("cursor-glow");
        if(cursorGlow) {
            cursorGlow.style.left = e.clientX + "px";
            cursorGlow.style.top = e.clientY + "px";
        }
    });

    // 6. Audio Layout Toggle
    const musicPlayer = document.getElementById("music-player");
    const musicToggle = document.getElementById("music-toggle");
    if(musicToggle && musicPlayer) {
        musicToggle.addEventListener("click", () => {
            musicPlayer.classList.toggle("playing");
        });
    }
});
