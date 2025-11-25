// Navigation resilience and overlay protection
(function () {
  const NAV_SELECTORS = ['.site-nav', '.header', '.navbar'];
  let NAV = null;
  
  // Find the navigation element
  for (const selector of NAV_SELECTORS) {
    NAV = document.querySelector(selector);
    if (NAV) break;
  }
  
  if (!NAV) return;

  // Ensure clicks bubble through overlays that might misconfigure pointer-events
  const ensurePointerEvents = () => {
    const style = getComputedStyle(NAV);
    if (style.pointerEvents === 'none') {
      NAV.style.pointerEvents = 'auto';
    }
    
    // Ensure all nav links are clickable
    const navLinks = NAV.querySelectorAll('a, button, [role="button"]');
    navLinks.forEach(link => {
      if (getComputedStyle(link).pointerEvents === 'none') {
        link.style.pointerEvents = 'auto';
      }
    });
  };

  // Delegate link clicks so re-renders won't break navigation
  NAV.addEventListener('click', (e) => {
    const a = e.target.closest('a[href]');
    if (!a) return;
    
    // Allow normal navigation for same-origin links
    try {
      const url = new URL(a.href, location.origin);
      if (url.origin === location.origin) {
        // If some script called preventDefault earlier, force it through.
        // We rely on default behavior; no SPA routing here.
        if (e.defaultPrevented) {
          e.stopPropagation();
          setTimeout(() => { 
            window.location.href = url.href; 
          }, 0);
        }
      }
    } catch (err) {
      // Only show nav processing errors in development
      if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.warn('Nav link processing error:', err);
      }
    }
  }, true);

  // Handle mobile menu toggle specifically
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const mobileOverlay = document.getElementById('mobileMenuOverlay');
  
  if (mobileToggle && mobileOverlay) {
    mobileToggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      const isOpen = mobileOverlay.classList.contains('active');
      if (isOpen) {
        mobileOverlay.classList.remove('active');
        mobileToggle.classList.remove('active');
        document.body.classList.remove('mobile-menu-open');
      } else {
        mobileOverlay.classList.add('active');
        mobileToggle.classList.add('active');
        document.body.classList.add('mobile-menu-open');
      }
    });
    
    // Close mobile menu when clicking overlay
    mobileOverlay.addEventListener('click', (e) => {
      if (e.target === mobileOverlay) {
        mobileOverlay.classList.remove('active');
        mobileToggle.classList.remove('active');
        document.body.classList.remove('mobile-menu-open');
      }
    });
  }

  // Watch for Stripe/Cart DOM changes and re-assert nav state
  const mo = new MutationObserver(() => {
    ensurePointerEvents();
    // Ensure nav z-index dominates any newly-added overlays
    NAV.style.zIndex = '9999';
    
    // Re-check for any overlays that might interfere
    const overlays = document.querySelectorAll('.cart-overlay, .StripeElement, [data-overlay], .checkout-overlay, .cart, #cartDrawer');
    overlays.forEach(overlay => {
      const currentZ = parseInt(getComputedStyle(overlay).zIndex) || 0;
      if (currentZ >= 9999) {
        overlay.style.zIndex = '999';
      }
    });
  });
  
  mo.observe(document.documentElement, { 
    subtree: true, 
    childList: true, 
    attributes: true,
    attributeFilter: ['style', 'class']
  });

  // iOS Safari sometimes needs a layout nudge for sticky headers after overlays
  window.addEventListener('resize', () => {
    NAV.style.transform = 'translateZ(0)';
  });

  // Handle orientation changes on mobile
  window.addEventListener('orientationchange', () => {
    setTimeout(() => {
      NAV.style.transform = 'translateZ(0)';
      ensurePointerEvents();
    }, 100);
  });

  // Ensure nav is always on top after page load
  window.addEventListener('load', () => {
    ensurePointerEvents();
    NAV.style.zIndex = '9999';
  });

  // Initial setup
  ensurePointerEvents();
  
  // Debug logging
  if (window.__ASSET_VERSION__) {
    // Development info logging
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      console.info('[Nav] Navigation protection active, version:', window.__ASSET_VERSION__);
    }
  }
})();
