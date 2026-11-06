/* ============================================================
   WEBXPERT — GSAP ANIMATIONS & INTERACTIONS
   ============================================================ */
gsap.registerPlugin(ScrollTrigger);
document.body.classList.add('loading');

/* ---------- THEME TOGGLE (Dark / Light) ---------- */
const themeToggle = document.getElementById('themeToggle');
const rootEl = document.documentElement;

// Page load pe saved theme ya system preference lagao
const savedTheme = localStorage.getItem('webxpert-theme');
const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
if (savedTheme) {
  rootEl.setAttribute('data-theme', savedTheme);
} else if (systemPrefersLight) {
  rootEl.setAttribute('data-theme', 'light');
}

themeToggle.addEventListener('click', () => {
  const current = rootEl.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  rootEl.setAttribute('data-theme', current);
  localStorage.setItem('webxpert-theme', current);
  // Smooth color transition
  gsap.fromTo('body', { opacity: 0.85 }, { opacity: 1, duration: 0.4 });
});

/* ---------- PRELOADER ---------- */
const preloader = document.getElementById('preloader');
const barFill = document.getElementById('preloaderBar');
const percentEl = document.getElementById('preloaderPercent');

gsap.from('.pl-letter', {
  y: 60, opacity: 0, rotate: () => gsap.utils.random(-40, 40),
  stagger: 0.06, duration: 0.7, ease: 'back.out(2)'
});

let progress = 0;
gsap.to({}, {
  duration: 2.2,
  onUpdate: function () {
    progress = Math.round(this.progress() * 100);
    barFill.style.width = progress + '%';
    percentEl.textContent = progress + '%';
  },
  onComplete: hidePreloader
});

function hidePreloader() {
  const tl = gsap.timeline();
  tl.to('.pl-letter', {
    y: -50, opacity: 0, stagger: 0.04, duration: 0.4, ease: 'power2.in'
  })
  .to(preloader, {
    yPercent: -100, duration: 0.9, ease: 'power4.inOut'
  }, '-=0.1')
  .add(() => {
    preloader.style.display = 'none';
    document.body.classList.remove('loading');
    heroIntro();
  });
}

/* ---------- HERO INTRO ---------- */
function heroIntro() {
  const tl = gsap.timeline();
  tl.from('.hero__badge', { y: 30, opacity: 0, duration: 0.6, ease: 'power3.out' })
    .from('.hero-line', { yPercent: 110, duration: 0.9, stagger: 0.12, ease: 'power4.out' }, '-=0.3')
    .from('.hero__sub', { y: 30, opacity: 0, duration: 0.6 }, '-=0.4')
    .from('.hero__buttons .btn', { y: 30, opacity: 0, stagger: 0.1, duration: 0.5 }, '-=0.3')
    .from('.floater', { scale: 0, opacity: 0, stagger: 0.08, duration: 0.6, ease: 'back.out(2.5)' }, '-=0.4')
    .from('.navbar', { y: -10, opacity: 1, duration: 0.6 }, '-=0.6')
    .from('.whatsapp-float', { scale: 0, duration: 0.5, ease: 'back.out(2)' }, '-=0.3');
  startFloaterLoops();
}

