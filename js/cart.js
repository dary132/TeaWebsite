/* =============================================
   PRANA TEA — cart.js v2
   ============================================= */

(function () {
  'use strict';

  let cart = loadCart();

  const ICONS = {
    'Sunrise Flow':          '☀️',
    'Deep Savasana':         '🌙',
    'Third Eye Clarity':     '🔮',
    'Heart Chakra':          '💚',
    'Root Grounding':        '🌱',
    'Reishi Rest':           '🍄',
    'Jade Tranquility':      '🍃',
    'Sencha Flow':           '🌿',
    'Petal Meditation':      '🌸',
    'Fire Within':           '🔥',
    'Starter Ritual Bundle': '🎁',
    'Complete Yoga Set Bundle': '✨',
    'Chakra Collection Bundle': '🌈',
  };

  function loadCart() {
    try { return JSON.parse(localStorage.getItem('pranaTea_cart_v2') || '[]'); }
    catch { return []; }
  }

  function saveCart() {
    try { localStorage.setItem('pranaTea_cart_v2', JSON.stringify(cart)); }
    catch {}
  }

  window.addToCart = function (name, price, key) {
    const existing = cart.find(i => i.name === name);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ name, price, qty: 1 });
    }
    saveCart();
    updateCartUI();
    showToast(`✦ ${name} added`);
    openCart();
  };

  window.removeFromCart = function (name) {
    cart = cart.filter(i => i.name !== name);
    saveCart();
    updateCartUI();
  };

  function updateCartUI() {
    const badge   = document.getElementById('cartBadge');
    const itemsEl = document.getElementById('cartItems');
    const footer  = document.getElementById('cartFooter');
    const totalEl = document.getElementById('cartTotal');

    const totalQty = cart.reduce((s, i) => s + i.qty, 0);
    const totalAmt = cart.reduce((s, i) => s + i.price * i.qty, 0);

    if (badge) {
      badge.textContent = totalQty;
      badge.style.transform = 'scale(1.5)';
      setTimeout(() => { badge.style.transform = 'scale(1)'; }, 200);
    }

    if (itemsEl) {
      itemsEl.innerHTML = cart.length === 0
        ? '<p class="cart-empty">Your cart is empty.<br/>Add a blend to begin your ritual.</p>'
        : cart.map(item => `
          <div class="cart-item">
            <div class="cart-item-icon">${ICONS[item.name] || '🍵'}</div>
            <div class="cart-item-info">
              <div class="cart-item-name">${item.name}</div>
              <div class="cart-item-price">$${(item.price * item.qty).toFixed(2)}</div>
              <div class="cart-item-qty">Qty: ${item.qty}</div>
            </div>
            <button class="cart-item-remove" onclick="removeFromCart('${item.name}')">✕</button>
          </div>`).join('');
    }

    if (footer) footer.style.display = cart.length > 0 ? 'flex' : 'none';
    if (totalEl) totalEl.textContent = '$' + totalAmt.toFixed(2);
  }

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

  let toastTimer;
  function showToast(msg) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
  }

  window.checkout = function () {
    if (!cart.length) return;
    const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
    alert(
      '🛒 Order Summary\n\n' +
      cart.map(i => `• ${i.name} ×${i.qty}  $${(i.price * i.qty).toFixed(2)}`).join('\n') +
      `\n\n──────────────\nTotal: $${total.toFixed(2)}\n\nIn a live store this connects to your payment provider.`
    );
  };

  document.addEventListener('DOMContentLoaded', () => {
    updateCartUI();
    document.getElementById('cartClose')?.addEventListener('click', closeCart);
    document.getElementById('cartOverlay')?.addEventListener('click', closeCart);
  });

})();
