// Main JavaScript for Southside Mobile Detail & Tint

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initMobileMenu();
    initScrollEffects();
    initAnimations();
    initFormValidation();
    initSmoothScroll();
    initContactForm();
    initNavCartCount();
    
    // Show elements after DOM is loaded
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

// Mobile Menu Functionality - Removed duplicate implementation
// Mobile menu is now handled exclusively by nav.js to prevent conflicts
function initMobileMenu() {
    // Mobile menu functionality moved to nav.js for consistency
    // This prevents conflicts between multiple event listeners
    // Mobile menu handled by nav.js
}

// Scroll Effects
function initScrollEffects() {
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Header background on scroll
        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Hide/show header on scroll direction
        if (scrollTop > lastScrollTop && scrollTop > 500) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// Animation on Scroll
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loaded');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.service-card, .testimonial-card, .benefit-item, .process-step');
    animatedElements.forEach(el => {
        el.classList.add('loading');
        observer.observe(el);
    });
}

// Smooth Scrolling
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Form Validation
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!validateForm(this)) {
                e.preventDefault();
            }
        });
        
        // Real-time validation
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', () => validateField(input));
            input.addEventListener('input', () => clearError(input));
        });
    });
}

function validateForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    const fieldType = field.type;
    const fieldName = field.name;
    
    // Clear previous errors
    clearError(field);
    
    // Check if required field is empty
    if (field.hasAttribute('required') && !value) {
        showError(field, `${getFieldLabel(field)} is required`);
        return false;
    }
    
    // Email validation
    if (fieldType === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showError(field, 'Please enter a valid email address');
            return false;
        }
    }
    
    // Phone validation
    if (fieldType === 'tel' && value) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
            showError(field, 'Please enter a valid phone number');
            return false;
        }
    }
    
    return true;
}

function showError(field, message) {
    field.classList.add('error');
    
    // Remove existing error message
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add new error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.color = '#ff8c00';
    errorDiv.style.fontSize = '14px';
    errorDiv.style.marginTop = '5px';
    
    field.parentNode.appendChild(errorDiv);
}

function clearError(field) {
    field.classList.remove('error');
    const errorMessage = field.parentNode.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

function getFieldLabel(field) {
    const label = field.parentNode.querySelector('label');
    if (label) {
        return label.textContent.replace('*', '').trim();
    }
    return field.name.charAt(0).toUpperCase() + field.name.slice(1);
}

// Contact Form Handling
function initContactForm() {
    // Exclude `.quote-form` here because quote page has its own advanced handler
    const contactForms = document.querySelectorAll('.contact-form');
    
    contactForms.forEach(form => {
        form.addEventListener('submit', async function(e) {
            // For quote form, post to backend; for others, keep simulator
            const isQuoteForm = this.classList.contains('quote-form');
            if (!validateForm(this)) return;

            if (!isQuoteForm) {
                e.preventDefault();
                const submitButton = this.querySelector('button[type="submit"]');
                const originalText = submitButton.textContent;
                submitButton.textContent = 'Sending...';
                submitButton.disabled = true;
                try {
                    await simulateFormSubmission(new FormData(this));
                    showSuccessMessage(this);
                    this.reset();
                } catch (error) {
                    showErrorMessage(this, 'Sorry, there was an error sending your message. Please try again or call us directly.');
                } finally {
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                }
                return;
            }

            e.preventDefault();
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            try {
                const formData = new FormData(this);
                const resp = await fetch(this.action || 'quote-handler.php', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                const data = await resp.json().catch(() => null);
                if (resp.ok && data && data.success) {
                    showSuccessMessage(this);
                    this.reset();
                } else {
                    const msg = (data && data.message) ? data.message : 'There was an error sending your quote. Please call us directly.';
                    showErrorMessage(this, msg);
                }
            } catch (err) {
                showErrorMessage(this, 'Network error sending your quote. Please call us directly.');
            } finally {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }
        });
    });
}

async function simulateFormSubmission(formData) {
    // Simulate API call delay
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate 90% success rate
            if (Math.random() > 0.1) {
                resolve('Success');
            } else {
                reject('Error');
            }
        }, 1500);
    });
}

function showSuccessMessage(form) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `
        <div style="background: linear-gradient(45deg, #ff8c00, #ffa500); color: white; padding: 20px; border-radius: 10px; margin: 20px 0; text-align: center;">
            <h4 style="margin: 0 0 10px 0;">Message Sent Successfully! 🎉</h4>
            <p style="margin: 0;">Thank you for contacting us. We'll get back to you within 24 hours!</p>
        </div>
    `;
    
    form.parentNode.insertBefore(successDiv, form);
    
    // Remove success message after 5 seconds
    setTimeout(() => {
        successDiv.remove();
    }, 5000);
    
    // Scroll to success message
    successDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function showErrorMessage(form, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message-form';
    errorDiv.innerHTML = `
        <div style="background: #ff4444; color: white; padding: 20px; border-radius: 10px; margin: 20px 0; text-align: center;">
            <h4 style="margin: 0 0 10px 0;">Oops! Something went wrong</h4>
            <p style="margin: 0;">${message}</p>
        </div>
    `;
    
    form.parentNode.insertBefore(errorDiv, form);
    
    // Remove error message after 5 seconds
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Phone number formatting
function formatPhoneNumber(input) {
    const value = input.value.replace(/\D/g, '');
    const formattedValue = value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    input.value = formattedValue;
}

// Add phone formatting to phone inputs
document.addEventListener('DOMContentLoaded', function() {
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', () => formatPhoneNumber(input));
    });
});

