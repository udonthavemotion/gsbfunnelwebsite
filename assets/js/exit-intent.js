/**
 * Exit Intent Popup
 * Detects when user is about to leave the page and shows a lead capture popup
 */

(function() {
    'use strict';

    // Configuration
    const config = {
        sessionStorageKey: 'exitIntentShown',
        triggerDelay: 1000, // Wait 1 second after page load before enabling
        exitThreshold: 20, // Pixels from top to trigger exit intent
        mobileBreakpoint: 768 // Don't show on mobile
    };

    // DOM Elements
    const overlay = document.getElementById('exitIntentOverlay');
    const closeBtn = document.getElementById('exitIntentClose');
    const noThanksBtn = document.getElementById('exitIntentNoThanks');

    // State
    let isEnabled = false;
    let hasBeenShown = false;

    /**
     * Initialize exit intent detection
     */
    function init() {
        // Check if already shown in this session
        if (sessionStorage.getItem(config.sessionStorageKey)) {
            return;
        }

        // Don't show on mobile
        if (window.innerWidth < config.mobileBreakpoint) {
            return;
        }

        // Enable exit intent detection after delay
        setTimeout(() => {
            isEnabled = true;
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseout', handleMouseOut);
        }, config.triggerDelay);

        // Set up close handlers
        if (closeBtn) {
            closeBtn.addEventListener('click', closePopup);
        }

        if (noThanksBtn) {
            noThanksBtn.addEventListener('click', closePopup);
        }

        // Close on overlay click
        if (overlay) {
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) {
                    closePopup();
                }
            });
        }

        // Close on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && overlay && overlay.classList.contains('active')) {
                closePopup();
            }
        });
    }

    /**
     * Handle mouse movement to detect exit intent
     */
    function handleMouseMove(e) {
        if (!isEnabled || hasBeenShown) {
            return;
        }

        // If mouse moves to top of screen (exit intent)
        if (e.clientY <= config.exitThreshold) {
            showPopup();
        }
    }

    /**
     * Handle mouse leaving the document (mobile-friendly exit detection)
     */
    function handleMouseOut(e) {
        if (!isEnabled || hasBeenShown) {
            return;
        }

        // If mouse leaves the document
        if (e.clientY <= 0 || e.relatedTarget === null) {
            showPopup();
        }
    }

    /**
     * Show the exit intent popup
     */
    function showPopup() {
        if (!overlay || hasBeenShown) {
            return;
        }

        hasBeenShown = true;
        overlay.classList.add('active');

        // Mark as shown in session storage
        sessionStorage.setItem(config.sessionStorageKey, 'true');

        // Disable further exit intent detection
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseout', handleMouseOut);

        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    }

    /**
     * Close the exit intent popup
     */
    function closePopup() {
        if (!overlay) {
            return;
        }

        overlay.classList.remove('active');

        // Re-enable body scroll
        document.body.style.overflow = '';
    }

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
