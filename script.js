/* =========================================================
   CONFIG
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

/* =========================================================
   PASSWORD SCREEN
========================================================= */
const passwordScreen = document.getElementById("password-screen");
const passwordForm = document.getElementById("password-form");
const passwordInput = document.getElementById("password-input");
const passwordError = document.getElementById("password-error");

passwordForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (passwordInput.value.trim() === SECRET_PASSWORD) {
    passwordError.classList.remove("show");
    passwordScreen.style.opacity = "0";
    setTimeout(() => {
      passwordScreen.classList.add("hidden");
      startIntroSequence();
    }, 700);
  } else {
    passwordError.classList.add("show");
    passwordInput.style.borderColor = "#ff5566";
    passwordInput.value = "";
    setTimeout(() => (passwordInput.style.borderColor = ""), 900);
  }
});

/* =========================================================
   INTRO SEQUENCE: loading -> ribbon -> gift -> site
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

/* Lock scroll until unlocked */
document.body.style.overflow = "hidden";

/* =========================================================
   SITE FEATURES (init once unlocked)
========================================================= */
let siteInitialized = false;
function initSiteFeatures() {
  if (siteInitialized) return;
  siteInitialized = true;

  buildTypewriter();
  buildCalendar();
  buildGallery("gallery-grid", 50);
  buildGallery("gallery-grid-modal", 50);
  document.getElementById("letter-body").innerText = LOVE_LETTER;
  bindModals();
  bindMusic();
  document.getElementById("fireworks-btn").addEventListener("click", () => {
    burstConfetti();
    launchFireworks();
  });
}

/* ---- Typewriter ---- */
function buildTypewriter() {
  const el = document.getElementById("typewriter");
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

/* ---- Calendar: July 2026 only, must click 7 July to unlock the site ---- */
function buildCalendar() {
  const grid = document.getElementById("calendar-grid");
  const YEAR = 2026;
  const MONTH = 6; // July (0-indexed)
  const daysInJuly = new Date(YEAR, MONTH + 1, 0).getDate();
  const startOffset = new Date(YEAR, MONTH, 1).getDay(); // real weekday of 1 July 2026

  const labels = ["S", "M", "T", "W", "T", "F", "S"];
  labels.forEach(l => {
    const d = document.createElement("div");
    d.className = "cal-day weekday-label";
    d.style.opacity = ".4";
    d.style.fontWeight = "600";
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
    cell.dataset.day = day;
    cell.addEventListener("click", () => handleCalendarClick(cell, day));
    grid.appendChild(cell);
  }
}

function handleCalendarClick(cell, day) {
  if (day === 7) {
    unlockSite(cell);
  } else {
    cell.classList.add("shake");
    setTimeout(() => cell.classList.remove("shake"), 400);
  }
}

function unlockSite(cell) {
  const lockedContent = document.getElementById("locked-content");
  const hint = document.getElementById("calendar-hint");
  if (lockedContent.classList.contains("unlocked")) return;

  cell.classList.add("unlocked");
  hint.innerHTML = "Our story is unlocked, meri jaan. ❤";
  hint.classList.add("unlocked-hint");
  lockedContent.classList.add("unlocked");
  burstConfetti();
  sparkleBurst();

  setTimeout(() => {
    document.getElementById("choices").scrollIntoView({ behavior: "smooth", block: "start" });
  }, 500);
}

/* ---- Gallery placeholders ---- */
function buildGallery(containerId, count) {
  const grid = document.getElementById(containerId);
  if (!grid) return;
  const hearts = ["❤","💕","🌹","✨","💌"];
  for (let i = 1; i <= count; i++) {
    const item = document.createElement("div");
    item.className = "gallery-item";
    item.innerHTML = `<span>${hearts[i % hearts.length]} Memory ${i}</span>`;
    grid.appendChild(item);
  }
}

/* ---- Modals ---- */
function bindModals() {
  const overlay = document.getElementById("modal-overlay");
  const cards = document.querySelectorAll(".choice-card");
  const modals = document.querySelectorAll(".modal");

  function openModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    overlay.classList.add("show");
    modal.classList.add("show");
    sparkleBurst();
  }
  function closeAll() {
    overlay.classList.remove("show");
    modals.forEach(m => m.classList.remove("show"));
  }

  cards.forEach(card => {
    card.addEventListener("click", () => openModal(card.dataset.target));
  });
  overlay.addEventListener("click", closeAll);
  document.querySelectorAll(".modal-close").forEach(btn => {
    btn.addEventListener("click", closeAll);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeAll();
  });
}

/* =========================================================
   AMBIENT MUSIC (synthesized, royalty-free — no external audio files)
========================================================= */
let audioCtx, musicPlaying = false, musicNodes = [];

function bindMusic() {
  document.getElementById("music-toggle").addEventListener("click", toggleMusic);
}

function toggleMusic() {
  const player = document.getElementById("music-player");
  if (!musicPlaying) {
    startAmbientMusic();
    player.classList.add("playing");
    musicPlaying = true;
  } else {
    stopAmbientMusic();
    player.classList.remove("playing");
    musicPlaying = false;
  }
}

function startAmbientMusic() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const masterGain = audioCtx.createGain();
  masterGain.gain.value = 0.06;
  masterGain.connect(audioCtx.destination);

  const notes = [261.63, 329.63, 392.0, 440.0, 523.25]; // soft pentatonic pad (C E G A C)
  notes.forEach((freq, i) => {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = "sine";
    osc.frequency.value = freq;
    gain.gain.value = 0;
    osc.connect(gain);
    gain.connect(masterGain);
    osc.start();

    const lfo = audioCtx.createOscillator();
    const lfoGain = audioCtx.createGain();
    lfo.frequency.value = 0.08 + i * 0.02;
    lfoGain.gain.value = 0.035;
    lfo.connect(lfoGain);
    lfoGain.connect(gain.gain);
    lfo.start();

    musicNodes.push(osc, lfo, gain, lfoGain);
  });
  musicNodes.push(masterGain);
}

