// cart.js (updated with experiment)
(function () {
  function getVariant() {
    try { return localStorage.getItem('prana_exp_v1:cartBundleOffer'); }
    catch { return null; }
  }

  function renderExperiment(cart) {
    const el = document.getElementById('cartItems');
    if (!el || !cart.length) return;

    if (getVariant() !== 'starter_bundle') return;

    const div = document.createElement('div');
    div.className = 'cart-experiment-offer';
    div.innerHTML = '<strong>Add Starter Ritual Bundle (15% off)</strong>';
    el.prepend(div);
  }

  window.renderExperiment = renderExperiment;
})();
