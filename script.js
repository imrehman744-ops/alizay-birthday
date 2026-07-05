document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. ZAYDA SARI IMAGES KI LIST (Yahan jitne marzi paths dalon!)
    // ==========================================
    const allImages = [
        "images/pic1.jpg",
        "images/pic2.jpg",
        "images/pic3.jpg",
        "images/pic4.jpg",
        "images/pic5.jpg",
        "images/pic6.jpg",
        "images/pic7.jpg",
        "images/pic8.jpg",
        "images/pic1.jpg", // Repeating to showcase dense array explosion
        "images/pic2.jpg",
        "images/pic3.jpg",
        "images/pic4.jpg",
        "images/pic5.jpg",
        "images/pic6.jpg",
        "images/pic7.jpg",
        "images/pic8.jpg"
    ];

    // ==========================================
    // 2. KINETIC MEMORIES CASCADE ENGINE
    // ==========================================
    function launchMemoriesExplosion() {
        const stage = document.getElementById('memory-cascade-stage');
        if (!stage) return;
        
        // Clear past placeholders
        stage.innerHTML = '';
        
        // 4-Way Entry Directions
        const entryDirections = ['fly-from-top', 'fly-from-bottom', 'fly-from-left', 'fly-from-right'];
        
        // Render every image instantly with randomized cinematic parameters
        allImages.forEach((imageSrc, index) => {
            const wrapper = document.createElement('div');
            wrapper.className = 'cascade-card-wrap';
            
            // Assign a random 3D trajectory
            const randomDirection = entryDirections[Math.floor(Math.random() * entryDirections.length)];
            wrapper.classList.add(randomDirection);
            
            // Rapid rapid staggered delay sequence (Har image alag time par fast tapkegi)
            const staggerDelay = (index * 120) + (Math.random() * 150); 
            wrapper.style.animationDelay = `${staggerDelay}ms`;
            
            // Random tilt angles for the organic scatter layout
            const randomTilt = (Math.random() * 14) - 7; 
            wrapper.style.setProperty('--tilt-deg', `${randomTilt}deg`);
            
            // Image object structure
            const img = document.createElement('img');
            img.src = imageSrc;
            img.alt = `Memory Element ${index + 1}`;
            
            // Error handling if image is missing so layout doesn't break
            img.onerror = () => {
                wrapper.style.display = 'none';
            };
            
            wrapper.appendChild(img);
            stage.appendChild(wrapper);
        });
    }

    // Automatically fire the explosion on setup or trigger click
    launchMemoriesExplosion();
    const exploreTrigger = document.getElementById('explore-trigger');
    if(exploreTrigger) {
        exploreTrigger.addEventListener('click', () => {
            setTimeout(launchMemoriesExplosion, 300);
        });
    }

    // ==========================================
    // 3. AUXILIARY AMBIENTS (Typewriter & Audio Mock)
    // ==========================================
    const textTarget = document.getElementById("typewriter-text");
    if(textTarget) {
        let text = "Every love story is beautiful, but ours is my favorite...";
        let i = 0;
        function type() {
            if (i < text.length) {
                textTarget.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, 70);
            }
        }
        type();
    }

    const musicPlayer = document.getElementById("music-player");
    const musicToggle = document.getElementById("music-toggle");
    if(musicToggle && musicPlayer) {
        musicToggle.addEventListener("click", () => {
            musicPlayer.classList.toggle("playing");
        });
    }

    // Interactive Cursor Shadow Layer
    const cursorGlow = document.getElementById("cursor-glow");
    if(cursorGlow) {
        window.addEventListener("mousemove", (e) => {
            cursorGlow.style.left = e.clientX + "px";
            cursorGlow.style.top = e.clientY + "px";
        });
    }
});
