/* =============================================
   PRANA TEA — main.js
   Mega menu · sticky header · scroll animations
   ============================================= */
(function () {
  'use strict';

  /* ---- Sticky header ---- */
  const header = document.getElementById('site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
  }

  /* ---- Mega menu ---- */
  const megaBtn  = document.getElementById('megaBtn');
  const megaMenu = document.getElementById('megaMenu');
  if (megaBtn && megaMenu) {
    let closeTimer;
    const openMega  = () => { clearTimeout(closeTimer); megaMenu.classList.add('open'); megaBtn.setAttribute('aria-expanded', 'true'); };
    const closeMega = () => { closeTimer = setTimeout(() => { megaMenu.classList.remove('open'); megaBtn.setAttribute('aria-expanded', 'false'); }, 120); };
    megaBtn.addEventListener('mouseenter', openMega);
    megaBtn.addEventListener('mouseleave', closeMega);
    megaMenu.addEventListener('mouseenter', () => clearTimeout(closeTimer));
    megaMenu.addEventListener('mouseleave', closeMega);
    megaBtn.addEventListener('click', () => megaMenu.classList.contains('open') ? closeMega() : openMega());
    document.addEventListener('click', (e) => { if (!megaBtn.contains(e.target) && !megaMenu.contains(e.target)) { megaMenu.classList.remove('open'); megaBtn.setAttribute('aria-expanded', 'false'); } });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { megaMenu.classList.remove('open'); megaBtn.setAttribute('aria-expanded', 'false'); megaBtn.focus(); } });
  }

  /* ---- Mobile nav ---- */
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileNav    = document.getElementById('mobileNav');
  if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener('click', () => { const o = mobileNav.classList.toggle('open'); mobileToggle.setAttribute('aria-expanded', o); });
  }

  /* ---- Cart button ---- */
  const cartBtn = document.getElementById('cartBtn');
  if (cartBtn) {
    cartBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const sidebar = document.getElementById('cartSidebar');
      const overlay = document.getElementById('cartOverlay');
      if (sidebar) { sidebar.classList.toggle('open'); if (overlay) overlay.classList.toggle('active'); document.body.style.overflow = sidebar.classList.contains('open') ? 'hidden' : ''; }
    });
  }

  /* ---- Scroll reveal ---- */
  const els = document.querySelectorAll('.product-card,.store-card,.cat-tile,.step,.testimonial,.value-card,.bundle-card,.promo-half,.ritual-text,.ritual-steps,.hero-tea-card');
  if ('IntersectionObserver' in window && els.length) {
    els.forEach(el => el.classList.add('fade-up'));
    const obs = new IntersectionObserver((entries) => { entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } }); }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
    els.forEach(el => obs.observe(el));
  }

  /* ---- Smooth hash scroll ---- */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const id = this.getAttribute('href').slice(1);
      const t = document.getElementById(id);
      if (t) { e.preventDefault(); window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - 130, behavior: 'smooth' }); }
    });
  });

})();
