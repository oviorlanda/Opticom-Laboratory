/* ============================================
   MAIN.JS - Core Application Logic
   - HTML Components Loader
   - Page Navigation System
   - Enhanced Script Execution
   - Menu Card Navigation Support
   - Initialization
   ============================================ */

// ============================================
// GLOBAL VARIABLES
// ============================================

let currentPage = 'about';
let isLoading = false;

// ============================================
// HTML LOADER FUNCTIONS
// ============================================

/**
 * Load HTML component into container
 */
async function loadComponent(componentName, containerId) {
    try {
        console.log(`🔄 Loading component: ${componentName}...`);
        
        const response = await fetch(`components/${componentName}.html`);
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: Failed to load ${componentName}`);
        }
        
        const html = await response.text();
        const container = document.getElementById(containerId);
        
        if (container) {
            container.innerHTML = html;
            console.log(`✅ Component loaded: ${componentName}`);
        } else {
            console.error(`❌ Container not found: ${containerId}`);
        }
    } catch (error) {
        console.error(`❌ Error loading component ${componentName}:`, error);
    }
}

/**
 * Load page content into section
 */
async function loadPage(pageName, sectionId) {
    try {
        console.log(`🔄 Loading page: ${pageName}...`);
        
        // Determine page path
        let pagePath = `pages/${pageName}.html`;
        if (CONFIG.pages[pageName] && CONFIG.pages[pageName].file) {
            pagePath = CONFIG.pages[pageName].file;
            console.log(`   📂 Using custom path: ${pagePath}`);
        }
        
        const response = await fetch(pagePath);
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: Failed to load ${pageName}`);
        }
        
        const html = await response.text();
        const section = document.getElementById(sectionId);
        
        if (section) {
            section.innerHTML = html;
            console.log(`✅ Page loaded: ${pageName}`);
            
            // Initialize specific pages
            initializeSpecialPage(pageName, section);
        } else {
            console.error(`❌ Section not found: ${sectionId}`);
        }
    } catch (error) {
        console.error(`❌ Error loading page ${pageName}:`, error);
    }
}

/**
 * Initialize special pages that need extra setup
 */
function initializeSpecialPage(pageName, section) {
    // Video Pembelajaran Initialization
    if (pageName === 'videopembelajaran') {
        console.log('🎬 Video Pembelajaran HTML loaded, initializing...');
        
        let checkAttempt = 0;
        const maxChecks = 5;
        
        const checkAndInit = () => {
            checkAttempt++;
            console.log(`   Check ${checkAttempt}/${maxChecks}: Verifying video elements...`);
            
            const testElement = document.querySelector('.module-item-enhanced');
            
            if (testElement) {
                console.log('   ✅ Video elements confirmed in DOM!');
                
                // Execute scripts in the loaded HTML
                const scripts = section.querySelectorAll('script');
                scripts.forEach(script => {
                    try {
                        const newScript = document.createElement('script');
                        if (script.src) {
                            newScript.src = script.src;
                        } else {
                            newScript.textContent = script.textContent;
                        }
                        document.head.appendChild(newScript);
                    } catch (e) {
                        console.error('   ⚠️ Script execution error:', e);
                    }
                });
                
                // Call init function if available
                setTimeout(() => {
                    if (typeof window.initVideoPembelajaran === 'function') {
                        window.initVideoPembelajaran();
                        console.log('   ✅ Video Pembelajaran initialized!');
                    } else {
                        console.warn('   ⚠️ initVideoPembelajaran function not found');
                    }
                }, 150);
                
            } else if (checkAttempt < maxChecks) {
                console.log(`   ⏳ Elements not ready yet, retrying in 300ms...`);
                setTimeout(checkAndInit, 300);
            } else {
                console.error('   ❌ Video elements still not found after multiple checks!');
            }
        };
        
        setTimeout(checkAndInit, 300);
    }
    
    // NA Calculator Initialization
    if (pageName === 'NACalculator') {
        console.log('🧮 NACalculator HTML loaded, waiting for DOM to settle...');
        
        let checkAttempt = 0;
        const maxChecks = 5;
        
        const checkAndInit = () => {
            checkAttempt++;
            console.log(`   Check ${checkAttempt}/${maxChecks}: Verifying elements...`);
            
            const testElement = document.getElementById('tab-refractive');
            
            if (testElement) {
                console.log('   ✅ Elements confirmed in DOM!');
                if (window.NACalculator) {
                    window.NACalculator.initialized = false;
                    window.NACalculator.autoInit();
                }
            } else if (checkAttempt < maxChecks) {
                console.log(`   ⏳ Elements not ready yet, retrying in 300ms...`);
                setTimeout(checkAndInit, 300);
            } else {
                console.error('   ❌ Elements still not found after multiple checks!');
            }
        };
        
        setTimeout(checkAndInit, 500);
    }
}