// Cart count in navbar (works on pages without cart.js)
function initNavCartCount() {
    const NAV_BADGE_IDS = ['navCartCount', 'mobileNavCartCount'];

    function readCartCount() {
        try {
            if (window.CartStorage && typeof window.CartStorage.getCart === 'function') {
                const cart = window.CartStorage.getCart();
                return Array.isArray(cart) ? cart.reduce((n, i) => n + (Number(i.qty) || 0), 0) : 0;
            }
            const raw = localStorage.getItem('ssd_cart_v1');
            const parsed = JSON.parse(raw || '[]');
            return Array.isArray(parsed) ? parsed.reduce((n, i) => n + (Number(i.qty) || 0), 0) : 0;
        } catch (_) { return 0; }
    }

    function updateBadges() {
        const count = readCartCount();
        NAV_BADGE_IDS.forEach(id => {
            const el = document.getElementById(id);
            if (!el) return;
            el.textContent = String(count);
            if (count > 0) {
                el.removeAttribute('hidden');
            } else {
                el.setAttribute('hidden', '');
            }
        });
    }

    // Initial
    updateBadges();

    // Respond to storage changes (other tabs or pages)
    window.addEventListener('storage', (e) => {
        if (e.key === 'ssd_cart_v1') updateBadges();
    });

    // Respond to custom events (emitted by cart.js when cart changes)
    document.addEventListener('cart:updated', updateBadges);
}

// Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', initLazyLoading);

// Service area calculator (for quote form)
function calculateServiceArea(zipCode) {
    // Simplified service area check for South Louisiana
    const southLouisianaZips = [
        '70001', '70002', '70003', '70005', '70006', '70009', '70010', '70011', '70012', '70013',
        '70014', '70015', '70016', '70017', '70018', '70019', '70033', '70034', '70036', '70037',
        '70040', '70041', '70043', '70044', '70047', '70051', '70053', '70056', '70057', '70058',
        '70059', '70060', '70062', '70063', '70064', '70065', '70067', '70068', '70069', '70070',
        '70072', '70075', '70076', '70078', '70079', '70080', '70081', '70082', '70083', '70084',
        '70085', '70086', '70087', '70090', '70091', '70092', '70093', '70094', '70095', '70096',
        '70301', '70302', '70303', '70310', '70339', '70345', '70346', '70356', '70357', '70358',
        '70359', '70360', '70361', '70363', '70364', '70374', '70375', '70377', '70380', '70390',
        '70391', '70392', '70393', '70394', '70395', '70396', '70397', '70401', '70402', '70403'
    ];
    
    return southLouisianaZips.includes(zipCode);
}

// Add service area validation to quote forms
document.addEventListener('DOMContentLoaded', function() {
    const zipInputs = document.querySelectorAll('input[name="zip"], input[name="zipcode"]');
    
    zipInputs.forEach(input => {
        input.addEventListener('blur', function() {
            const zipCode = this.value.trim();
            if (zipCode && !calculateServiceArea(zipCode)) {
                showError(this, 'Sorry, we currently don\'t service this area. Please call us to discuss options.');
            }
        });
    });
});

// Auto-resize textarea
function autoResizeTextarea() {
    const textareas = document.querySelectorAll('textarea');
    
    textareas.forEach(textarea => {
        textarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = this.scrollHeight + 'px';
        });
    });
}

document.addEventListener('DOMContentLoaded', autoResizeTextarea);

// Analytics and tracking (placeholder)
function trackEvent(eventName, parameters = {}) {
    // Google Analytics 4 tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, parameters);
    }
    
    // Development logging (localhost only)
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.log('Event tracked:', eventName, parameters);
    }
}

// Track button clicks
document.addEventListener('DOMContentLoaded', function() {
    const trackButtons = document.querySelectorAll('.btn-primary, .btn-secondary');
    
    trackButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            trackEvent('button_click', {
                button_text: buttonText,
                page_location: window.location.href
            });
        });
    });
});

// Scroll to top functionality
function addScrollToTop() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '↑';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.setAttribute('aria-label', 'Scroll to top');
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #FF0000 0%, #CC0000 100%);
        color: white;
        border: 2px solid rgba(255, 255, 255, 0.2);
        border-radius: 50%;
        font-size: 20px;
        font-weight: 700;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 20px rgba(255, 0, 0, 0.4), 0 0 30px rgba(255, 0, 0, 0.3);
        text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
    `;
    
    // Add hover effect
    scrollBtn.addEventListener('mouseenter', function() {
        this.style.background = 'linear-gradient(135deg, #CC0000 0%, #AA0000 100%)';
        this.style.transform = 'translateY(-3px) scale(1.1)';
        this.style.boxShadow = '0 6px 30px rgba(255, 0, 0, 0.6), 0 0 40px rgba(255, 0, 0, 0.4)';
        this.style.borderColor = 'rgba(255, 255, 255, 0.4)';
    });
    
    scrollBtn.addEventListener('mouseleave', function() {
        this.style.background = 'linear-gradient(135deg, #FF0000 0%, #CC0000 100%)';
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '0 4px 20px rgba(255, 0, 0, 0.4), 0 0 30px rgba(255, 0, 0, 0.3)';
        this.style.borderColor = 'rgba(255, 255, 255, 0.2)';
    });
    
    document.body.appendChild(scrollBtn);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.visibility = 'visible';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top when clicked
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

document.addEventListener('DOMContentLoaded', addScrollToTop); 