/* ============================================================
   DATA STREAM CANVAS (matrix rain — privacy scanner aesthetic)
   ============================================================ */
(function () {
  const canvas = document.getElementById('matrix-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  // Characters: mix of binary, hex, and privacy-related symbols
  const chars = '01アイウエオカキクケコサシスセソ10FF00ABCDEF<>/{}[]|#$%&?!;:'.split('');

  let cols, drops;
  const FONT_SIZE = 13;

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    cols  = Math.floor(canvas.width / FONT_SIZE);
    drops = Array(cols).fill(1);
  }

  function draw() {
    ctx.fillStyle = 'rgba(13, 27, 42, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#00E5FF';
    ctx.font = FONT_SIZE + 'px JetBrains Mono, monospace';

    for (let i = 0; i < drops.length; i++) {
      const char = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(char, i * FONT_SIZE, drops[i] * FONT_SIZE);
      if (drops[i] * FONT_SIZE > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  resize();
  window.addEventListener('resize', resize);
  setInterval(draw, 55);
})();

/* ============================================================
   PROJECT CARD ACCORDION
   ============================================================ */
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', () => {
    const isActive = card.classList.contains('active');
    // Close all
    document.querySelectorAll('.project-card').forEach(c => c.classList.remove('active'));
    // Open clicked if it was closed
    if (!isActive) card.classList.add('active');
  });
});

/* ============================================================
   SCROLL REVEAL (IntersectionObserver)
   ============================================================ */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal, .timeline-item').forEach(el => {
  revealObserver.observe(el);
});

/* ============================================================
   STAGGER CHILDREN OF .themes-grid and .verdict-list
   ============================================================ */
document.querySelectorAll('.themes-grid .theme-card, .verdict-list .verdict-item').forEach((el, i) => {
  el.style.transitionDelay = (i * 60) + 'ms';
  el.classList.add('reveal');
  revealObserver.observe(el);
});

document.querySelectorAll('.timeline-item').forEach((el, i) => {
  el.style.transitionDelay = (i * 90) + 'ms';
});

/* ============================================================
   TYPED SUBTITLE in hero
   ============================================================ */
(function () {
  const el = document.getElementById('typed-tag');
  if (!el) return;
  const phrases = [
    'privacy by default.',
    'local AI, zero API bills.',
    'own your stack.',
    'code without surveillance.',
    'build, not subscribe.',
  ];
  let pi = 0, ci = 0, deleting = false;

  function tick() {
    const phrase = phrases[pi];
    if (!deleting) {
      el.textContent = phrase.slice(0, ++ci);
      if (ci === phrase.length) { deleting = true; setTimeout(tick, 2200); return; }
      setTimeout(tick, 55);
    } else {
      el.textContent = phrase.slice(0, --ci);
      if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; setTimeout(tick, 400); return; }
      setTimeout(tick, 30);
    }
  }
  setTimeout(tick, 800);
})();

/* ============================================================
   SMOOTH NAV HIGHLIGHT on scroll
   ============================================================ */
(function () {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-links a[href^="#"]');

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        links.forEach(l => {
          l.style.color = l.getAttribute('href') === '#' + id
            ? 'var(--cyan)'
            : 'var(--text-muted)';
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => obs.observe(s));
})();
