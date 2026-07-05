/* =========================================================
   CONFIG & ESSENTIAL TEXTS
========================================================= */
const SECRET_PASSWORD = "Antalhayat";
const LOVE_LETTER = `Janum,
I Love You Soo Much meri jaan.
You are my Goodluck.

My dear Zoja-E-Janum,
Sakoon-e-Qalb,
Ant Al Hayat,
Ya Sadati,
Rooh-e-Man,
Noor-e-Jahan,
Wajid-e-Muhabbat,
Dharkan-e-Dil,
Rooh-e-Jism,
Kul Kainat,
Wafadar-e-Ishq.

Tumhe pata hai tum meri liye meri puri kainaat ho meri jaan.
I love you soooooooooooooooooo muchhhhh meri jaan.

Apni dil ki har dharkan se Happy Happy Birthday meri jaan.

Allah Pak apko hamesha hasta muskurata rakhe. Ameen.
Allah Pak apko hamesha mera banaye.
Apko duniya bhar ki har khushi ata farmaye.

In Sha Allah ek din hum apki birthday saath celebrate karenge meri jaan.
Wallah meri jaan woh meri zindagi ka sab se haseen din hoga.

Sirf apki meri jaan.
Sirf apki.
Kisi aur ka thora sa bhi nahi.

Forever Yours,
Abdul Rehman ❤️`;

const TYPEWRITER_LINES = [
  "My Ant Al Hayat.",
  "My Zoja-E-Janum.",
  "My Kul Kainat.",
  "Forever Yours, Abdul Rehman."
];

// 5 Active images array jo slideshow mein rotate hongi
const IMAGES_ARRAY = ["1.JPG.jpg", "2.JPG.jpg", "3.JPG.jpg", "4.JPG.jpg", "5.JPG.jpg"];

/* =========================================================
   PASSWORD SCREEN HANDLING
========================================================= */
const passwordScreen = document.getElementById("password-screen");
const passwordForm = document.getElementById("password-form");
const passwordInput = document.getElementById("password-input");
const passwordError = document.getElementById("password-error");

function checkPassword(e) {
  if (e) e.preventDefault();
  
  if (passwordInput.value.trim() === SECRET_PASSWORD) {
    if (passwordError) passwordError.style.display = "none";
    passwordScreen.style.opacity = "0";
    setTimeout(() => {
      passwordScreen.classList.add("hidden");
      startIntroSequence();
    }, 700);
  } else {
    if (passwordError) passwordError.style.display = "block";
    passwordInput.style.borderColor = "#ff5566";
    passwordInput.value = "";
    setTimeout(() => (passwordInput.style.borderColor = ""), 900);
  }
}

if (passwordForm) {
  passwordForm.addEventListener("submit", checkPassword);
}

/* =========================================================
   INTRO ANIMATION TIMELINE
========================================================= */
const loadingScreen = document.getElementById("loading-screen");
const ribbonScreen = document.getElementById("ribbon-screen");
const giftScreen = document.getElementById("gift-screen");
const giftBox = document.getElementById("gift-box");
const site = document.getElementById("site");

function startIntroSequence() {
  loadingScreen.classList.remove("hidden");
  setTimeout(() => {
    loadingScreen.style.opacity = "0";
    setTimeout(() => {
      loadingScreen.classList.add("hidden");
      ribbonScreen.classList.remove("hidden");
      setTimeout(() => {
        ribbonScreen.style.opacity = "0";
        setTimeout(() => {
          ribbonScreen.classList.add("hidden");
          giftScreen.classList.remove("hidden");
        }, 700);
      }, 2200);
    }, 700);
  }, 2000);
}

if (giftBox) {
  giftBox.addEventListener("click", () => {
    if (giftBox.classList.contains("opened")) return;
    giftBox.classList.add("opened");
    burstConfetti();
    setTimeout(() => {
      giftScreen.style.opacity = "0";
      setTimeout(() => {
        giftScreen.classList.add("hidden");
        site.classList.remove("hidden");
        document.body.style.overflow = "auto";
        initSiteFeatures();
      }, 700);
    }, 900);
  });
}

document.body.style.overflow = "hidden";

/* =========================================================
   SITE SYSTEM INITIALIZATION
========================================================= */
let siteInitialized = false;
function initSiteFeatures() {
  if (siteInitialized) return;
  siteInitialized = true;

  buildTypewriter();
  buildCalendar();
  
  // Custom Smooth Slideshow Setup
  setupLiveSlideshow("gallery-grid");
  setupLiveSlideshow("gallery-grid-modal");
  
  const letterBody = document.getElementById("letter-body");
  if (letterBody) letterBody.innerText = LOVE_LETTER;
  
  bindModals();
  bindMusic();
  
  const fireworksBtn = document.getElementById("fireworks-btn");
  if (fireworksBtn) {
    fireworksBtn.addEventListener("click", () => {
      burstConfetti();
      launchFireworks();
    });
  }
}

