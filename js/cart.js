/* =============================================
   PRANA TEA — cart.js
   Shopping cart with localStorage persistence
   ============================================= */

(function () {
  'use strict';

  /* ---------- State ---------- */
  let cart = loadCart();
  const quantities = { sunrise: 1, savasana: 1, thirdeye: 1, heart: 1 };

  const ICONS = {
    'Sunrise Flow':      '☀️',
    'Deep Savasana':     '🌙',
    'Third Eye Clarity': '🔮',
    'Heart Chakra':      '💚',
  };

  /* ---------- Storage helpers ---------- */
  function loadCart() {
    try {
      return JSON.parse(localStorage.getItem('pranaTea_cart') || '[]');
    } catch (e) {
      return [];
    }
  }

  function saveCart() {
    try {
      localStorage.setItem('pranaTea_cart', JSON.stringify(cart));
    } catch (e) { /* storage unavailable */ }
  }

  /* ---------- Quantity selector ---------- */
  window.changeQty = function (key, delta) {
    quantities[key] = Math.max(1, (quantities[key] || 1) + delta);
    const el = document.getElementById('qty-' + key);
    if (el) el.textContent = quantities[key];
  };

  /* ---------- Add to Cart ---------- */
  window.addToCart = function (name, price, key) {
    const qty = quantities[key] || 1;
    const existing = cart.find(item => item.name === name);
    if (existing) {
      existing.qty += qty;
    } else {
      cart.push({ name, price, qty });
    }
    saveCart();
    updateCartUI();
    showToast(`✦ ${name} added to your ritual`);
    openCart();
  };

  /* ---------- Remove from cart ---------- */
  window.removeFromCart = function (name) {
    cart = cart.filter(item => item.name !== name);
    saveCart();
    updateCartUI();
  };

  /* ---------- Update all cart UI ---------- */
  function updateCartUI() {
    const badge    = document.getElementById('cartBadge');
    const itemsEl  = document.getElementById('cartItems');
    const footerEl = document.getElementById('cartFooter');
    const totalEl  = document.getElementById('cartTotal');

    const totalQty = cart.reduce((sum, i) => sum + i.qty, 0);
    const totalAmt = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

    if (badge) {
      badge.textContent = totalQty;
      // Animate badge
      badge.style.transform = 'scale(1.4)';
      setTimeout(() => { badge.style.transform = 'scale(1)'; }, 200);
    }

    if (itemsEl) {
      if (cart.length === 0) {
        itemsEl.innerHTML = '<p class="cart-empty">Your cart is empty.<br/>Add a blend to begin your ritual.</p>';
      } else {
        itemsEl.innerHTML = cart.map(item => `
          <div class="cart-item">
            <div class="cart-item-icon">${ICONS[item.name] || '🍵'}</div>
            <div class="cart-item-info">
              <div class="cart-item-name">${item.name}</div>
              <div class="cart-item-price">$${(item.price * item.qty).toFixed(2)}</div>
              <div class="cart-item-qty">Qty: ${item.qty}</div>
            </div>
            <button class="cart-item-remove" onclick="removeFromCart('${item.name}')">✕</button>
          </div>
        `).join('');
      }
    }

    if (footerEl) {
      footerEl.style.display = cart.length > 0 ? 'flex' : 'none';
    }

    if (totalEl) {
      totalEl.textContent = '$' + totalAmt.toFixed(2);
    }
  }

  /* ---------- Open / close cart ---------- */
  function openCart() {
    document.getElementById('cartSidebar')?.classList.add('open');
    document.getElementById('cartOverlay')?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeCart() {
    document.getElementById('cartSidebar')?.classList.remove('open');
    document.getElementById('cartOverlay')?.classList.remove('active');
    document.body.style.overflow = '';
  }

  /* ---------- Toast ---------- */
  let toastTimer;
  function showToast(msg) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
  }

  /* ---------- Checkout placeholder ---------- */
  window.checkout = function () {
    if (cart.length === 0) return;
    const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
    alert(
      '🛒 Thank you for your order!\n\n' +
      cart.map(i => `• ${i.name} ×${i.qty}  $${(i.price * i.qty).toFixed(2)}`).join('\n') +
      '\n\n──────────────\n' +
      `Total: $${total.toFixed(2)}\n\n` +
      'In a live store, this would connect to Stripe, PayPal, or your preferred payment provider.'
    );
  };

  /* ---------- Event listeners ---------- */
  document.addEventListener('DOMContentLoaded', () => {
    updateCartUI();

    document.getElementById('cartClose')?.addEventListener('click', closeCart);
    document.getElementById('cartOverlay')?.addEventListener('click', closeCart);

    // Cart icon in nav opens cart if items exist
    document.querySelector('.cart-icon-btn')?.addEventListener('click', (e) => {
      e.preventDefault();
      if (cart.length > 0) openCart();
    });
  });

})();
