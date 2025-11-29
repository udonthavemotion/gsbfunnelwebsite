/**
 * GODSPEED BULLDOGS - PHOTO GALLERY JAVASCRIPT
 * Simplified, stable, glitch-free
 * Pure vanilla JavaScript - NO frameworks
 */

// Global state
const state = {
    allPuppies: [],
    currentPuppy: null,
    currentImageIndex: 0
};

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
});

/**
 * Initialize the page
 */
async function initializePage() {
    try {
        // Load puppies data
        await loadPuppies();

        // Initialize event listeners
        initializeEventListeners();

        // Render puppies (default: show all)
        renderGallery();

        // Update counts
        updateCounts();
    } catch (error) {
        console.error('Error initializing page:', error);
        showError('Failed to load puppies. Please refresh the page.');
    }
}

/**
 * Load puppies from JSON file
 */
async function loadPuppies() {
    try {
        const response = await fetch('data/puppies.json');
        if (!response.ok) throw new Error('Failed to load puppies data');
        const data = await response.json();

        // Sort puppies: available first, then coming-soon, then sold
        state.allPuppies = data.puppies.sort((a, b) => {
            const order = { 'available': 1, 'coming-soon': 2, 'sold': 3 };
            return (order[a.status] || 99) - (order[b.status] || 99);
        });
    } catch (error) {
        console.error('Error loading puppies:', error);

        // Show error to user
        const loadingState = document.getElementById('loadingState');
        if (loadingState) {
            loadingState.innerHTML = `
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#ff4444" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8" x2="12" y2="12"/>
                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                <h3 style="color: #ff4444; margin-top: 20px; font-size: 1.3rem;">Unable to Load Puppies</h3>
                <p style="color: rgba(255,255,255,0.7); margin-top: 10px;">Please refresh the page or contact us directly.</p>
                <a href="inquiry.html" class="btn-primary" style="margin-top: 20px; display: inline-block;">Submit Inquiry</a>
            `;
        }
        throw error;
    }
}

/**
 * Initialize all event listeners
 */
function initializeEventListeners() {
    // Modal controls
    const modalOverlay = document.getElementById('modalOverlay');
    const modalClose = document.getElementById('modalClose');

    if (modalOverlay) {
        modalOverlay.addEventListener('click', closePuppyModal);
    }

    if (modalClose) {
        modalClose.addEventListener('click', closePuppyModal);
    }

    // ESC key to close modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closePuppyModal();
        }
    });

    // Gallery navigation
    const galleryPrev = document.getElementById('galleryPrev');
    const galleryNext = document.getElementById('galleryNext');

    if (galleryPrev) {
        galleryPrev.addEventListener('click', () => navigateGallery(-1));
    }

    if (galleryNext) {
        galleryNext.addEventListener('click', () => navigateGallery(1));
    }

    // Arrow key navigation in modal
    document.addEventListener('keydown', (e) => {
        if (!state.currentPuppy) return;

        if (e.key === 'ArrowLeft') {
            navigateGallery(-1);
        } else if (e.key === 'ArrowRight') {
            navigateGallery(1);
        }
    });

    // Fullscreen button
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    if (fullscreenBtn) {
        fullscreenBtn.addEventListener('click', toggleFullscreen);
    }

    // Reserve button
    const reserveBtn = document.getElementById('reserveBtn');
    if (reserveBtn) {
        reserveBtn.addEventListener('click', handleReserve);
    }

    // Share button
    const shareBtn = document.getElementById('shareBtn');
    if (shareBtn) {
        shareBtn.addEventListener('click', handleShare);
    }
}

/**
 * Update counts in hero
 */
function updateCounts() {
    const availableCount = state.allPuppies.filter(p => p.status === 'available').length;
    const soldCount = state.allPuppies.filter(p => p.status === 'sold').length;
    const comingSoonCount = state.allPuppies.filter(p => p.status === 'coming-soon').length;

    // Hero stats
    document.getElementById('availableCount').textContent = availableCount;
    document.getElementById('recentlyPlacedCount').textContent = soldCount;
    document.getElementById('comingSoonCount').textContent = comingSoonCount;
}

/**
 * Render puppy gallery - SIMPLIFIED (no filtering)
 */
