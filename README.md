# Godspeed Bulldogs - Premium English Bulldog Breeder Website

A premium, performance-optimized website for Godspeed Bulldogs - an English Bulldog breeding business based in Houma, Louisiana. This website is designed to capture waitlist signups and reserve deposits for upcoming litters.

## 🎯 Business Overview

- **Business**: Godspeed Bulldogs
- **Owner**: Logan Folse
- **Location**: Houma, Louisiana
- **Next Litter**: Spring 2026
- **Pricing**: $6,500-$8,500 per puppy
- **Target Audience**: Gen Z & Millennials (25-40 years old)

## 🚀 Features

- **Mobile-First Design**: Fully responsive, optimized for all devices
- **Performance Optimized**: Lighthouse 90+ mobile, 95+ desktop scores
- **GoHighLevel Integration**: Webhook forms for lead capture and CRM integration
- **Premium Branding**: Luxury-streetwear fusion aesthetic with black/white/red color scheme
- **Image Carousel**: Hero section with smooth image transitions
- **Gallery Page**: Masonry layout with lazy-loaded images
- **Waitlist Form**: Comprehensive lead capture form with GHL webhook integration

## 📁 Project Structure

```
├── index.html              # Homepage
├── waitlist.html          # Waitlist signup form
├── gallery.html           # Image gallery
├── thank-you.html         # Form submission confirmation
├── contact.html           # Contact page
├── services.html          # Services page
├── privacy-policy.html     # Privacy policy
├── terms-of-service.html   # Terms of service
├── assets/
│   ├── css/              # Stylesheets
│   │   ├── style.css    # Main styles
│   │   ├── nav.css      # Navigation styles
│   │   └── variables.css # CSS variables
│   ├── js/              # JavaScript files
│   │   ├── main.js      # Main functionality
│   │   └── nav.js       # Navigation logic
│   └── images/          # Image assets
│       ├── bulldogs/    # Bulldog photos
│       └── logo/        # Brand logos
└── content/             # JSON configuration files
    ├── business-info.json
    ├── branding.json
    ├── services.json
    ├── testimonials.json
    └── social-links.json
```

## 🎨 Brand Guidelines

- **Color Palette**: Black (#000), White (#FFF), Red (#FF0000)
- **Typography**: Poppins font family (weights: 300, 400, 500, 600, 700, 800)
- **Visual Style**: Luxury-streetwear fusion aesthetic
- **Text Effect**: All white text includes red glow: `text-shadow: 0 0 20px rgba(255,0,0,0.6)`

## 🔧 Setup & Deployment

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/udonthavemotion/gsbfunnelwebsite.git
cd gsbfunnelwebsite
```

2. Open `index.html` in a web browser or use a local server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve
```

3. Navigate to `http://localhost:8000`

### GoHighLevel Integration

1. Update the webhook URL in `waitlist.html`:
   - Replace `WEBHOOK_ID_HERE` with your actual GoHighLevel webhook ID
   - Form action: `https://services.leadconnectorhq.com/hooks/YOUR_WEBHOOK_ID`

2. Configure custom fields in GoHighLevel:
   - Budget Range
   - Timeline
   - Gender Preference
   - Lead Source

### Deployment

This is a static website that can be deployed to:
- **Netlify**: Drag and drop the folder
- **Vercel**: Connect GitHub repository
- **GitHub Pages**: Enable in repository settings
- **GoHighLevel**: Upload via Site Builder or FTP

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- iOS Safari 14+
- Chrome Mobile 90+

## ⚡ Performance Features

- Lazy loading images
- Optimized CSS and JavaScript
- Minimal dependencies (pure HTML/CSS/JS)
- Responsive images with srcset
- Hardware-accelerated animations

## 📝 License

This project is proprietary and owned by Godspeed Bulldogs. All rights reserved.

## 👤 Contact

For questions or support, contact Logan Folse at Godspeed Bulldogs.

---

**Built with ❤️ for premium English Bulldog breeding**
