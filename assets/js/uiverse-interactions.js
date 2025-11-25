// ============================================
// UIVERSE.IO COMPONENTS INTERACTIONS
// Godspeed Bulldogs - Component Enhancements
// ============================================

(function() {
    'use strict';
    
    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initUiverseComponents);
    } else {
        initUiverseComponents();
    }
    
    function initUiverseComponents() {
        initButtonAnimations();
        initCardInteractions();
        initFormEnhancements();
        initLoadingStates();
        initScrollAnimations();
    }
    
    // ============================================
    // BUTTON ANIMATIONS
    // ============================================
    
    function initButtonAnimations() {
        const buttons = document.querySelectorAll('.btn-uiverse-primary, .btn-uiverse-outline');
        
        buttons.forEach(button => {
            // Ripple effect on click
            button.addEventListener('click', function(e) {
                // Only create ripple if button is not disabled
                if (this.disabled || this.classList.contains('loading')) {
                    return;
                }
                
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.classList.add('ripple-effect');
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    if (ripple.parentNode) {
                        ripple.remove();
                    }
                }, 600);
            });
            
            // Prevent double clicks
            let lastClick = 0;
            button.addEventListener('click', function(e) {
                const now = Date.now();
                if (now - lastClick < 300) {
                    e.preventDefault();
                    return false;
                }
                lastClick = now;
            });
        });
    }
    
    // ============================================
    // CARD INTERACTIONS
    // ============================================
    
    function initCardInteractions() {
        const cards = document.querySelectorAll('.card-uiverse-glass');
        
        cards.forEach(card => {
            // Smooth hover effects
            card.addEventListener('mouseenter', function() {
                if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                    this.style.transform = 'translateY(-5px) scale(1.02)';
                }
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
            
            // Add animation on scroll into view
            if ('IntersectionObserver' in window) {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('animate-fade-in-up');
                            observer.unobserve(entry.target);
                        }
                    });
                }, {
                    threshold: 0.1,
                    rootMargin: '0px 0px -50px 0px'
                });
                
                observer.observe(card);
            }
        });
    }
    
    // ============================================
    // FORM ENHANCEMENTS
    // ============================================
    
    function initFormEnhancements() {
        const inputs = document.querySelectorAll('.input-uiverse, .textarea-uiverse');
        
        inputs.forEach(input => {
            // Auto-fill detection
            if (input.value) {
                input.classList.add('has-value');
            }
            
            // Real-time validation feedback
            input.addEventListener('input', function() {
                const wrapper = this.closest('.input-uiverse-wrapper');
                
                if (this.value.trim()) {
                    this.classList.add('has-value');
                    this.classList.remove('error');
                    if (wrapper) wrapper.classList.remove('error');
                } else {
                    this.classList.remove('has-value');
                }
                
                // Email validation
                if (this.type === 'email' && this.value) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (emailRegex.test(this.value)) {
                        this.classList.remove('error');
                        this.classList.add('success');
                        if (wrapper) wrapper.classList.remove('error');
                    }
                }
                
                // Phone validation
                if (this.type === 'tel' && this.value) {
                    const phoneRegex = /^[\d\s\(\)\-\+]+$/;
                    const digitsOnly = this.value.replace(/\D/g, '');
                    if (phoneRegex.test(this.value) && digitsOnly.length >= 10) {
                        this.classList.remove('error');
                        this.classList.add('success');
                        if (wrapper) wrapper.classList.remove('error');
                    }
                }
                
                // Success state for required fields with value
                if (this.hasAttribute('required') && this.value.trim() && this.type !== 'email' && this.type !== 'tel') {
                    this.classList.add('success');
                }
            });
            
            // Validation on blur
            input.addEventListener('blur', function() {
                const wrapper = this.closest('.input-uiverse-wrapper');
                
                if (this.hasAttribute('required') && !this.value.trim()) {
                    this.classList.add('error');
                    if (wrapper) wrapper.classList.add('error');
                } else if (this.type === 'email' && this.value) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(this.value)) {
                        this.classList.add('error');
                        this.classList.remove('success');
                        if (wrapper) wrapper.classList.add('error');
                    } else {
                        this.classList.remove('error');
                        this.classList.add('success');
                        if (wrapper) wrapper.classList.remove('error');
                    }
                } else if (this.type === 'tel' && this.value) {
                    const phoneRegex = /^[\d\s\(\)\-\+]+$/;
                    const digitsOnly = this.value.replace(/\D/g, '');
                    if (!phoneRegex.test(this.value) || digitsOnly.length < 10) {
                        this.classList.add('error');
                        this.classList.remove('success');
                        if (wrapper) wrapper.classList.add('error');
                    } else {
                        this.classList.remove('error');
                        this.classList.add('success');
                        if (wrapper) wrapper.classList.remove('error');
                    }
                } else if (this.hasAttribute('required') && this.value.trim()) {
                    this.classList.remove('error');
                    this.classList.add('success');
                    if (wrapper) wrapper.classList.remove('error');
                } else {
                    this.classList.remove('error');
                    this.classList.remove('success');
                    if (wrapper) wrapper.classList.remove('error');
                }
            });
        });
        
        // Select dropdown enhancements
        const selects = document.querySelectorAll('.select-uiverse');
        selects.forEach(select => {
            // Handle select change
            select.addEventListener('change', function() {
                const wrapper = this.closest('.select-uiverse-wrapper');
                if (this.value) {
                    this.classList.remove('error');
                    this.classList.add('success');
                    if (wrapper) wrapper.classList.remove('error');
                }
            });
            
            // Validation on blur
            select.addEventListener('blur', function() {
                const wrapper = this.closest('.select-uiverse-wrapper');
                if (this.hasAttribute('required') && !this.value) {
                    this.classList.add('error');
                    this.classList.remove('success');
                    if (wrapper) wrapper.classList.add('error');
                } else if (this.value) {
                    this.classList.remove('error');
                    this.classList.add('success');
                    if (wrapper) wrapper.classList.remove('error');
                } else {
                    this.classList.remove('error');
                    this.classList.remove('success');
                    if (wrapper) wrapper.classList.remove('error');
                }
            });
        });
    }
    
    // ============================================
    // LOADING STATES
    // ============================================
    
    function initLoadingStates() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            form.addEventListener('submit', function(e) {
                const submitBtn = this.querySelector('button[type="submit"]');
                
                if (submitBtn && !submitBtn.disabled) {
                    // Check if form should show loading state
                    const formAction = this.getAttribute('action');
                    const isGHLForm = formAction && formAction.includes('leadconnectorhq.com');
                    
                    if (isGHLForm || submitBtn.classList.contains('btn-uiverse-primary')) {
                        submitBtn.disabled = true;
                        submitBtn.classList.add('loading');
                        
                        const originalHTML = submitBtn.innerHTML;
                        submitBtn.innerHTML = '<span class="spinner-uiverse"></span> Submitting...';
                        
                        // Re-enable after 10 seconds as fallback
                        setTimeout(() => {
                            if (submitBtn.disabled) {
                                submitBtn.disabled = false;
                                submitBtn.classList.remove('loading');
                                submitBtn.innerHTML = originalHTML;
                            }
                        }, 10000);
                    }
                }
            });
        });
    }
    
    // ============================================
    // SCROLL ANIMATIONS
    // ============================================
    
    function initScrollAnimations() {
        // Only run if user hasn't requested reduced motion
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return;
        }
        
        const animatedElements = document.querySelectorAll('.card-uiverse-glass, .btn-uiverse-primary, .btn-uiverse-outline');
        
        if ('IntersectionObserver' in window && animatedElements.length > 0) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0)';
                        }, index * 100);
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });
            
            animatedElements.forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                observer.observe(el);
            });
        }
    }
    
    // ============================================
    // UTILITY FUNCTIONS
    // ============================================
    
    // Expose utility functions globally if needed
    window.UiverseComponents = {
        showLoading: function(element) {
            if (element) {
                element.disabled = true;
                element.classList.add('loading');
                const originalHTML = element.innerHTML;
                element.dataset.originalHTML = originalHTML;
                element.innerHTML = '<span class="spinner-uiverse"></span> Loading...';
            }
        },
        
        hideLoading: function(element) {
            if (element && element.dataset.originalHTML) {
                element.disabled = false;
                element.classList.remove('loading');
                element.innerHTML = element.dataset.originalHTML;
                delete element.dataset.originalHTML;
            }
        },
        
        showOverlay: function() {
            let overlay = document.querySelector('.loading-overlay-uiverse');
            if (!overlay) {
                overlay = document.createElement('div');
                overlay.className = 'loading-overlay-uiverse';
                overlay.innerHTML = '<span class="spinner-uiverse spinner-uiverse-large"></span>';
                document.body.appendChild(overlay);
            }
            overlay.classList.add('active');
        },
        
        hideOverlay: function() {
            const overlay = document.querySelector('.loading-overlay-uiverse');
            if (overlay) {
                overlay.classList.remove('active');
            }
        }
    };
    
})();