// ============================================
// PAGE NAVIGATION SYSTEM
// ============================================

/**
 * Show specific page with loading animation
 */
function showPage(pageId) {
    if (isLoading) {
        console.log('⚠️ Page is already loading...');
        return;
    }
    
    isLoading = true;
    const loader = document.querySelector('.page-loader');
    
    console.log(`📄 Navigating to: ${pageId}`);
    
    // Show loader
    if (loader) {
        loader.style.display = 'flex';
        loader.classList.remove('hidden');
    }
    
    setTimeout(() => {
        // Hide all sections
        document.querySelectorAll('.page-section').forEach(section => {
            section.classList.remove('active');
        });
        
        // Remove active from nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        
        // Show target page
        const pageConfig = CONFIG.pages[pageId];
        if (pageConfig) {
            const targetSection = document.getElementById(pageConfig.id);
            if (targetSection) {
                targetSection.classList.add('active');
                document.title = `${pageConfig.title} - OPTICOM LABORATORY`;
                
                // Smooth scroll to top
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                
                // Trigger pageChanged event
                const event = new CustomEvent('pageChanged', {
                    detail: { pageId: pageId }
                });
                document.dispatchEvent(event);
                
                // Re-initialize Video Pembelajaran when navigating to it
                if (pageId === 'videopembelajaran') {
                    setTimeout(() => {
                        if (typeof window.initVideoPembelajaran === 'function') {
                            console.log('🎬 Re-initializing Video Pembelajaran after navigation...');
                            window.initVideoPembelajaran();
                        }
                    }, 400);
                }
                
                console.log(`✅ Page displayed: ${pageId}`);
            }
        }
        
        // Add active to nav link
        const activeLink = document.querySelector(`[data-page="${pageId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
        
        currentPage = pageId;
        
        // Hide loader
        if (loader) {
            setTimeout(() => {
                loader.classList.add('hidden');
                setTimeout(() => {
                    loader.style.display = 'none';
                    isLoading = false;
                }, 500);
            }, CONFIG.animation.pageTransitionDuration);
        } else {
            isLoading = false;
        }
    }, CONFIG.animation.pageTransitionDuration);
}

// Export showPage to window for global access
window.showPage = showPage;

/**
 * Navigate to module
 */
function navigateToModule(moduleNumber) {
    const moduleId = `module${moduleNumber}`;
    showPage(moduleId);
}

// ============================================
// EVENT LISTENERS SETUP
// ============================================

/**
 * Setup navigation event listeners
 */
function setupNavigation() {
    document.addEventListener('click', (e) => {
        // Menu card navigation
        const menuCard = e.target.closest('.menu-card-wrapper[data-page]');
        if (menuCard) {
            const isDisabled = menuCard.style.cursor === 'not-allowed' || 
                             menuCard.getAttribute('style')?.includes('not-allowed');
            
            if (!isDisabled) {
                e.preventDefault();
                const pageId = menuCard.getAttribute('data-page');
                if (pageId) {
                    console.log(`🎯 Menu card clicked: ${pageId}`);
                    showPage(pageId);
                    return;
                }
            }
        }
        
        // Nav links
        if (e.target.classList.contains('nav-link')) {
            e.preventDefault();
            const pageId = e.target.getAttribute('data-page');
            if (pageId) {
                showPage(pageId);
                
                // Close mobile menu
                const navMenu = document.querySelector('.nav-menu');
                if (navMenu) {
                    navMenu.classList.remove('active');
                }
            }
        }
        
        // Breadcrumb links
        if (e.target.classList.contains('breadcrumb-link')) {
            e.preventDefault();
            const pageId = e.target.getAttribute('data-page');
            if (pageId) {
                showPage(pageId);
            }
        }
        
        // Footer links
        if (e.target.closest('.footer-menu a[data-page]')) {
            e.preventDefault();
            const link = e.target.closest('a[data-page]');
            const pageId = link.getAttribute('data-page');
            if (pageId) {
                showPage(pageId);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }
        
        // Module buttons
        if (e.target.classList.contains('btn-options')) {
            e.preventDefault();
            const navigateTo = e.target.getAttribute('data-navigate');
            if (navigateTo) {
                showPage(navigateTo);
            }
        }
        
        // View All button
        if (e.target.classList.contains('btn-view-all')) {
            e.preventDefault();
            const pageId = e.target.getAttribute('data-page');
            if (pageId) {
                showPage(pageId);
            }
        }
    });
    
    // Calculator navigation
    document.addEventListener('navigateToCalculator', (e) => {
        const calculatorName = e.detail.calculator;
        console.log('🧮 Navigating to calculator:', calculatorName);
        
        if (CONFIG.pages[calculatorName]) {
            showPage(calculatorName);
        } else {
            console.error(`❌ Calculator not found: ${calculatorName}`);
        }
    });
    
    // Mobile hamburger menu
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
}

/**
 * Setup scroll effects
 */
function setupScrollEffects() {
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('header');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 255, 0.15)';
            } else {
                navbar.style.boxShadow = '0 2px 15px rgba(0, 0, 255, 0.1)';
            }
        }
    });
}

/**
 * Prevent hash links from jumping
 */
function preventHashLinks() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
        });
    });
}

// ============================================
// INITIALIZATION
// ============================================

/**
 * Initialize application
 */
async function initializeApp() {
    console.log('🚀 Initializing OPTICOM LABORATORY...');
    console.log('═══════════════════════════════════════════');
    
    // Load components (sequential - order matters)
    console.log('📦 Loading components...');
    await loadComponent('loader', 'loader-container');
    await loadComponent('header', 'header-container');
    await loadComponent('footer', 'footer-container');
    
    console.log('═══════════════════════════════════════════');
    
    // Load all pages in PARALLEL for faster loading
    console.log('📄 Loading pages (parallel)...');
    await Promise.all([
        loadPage('about', 'about-section'),
        loadPage('modules', 'modules-section'),
        loadPage('module1', 'module1-section'),
        loadPage('module2', 'module2-section'),
        loadPage('module3', 'module3-section'),
        loadPage('teams', 'teams-section'),
        loadPage('activities', 'activities-section'),
        loadPage('contact', 'contact-section'),
        loadPage('Opticaltoolbox', 'Opticaltoolbox-section'),
        loadPage('NACalculator', 'NACalculator-section'),
        loadPage('komplain', 'komplain-section'),
        loadPage('tatatertib', 'tatatertib-section'),
        loadPage('tugaspendahuluan', 'tugaspendahuluan-section'),
        loadPage('videopembelajaran', 'videopembelajaran-section'),
        loadPage('jadwal', 'jadwal-section'),
        loadPage('VDCalculator', 'VDCalculator-section'),
        loadPage('UCCalculator', 'UCCalculator-section'),
        loadPage('LPBCalculator', 'LPBCalculator-section'),
    ]);

    console.log('═══════════════════════════════════════════');
    
    // Setup event listeners
    console.log('🎯 Setting up...');
    setupNavigation();
    setupScrollEffects();
    preventHashLinks();
    
    // Hide loader
    const loader = document.querySelector('.page-loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, CONFIG.animation.loaderDuration);
    }
    
    console.log('═══════════════════════════════════════════');
    console.log('✅ Website initialized!');
    console.log('✅ showPage function available globally');
    console.log('✅ Menu card navigation via event delegation');
    console.log('📋 Menu is part of about.html (no separate menu page)');
    console.log('🧮 Calculator.js will initialize when page is viewed');
    console.log('🎬 Video Pembelajaran will auto-initialize when loaded');
    console.log('═══════════════════════════════════════════');
}

// ============================================
// AUTO-INITIALIZE
// ============================================

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

window.addEventListener('load', () => {
    console.log('🎉 All resources loaded!');
    console.log('🔍 Testing showPage availability:', typeof window.showPage === 'function' ? '✅ Available' : '❌ Not found');
});

// ============================================
// MODULE NOTIFICATION
// ============================================

/**
 * Show simple alert notification for coming soon modules
 */
window.showModuleComingSoon = function(moduleName) {
    alert('📢 ' + moduleName + '\n\nComing Soon! Module ini sedang dalam persiapan.');
    console.log('📢 Module notification shown:', moduleName);
};

console.log('✅ Module notification function loaded (simple alert)');