function renderGallery() {
    const galleryGrid = document.getElementById('galleryGrid');
    const emptyState = document.getElementById('emptyState');
    const loadingState = document.getElementById('loadingState');

    if (!galleryGrid) return;

    // Hide loading state
    if (loadingState) loadingState.style.display = 'none';

    // Check if we have puppies to display
    if (state.allPuppies.length === 0) {
        galleryGrid.innerHTML = '';
        galleryGrid.style.display = 'none';
        if (emptyState) emptyState.style.display = 'block';
        return;
    }

    if (emptyState) emptyState.style.display = 'none';
    galleryGrid.style.display = 'grid';

    // Render all puppy cards (already sorted: available first)
    galleryGrid.innerHTML = state.allPuppies.map(puppy => createPuppyCard(puppy)).join('');

    // Add keyboard navigation to cards
    const cards = galleryGrid.querySelectorAll('.puppy-card');
    cards.forEach(card => {
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');

        // Enter or Space key to open modal
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.click();
            }
        });
    });
}

/**
 * Create puppy card HTML
 */
function createPuppyCard(puppy) {
    const statusClass = `status-${puppy.status}`;
    const statusText = getStatusText(puppy.status);

    // Gender icon
    const genderIcon = puppy.sex === 'Male' ? '♂' : '♀';

    return `
        <article class="puppy-card" onclick="openPuppyModalById('${puppy.id}')" aria-label="View details for ${puppy.name}">
            <div class="puppy-card-image-container">
                <img
                    src="${puppy.images[0]}"
                    alt="${puppy.name}, a ${puppy.color} ${puppy.sex} English Bulldog puppy"
                    class="puppy-card-image"
                    loading="lazy"
                    width="800"
                    height="600"
                >
                <div class="puppy-card-overlay">
                    <span class="view-details-text">View Details</span>
                </div>
                <span class="puppy-status-badge ${statusClass}" aria-label="${statusText}">${statusText}</span>
                <div class="puppy-card-info">
                    <div>
                        <div class="puppy-card-name">${puppy.name}</div>
                        <div class="puppy-card-details">
                            <span class="puppy-card-detail">${genderIcon} ${puppy.sex}</span>
                            <span class="puppy-card-detail">• ${puppy.color}</span>
                        </div>
                    </div>
                    ${puppy.status === 'available' ? `<div class="puppy-card-price">${formatPrice(puppy.price)}</div>` : ''}
                </div>
            </div>
        </article>
    `;
}

/**
 * Get human-readable status text
 */
function getStatusText(status) {
    switch (status) {
        case 'available':
            return 'Available';
        case 'sold':
            return 'Recently Placed';
        case 'coming-soon':
            return 'Coming Soon';
        default:
            return status;
    }
}

/**
 * Open puppy modal by ID
 */
window.openPuppyModalById = function(puppyId) {
    const puppy = state.allPuppies.find(p => p.id === puppyId);
    if (puppy) {
        openPuppyModal(puppy);
    }
};

/**
 * Open puppy modal
 */
