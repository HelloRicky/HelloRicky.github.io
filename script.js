// ============================================================
// CUSTOM CURSOR
// ============================================================
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top  = my + 'px';
});

function animateRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

// ============================================================
// STAR FIELD
// ============================================================
(function() {
  const canvas = document.getElementById('stars-canvas');
  const ctx = canvas.getContext('2d');
  let W, H, stars = [];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function mkStar() {
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.2 + 0.2,
      o: Math.random() * 0.7 + 0.1,
      speed: Math.random() * 0.15 + 0.02,
      twinkle: Math.random() * Math.PI * 2,
      twinkleSpeed: Math.random() * 0.02 + 0.005
    };
  }

  function init() {
    resize();
    stars = Array.from({length: 200}, mkStar);
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    stars.forEach(s => {
      s.twinkle += s.twinkleSpeed;
      const o = s.o * (0.6 + 0.4 * Math.sin(s.twinkle));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(212, 221, 232, ${o})`;
      ctx.fill();
      // Scroll parallax
      s.y -= s.speed * (1 + window.scrollY * 0.0003);
      if (s.y < 0) { s.y = H; s.x = Math.random() * W; }
    });
    // Amber nebula glow
    const grd = ctx.createRadialGradient(W * 0.75, H * 0.3, 0, W * 0.75, H * 0.3, W * 0.3);
    grd.addColorStop(0, 'rgba(240,165,0,0.04)');
    grd.addColorStop(1, 'transparent');
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, W, H);
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  init();
  draw();
})();

// ============================================================
// TYPEWRITER
// ============================================================
(function() {
  const el = document.getElementById('typed');
  const phrases = [
    'lead data engineering teams',
    'build AI products from zero',
    'design solar energy systems',
    'print things that don\'t exist yet',
    'think in systems, build in public'
  ];
  let pi = 0, ci = 0, deleting = false;

  function type() {
    const phrase = phrases[pi];
    if (!deleting) {
      el.textContent = phrase.slice(0, ++ci);
      if (ci === phrase.length) {
        deleting = true;
        setTimeout(type, 2000);
        return;
      }
    } else {
      el.textContent = phrase.slice(0, --ci);
      if (ci === 0) {
        deleting = false;
        pi = (pi + 1) % phrases.length;
        setTimeout(type, 300);
        return;
      }
    }
    setTimeout(type, deleting ? 40 : 70);
  }

  setTimeout(type, 1500);
})();

// ============================================================
// FLIP CARDS
// ============================================================
window.flipCard = function(id) {
  const card = document.getElementById(id);
  card.classList.toggle('flipped');
};

document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', function(e) {
    if (e.target.classList.contains('flip-back-btn') || e.target.classList.contains('project-link')) return;
    this.classList.toggle('flipped');
  });
});

// ============================================================
// SCROLL REVEAL
// ============================================================
const revealEls = document.querySelectorAll('.reveal, .timeline-item');
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const delay = el.dataset.delay || 0;
      setTimeout(() => el.classList.add('visible'), delay);
      io.unobserve(el);
    }
  });
}, { threshold: 0.15 });

revealEls.forEach((el, i) => {
  el.dataset.delay = (i % 6) * 80;
  io.observe(el);
});

// ============================================================
// DYNAMIC FOOTER YEAR
// ============================================================
document.getElementById('copy-year').textContent = new Date().getFullYear();

// ============================================================
// JOURNEY CARD IMAGE CAROUSEL
// ============================================================
(function() {
  const wraps = document.querySelectorAll('.journey-card-img-wrap');
  wraps.forEach((wrap, wrapIdx) => {
    const imgs = wrap.querySelectorAll('img');
    if (imgs.length < 2) return;
    let current = 0;
    setTimeout(() => {
      setInterval(() => {
        imgs[current].classList.remove('active');
        current = (current + 1) % imgs.length;
        imgs[current].classList.add('active');
      }, 3000);
    }, wrapIdx * 600);
  });
})();

// ============================================================
// JOURNEY TRACK — DRAG TO SCROLL
// ============================================================
(function() {
  const track = document.getElementById('journey-track');
  if (!track) return;

  let isDown = false;
  let startX, scrollLeft;

  track.addEventListener('mousedown', e => {
    isDown = true;
    startX = e.pageX - track.offsetLeft;
    scrollLeft = track.scrollLeft;
  });

  document.addEventListener('mouseup', () => {
    isDown = false;
  });

  track.addEventListener('mousemove', e => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    track.scrollLeft = scrollLeft - (x - startX) * 1.5;
  });

  // Scroll hint auto-hide after 30px scroll
  const hint = document.querySelector('.journey-scroll-hint');
  if (hint) {
    track.addEventListener('scroll', function hideHint() {
      if (track.scrollLeft > 30) {
        hint.classList.add('hidden');
        track.removeEventListener('scroll', hideHint);
      }
    });
  }
})();

// ============================================================
// NAV LOGO — DYNAMIC TEXT ON SCROLL
// ============================================================
(function() {
  const logo = document.querySelector('.nav-logo');
  if (!logo) return;
  window.addEventListener('scroll', () => {
    logo.textContent = window.scrollY <= 100 ? 'Hi! I am Ricky Zheng' : 'Ricky Zheng';
  }, { passive: true });
})();
