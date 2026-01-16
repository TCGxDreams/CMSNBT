/* ========================================
   BIRTHDAY WEBSITE - PREMIUM + YOUTUBE 🦛
   T1 Peyz Edition - Mobile Optimized
   ======================================== */

// Configuration
const CONFIG = {
    name: "Nguyễn Đoàn Mình An",
    age: "18",
    unlockDate: "2026-01-17T00:00:00+07:00",
    specialMessage: `"Mình An ơi, chúc mừng sinh nhật bạn thân! 🎉 Mong bạn luôn khỏe mạnh, hết đau dạ dày đường tiêu nha! Chúc bạn năm nay thi đậu Y Dược hoặc RMIT với học bổng xịn xò! Cám ơn vì đã là người bạn tuyệt vời nhất! 🦛💪"`,
    signature: "— Người bạn thân 🦛",
    heroSubtitle: "Chúc mừng 18 tuổi! 🦛🎉",
    numberOfCandles: 3,
    rainText: "T1 Peyz",
    rainColor: "#ffd700",
    introMessage: "Chúc mừng sinh nhật",
    introSubtext: "✦ MÌNH AN ✦"
};

// State
let isUnlocked = false;
let rainCanvas, rainCtx, rainDrops = [], rainActive = true;
let youtubePlayer;
let isMusicPlaying = false;

// ========================================
// INITIALIZATION
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    initIntroScreen();
    createStars();
    createIntroParticles();
});

// ========================================
// YOUTUBE MUSIC CONTROL
// ========================================
function toggleYouTubeMusic() {
    const iframe = document.getElementById('youtubePlayer');
    if (!iframe) return;

    if (isMusicPlaying) {
        // Pause: reload iframe without autoplay
        iframe.src = iframe.src.replace('autoplay=1', 'autoplay=0');
        isMusicPlaying = false;
    } else {
        // Play: set autoplay
        iframe.src = iframe.src.replace('autoplay=0', 'autoplay=1');
        isMusicPlaying = true;
    }

    return isMusicPlaying;
}

// ========================================
// INTRO SCREEN
// ========================================
function initIntroScreen() {
    document.getElementById('introMessage').textContent = CONFIG.introMessage;
    document.getElementById('introSubtext').textContent = CONFIG.introSubtext;

    updateLockCountdown();
    setInterval(updateLockCountdown, 1000);

    const enterBtn = document.getElementById('enterBtn');
    enterBtn.addEventListener('click', () => {
        if (isUnlocked || enterBtn.classList.contains('unlocked')) {
            enterMainContent();
        }
    });

    document.getElementById('secretUnlock').addEventListener('click', unlockEarly);

    // Intro music button - YouTube
    const musicBtn = document.getElementById('introMusicBtn');
    musicBtn.addEventListener('click', () => {
        const playing = toggleYouTubeMusic();
        musicBtn.textContent = playing ? '🔊' : '🎵';
        musicBtn.classList.toggle('playing', playing);
    });
}

function updateLockCountdown() {
    const unlockDate = new Date(CONFIG.unlockDate);
    const now = new Date();
    const diff = unlockDate - now;

    if (diff <= 0) {
        if (!isUnlocked) triggerAutoUnlock();
        return;
    }

    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    const update = (id, val) => {
        const el = document.getElementById(id);
        if (el) el.textContent = String(val).padStart(2, '0');
    };

    update('lockHours', hours);
    update('lockMinutes', minutes);
    update('lockSeconds', seconds);
}

function triggerAutoUnlock() {
    isUnlocked = true;

    const lockContainer = document.getElementById('lockContainer');
    const unlockMessage = document.getElementById('unlockMessage');
    const enterBtn = document.getElementById('enterBtn');
    const secretUnlock = document.getElementById('secretUnlock');

    if (lockContainer) lockContainer.style.display = 'none';
    if (unlockMessage) unlockMessage.style.display = 'block';
    if (secretUnlock) secretUnlock.style.display = 'none';

    enterBtn.classList.remove('locked');
    enterBtn.classList.add('unlocked');
    enterBtn.textContent = 'Vào xem ngay! 🎉🦛';

    createIntroCelebration();
}

function unlockEarly() {
    isUnlocked = true;

    const enterBtn = document.getElementById('enterBtn');
    const secretUnlock = document.getElementById('secretUnlock');

    enterBtn.classList.remove('locked');
    enterBtn.classList.add('unlocked');
    enterBtn.textContent = 'Vào xem 🦛';

    if (secretUnlock) secretUnlock.style.display = 'none';

    createSparkles();
}