/* ---------- FLOATING SHAPES LOOP ---------- */
function startFloaterLoops() {
  document.querySelectorAll('.floater').forEach((el, i) => {
    gsap.to(el, {
      y: gsap.utils.random(-25, 25),
      x: gsap.utils.random(-20, 20),
      rotate: gsap.utils.random(-30, 30),
      duration: gsap.utils.random(2.5, 4.5),
      repeat: -1, yoyo: true,
      ease: 'sine.inOut', delay: i * 0.2
    });
  });
  gsap.to('.hero__blob--1', { x: 80, y: 60, duration: 8, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  gsap.to('.hero__blob--2', { x: -70, y: -50, duration: 9, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  gsap.to('.hero__blob--3', { x: -40, y: 40, duration: 7, repeat: -1, yoyo: true, ease: 'sine.inOut' });
}

/* ---------- MARQUEE ---------- */
gsap.to('.marquee__track', {
  xPercent: -50, duration: 18, repeat: -1, ease: 'none'
});

/* ---------- SCROLL ANIMATIONS ---------- */
gsap.utils.toArray('.section__head').forEach(head => {
  gsap.from(head, {
    y: 50, opacity: 0, duration: 0.9, ease: 'power3.out',
    scrollTrigger: { trigger: head, start: 'top 85%' }
  });
});

gsap.utils.toArray('.service-card').forEach((card, i) => {
  gsap.from(card, {
    y: 70, opacity: 0, rotate: i % 2 === 0 ? -3 : 3,
    duration: 0.8, delay: (i % 4) * 0.1, ease: 'power3.out',
    scrollTrigger: { trigger: card, start: 'top 88%' }
  });
});

gsap.utils.toArray('.work-card').forEach((card, i) => {
  gsap.from(card, {
    y: 80, opacity: 0, scale: 0.92,
    duration: 0.8, delay: (i % 3) * 0.12, ease: 'power3.out',
    scrollTrigger: { trigger: card, start: 'top 90%' }
  });
});

gsap.utils.toArray('.team-card').forEach((card, i) => {
  gsap.from(card, {
    y: 60, opacity: 0, duration: 0.7, delay: (i % 4) * 0.1, ease: 'power3.out',
    scrollTrigger: { trigger: card, start: 'top 90%' }
  });
});

document.querySelectorAll('.stats__num').forEach(num => {
  const target = +num.dataset.count;
  ScrollTrigger.create({
    trigger: num, start: 'top 88%', once: true,
    onEnter: () => {
      gsap.to(num, {
        innerText: target, duration: 1.8, snap: { innerText: 1 },
        ease: 'power2.out'
      });
    }
  });
});

gsap.from('.contact__card', {
  y: 80, opacity: 0, duration: 1, ease: 'power3.out',
  scrollTrigger: { trigger: '.contact__card', start: 'top 85%' }
});

gsap.from('.footer__big', {
  yPercent: 60, opacity: 0, duration: 1, ease: 'power3.out',
  scrollTrigger: { trigger: '.footer', start: 'top 90%' }
});

/* ---------- NAVBAR SCROLL STATE ---------- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ---------- MOBILE MENU ---------- */
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
burger.addEventListener('click', () => {
  burger.classList.toggle('active');
  navLinks.classList.toggle('active');
});
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    burger.classList.remove('active');
    navLinks.classList.remove('active');
  });
});

/* ---------- TILT EFFECT (desktop) ---------- */
if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  document.querySelectorAll('[data-tilt]').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(card, { rotateY: x * 10, rotateX: -y * 10, duration: 0.4, ease: 'power2.out' });
    });
    card.addEventListener('mouseleave', () => {
      gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' });
    });
  });

  /* ---------- MAGNETIC BUTTONS ---------- */
  document.querySelectorAll('.magnetic').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      gsap.to(btn, {
        x: (e.clientX - rect.left - rect.width / 2) * 0.3,
        y: (e.clientY - rect.top - rect.height / 2) * 0.3,
        duration: 0.3
      });
    });
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' });
    });
  });

  /* ---------- CUSTOM CURSOR ---------- */
  const cursor = document.getElementById('cursor');
  const cursorDot = document.getElementById('cursorDot');
  window.addEventListener('mousemove', e => {
    gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.35, ease: 'power2.out' });
    gsap.to(cursorDot, { x: e.clientX, y: e.clientY, duration: 0.08 });
  });
  document.querySelectorAll('a, button, .service-card, .work-card, .team-card').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('is-hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('is-hover'));
  });
}

/* ---------- CONTACT FORM (frontend only — TODO: backend hook) ---------- */
const form = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
form.addEventListener('submit', e => {
  e.preventDefault();
  const btnText = form.querySelector('.btn__text');
  btnText.textContent = 'Sending...';
  // TODO: backend ready hone pe yahan fetch() call karo apne API endpoint se
  setTimeout(() => {
    btnText.textContent = 'Send Message 🚀';
    formStatus.innerHTML = '<i class="ri-check-line"></i> Message received! We will reply within 24 hours.';
    form.reset();
    gsap.fromTo(formStatus, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5 });
    setTimeout(() => formStatus.textContent = '', 5000);
  }, 1200);
});

/* ---------- FAQ ACCORDION ---------- */
document.querySelectorAll('.faq-item').forEach(item => {
  const question = item.querySelector('.faq-item__question');
  const answer = item.querySelector('.faq-item__answer');
  question.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    // Baaki sab band karo (single-open behaviour)
    document.querySelectorAll('.faq-item.open').forEach(other => {
      other.classList.remove('open');
      other.querySelector('.faq-item__answer').style.maxHeight = null;
    });
    if (!isOpen) {
      item.classList.add('open');
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }
  });
});

