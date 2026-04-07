/* =============================================
   PRANA TEA — main.js
   Nav scroll, mobile menu, scroll animations
   ============================================= */

(function () {
  'use strict';

  /* ---------- Sticky Header ---------- */
  const header = document.getElementById('site-header');
  if (header) {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // run on load
  }

  /* ---------- Mobile Nav Toggle ---------- */
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileNav    = document.getElementById('mobileNav');
  if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });
  }

  /* ---------- Scroll-reveal Animations ---------- */
  const revealEls = document.querySelectorAll(
    '.product-card, .step, .testimonial, .value-card, .product-detail-card, .ritual-text, .ritual-steps'
  );

  if ('IntersectionObserver' in window) {
    revealEls.forEach(el => el.classList.add('fade-in'));

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Stagger children slightly
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => observer.observe(el));
  }

  /* ---------- Smooth anchor scroll for hash links ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const id = this.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        const offset = 88; // header height
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ---------- Active nav on scroll (for single-page feel) ---------- */
  // Just marks current page link as active based on pathname
  const path = window.location.pathname;
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href && path.endsWith(href.replace('./', ''))) {
      link.classList.add('active');
    }
  });

})();
