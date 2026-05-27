// ===== Dance Styles =====
const dances = ['bounce', 'spin', 'wiggle', 'jump', 'moonwalk'];

let currentDance = 'bounce';
let particleInterval;
let letterColors = {};

// ===== Init =====
document.addEventListener('DOMContentLoaded', () => {
  setDance('bounce');
  spawnParticles();
  setupControls();
}); 

// ===== Controls =====
function setupControls() {
  document.querySelectorAll('.dance-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const dance = btn.dataset.dance;
      setDance(dance);
    });
  });
}

function setDance(dance) {
  currentDance = dance;

  // Update body class
  document.body.className = `dance-${dance}`;

  // Update active button
  document.querySelectorAll('.dance-btn').forEach(b => b.classList.remove('active'));
  document.querySelector(`.dance-btn[data-dance="${dance}"]`)?.classList.add('active');

  // Update subtitle
  const names = {
    bounce:  '🔄 波浪舞 — 像海浪一样起伏',
    spin:    '🌀 旋转舞 — 转起来！',
    wiggle:  '🤪 扭扭舞 — 摇摆不停',
    jump:    '⬆️ 弹簧跳 — 蹦蹦跳跳',
    moonwalk: '🌙 太空步 — MJ 经典'
  };
  document.getElementById('subtitle').textContent = names[dance] || '点击换舞步 🕺';
}

// ===== Particles =====
const particleEmojis = ['🎵', '🎶', '⭐', '✨', '💫', '🌟', '💃', '🕺', '🎉', '🎊', '❤️', '💜'];

function spawnParticles() {
  const container = document.getElementById('particles');
  const emojis = shuffle([...particleEmojis]);

  // Clear old particles
  container.innerHTML = '';

  // Create 20 particles staggered
  for (let i = 0; i < 20; i++) {
    setTimeout(() => {
      const p = document.createElement('div');
      p.className = 'particle';
      p.textContent = emojis[i % emojis.length];
      p.style.left = Math.random() * 100 + '%';
      p.style.fontSize = (0.8 + Math.random() * 1.5) + 'rem';
      p.style.animationDuration = (3 + Math.random() * 3) + 's';
      p.style.animationDelay = (Math.random() * 4) + 's';
      container.appendChild(p);
    }, i * 200);
  }

  // Respawning
  if (particleInterval) clearInterval(particleInterval);
  particleInterval = setInterval(() => {
    const p = document.createElement('div');
    p.className = 'particle';
    p.textContent = particleEmojis[Math.floor(Math.random() * particleEmojis.length)];
    p.style.left = Math.random() * 100 + '%';
    p.style.fontSize = (0.8 + Math.random() * 1.5) + 'rem';
    p.style.animationDuration = (3 + Math.random() * 3) + 's';
    container.appendChild(p);

    // Auto-remove after animation
    setTimeout(() => p.remove(), 6000);
  }, 800);
}

// ===== Keyboard shortcuts =====
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight' || e.key === ' ') {
    e.preventDefault();
    const idx = (dances.indexOf(currentDance) + 1) % dances.length;
    setDance(dances[idx]);
  } else if (e.key === 'ArrowLeft') {
    e.preventDefault();
    const idx = (dances.indexOf(currentDance) - 1 + dances.length) % dances.length;
    setDance(dances[idx]);
  }
});

// ===== Touch / Click anywhere =====
document.getElementById('container').addEventListener('click', (e) => {
  if (e.target.closest('.dance-btn')) return; // don't override button clicks
  const idx = (dances.indexOf(currentDance) + 1) % dances.length;
  setDance(dances[idx]);
});

// ===== Utility =====
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
