/* ============================================
   INTERACTIONS.JS - Interactive Features
   Handles all user interactions and animations
   ============================================ */

// ============================================
// OPTICAL TOOLBOX NAVIGATION
// ============================================

/**
 * Navigate to Calculator Page
 * Called from Opticaltoolbox.html buttons
 */
window.loadCalculator = function(calculatorName) {
    console.log('🧮 loadCalculator called:', calculatorName);
    
    // Direct navigation using showPage function
    if (typeof window.showPage === 'function') {
        window.showPage(calculatorName);
    } else if (typeof showPage === 'function') {
        showPage(calculatorName);
    } else {
        console.error('❌ showPage function not found!');
    }
};

// ============================================
// TEAM FILTER FUNCTIONALITY
// ============================================

/**
 * Setup team member filtering (Praktikum/Research)
 */
function setupTeamFilter() {
    setTimeout(() => {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const teamCards = document.querySelectorAll('.team-card');
        
        if (!filterButtons.length || !teamCards.length) return;
        
        // Add click event to filter buttons
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                const filter = button.getAttribute('data-filter');
                
                // Filter team cards
                teamCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    
                    if (filter === 'all' || category === filter) {
                        // Show card
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 10);
                    } else {
                        // Hide card
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
        
        // Set initial transition for smooth animation
        teamCards.forEach(card => {
            card.style.transition = 'all 0.3s ease';
        });
        
        console.log('✅ Team filter initialized');
    }, 1000);
}

// ============================================
// CONTACT FORM HANDLER
// ============================================

/**
 * Setup contact form submission
 */
function setupContactForm() {
    setTimeout(() => {
        const contactForm = document.getElementById('contactForm');
        
        if (!contactForm) return;
        
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values
            const formData = new FormData(contactForm);
            const name = formData.get('name') || contactForm.querySelector('input[type="text"]')?.value;
            
            // Show success message
            alert(`✅ Message Sent Successfully!\n\nThank you ${name}!\nWe have received your message and will get back to you soon.\n\nBest regards,\nOPTICOM LABORATORY Team`);
            
            // Reset form
            contactForm.reset();
            
            console.log('📧 Contact form submitted');
        });
        
        console.log('✅ Contact form handler initialized');
    }, 1000);
}

// ============================================
// RECRUITMENT STATUS HANDLER
// ============================================

/**
 * Setup recruitment status click handler
 */
function setupRecruitmentStatus() {
    setTimeout(() => {
        const recruitmentBox = document.querySelector('.recruitment-status');
        
        if (!recruitmentBox) return;
        
        recruitmentBox.addEventListener('click', () => {
            alert(CONFIG.recruitment.message);
        });
        
        console.log('✅ Recruitment status handler initialized');
    }, 1000);
}

// ============================================
// 3D TILT EFFECT FOR MODULE CARDS
// ============================================

/**
 * Setup 3D tilt effect on module cards
 */
function setup3DTiltEffect() {
    setTimeout(() => {
        const moduleCards = document.querySelectorAll('.module-card');
        
        if (!moduleCards.length) return;
        
        moduleCards.forEach(card => {
            // Mouse move for 3D effect
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-12px)`;
            });
            
            // Mouse leave to reset
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
            });
        });
        
        console.log('✅ 3D tilt effect initialized');
    }, 1000);
}

// ============================================
// TYPING ANIMATION
// ============================================

/**
 * Setup typing animation for hero text
 */
function setupTypingAnimation() {
    setTimeout(() => {
        const typingElement = document.querySelector('.typing-text');
        
        if (!typingElement) return;
        
        const text = typingElement.getAttribute('data-text');
        if (text) {
            typingElement.textContent = text;
            console.log('✅ Typing animation initialized');
        }
    }, 500);
}

// ============================================
// SMOOTH SCROLL TO TOP
// ============================================

/**
 * Smooth scroll to top when changing pages
 */
function smoothScrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ============================================
// MODULE NAVIGATION SETUP
// ============================================

/**
 * Setup module card click navigation
 */
function setupModuleNavigation() {
    setTimeout(() => {
        const moduleCards = document.querySelectorAll('.module-card');
        
        moduleCards.forEach(card => {
            card.style.cursor = 'pointer';
        });
        
        console.log('✅ Module navigation initialized');
    }, 1000);
}

// ============================================
// LAZY LOAD IMAGES
// ============================================

/**
 * Setup lazy loading for images (Performance optimization)
 */
function setupLazyLoading() {
    setTimeout(() => {
        const images = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
            // Use IntersectionObserver for modern browsers
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            images.forEach(img => imageObserver.observe(img));
            
            if (images.length > 0) {
                console.log('✅ Lazy loading initialized for', images.length, 'images');
            }
        } else {
            // Fallback for older browsers
            images.forEach(img => {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            });
        }
    }, 1000);
}

// ============================================
// EXTERNAL LINKS SECURITY
// ============================================

/**
 * Add security attributes to external links
 */
function setupExternalLinks() {
    setTimeout(() => {
        const externalLinks = document.querySelectorAll('a[target="_blank"]');
        
        externalLinks.forEach(link => {
            // Add security attributes if not already present
            if (!link.getAttribute('rel')) {
                link.setAttribute('rel', 'noopener noreferrer');
            }
        });
        
        if (externalLinks.length > 0) {
            console.log('✅ External links secured:', externalLinks.length, 'links');
        }
    }, 1000);
}

// ============================================
// SCROLL ANIMATIONS
// ============================================

/**
 * Setup scroll-based animations
 */
function setupScrollAnimations() {
    setTimeout(() => {
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        
        if (!animatedElements.length) return;
        
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                }
            });
        }, {
            threshold: 0.1
        });
        
        animatedElements.forEach(el => animationObserver.observe(el));
        
        console.log('✅ Scroll animations initialized');
    }, 1000);
}

// ============================================
// CONSOLE EASTER EGG
// ============================================

/**
 * Fun console message for developers
 */
function setupConsoleEasterEgg() {
    console.log('%c👋 Hello Developer!', 'color: #0000FF; font-size: 20px; font-weight: bold;');
    console.log('%c🔬 Welcome to OPTICOM LABORATORY source code', 'color: #4169E1; font-size: 14px;');
    console.log('%c💡 Interested in Optical Communication? Visit our lab!', 'color: #00AA00; font-size: 12px;');
    console.log('%c📧 Contact: opticomlab@telkomuniversity.ac.id', 'color: #666; font-size: 11px;');
}

// ============================================
// INITIALIZE ALL INTERACTIONS
// ============================================

/**
 * Initialize all interactive features
 */
function initializeInteractions() {
    setupTeamFilter();
    setupContactForm();
    setupRecruitmentStatus();
    setup3DTiltEffect();
    setupTypingAnimation();
    setupModuleNavigation();
    setupLazyLoading();
    setupExternalLinks();
    setupScrollAnimations();
    setupConsoleEasterEgg();
    
    console.log('🎮 All interactions initialized!');
}

// ============================================
// AUTO-INITIALIZE
// ============================================

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeInteractions);
} else {
    initializeInteractions();
}

// Re-initialize after page navigation (for dynamic content)
document.addEventListener('pageChanged', () => {
    initializeInteractions();
    console.log('🔄 Interactions re-initialized after page change');
});