function stopAmbientMusic() {
  musicNodes.forEach(n => {
    try { n.stop && n.stop(); } catch (e) {}
    try { n.disconnect && n.disconnect(); } catch (e) {}
  });
  musicNodes = [];
}

/* =========================================================
   CURSOR GLOW + MOUSE TRAIL
========================================================= */
const cursorGlow = document.getElementById("cursor-glow");
window.addEventListener("mousemove", (e) => {
  cursorGlow.style.left = e.clientX + "px";
  cursorGlow.style.top = e.clientY + "px";
  spawnTrailDot(e.clientX, e.clientY);
});

const trailCanvas = document.getElementById("fx-trail");
const trailCtx = trailCanvas.getContext("2d");
let trailDots = [];
function resizeCanvas(c) { c.width = window.innerWidth; c.height = window.innerHeight; }
resizeCanvas(trailCanvas);

function spawnTrailDot(x, y) {
  trailDots.push({ x, y, life: 1 });
  if (trailDots.length > 40) trailDots.shift();
}
function renderTrail() {
  trailCtx.clearRect(0, 0, trailCanvas.width, trailCanvas.height);
  trailDots.forEach(d => {
    trailCtx.beginPath();
    trailCtx.arc(d.x, d.y, 3 * d.life, 0, Math.PI * 2);
    trailCtx.fillStyle = `rgba(212,175,55,${d.life * 0.5})`;
    trailCtx.fill();
    d.life -= 0.035;
  });
  trailDots = trailDots.filter(d => d.life > 0);
  requestAnimationFrame(renderTrail);
}
renderTrail();

/* =========================================================
   ROSE PETALS (falling)
========================================================= */
const petalCanvas = document.getElementById("fx-petals");
const petalCtx = petalCanvas.getContext("2d");
resizeCanvas(petalCanvas);
let petals = [];

function createPetals(count) {
  for (let i = 0; i < count; i++) {
    petals.push({
      x: Math.random() * petalCanvas.width,
      y: Math.random() * -petalCanvas.height,
      size: 6 + Math.random() * 8,
      speed: 0.4 + Math.random() * 0.8,
      drift: Math.random() * 1 - 0.5,
      rot: Math.random() * 360,
      rotSpeed: Math.random() * 1 - 0.5,
      opacity: 0.4 + Math.random() * 0.5
    });
  }
}
createPetals(35);

