// Asset versioning for cache busting
window.__ASSET_VERSION__ = "v-2025-08-19-01"; // UPDATE THIS on each deploy

(function () {
  const V = window.__ASSET_VERSION__;
  if (!V) return;

  const sameOrigin = (url) => {
    try { 
      const u = new URL(url, location.origin); 
      return u.origin === location.origin; 
    }
    catch { return false; }
  };

  const stamp = (url) => {
    const u = new URL(url, location.origin);
    if (!u.searchParams.has('v')) { 
      u.searchParams.set('v', V); 
    }
    return u.pathname + '?' + u.searchParams.toString();
  };

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyVersioning);
  } else {
    applyVersioning();
  }

  function applyVersioning() {
    // Version CSS files
    document.querySelectorAll('link[rel="stylesheet"][href]').forEach(el => {
      const href = el.getAttribute('href');
      if (href && sameOrigin(href)) {
        el.setAttribute('href', stamp(href));
      }
    });

    // Version JS files
    document.querySelectorAll('script[src]').forEach(el => {
      const src = el.getAttribute('src');
      if (src && sameOrigin(src)) {
        el.setAttribute('src', stamp(src));
      }
    });

    // Version images
    document.querySelectorAll('img[src]').forEach(el => {
      const src = el.getAttribute('src');
      if (src && sameOrigin(src)) {
        el.setAttribute('src', stamp(src));
      }
    });
  }
})();
