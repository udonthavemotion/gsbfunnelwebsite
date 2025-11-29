# 🐾 Godspeed Bulldogs

> **Premium English Bulldog Breeder | Houma, Louisiana**

[![Live Site](https://img.shields.io/badge/🌐_Live_Site-gsbulldogs.com-00e5ff?style=for-the-badge)](https://gsbulldogs.com)
[![Hosted on Vercel](https://img.shields.io/badge/Hosted_on-Vercel-000?style=for-the-badge&logo=vercel)](https://vercel.com)
[![GoHighLevel](https://img.shields.io/badge/Forms-GoHighLevel-00ff88?style=for-the-badge)](https://gohighlevel.com)

---

## 🚀 Live Deployment

| Environment | URL | Status |
|-------------|-----|--------|
| **Production** | [gsbulldogs.com](https://gsbulldogs.com) | ✅ Live |
| **Repository** | [GitHub](https://github.com/udonthavemotion/gsbfunnelwebsite) | ✅ Active |

**Deployed:** November 29, 2025  
**Platform:** Vercel  
**Domain:** gsbulldogs.com  

---

## 📁 Project Structure

```
gsbulldogs/
├── index.html                 # Homepage - hero, about, testimonials
├── inquiry.html               # Application form (GHL iframe)
├── program.html               # Breeding program details
├── bloodline.html             # Foundation dogs showcase
├── gallery.html               # Photo/video gallery
├── available-puppies.html     # Puppy listings
├── thank-you.html             # Form success page
├── 404.html                   # Custom error page
├── privacy-policy.html        # Legal
├── terms-of-service.html      # Legal
├── vercel.json                # Vercel deployment config
│
├── assets/
│   ├── css/                   # Stylesheets
│   │   ├── style.css          # Global styles
│   │   ├── nav.css            # Navigation
│   │   ├── brand-colors.css   # Color variables
│   │   └── ...
│   ├── js/                    # Scripts
│   │   ├── main.js            # Core functionality
│   │   ├── nav.js             # Mobile nav
│   │   └── ...
│   └── images/
│       ├── bulldogs/          # Dog photos & videos
│       │   ├── gallery/       # Gallery images
│       │   ├── hero/          # Hero backgrounds
│       │   ├── parents/       # Sire/dam photos
│       │   └── videos/        # MP4 background videos
│       └── logo.png           # Brand logo
│
├── data/
│   └── puppies.json           # Puppy data (placeholder)
│
└── content/
    ├── business-info.json     # Business details
    ├── branding.json          # Brand colors/fonts
    └── services.json          # Service offerings
```

---

## 🎨 Brand Guidelines

| Element | Value |
|---------|-------|
| **Primary Color** | Cyan `#00e5ff` |
| **Secondary Color** | Green `#00ff88` |
| **Background** | Black `#000000` |
| **Text** | White with cyan glow |
| **Font** | Poppins (300-800) |

### Typography Glow Effect
All white text uses the signature cyan glow:
```css
text-shadow: 0 0 20px rgba(0, 229, 255, 0.6);
```

---

## 📝 Forms & Lead Capture

### GoHighLevel Integration
Forms are embedded via iframe from the GHL white-label domain:

| Form | Location | Form ID |
|------|----------|---------|
| Inquiry Form | `inquiry.html` | `ztCgosF3MVYx62Pe8eDz` |
| Modal Form | `index.html` | `ztCgosF3MVYx62Pe8eDz` |
| Program CTA | `program.html` | `ztCgosF3MVYx62Pe8eDz` |

**Embed URL:** `https://link.zeromotionmarketing.com/widget/form/...`

---

## ⚡ Performance

- **Clean URLs:** `/inquiry` instead of `/inquiry.html`
- **Asset Caching:** 1 year for CSS/JS/images
- **Lazy Loading:** Images load on scroll
- **Mobile-First:** Responsive from 320px+
- **Videos:** MP4 background loops (autoplay, muted)

---

## 🔧 Local Development

```bash
# Clone the repo
git clone https://github.com/udonthavemotion/gsbfunnelwebsite.git
cd gsbfunnelwebsite

# Start local server
python -m http.server 8080

# Open browser
# http://localhost:8080
```

---

## 📞 Business Info

| Field | Value |
|-------|-------|
| **Business** | Godspeed Bulldogs LLC |
| **Owner** | Logan Folse |
| **Location** | Houma, Louisiana |
| **Phone** | (985) 217-0368 |
| **Email** | godspeedbulldogs@gmail.com |
| **Instagram** | [@godspeedbulldogs](https://instagram.com/godspeedbulldogs) |

---

## 🛡️ Security

- ✅ HTTPS enforced via Vercel
- ✅ No exposed API keys
- ✅ Forms handled by GHL (no server-side code)
- ✅ `robots: noindex` on thank-you/404 pages
- ✅ A2P SMS compliance language in policies

---

## 📊 Pages Overview

| Page | Purpose | Has Form |
|------|---------|----------|
| Home | Hero, about, social proof | ✅ Modal |
| Inquiry | Main application | ✅ Primary |
| Program | Breeding philosophy | ✅ CTA |
| Bloodline | Dog showcase | ❌ |
| Gallery | Photos & videos | ❌ |
| Puppies | Listings | ❌ |
| Thank You | Form success | ❌ |
| 404 | Error page | ❌ |

---

## 🚀 Deployment

### Automatic (via Vercel)
Push to `main` branch → Auto-deploys to gsbulldogs.com

### Manual Deploy
```bash
git add -A
git commit -m "Your message"
git push origin main
```

---

## 📝 License

Private repository. © 2025 Godspeed Bulldogs LLC. All rights reserved.

---

**Built with ❤️ by Zero Motion Marketing**
