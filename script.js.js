/* ── NAV SCROLL ─────────────────────────────── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

/* ── HAMBURGER MENU ─────────────────────────── */
const hamburger   = document.getElementById('hamburger');
const mobileNav   = document.getElementById('mobileNav');
let menuOpen = false;

hamburger.addEventListener('click', () => {
  menuOpen = !menuOpen;
  hamburger.classList.toggle('open', menuOpen);
  mobileNav.classList.toggle('open', menuOpen);
  document.body.style.overflow = menuOpen ? 'hidden' : '';
});

document.querySelectorAll('.mnav-link').forEach(link => {
  link.addEventListener('click', () => {
    menuOpen = false;
    hamburger.classList.remove('open');
    mobileNav.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* ── SCROLL REVEAL ──────────────────────────── */
const reveals = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    // Stagger siblings
    const parent = entry.target.parentElement;
    const siblings = [...parent.querySelectorAll('.reveal:not(.visible)')];
    const idx = siblings.indexOf(entry.target);
    setTimeout(() => entry.target.classList.add('visible'), Math.max(0, idx) * 70);
    entry.target.classList.add('visible');
    revealObs.unobserve(entry.target);
  });
}, { threshold: 0.08, rootMargin: '0px 0px -50px 0px' });
reveals.forEach(el => revealObs.observe(el));

/* ── SKILL BARS ─────────────────────────────── */
const barObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.querySelectorAll('.sb-fill').forEach(fill => {
      const w = fill.dataset.width;
      setTimeout(() => { fill.style.width = w + '%'; }, 200);
    });
    barObs.unobserve(entry.target);
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-group').forEach(g => barObs.observe(g));

/* ── SMOOTH SCROLL ──────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
  });
});

/* ── CONTACT FORM ───────────────────────────── */
const form      = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');

if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }

    submitBtn.textContent = 'Sending…';
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.7';

    setTimeout(() => {
      submitBtn.textContent = '✓ Message Sent!';
      submitBtn.style.background = '#00d4aa';
      submitBtn.style.opacity = '1';
      form.reset();

      setTimeout(() => {
        submitBtn.textContent = 'Send Message  →';
        submitBtn.style.background = '';
        submitBtn.disabled = false;
      }, 3500);
    }, 1200);
  });
}

/* ── ACTIVE NAV LINK ────────────────────────── */
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(l => l.style.color = '');
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.style.color = 'var(--accent)';
    }
  });
}, { threshold: 0.55 }).observe.call(
  new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      navLinks.forEach(l => l.style.color = '');
      const a = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
      if (a) a.style.color = 'var(--accent)';
    });
  }, { threshold: 0.55 }),
  ...sections
);

// Simple active link observer
const linkObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navLinks.forEach(l => l.style.color = '');
    const a = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
    if (a) a.style.color = 'var(--accent)';
  });
}, { threshold: 0.5 });
sections.forEach(s => linkObs.observe(s));