function drawPetal(p) {
  petalCtx.save();
  petalCtx.translate(p.x, p.y);
  petalCtx.rotate((p.rot * Math.PI) / 180);
  petalCtx.globalAlpha = p.opacity;
  petalCtx.fillStyle = "#b8324a";
  petalCtx.beginPath();
  petalCtx.ellipse(0, 0, p.size * 0.6, p.size, 0, 0, Math.PI * 2);
  petalCtx.fill();
  petalCtx.restore();
}
function renderPetals() {
  petalCtx.clearRect(0, 0, petalCanvas.width, petalCanvas.height);
  petals.forEach(p => {
    p.y += p.speed;
    p.x += p.drift;
    p.rot += p.rotSpeed;
    if (p.y > petalCanvas.height + 20) {
      p.y = -20;
      p.x = Math.random() * petalCanvas.width;
    }
    drawPetal(p);
  });
  requestAnimationFrame(renderPetals);
}
renderPetals();

/* =========================================================
   FLOATING HEARTS (DOM based, lightweight)
========================================================= */
function spawnFloatingHeart() {
  const heart = document.createElement("div");
  heart.textContent = "❤";
  heart.style.position = "fixed";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.bottom = "-40px";
  heart.style.fontSize = 12 + Math.random() * 16 + "px";
  heart.style.color = "rgba(184,50,74," + (0.4 + Math.random() * 0.4) + ")";
  heart.style.zIndex = "6";
  heart.style.pointerEvents = "none";
  heart.style.transition = "transform 8s linear, opacity 8s linear";
  document.body.appendChild(heart);
  requestAnimationFrame(() => {
    heart.style.transform = `translateY(-${window.innerHeight + 100}px) translateX(${Math.random() * 100 - 50}px)`;
    heart.style.opacity = "0";
  });
  setTimeout(() => heart.remove(), 8200);
}
setInterval(() => {
  if (!document.getElementById("site").classList.contains("hidden")) {
    spawnFloatingHeart();
  }
}, 900);

/* =========================================================
   FIREFLIES
========================================================= */
const fireflyCanvas = document.getElementById("fx-fireflies");
const fireflyCtx = fireflyCanvas.getContext("2d");
resizeCanvas(fireflyCanvas);
let fireflies = [];
for (let i = 0; i < 22; i++) {
  fireflies.push({
    x: Math.random() * fireflyCanvas.width,
    y: Math.random() * fireflyCanvas.height,
    r: 1 + Math.random() * 2,
    a: Math.random(),
    phase: Math.random() * Math.PI * 2,
    speedX: Math.random() * 0.4 - 0.2,
    speedY: Math.random() * 0.4 - 0.2
  });
}
function renderFireflies(t) {
  fireflyCtx.clearRect(0, 0, fireflyCanvas.width, fireflyCanvas.height);
  fireflies.forEach(f => {
    f.x += f.speedX;
    f.y += f.speedY;
    if (f.x < 0 || f.x > fireflyCanvas.width) f.speedX *= -1;
    if (f.y < 0 || f.y > fireflyCanvas.height) f.speedY *= -1;
    const glow = 0.4 + 0.6 * Math.abs(Math.sin(t / 800 + f.phase));
    fireflyCtx.beginPath();
    fireflyCtx.arc(f.x, f.y, f.r * 2.5, 0, Math.PI * 2);
    fireflyCtx.fillStyle = `rgba(240,217,140,${glow * 0.25})`;
    fireflyCtx.fill();
    fireflyCtx.beginPath();
    fireflyCtx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
    fireflyCtx.fillStyle = `rgba(255,244,214,${glow})`;
    fireflyCtx.fill();
  });
  requestAnimationFrame(renderFireflies);
}
requestAnimationFrame(renderFireflies);

/* =========================================================
   CONFETTI + FIREWORKS + SPARKLES
========================================================= */
const confettiCanvas = document.getElementById("fx-confetti");
const confettiCtx = confettiCanvas.getContext("2d");
resizeCanvas(confettiCanvas);
let confettiPieces = [];
let fireworkParticles = [];
let sparkles = [];