function openPuppyModal(puppy) {
    state.currentPuppy = puppy;
    state.currentImageIndex = 0;

    const modal = document.getElementById('puppyModal');
    if (!modal) return;

    // Populate modal content
    document.getElementById('modalPuppyName').textContent = puppy.name;
    document.getElementById('modalPuppyId').textContent = `ID: ${puppy.id.toUpperCase()}`;
    document.getElementById('modalColor').textContent = puppy.color;
    document.getElementById('modalSex').textContent = puppy.sex;
    document.getElementById('modalAge').textContent = puppy.age;
    document.getElementById('modalDescription').textContent = puppy.description;

    // Handle price display (hide for sold puppies)
    const priceContainer = document.getElementById('modalPriceContainer');
    if (puppy.status === 'sold') {
        priceContainer.style.display = 'none';
    } else {
        priceContainer.style.display = 'flex';
        document.getElementById('modalPrice').textContent = formatPrice(puppy.price);
    }

    // Set status badge
    const statusBadge = document.getElementById('modalStatusBadge');
    const statusClass = `status-${puppy.status}`;
    statusBadge.className = `status-badge ${statusClass}`;
    statusBadge.textContent = getStatusText(puppy.status);

    // Set main image
    updateModalImage();

    // Populate gallery thumbnails (first 2 eager, rest lazy for performance)
    const thumbnailsContainer = document.getElementById('galleryThumbnails');
    thumbnailsContainer.innerHTML = puppy.images.map((img, index) => `
        <div class="gallery-thumbnail ${index === 0 ? 'active' : ''}" onclick="selectGalleryImage(${index})" tabindex="0" role="button" aria-label="View image ${index + 1}">
            <img src="${img}" alt="${puppy.name} image ${index + 1}" loading="${index < 2 ? 'eager' : 'lazy'}" onerror="this.src='assets/images/bulldogs/placeholder.jpg'; this.alt='Image unavailable';">
        </div>
    `).join('');

    // Add keyboard navigation to thumbnails
    const thumbnails = thumbnailsContainer.querySelectorAll('.gallery-thumbnail');
    thumbnails.forEach((thumb, index) => {
        thumb.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                selectGalleryImage(index);
            }
        });
    });

    // Populate health testing badges
    const healthBadgesContainer = document.getElementById('modalHealthBadges');
    healthBadgesContainer.innerHTML = puppy.healthTesting.map(test => `
        <span class="health-badge">${test}</span>
    `).join('');

    // Populate parent info with error handling
    const motherImage = document.getElementById('modalMotherImage');
    motherImage.src = puppy.parentInfo.mother.image;
    motherImage.alt = `${puppy.parentInfo.mother.name}, mother of ${puppy.name}`;
    motherImage.onerror = function() {
        this.src = 'assets/images/bulldogs/placeholder.jpg';
        this.alt = 'Parent image unavailable';
    };

    document.getElementById('modalMotherName').textContent = puppy.parentInfo.mother.name;
    document.getElementById('modalMotherDetails').textContent =
        `${puppy.parentInfo.mother.color} • ${puppy.parentInfo.mother.weight}`;

    const motherCertsContainer = document.getElementById('modalMotherCerts');
    motherCertsContainer.innerHTML = puppy.parentInfo.mother.certifications.map(cert => `
        <span class="cert-badge">${cert}</span>
    `).join('');

    const fatherImage = document.getElementById('modalFatherImage');
    fatherImage.src = puppy.parentInfo.father.image;
    fatherImage.alt = `${puppy.parentInfo.father.name}, father of ${puppy.name}`;
    fatherImage.onerror = function() {
        this.src = 'assets/images/bulldogs/placeholder.jpg';
        this.alt = 'Parent image unavailable';
    };

    document.getElementById('modalFatherName').textContent = puppy.parentInfo.father.name;
    document.getElementById('modalFatherDetails').textContent =
        `${puppy.parentInfo.father.color} • ${puppy.parentInfo.father.weight}`;

    const fatherCertsContainer = document.getElementById('modalFatherCerts');
    fatherCertsContainer.innerHTML = puppy.parentInfo.father.certifications.map(cert => `
        <span class="cert-badge">${cert}</span>
    `).join('');

    // Update reserve button based on status
    const reserveBtn = document.getElementById('reserveBtn');
    const reserveBtnText = document.getElementById('reserveBtnText');

    if (puppy.status === 'sold') {
        reserveBtnText.textContent = 'Join Waitlist';
        reserveBtn.setAttribute('aria-label', `Join waitlist for future puppies like ${puppy.name}`);
    } else if (puppy.status === 'coming-soon') {
        reserveBtnText.textContent = 'Reserve Your Spot';
        reserveBtn.setAttribute('aria-label', `Reserve your spot for ${puppy.name} from upcoming litter`);
    } else {
        reserveBtnText.textContent = 'Reserve Your Spot';
        reserveBtn.setAttribute('aria-label', `Submit inquiry to reserve ${puppy.name}`);
    }

    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Set focus to close button for accessibility
    setTimeout(() => {
        document.getElementById('modalClose').focus();
    }, 100);
}

/**
 * Close puppy modal
 */
function closePuppyModal() {
    const modal = document.getElementById('puppyModal');
    if (!modal) return;

    modal.classList.remove('active');
    document.body.style.overflow = '';
    state.currentPuppy = null;
}

/**
 * Navigate gallery
 */
