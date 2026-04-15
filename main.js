// main.js (updated with experiments)
(function () {
  const EXP_PREFIX = 'prana_exp_v1:';
  const experiments = {
    homepageHero: [
      { name: 'control', weight: 0.5 },
      { name: 'ritual', weight: 0.5 }
    ],
    promoBanner: [
      { name: 'free_shipping', weight: 0.5 },
      { name: 'matcha_offer', weight: 0.5 }
    ]
  };

  function getStoredVariant(key) {
    try { return localStorage.getItem(EXP_PREFIX + key); } catch { return null; }
  }

  function setStoredVariant(key, value) {
    try { localStorage.setItem(EXP_PREFIX + key, value); } catch {}
  }

  function assignVariant(key) {
    const existing = getStoredVariant(key);
    if (existing) return existing;

    const defs = experiments[key];
    const roll = Math.random();
    let cumulative = 0;

    for (const v of defs) {
      cumulative += v.weight;
      if (roll <= cumulative) {
        setStoredVariant(key, v.name);
        return v.name;
      }
    }
    return defs[defs.length - 1].name;
  }

  document.addEventListener('DOMContentLoaded', () => {
    const hero = document.querySelector('.hero-left h1');
    if (hero && assignVariant('homepageHero') === 'ritual') {
      hero.innerHTML = 'Build a Daily<br/>Tea Ritual';
    }

    const banner = document.querySelector('.announce-track');
    if (banner && assignVariant('promoBanner') === 'matcha_offer') {
      banner.textContent = 'Save 15% on ceremonial matcha — use MATCHA15';
    }
  });
})();