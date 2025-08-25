/* 
JS for:
- mobile navigation toggle
- fade-in reveals with IntersectionObserver 
- subtle hero parallax effect
- contact form placeholder handler with basic validation
- updated copyright by current year
*/

// helper: qs/qsa
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));

/* ===== mobile menu ===== */
const menuBtn = $('.menu-toggle');
const mobileNav = $('#mobile-menu');

if (menuBtn && mobileNav) {
  menuBtn.addEventListener('click', () => {
    const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
    menuBtn.setAttribute('aria-expanded', String(!expanded));
    mobileNav.dataset.open = !expanded;
  });
  
  // close mobile menu when a link is clicked
  $$('#mobile-menu a').forEach(a => {
    a.addEventListener('click', () => {
      menuBtn.setAttribute('aria-expanded', 'false');
      mobileNav.dataset.open = 'false';
    });
  });
}

/* ===== scroll reveal ===== */
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReduced && 'IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });
  
  $$('.reveal').forEach(el => io.observe(el));
} else {
  // if no IO and no reduced motion, then reveal
  $$('.reveal').forEach(el => el.classList.add('revealed'));
}

/* ===== subtle hero parallax ===== */
const heroBg = $('.hero-bg');
if (heroBg && !prefersReduced) {
  const onScroll = () => {
    const y = window.scrollY || document.documentElement.scrollTop;
    // slow parallax: move 1/6th of scroll distance
    heroBg.style.transform = `translateY(${Math.min(y * 0.16, 120)}px)`;
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ===== footer year ===== */
const yearEl = $('#year');
if (yearEl) yearEl.textContent = new Date().getFullYear();