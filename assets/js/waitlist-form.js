/**
 * GODSPEED BULLDOGS - WAITLIST PAGE ENHANCEMENTS
 * Smooth scroll interactions and visual enhancements
 * @version 2.0.0
 */

(function() {
    'use strict';

    // ============================================
    // SMOOTH SCROLL TO FORM
    // ============================================

    function initSmoothScroll() {
        const scrollIndicator = document.querySelector('.scroll-indicator');
        const formSection = document.querySelector('.waitlist-form-section');

        if (scrollIndicator && formSection) {
            scrollIndicator.addEventListener('click', function() {
                formSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            });
        }
    }

    // ============================================
    // PARALLAX EFFECT FOR FLOATING ORBS
    // ============================================

    function initParallaxEffect() {
        const floatingOrbs = document.querySelectorAll('.floating-orb');

        if (floatingOrbs.length === 0) return;

        let ticking = false;

        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    const scrollY = window.pageYOffset;

                    floatingOrbs.forEach((orb, index) => {
                        const speed = 0.1 + (index * 0.05);
                        const yPos = -(scrollY * speed);
                        orb.style.transform = `translateY(${yPos}px)`;
                    });

                    ticking = false;
                });

                ticking = true;
            }
        });
    }

    // ============================================
    // SCROLL REVEAL ANIMATIONS
    // ============================================

    function initScrollReveal() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe elements that should fade in on scroll
        const elementsToReveal = [
            '.ghl-form-container',
            '.next-steps',
            '.faq-callout',
            '.step-card'
        ];

        elementsToReveal.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                observer.observe(el);
            });
        });
    }

    // ============================================
    // FORM VISIBILITY ENHANCEMENT
    // ============================================

    function enhanceFormVisibility() {
        const iframe = document.querySelector('#inline-butcTnxv6U5epxAJBYYm');

        if (!iframe) return;

        // Add loading indicator
        const formWrapper = iframe.parentElement;
        const loadingIndicator = document.createElement('div');
        loadingIndicator.className = 'form-loading-indicator';
        loadingIndicator.innerHTML = `
            <div style="text-align: center; padding: 60px 20px;">
                <div style="width: 50px; height: 50px; border: 4px solid rgba(0,229,255,0.2); border-top-color: #00e5ff; border-radius: 50%; margin: 0 auto 20px; animation: spin 1s linear infinite;"></div>
                <p style="color: rgba(255,255,255,0.7); text-shadow: 0 0 15px rgba(0,229,255,0.6);">Loading waitlist form...</p>
            </div>
        `;

        // Add spinner animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes spin {
                to { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);

        formWrapper.insertBefore(loadingIndicator, iframe);

        // Hide loading indicator when iframe loads
        iframe.addEventListener('load', function() {
            setTimeout(() => {
                loadingIndicator.style.opacity = '0';
                loadingIndicator.style.transition = 'opacity 0.5s ease';
                setTimeout(() => {
                    loadingIndicator.remove();
                }, 500);
            }, 1000);
        });
    }

    // ============================================
    // TRUST BAR ANIMATION ON HOVER
    // ============================================

    function initTrustBarAnimations() {
        const trustItems = document.querySelectorAll('.trust-item');

        trustItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                const icon = this.querySelector('.trust-icon');
                if (icon) {
                    icon.style.animation = 'pulse 0.6s ease';
                }
            });

            item.addEventListener('animationend', function() {
                const icon = this.querySelector('.trust-icon');
                if (icon) {
                    icon.style.animation = '';
                }
            });
        });

        // Add pulse animation
        const pulseStyle = document.createElement('style');
        pulseStyle.textContent = `
            @keyframes pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.1); }
            }
        `;
        document.head.appendChild(pulseStyle);
    }

    // ============================================
    // STEP CARDS SEQUENTIAL ANIMATION
    // ============================================

    function initStepCardsAnimation() {
        const stepCards = document.querySelectorAll('.step-card');

        if (stepCards.length === 0) return;

        const observer = new IntersectionObserver(
            function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        stepCards.forEach((card, index) => {
                            setTimeout(() => {
                                card.style.opacity = '1';
                                card.style.transform = 'translateY(0)';
                            }, index * 150);
                        });
                        observer.disconnect();
                    }
                });
            },
            { threshold: 0.2 }
        );

        stepCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });

        if (stepCards.length > 0) {
            observer.observe(stepCards[0]);
        }
    }

    // ============================================
    // HERO GRADIENT DYNAMIC COLOR SHIFT
    // ============================================

    function initDynamicGradient() {
        const gradientOverlay = document.querySelector('.hero-gradient-overlay');

        if (!gradientOverlay) return;

        let hue = 180; // Start at cyan

        setInterval(() => {
            hue = (hue + 0.5) % 360;
            const color1 = `hsla(${hue}, 100%, 50%, 0.15)`;
            const color2 = `hsla(${(hue + 30) % 360}, 100%, 50%, 0.08)`;

            gradientOverlay.style.background = `radial-gradient(
                ellipse at top,
                ${color1} 0%,
                ${color2} 40%,
                rgba(0, 0, 0, 0.95) 80%
            )`;
        }, 100);
    }

    // ============================================
    // FAQ CALLOUT INTERACTION
    // ============================================

    function initFAQCalloutInteraction() {
        const faqCallout = document.querySelector('.faq-callout');

        if (!faqCallout) return;

        faqCallout.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.faq-icon');
            if (icon) {
                icon.style.transform = 'rotate(360deg) scale(1.1)';
                icon.style.transition = 'transform 0.6s ease';
            }
        });

        faqCallout.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.faq-icon');
            if (icon) {
                icon.style.transform = 'rotate(0deg) scale(1)';
            }
        });
    }

    // ============================================
    // INITIALIZE ALL ENHANCEMENTS
    // ============================================

    function init() {
        console.log('🐶 Godspeed Bulldogs Waitlist - Initializing enhancements...');

        // Initialize all features
        initSmoothScroll();
        initParallaxEffect();
        initScrollReveal();
        enhanceFormVisibility();
        initTrustBarAnimations();
        initStepCardsAnimation();
        initFAQCalloutInteraction();

        // Dynamic gradient (can be CPU intensive on some devices)
        // Uncomment if desired:
        // initDynamicGradient();

        console.log('✅ Waitlist enhancements loaded successfully');
    }

    // ============================================
    // DOM READY
    // ============================================

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // ============================================
    // PERFORMANCE OPTIMIZATION
    // ============================================

    // Pause animations when page is hidden
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            document.querySelectorAll('.floating-orb').forEach(orb => {
                orb.style.animationPlayState = 'paused';
            });
        } else {
            document.querySelectorAll('.floating-orb').forEach(orb => {
                orb.style.animationPlayState = 'running';
            });
        }
    });

})();