function enterMainContent() {
    const introScreen = document.getElementById('introScreen');
    const mainWrapper = document.getElementById('mainWrapper');

    introScreen.classList.add('hidden');
    mainWrapper.classList.add('visible');
    document.body.style.overflow = 'auto';
    document.body.style.background = '#0a0a1a';

    setTimeout(() => introScreen.remove(), 1000);

    initializeMainApp();
}

// ========================================
// STARS & PARTICLES
// ========================================
function createStars() {
    const container = document.getElementById('stars');
    if (!container) return;

    for (let i = 0; i < 60; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.cssText = `
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            --d: ${2 + Math.random() * 3}s;
            animation-delay: ${Math.random() * 3}s;
        `;
        container.appendChild(star);
    }
}

function createIntroParticles() {
    const container = document.getElementById('introParticles');
    if (!container) return;

    const emojis = ['🦛', '🎉', '🎆', '🌸', '⭐', '✨'];

    for (let i = 0; i < 12; i++) {
        const p = document.createElement('span');
        p.className = 'intro-float';
        p.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        p.style.cssText = `
            left: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 8}s;
            animation-duration: ${6 + Math.random() * 4}s;
            font-size: ${1 + Math.random()}rem;
        `;
        container.appendChild(p);
    }
}

// ========================================
// CELEBRATION EFFECTS
// ========================================
function createIntroCelebration() {
    for (let i = 0; i < 30; i++) {
        setTimeout(() => createIntroConfetti(), i * 40);
    }
}

function createIntroConfetti() {
    const c = document.createElement('div');
    const colors = ['#ffd700', '#ff6b00', '#ff4500', '#00ff00', '#ff00ff'];

    c.style.cssText = `
        position: fixed;
        left: ${Math.random() * 100}%;
        top: -10px;
        width: ${5 + Math.random() * 8}px;
        height: ${5 + Math.random() * 8}px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
        pointer-events: none;
        z-index: 10001;
        animation: confettiFall ${2 + Math.random() * 2}s linear forwards;
    `;

    document.body.appendChild(c);
    setTimeout(() => c.remove(), 4000);
}

function createSparkles() {
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const s = document.createElement('div');
            s.textContent = '✨';
            s.style.cssText = `
                position: fixed;
                left: ${30 + Math.random() * 40}%;
                top: ${30 + Math.random() * 40}%;
                font-size: ${1 + Math.random()}rem;
                pointer-events: none;
                z-index: 10001;
                animation: sparkleUp 0.8s ease-out forwards;
            `;
            document.body.appendChild(s);
            setTimeout(() => s.remove(), 800);
        }, i * 50);
    }
}

// Add animations
const introStyles = document.createElement('style');
introStyles.textContent = `
    @keyframes confettiFall {
        to { transform: translateY(100vh) rotate(720deg); opacity: 0; }
    }
    @keyframes sparkleUp {
        0% { transform: scale(0); opacity: 1; }
        100% { transform: scale(1.5) translateY(-30px); opacity: 0; }
    }
`;
document.head.appendChild(introStyles);

// ========================================
// MAIN APP
// ========================================
function initializeMainApp() {
    setCustomContent();
    initNavigation();
    initParticles();
    initRainText();
    initCandles();
    initScrollAnimations();
    initCakeInteraction();
    initMusicToggle();
    initRainToggle();

    setTimeout(() => createConfettiBurst(60), 500);
}

// ========================================
// NAVIGATION (from Tet reference)
// ========================================
function initNavigation() {
    const navBar = document.getElementById('navBar');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.querySelectorAll('.nav-link');

    // Smooth scroll for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const target = document.querySelector(targetId);

            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });

                // Close mobile menu
                if (navBar) navBar.classList.remove('open');
            }

            // Update active state
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Mobile nav toggle
    if (navToggle && navBar) {
        navToggle.addEventListener('click', () => {
            navBar.classList.toggle('open');
        });
    }

    // Navbar background on scroll
    window.addEventListener('scroll', () => {
        if (navBar) {
            navBar.classList.toggle('scrolled', window.scrollY > 50);
        }

        // Scroll spy - update active nav link
        const sections = ['hero', 'wishes', 'cake', 'message'];
        const scrollPos = window.scrollY + 150;

        sections.forEach(id => {
            const section = document.getElementById(id);
            if (section) {
                const top = section.offsetTop;
                const height = section.offsetHeight;

                if (scrollPos >= top && scrollPos < top + height) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            }
        });
    });
}