/* ---------- REVIEW & FAQ SCROLL ANIMATIONS ---------- */
gsap.utils.toArray('.review-card').forEach((card, i) => {
  gsap.from(card, {
    y: 60, opacity: 0, rotate: i % 2 === 0 ? -2 : 2,
    duration: 0.75, delay: (i % 4) * 0.1, ease: 'power3.out',
    scrollTrigger: { trigger: card, start: 'top 90%' }
  });
});

gsap.utils.toArray('.faq-item').forEach((item, i) => {
  gsap.from(item, {
    y: 40, opacity: 0, duration: 0.6, delay: i * 0.08, ease: 'power3.out',
    scrollTrigger: { trigger: item, start: 'top 92%' }
  });
});

gsap.from('.footer__address', {
  y: 50, opacity: 0, duration: 0.9, ease: 'power3.out',
  scrollTrigger: { trigger: '.footer__address', start: 'top 92%' }
});

/* ---------- ACTIVE NAV LINK ON SCROLL ---------- */
const sections = document.querySelectorAll('section[id], footer[id]');
const navItems = document.querySelectorAll('.nav-link');
window.addEventListener('scroll', () => {
  let current = 'hero';
  sections.forEach(sec => {
    const top = sec.offsetTop - 120;
    if (window.scrollY >= top) current = sec.getAttribute('id');
  });
  navItems.forEach(link => {
    link.classList.toggle('active',
      link.getAttribute('href') === '#' + current);
  });
}, { passive: true });

/* ---------- REVIEWS SLIDER ---------- */
const revTrack = document.getElementById('reviewsTrack');
const revCards = revTrack ? Array.from(revTrack.children) : [];
const revPrev = document.getElementById('revPrev');
const revNext = document.getElementById('revNext');
const revDots = document.getElementById('reviewsDots');
let revIndex = 0, revTimer = null;

function revPerView() {
  if (window.innerWidth >= 1024) return 3;
  if (window.innerWidth >= 640) return 2;
  return 1;
}
function revMaxIndex() { return Math.max(0, revCards.length - revPerView()); }
function revStepPx() {
  const gap = parseFloat(getComputedStyle(revTrack).gap) || 24;
  return revCards[0].offsetWidth + gap;
}
function renderDots() {
  revDots.innerHTML = '';
  for (let i = 0; i <= revMaxIndex(); i++) {
    const b = document.createElement('button');
    b.setAttribute('aria-label', 'Go to slide ' + (i + 1));
    b.addEventListener('click', () => { revIndex = i; updateSlider(); restartAutoplay(); });
    revDots.appendChild(b);
  }
}
function updateSlider() {
  revIndex = Math.min(revIndex, revMaxIndex());
  revTrack.style.transform = 'translateX(-' + (revIndex * revStepPx()) + 'px)';
  revPrev.disabled = revIndex === 0;
  revNext.disabled = revIndex === revMaxIndex();
  revDots.querySelectorAll('button').forEach((d, i) =>
    d.classList.toggle('active', i === revIndex));
}
revPrev.addEventListener('click', () => { revIndex--; updateSlider(); restartAutoplay(); });
revNext.addEventListener('click', () => { revIndex++; updateSlider(); restartAutoplay(); });

// Swipe support (mobile)
let touchStartX = 0;
revTrack.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
revTrack.addEventListener('touchend', e => {
  const dx = e.changedTouches[0].clientX - touchStartX;
  if (Math.abs(dx) > 50) {
    revIndex += dx < 0 ? 1 : -1;
    revIndex = Math.max(0, Math.min(revIndex, revMaxIndex()));
    updateSlider();
  }
  restartAutoplay();
}, { passive: true });

// Autoplay — hover pe pause
function startAutoplay() {
  revTimer = setInterval(() => {
    revIndex = revIndex >= revMaxIndex() ? 0 : revIndex + 1;
    updateSlider();
  }, 4500);
}
function restartAutoplay() { clearInterval(revTimer); startAutoplay(); }
const sliderBox = document.querySelector('.reviews-slider');
sliderBox.addEventListener('mouseenter', () => clearInterval(revTimer));
sliderBox.addEventListener('mouseleave', startAutoplay);

renderDots();
updateSlider();
startAutoplay();
window.addEventListener('resize', () => { renderDots(); updateSlider(); });