function navigateGallery(direction) {
    if (!state.currentPuppy) return;

    state.currentImageIndex += direction;

    // Wrap around
    if (state.currentImageIndex < 0) {
        state.currentImageIndex = state.currentPuppy.images.length - 1;
    } else if (state.currentImageIndex >= state.currentPuppy.images.length) {
        state.currentImageIndex = 0;
    }

    updateModalImage();
    updateThumbnailActive();
}

/**
 * Select gallery image by index
 */
window.selectGalleryImage = function(index) {
    state.currentImageIndex = index;
    updateModalImage();
    updateThumbnailActive();
};

/**
 * Update modal main image
 */
function updateModalImage() {
    if (!state.currentPuppy) return;

    const modalMainImage = document.getElementById('modalMainImage');
    modalMainImage.src = state.currentPuppy.images[state.currentImageIndex];
    modalMainImage.alt = `${state.currentPuppy.name} - Image ${state.currentImageIndex + 1}`;
}

/**
 * Update thumbnail active state
 */
function updateThumbnailActive() {
    const thumbnails = document.querySelectorAll('.gallery-thumbnail');
    thumbnails.forEach((thumb, index) => {
        thumb.classList.toggle('active', index === state.currentImageIndex);
    });
}

/**
 * Toggle fullscreen for image
 */
function toggleFullscreen() {
    const mainImage = document.getElementById('modalMainImage');
    if (!mainImage) return;

    if (!document.fullscreenElement) {
        mainImage.requestFullscreen().catch(err => {
            console.error('Error attempting to enable fullscreen:', err);
        });
    } else {
        document.exitFullscreen();
    }
}

/**
 * Handle reserve button click
 */
function handleReserve() {
    if (!state.currentPuppy) return;

    // Redirect to inquiry page with puppy info
    window.location.href = `inquiry.html?puppy=${state.currentPuppy.id}&name=${encodeURIComponent(state.currentPuppy.name)}`;
}

/**
 * Handle share button
 */
function handleShare() {
    if (!state.currentPuppy) return;

    const shareData = {
        title: `${state.currentPuppy.name} - Godspeed Bulldogs`,
        text: `Check out ${state.currentPuppy.name}, a ${state.currentPuppy.color} ${state.currentPuppy.sex} English Bulldog from Godspeed Bulldogs!`,
        url: `${window.location.origin}${window.location.pathname}?puppy=${state.currentPuppy.id}`
    };

    // Try native share API
    if (navigator.share) {
        navigator.share(shareData)
            .catch(err => console.log('Error sharing:', err));
    } else {
        // Fallback: copy link to clipboard
        navigator.clipboard.writeText(shareData.url)
            .then(() => {
                showToast('Link copied to clipboard!');
            })
            .catch(err => {
                console.error('Failed to copy:', err);
                alert(`Share this puppy: ${shareData.url}`);
            });
    }
}

/**
 * Utility: Format price
 */
function formatPrice(price) {
    return `$${price.toLocaleString()}`;
}

/**
 * Utility: Show toast message
 */
function showToast(message) {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 100px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, #00e5ff 0%, #00ff88 100%);
        color: #000;
        padding: 16px 32px;
        border-radius: 10px;
        font-family: 'Poppins', sans-serif;
        font-weight: 600;
        font-size: 1rem;
        z-index: 10002;
        box-shadow: 0 10px 30px rgba(0, 229, 255, 0.6);
        animation: fadeIn 0.3s ease-out;
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.3s ease-out';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

/**
 * Utility: Show error message
 */
function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.innerHTML = `
        <div style="position: fixed; top: 100px; left: 50%; transform: translateX(-50%);
                    background: rgba(239,68,68,0.95); color: white; padding: 20px 40px;
                    border-radius: 12px; z-index: 10002; max-width: 90%; text-align: center;
                    font-family: 'Poppins', sans-serif; font-weight: 600;
                    box-shadow: 0 10px 40px rgba(0,0,0,0.6);">
            ${message}
        </div>
    `;
    document.body.appendChild(errorDiv);

    setTimeout(() => errorDiv.remove(), 5000);
}

// Check for puppy parameter in URL on load
window.addEventListener('load', function() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('puppy')) {
        const puppyId = urlParams.get('puppy');
        setTimeout(() => {
            const puppy = state.allPuppies.find(p => p.id === puppyId);
            if (puppy) openPuppyModal(puppy);
        }, 500);
    }
});