function setCustomContent() {
    const el = (id) => document.getElementById(id);
    if (el('birthdayName')) el('birthdayName').textContent = CONFIG.name;
    if (el('ageNumber')) el('ageNumber').textContent = CONFIG.age;
    if (el('specialMessage')) el('specialMessage').textContent = CONFIG.specialMessage;
    if (el('heroSubtitle')) el('heroSubtitle').textContent = CONFIG.heroSubtitle;

    const sig = document.querySelector('.signature');
    if (sig) sig.textContent = CONFIG.signature;
}

// ========================================
// PARTICLES
// ========================================
function initParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    const colors = ['#ffd700', '#ff6b00', '#ff4500', '#ffa500'];

    for (let i = 0; i < 25; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.cssText = `
            width: ${4 + Math.random() * 6}px;
            height: ${4 + Math.random() * 6}px;
            left: ${Math.random() * 100}%;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            animation-duration: ${12 + Math.random() * 10}s;
            animation-delay: ${Math.random() * 10}s;
        `;
        container.appendChild(p);
    }
}

// ========================================
// RAIN TEXT
// ========================================
function initRainText() {
    rainCanvas = document.getElementById('rainCanvas');
    if (!rainCanvas) return;

    rainCtx = rainCanvas.getContext('2d');
    resizeRainCanvas();
    window.addEventListener('resize', resizeRainCanvas);

    createRainDrops();
    animateRain();
}

function resizeRainCanvas() {
    if (rainCanvas) {
        rainCanvas.width = window.innerWidth;
        rainCanvas.height = window.innerHeight;
        createRainDrops();
    }
}

function createRainDrops() {
    rainDrops = [];
    const columns = Math.floor(window.innerWidth / 35);

    for (let i = 0; i < columns; i++) {
        rainDrops.push({
            x: i * 35 + 10,
            y: Math.random() * window.innerHeight,
            speed: 2 + Math.random() * 2,
            charIndex: Math.floor(Math.random() * CONFIG.rainText.length),
            opacity: 0.2 + Math.random() * 0.4
        });
    }
}

function animateRain() {
    if (!rainCtx || !rainCanvas) return;

    if (!rainActive) {
        rainCtx.clearRect(0, 0, rainCanvas.width, rainCanvas.height);
    } else {
        rainCtx.fillStyle = 'rgba(10, 10, 26, 0.12)';
        rainCtx.fillRect(0, 0, rainCanvas.width, rainCanvas.height);

        rainCtx.font = 'bold 18px Outfit, sans-serif';
        rainCtx.shadowColor = CONFIG.rainColor;
        rainCtx.shadowBlur = 10;

        rainDrops.forEach(drop => {
            rainCtx.fillStyle = CONFIG.rainColor;
            rainCtx.globalAlpha = drop.opacity;
            rainCtx.fillText(CONFIG.rainText[drop.charIndex], drop.x, drop.y);

            drop.y += drop.speed;

            if (drop.y > rainCanvas.height) {
                drop.y = -20;
                drop.charIndex = (drop.charIndex + 1) % CONFIG.rainText.length;
            }
        });

        rainCtx.globalAlpha = 1;
        rainCtx.shadowBlur = 0;
    }

    requestAnimationFrame(animateRain);
}

// ========================================
// CONFETTI & FIREWORKS
// ========================================
function createConfetti() {
    const container = document.getElementById('confetti');
    if (!container) return;

    const colors = ['#ffd700', '#ff6b00', '#ff4500', '#00ff00', '#ff00ff'];
    const c = document.createElement('div');
    c.className = 'confetti';

    c.style.cssText = `
        left: ${Math.random() * 100}%;
        width: ${4 + Math.random() * 8}px;
        height: ${4 + Math.random() * 8}px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
        animation-duration: ${2 + Math.random() * 2}s;
    `;

    container.appendChild(c);
    setTimeout(() => c.remove(), 4000);
}

function createConfettiBurst(count = 50) {
    for (let i = 0; i < count; i++) {
        setTimeout(createConfetti, i * 25);
    }
}