function burstConfetti() {
  const colors = ["#d4af37", "#f0d98c", "#b8324a", "#7a1128", "#f7ecd6"];
  for (let i = 0; i < 120; i++) {
    confettiPieces.push({
      x: confettiCanvas.width / 2 + (Math.random() * 200 - 100),
      y: confettiCanvas.height / 2,
      vx: Math.random() * 8 - 4,
      vy: Math.random() * -10 - 3,
      size: 4 + Math.random() * 5,
      color: colors[Math.floor(Math.random() * colors.length)],
      rot: Math.random() * 360,
      rotSpeed: Math.random() * 10 - 5,
      life: 1
    });
  }
}

function launchFireworks() {
  const colors = ["#d4af37", "#f0d98c", "#b8324a", "#ff8a94", "#f7ecd6"];
  for (let burst = 0; burst < 4; burst++) {
    setTimeout(() => {
      const cx = confettiCanvas.width * (0.2 + Math.random() * 0.6);
      const cy = confettiCanvas.height * (0.2 + Math.random() * 0.4);
      const color = colors[Math.floor(Math.random() * colors.length)];
      for (let i = 0; i < 60; i++) {
        const angle = (Math.PI * 2 * i) / 60;
        const speed = 2 + Math.random() * 3;
        fireworkParticles.push({
          x: cx, y: cy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color, life: 1
        });
      }
    }, burst * 450);
  }
}

function sparkleBurst() {
  for (let i = 0; i < 20; i++) {
    sparkles.push({
      x: window.innerWidth / 2 + (Math.random() * 300 - 150),
      y: window.innerHeight / 2 + (Math.random() * 200 - 100),
      size: 1 + Math.random() * 2,
      life: 1
    });
  }
}

function renderEffects() {
  confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

  confettiPieces.forEach(p => {
    p.x += p.vx; p.y += p.vy; p.vy += 0.15; p.rot += p.rotSpeed; p.life -= 0.008;
    confettiCtx.save();
    confettiCtx.translate(p.x, p.y);
    confettiCtx.rotate((p.rot * Math.PI) / 180);
    confettiCtx.globalAlpha = Math.max(p.life, 0);
    confettiCtx.fillStyle = p.color;
    confettiCtx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
    confettiCtx.restore();
  });
  confettiPieces = confettiPieces.filter(p => p.life > 0);

  fireworkParticles.forEach(p => {
    p.x += p.vx; p.y += p.vy; p.vy += 0.03; p.life -= 0.012;
    confettiCtx.beginPath();
    confettiCtx.arc(p.x, p.y, 2, 0, Math.PI * 2);
    confettiCtx.globalAlpha = Math.max(p.life, 0);
    confettiCtx.fillStyle = p.color;
    confettiCtx.fill();
  });
  confettiCtx.globalAlpha = 1;
  fireworkParticles = fireworkParticles.filter(p => p.life > 0);

  sparkles.forEach(s => {
    s.life -= 0.02;
    confettiCtx.beginPath();
    confettiCtx.globalAlpha = Math.max(s.life, 0);
    confettiCtx.fillStyle = "#f0d98c";
    confettiCtx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
    confettiCtx.fill();
  });
  confettiCtx.globalAlpha = 1;
  sparkles = sparkles.filter(s => s.life > 0);

  requestAnimationFrame(renderEffects);
}
renderEffects();

/* =========================================================
   PARALLAX ON SCROLL
========================================================= */
window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  const heroGlow = document.querySelector(".hero-glow");
  if (heroGlow) heroGlow.style.transform = `translate(-50%, ${scrollY * 0.25}px)`;
  const heroName = document.getElementById("hero-name");
  if (heroName) heroName.style.transform = `translateY(${scrollY * 0.12}px)`;
});

/* =========================================================
   RESIZE HANDLING
========================================================= */
window.addEventListener("resize", () => {
  [petalCanvas, fireflyCanvas, trailCanvas, confettiCanvas].forEach(resizeCanvas);
});