/* ---- Typewriter Engine ---- */
function buildTypewriter() {
  const el = document.getElementById("typewriter");
  if (!el) return;
  let lineIndex = 0, charIndex = 0, deleting = false;

  function tick() {
    const line = TYPEWRITER_LINES[lineIndex];
    if (!deleting) {
      charIndex++;
      el.textContent = line.slice(0, charIndex);
      if (charIndex === line.length) {
        deleting = true;
        setTimeout(tick, 1800);
        return;
      }
    } else {
      charIndex--;
      el.textContent = line.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        lineIndex = (lineIndex + 1) % TYPEWRITER_LINES.length;
      }
    }
    setTimeout(tick, deleting ? 35 : 65);
  }
  tick();
}

/* ---- July 2026 Interactive Calendar ---- */
function buildCalendar() {
  const grid = document.getElementById("calendar-grid");
  if (!grid) return;
  const YEAR = 2026;
  const MONTH = 6; 
  const daysInJuly = new Date(YEAR, MONTH + 1, 0).getDate();
  const startOffset = new Date(YEAR, MONTH, 1).getDay();

  const labels = ["S", "M", "T", "W", "T", "F", "S"];
  labels.forEach(l => {
    const d = document.createElement("div");
    d.className = "cal-day weekday-label";
    d.style.opacity = ".4";
    d.textContent = l;
    grid.appendChild(d);
  });

  for (let i = 0; i < startOffset; i++) {
    const empty = document.createElement("div");
    empty.className = "cal-day empty";
    grid.appendChild(empty);
  }

  for (let day = 1; day <= daysInJuly; day++) {
    const cell = document.createElement("div");
    cell.className = "cal-day day-cell" + (day === 7 ? " highlight" : "");
    cell.textContent = day;
    cell.addEventListener("click", () => {
      if (day === 7) {
        unlockStoryGate(cell);
      } else {
        cell.classList.add("shake");
        setTimeout(() => cell.classList.remove("shake"), 400);
      }
    });
    grid.appendChild(cell);
  }
}

