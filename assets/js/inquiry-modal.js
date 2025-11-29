/**
 * Inquiry Modal Popup
 * Opens the inquiry form as a modal popup when clicking inquiry/submit buttons
 */

(function() {
    'use strict';

    // DOM Elements
    const modalOverlay = document.getElementById('inquiryModalOverlay');
    const modalClose = document.getElementById('inquiryModalClose');
    
    if (!modalOverlay) return;

    // Selectors for buttons that should trigger the modal
    const triggerSelectors = [
        '.inquiry-modal-trigger',
        'a[href="inquiry.html"]',
        'a[href*="inquiry"]',
        '.btn--primary[href="inquiry.html"]',
        '.btn-primary[href="inquiry.html"]',
        '.sticky-cta a[href="inquiry.html"]',
        '.mobile-bottom-cta a[href="inquiry.html"]',
        '.btn-exit-primary[href="inquiry.html"]'
    ];

    /**
     * Open the modal
     */
    function openModal(e) {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Focus management for accessibility
        modalClose.focus();
        
        // Track modal open (for analytics if needed)
        console.log('[Inquiry Modal] Opened');
    }

    /**
     * Close the modal
     */
    function closeModal() {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
        
        console.log('[Inquiry Modal] Closed');
    }

    /**
     * Handle keyboard events
     */
    function handleKeydown(e) {
        if (!modalOverlay.classList.contains('active')) return;
        
        // Close on Escape
        if (e.key === 'Escape') {
            closeModal();
        }
    }

    /**
     * Handle clicks on overlay background
     */
    function handleOverlayClick(e) {
        if (e.target === modalOverlay) {
            closeModal();
        }
    }

    /**
     * Attach event listeners to all trigger elements
     */
    function attachTriggerListeners() {
        // Get all matching elements
        const triggers = document.querySelectorAll(triggerSelectors.join(', '));
        
        triggers.forEach(trigger => {
            // Skip if already has listener
            if (trigger.dataset.modalAttached) return;
            
            trigger.addEventListener('click', openModal);
            trigger.dataset.modalAttached = 'true';
            
            // Add visual indicator that this opens a modal (optional)
            if (!trigger.getAttribute('aria-haspopup')) {
                trigger.setAttribute('aria-haspopup', 'dialog');
            }
        });

        console.log(`[Inquiry Modal] Attached to ${triggers.length} trigger elements`);
    }

    /**
     * Initialize modal functionality
     */
    function init() {
        // Attach close button listener
        if (modalClose) {
            modalClose.addEventListener('click', closeModal);
        }

        // Attach overlay click listener
        modalOverlay.addEventListener('click', handleOverlayClick);

        // Attach keyboard listener
        document.addEventListener('keydown', handleKeydown);

        // Attach trigger listeners
        attachTriggerListeners();

        // Re-attach listeners when DOM changes (for dynamic content)
        const observer = new MutationObserver(() => {
            attachTriggerListeners();
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });

        console.log('[Inquiry Modal] Initialized');
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Expose to global scope for manual triggering
    window.openInquiryModal = openModal;
    window.closeInquiryModal = closeModal;

})();

