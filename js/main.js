/* =============================================
   PRANA TEA — main.js v2
   Mega menu, sticky header, animations
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

    const openMega = () => {
      clearTimeout(closeTimer);
      megaMenu.classList.add('open');
      megaBtn.setAttribute('aria-expanded', 'true');
    };
    const closeMega = () => {
      closeTimer = setTimeout(() => {
        megaMenu.classList.remove('open');
        megaBtn.setAttribute('aria-expanded', 'false');
      }, 120);
    };

    // Hover on button
    megaBtn.addEventListener('mouseenter', openMega);
    megaBtn.addEventListener('mouseleave', closeMega);

    // Hover on menu itself — keep open
    megaMenu.addEventListener('mouseenter', () => clearTimeout(closeTimer));
    megaMenu.addEventListener('mouseleave', closeMega);

    // Click toggle for keyboard / touch
    megaBtn.addEventListener('click', () => {
      if (megaMenu.classList.contains('open')) {
        closeMega();
      } else {
        openMega();
      }
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!megaBtn.contains(e.target) && !megaMenu.contains(e.target)) {
        megaMenu.classList.remove('open');
        megaBtn.setAttribute('aria-expanded', 'false');
      }
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        megaMenu.classList.remove('open');
        megaBtn.setAttribute('aria-expanded', 'false');
        megaBtn.focus();
      }
    });
  }

  /* ---- Mobile nav toggle ---- */
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileNav    = document.getElementById('mobileNav');
  if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });
  }

  /* ---- Cart button opens sidebar ---- */
  const cartBtn = document.getElementById('cartBtn');
  if (cartBtn) {
    cartBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const sidebar = document.getElementById('cartSidebar');
      const overlay = document.getElementById('cartOverlay');
      if (sidebar) {
        sidebar.classList.toggle('open');
        if (overlay) overlay.classList.toggle('active');
        document.body.style.overflow = sidebar.classList.contains('open') ? 'hidden' : '';
      }
    });
  }

  /* ---- Scroll-reveal animations ---- */
  const revealEls = document.querySelectorAll(
    '.product-card, .store-card, .cat-tile, .step, .testimonial, .value-card, .bundle-card, .promo-half, .ritual-text, .ritual-steps'
  );

  if ('IntersectionObserver' in window && revealEls.length) {
    revealEls.forEach(el => el.classList.add('fade-up'));

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

    revealEls.forEach(el => observer.observe(el));
  }

  /* ---- Smooth hash scrolling ---- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const id = this.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        const offset = 130;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

})();