function createFirework(x, y) {
    const container = document.getElementById('fireworks');
    if (!container) return;

    const colors = ['#ffd700', '#ff6b00', '#00ff00', '#00ffff'];
    const color = colors[Math.floor(Math.random() * colors.length)];

    for (let i = 0; i < 20; i++) {
        const p = document.createElement('div');
        p.className = 'firework';

        const angle = (i / 20) * 360;
        const velocity = 40 + Math.random() * 60;
        const rad = angle * Math.PI / 180;
        const endX = Math.cos(rad) * velocity;
        const endY = Math.sin(rad) * velocity;

        p.style.cssText = `
            left: ${x}px;
            top: ${y}px;
            background: ${color};
            box-shadow: 0 0 6px ${color};
        `;

        container.appendChild(p);

        p.animate([
            { transform: 'translate(0, 0) scale(1)', opacity: 1 },
            { transform: `translate(${endX}px, ${endY}px) scale(0)`, opacity: 0 }
        ], { duration: 800, easing: 'ease-out' });

        setTimeout(() => p.remove(), 800);
    }
}

function createRandomFireworks(count = 5) {
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            createFirework(Math.random() * window.innerWidth, Math.random() * (window.innerHeight * 0.5));
        }, i * 250);
    }
}

// ========================================
// CANDLES
// ========================================
function initCandles() {
    const container = document.getElementById('candlesContainer');
    if (!container) return;

    for (let i = 0; i < CONFIG.numberOfCandles; i++) {
        const candle = document.createElement('div');
        candle.className = 'cake-candle';
        container.appendChild(candle);
    }
}

// ========================================
// CAKE INTERACTION
// ========================================
function initCakeInteraction() {
    const btn = document.getElementById('blowBtn');
    if (!btn) return;

    const candles = document.querySelectorAll('.cake-candle');
    let blown = false;

    btn.addEventListener('click', () => {
        if (blown) {
            candles.forEach(c => c.classList.remove('blown'));
            btn.querySelector('.btn-text').textContent = '💨 Thổi Nến!';
            blown = false;
            return;
        }

        candles.forEach((c, i) => setTimeout(() => c.classList.add('blown'), i * 200));
        btn.querySelector('.btn-text').textContent = '🕯️ Thắp Lại';
        blown = true;

        setTimeout(showCelebration, CONFIG.numberOfCandles * 200 + 400);
    });
}

function showCelebration() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-emoji">🦛🎉</div>
            <h2 class="modal-title">Chúc Mừng Sinh Nhật!</h2>
            <p class="modal-text">Ước nguyện sẽ thành hiện thực! Chúc bạn tuổi mới vui vẻ! 🌟</p>
            <button class="modal-close">Cảm ơn! 🦛</button>
        </div>
    `;

    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('active'), 10);

    createConfettiBurst(100);
    createRandomFireworks(8);

    const closeModal = () => {
        modal.classList.remove('active');
        setTimeout(() => modal.remove(), 300);
    };

    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    modal.addEventListener('click', e => e.target === modal && closeModal());
}

// ========================================
// SCROLL ANIMATIONS
// ========================================
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('aos-animate');
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('[data-aos]').forEach(el => observer.observe(el));
}

// ========================================
// MUSIC TOGGLE (YOUTUBE)
// ========================================
function initMusicToggle() {
    const toggle = document.getElementById('musicToggle');
    if (!toggle) return;

    toggle.addEventListener('click', () => {
        const playing = toggleYouTubeMusic();
        toggle.textContent = playing ? '🔊' : '🎵';
        toggle.classList.toggle('playing', playing);
    });
}

// ========================================
// RAIN TOGGLE
// ========================================
function initRainToggle() {
    const toggle = document.getElementById('rainToggle');
    if (!toggle) return;

    toggle.classList.add('active');

    toggle.addEventListener('click', () => {
        rainActive = !rainActive;
        toggle.classList.toggle('active', rainActive);
    });
}

// ========================================
// CLICK EFFECTS
// ========================================
document.addEventListener('click', (e) => {
    if (document.getElementById('introScreen')?.contains(e.target)) return;
    if (e.target.closest('button')) return;

    createClickSparkle(e.clientX, e.clientY);
});

function createClickSparkle(x, y) {
    const s = document.createElement('div');
    const emojis = ['✨', '⭐', '🦛', '🎉'];
    s.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    s.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        font-size: 1.2rem;
        pointer-events: none;
        z-index: 9999;
    `;

    document.body.appendChild(s);
    s.animate([
        { transform: 'scale(0) rotate(0)', opacity: 1 },
        { transform: 'scale(1.5) rotate(180deg)', opacity: 0 }
    ], { duration: 500, easing: 'ease-out' });

    setTimeout(() => s.remove(), 500);
}

console.log('🦛 Birthday Website - T1 Peyz Premium Edition');
console.log('🎵 Music: YouTube embed (hidden iframe)');
console.log('🔒 Unlock at: 00:00 17/01/2026');
