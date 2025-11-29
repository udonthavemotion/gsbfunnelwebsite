# Uiverse Component Templates - Quick Implementation Guide

## 🚀 Quick Start

### Add any component in 3 simple steps:

```bash
# Step 1: Find component on Uiverse.io
# Step 2: Copy HTML to /templates/uiverse/[component-name].html
# Step 3: Use the loader utility
```

```javascript
// In your JavaScript:
UIverse.load('puppy-card', {
  title: 'Bella',
  price: '$7,500',
  image: '/assets/images/bulldogs/puppy-1.jpg',
  status: 'Available'
});
```

---

## 📦 Available Components

### 1. **Puppy Card** (`puppy-card`)
Hover-expand card with image overlay and status badge.

**Usage:**
```javascript
UIverse.load('puppy-card', {
  title: 'Puppy Name',
  subtitle: 'Fawn Male',
  price: '$7,500',
  image: '/path/to/image.jpg',
  status: 'Available', // or 'Reserved', 'Coming Soon'
  link: '/puppy-detail.html'
});
```

**HTML Template:**
```html
<a href="{{link}}" class="uiverse-puppy-card">
  <div class="uiverse-puppy-card-image" style="background-image: url('{{image}}')"></div>
  <div class="uiverse-puppy-card-overlay">
    <span class="uiverse-puppy-card-status status-{{statusClass}}">{{status}}</span>
    <h3 class="uiverse-puppy-card-title">{{title}}</h3>
    <p class="uiverse-puppy-card-subtitle">{{subtitle}}</p>
    <p class="uiverse-puppy-card-price">{{price}}</p>
  </div>
  <div class="uiverse-puppy-card-cta">VIEW DETAILS</div>
</a>
```

---

### 2. **Glass Service Card** (`glass-card`)
Glassmorphism card for services/features.

**Usage:**
```javascript
UIverse.load('glass-card', {
  icon: '🐾',
  title: 'Health Testing',
  description: 'All puppies come with comprehensive health testing...',
  link: '#health'
});
```

---

### 3. **Primary CTA Button** (`btn-primary`)
Cyan-to-green gradient button with glow.

**Usage:**
```javascript
UIverse.load('btn-primary', {
  text: 'Join Waitlist',
  link: '/inquiry.html',
  icon: '→' // optional
});
```

---

### 4. **Hover Expand Card** (`hover-expand`)
Original Uiverse card with corner expansion effect.

**Usage:**
```javascript
UIverse.load('hover-expand', {
  defaultText: 'WAITLIST',
  hoverText: 'RESERVE NOW',
  link: '/inquiry.html'
});
```

---

## 🔧 Loader Utility

### Include in your HTML:
```html
<script src="/assets/js/uiverse-loader.js"></script>
```

### Quick Load Single Component:
```javascript
UIverse.load('puppy-card', {
  title: 'Bella',
  price: '$7,500',
  image: '/assets/images/bulldogs/puppy-1.jpg'
}, '#container-id');
```

### Bulk Load Multiple Components:
```javascript
UIverse.loadBulk('puppy-card', [
  { title: 'Bella', price: '$7,500', status: 'Available' },
  { title: 'Duke', price: '$8,000', status: 'Reserved' },
  { title: 'Luna', price: '$7,500', status: 'Coming Soon' }
], '#puppy-grid');
```

### Load from JSON:
```javascript
fetch('/data/puppies.json')
  .then(res => res.json())
  .then(puppies => {
    UIverse.loadBulk('puppy-card', puppies, '#puppy-grid');
  });
```

---

## 📝 Creating New Components

### Step-by-Step:

1. **Find component on Uiverse.io**
2. **Create HTML template** in `/templates/uiverse/[name].html`
3. **Add CSS** to `/assets/css/uiverse-components.css`
4. **Register in loader** (optional for custom logic)
5. **Use it!**

### Example - Adding a New Button Component:

**File: `/templates/uiverse/custom-btn.html`**
```html
<button class="uiverse-custom-btn" onclick="{{onClick}}">
  <span class="btn-icon">{{icon}}</span>
  <span class="btn-text">{{text}}</span>
</button>
```

**Add CSS to `uiverse-components.css`:**
```css
.uiverse-custom-btn {
  /* Your styles */
}
```

**Use it:**
```javascript
UIverse.load('custom-btn', {
  text: 'Click Me',
  icon: '✨',
  onClick: 'alert("Hello!")'
});
```

---

## 🎨 Brand Adaptation Checklist

When adding Uiverse components, always:

- ✅ Replace colors with Godspeed palette:
  - **Cyan**: `#00e5ff`
  - **Green**: `#00ff88`
  - **Black**: `#000000`
  - **White**: `#FFFFFF`
- ✅ Add cyan glow to white text: `text-shadow: 0 0 20px rgba(0,229,255,0.6)`
- ✅ Use Poppins font: `font-family: 'Poppins', sans-serif`
- ✅ Add focus states: `outline: 2px solid #00e5ff; outline-offset: 3px`
- ✅ Make mobile responsive: Add `@media (max-width: 768px)` rules
- ✅ Test accessibility: Keyboard navigation + screen reader

---

## 📊 Performance Tips

- **Lazy load images** in cards: `loading="lazy"`
- **Use CSS containment**: `contain: layout style paint`
- **Hardware acceleration**: `transform: translateZ(0)`
- **Minimize repaints**: Use `will-change` sparingly
- **Debounce bulk loads**: Don't load 100+ components at once

---

## 🐛 Troubleshooting

**Problem:** Component not rendering
- Check template file exists in `/templates/uiverse/`
- Verify CSS is loaded in HTML head
- Check browser console for errors

**Problem:** Styles not applying
- Clear browser cache (Ctrl+Shift+R)
- Check CSS file versioning: `?v=20250115`
- Verify class names match CSS

**Problem:** Images not loading
- Check image path is correct
- Use relative paths: `/assets/images/...`
- Verify image file exists

---

## 🔗 Resources

- **Uiverse.io**: https://uiverse.io/
- **Project CSS**: `/assets/css/uiverse-components.css`
- **Loader Utility**: `/assets/js/uiverse-loader.js`
- **Example Implementation**: `/gallery.html` (Puppy Cards section)

---

## 💡 Pro Tips

1. **Create data files**: Store component data in `/data/*.json` for easy updates
2. **Use grid layouts**: `display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));`
3. **Batch updates**: Update all cards by changing the JSON file
4. **Version control**: Add `?v=timestamp` to CSS/JS for cache busting
5. **Test on mobile**: Always check responsive behavior on 375px viewport

---

**Last Updated**: January 2025  
**Maintainer**: Godspeed Bulldogs Development Team