function unlockStoryGate(cell) {
  const lockedContent = document.getElementById("locked-content");
  const hint = document.getElementById("calendar-hint");
  if (!lockedContent || lockedContent.classList.contains("unlocked")) return;

  cell.classList.add("unlocked");
  if (hint) hint.innerHTML = "Our story is unlocked, meri jaan. ❤";
  lockedContent.classList.add("unlocked");
  burstConfetti();
  
  setTimeout(() => {
    const choices = document.getElementById("choices");
    if (choices) choices.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 500);
}

/* ---- Seamless Dynamic Auto Slideshow Engine ---- */
function setupLiveSlideshow(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  // Purane tamam static structure ko wipe out karna taake grid bugs na aayen
  container.innerHTML = "";
  let activeIndex = 0;

  IMAGES_ARRAY.forEach((src, idx) => {
    const slide = document.createElement("div");
    slide.className = "live-slide";
    slide.style.opacity = idx === 0 ? "1" : "0";
    slide.style.transform = idx === 0 ? "scale(1.02)" : "scale(1.1)";
    slide.innerHTML = `<img src="${src}" alt="Memory Dynamic Layer">`;
    container.appendChild(slide);
  });

  const allSlides = container.querySelectorAll(".live-slide");
  if (allSlides.length === 0) return;

  // Zoom setup initial transition effect
  setTimeout(() => { allSlides[0].style.transform = "scale(1.06)"; }, 100);

  // Automatic slide execution loop (Runs beautifully every 4 seconds)
  setInterval(() => {
    allSlides[activeIndex].style.opacity = "0";
    allSlides[activeIndex].style.transform = "scale(1.12)";

    activeIndex = (activeIndex + 1) % allSlides.length;

    allSlides[activeIndex].style.opacity = "1";
    allSlides[activeIndex].style.transform = "scale(1.04)";
  }, 4000);
}

/* ---- Modal Navigation Controls ---- */
function bindModals() {
  const overlay = document.getElementById("modal-overlay");
  const cards = document.querySelectorAll(".choice-card");
  const modals = document.querySelectorAll(".modal");
  if (!overlay) return;

  cards.forEach(card => {
    card.addEventListener("click", () => {
      const target = document.getElementById(card.dataset.target);
      if (target) {
        overlay.classList.add("show");
        target.classList.add("show");
      }
    });
  });

  const closeAll = () => {
    overlay.classList.remove("show");
    modals.forEach(m => m.classList.remove("show"));
  };

  overlay.addEventListener("click", closeAll);
  document.querySelectorAll(".modal-close").forEach(btn => btn.addEventListener("click", closeAll));
}

/* ---- Audio Context Synths ---- */
let audioCtx, musicPlaying = false, nodes = [];
function bindMusic() {
  const btn = document.getElementById("music-toggle");
  if (btn) btn.addEventListener("click", () => {
    const player = document.getElementById("music-player");
    if (!musicPlaying) {
      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const master = audioCtx.createGain(); master.gain.value = 0.05; master.connect(audioCtx.destination);
      [261.63, 329.63, 392.0, 523.25].forEach((f) => {
        const o = audioCtx.createOscillator(); const g = audioCtx.createGain();
        o.frequency.value = f; g.gain.value = 0.02; o.connect(g); g.connect(master); o.start();
        nodes.push(o, g);
      });
      nodes.push(master);
      if (player) player.classList.add("playing");
      musicPlaying = true;
    } else {
      nodes.forEach(n => { try { n.stop(); } catch(e){} }); nodes = [];
      if (player) player.classList.remove("playing");
      musicPlaying = false;
    }
  });
}

/* =========================================================
   AMBIENT FX (Canvas Canvas Systems)
========================================================= */
const petalCanvas = document.getElementById("fx-petals");
const petalCtx = petalCanvas ? petalCanvas.getContext("2d") : null;
const fireflyCanvas = document.getElementById("fx-fireflies");
const fireflyCtx = fireflyCanvas ? fireflyCanvas.getContext("2d") : null;
const confettiCanvas = document.getElementById("fx-confetti");
const confettiCtx = confettiCanvas ? confettiCanvas.getContext("2d") : null;

let petals = [], fireflies = [], confettiPieces = [], fireworks = [];

function resizeAll() {
  [petalCanvas, fireflyCanvas, confettiCanvas].forEach(c => {
    if(c) { c.width = window.innerWidth; c.height = window.innerHeight; }
  });
}
window.addEventListener("resize", resizeAll);
resizeAll();

// Populate items
if (petalCtx) {
  for(let i=0; i<30; i++) petals.push({ x: Math.random()*window.innerWidth, y: Math.random()*-window.innerHeight, size: 8+Math.random()*6, speed: 0.5+Math.random()*0.8, drift: Math.random()*0.6-0.3 });
}
if (fireflyCtx) {
  for(let i=0; i<20; i++) fireflies.push({ x: Math.random()*window.innerWidth, y: Math.random()*window.innerHeight, r: 1.5+Math.random(), speedX: Math.random()*0.4-0.2, speedY: Math.random()*0.4-0.2 });
}

function burstConfetti() {
  if (!confettiCtx) return;
  for (let i = 0; i < 80; i++) {
    confettiPieces.push({ x: window.innerWidth/2, y: window.innerHeight/2, vx: Math.random()*6-3, vy: Math.random()*-8-2, size: 5+Math.random()*4, color: ["#d4af37", "#b8324a", "#f7ecd6"][Math.floor(Math.random()*3)], life: 1 });
  }
}

function launchFireworks() {
  if (!confettiCtx) return;
  for (let i = 0; i < 40; i++) {
    const angle = (Math.PI*2*i)/40; const speed = 3+Math.random()*2;
    fireworks.push({ x: window.innerWidth/2, y: window.innerHeight*0.4, vx: Math.cos(angle)*speed, vy: Math.sin(angle)*speed, color: "#d4af37", life: 1 });
  }
}

function loopFX(t) {
  if (petalCtx) {
    petalCtx.clearRect(0,0,window.innerWidth,window.innerHeight);
    petalCtx.fillStyle = "#b8324a";
    petals.forEach(p => {
      p.y += p.speed; p.x += p.drift;
      if (p.y > window.innerHeight) { p.y = -20; p.x = Math.random()*window.innerWidth; }
      petalCtx.beginPath(); petalCtx.ellipse(p.x, p.y, p.size*0.6, p.size, 0, 0, Math.PI*2); petalCtx.fill();
    });
  }
  if (fireflyCtx) {
    fireflyCtx.clearRect(0,0,window.innerWidth,window.innerHeight);
    fireflies.forEach(f => {
      f.x += f.speedX; f.y += f.speedY;
      if(f.x<0 || f.x>window.innerWidth) f.speedX*=-1; if(f.y<0 || f.y>window.innerHeight) f.speedY*=-1;
      fireflyCtx.beginPath(); fireflyCtx.arc(f.x, f.y, f.r, 0, Math.PI*2);
      fireflyCtx.fillStyle = `rgba(240,217,140,${0.3+Math.abs(Math.sin(t/600))*0.7})`; fireflyCtx.fill();
    });
  }
  if (confettiCtx) {
    confettiCtx.clearRect(0,0,window.innerWidth,window.innerHeight);
    confettiPieces.forEach(p => { p.x+=p.vx; p.y+=p.vy; p.vy+=0.12; p.life-=0.01; if(p.life>0){ confettiCtx.fillStyle=p.color; confettiCtx.globalAlpha=p.life; confettiCtx.fillRect(p.x,p.y,p.size,p.size*0.6); } });
    fireworks.forEach(f => { f.x+=f.vx; f.y+=f.vy; f.vy+=0.04; f.life-=0.015; if(f.life>0){ confettiCtx.fillStyle=f.color; confettiCtx.globalAlpha=f.life; confettiCtx.beginPath(); confettiCtx.arc(f.x,f.y,2.5,0,Math.PI*2); confettiCtx.fill(); } });
    confettiCtx.globalAlpha = 1.0;
  }
  requestAnimationFrame(loopFX);
}
requestAnimationFrame(loopFX);
