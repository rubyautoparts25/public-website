// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Update navbar position on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.pageYOffset > 40) {
        navbar.style.top = '0';
    } else {
        navbar.style.top = '40px';
    }
});

// Premium Mobile Menu Toggle
const hamburger = document.querySelector('#hamburgerMenu');
const closeMenuBtn = document.querySelector('#closeMenuBtn');
const navMenu = document.querySelector('#mobileNavMenu');
const mobileMenuOverlay = document.querySelector('#mobileMenuOverlay');
const mobileSearchBtn = document.querySelector('#mobileSearchBtn');

function openMobileMenu() {
    if (navMenu) {
        navMenu.classList.add('active');
        if (mobileMenuOverlay) mobileMenuOverlay.classList.add('active');
        if (hamburger) hamburger.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeMobileMenu() {
    if (navMenu) {
        navMenu.classList.remove('active');
        if (mobileMenuOverlay) mobileMenuOverlay.classList.remove('active');
        if (hamburger) hamburger.classList.remove('active');
        if (closeMenuBtn) closeMenuBtn.classList.remove('active');
        document.body.style.overflow = '';
    }
}

if (hamburger) {
    hamburger.addEventListener('click', openMobileMenu);
}

if (closeMenuBtn) {
    closeMenuBtn.addEventListener('click', closeMobileMenu);
}

if (mobileMenuOverlay) {
    mobileMenuOverlay.addEventListener('click', closeMobileMenu);
}

// Mobile search button - opens menu with search focused
if (mobileSearchBtn) {
    mobileSearchBtn.addEventListener('click', () => {
        openMobileMenu();
        setTimeout(() => {
            const mobileSearchInput = document.querySelector('#mobileSearchInput');
            if (mobileSearchInput) {
                mobileSearchInput.focus();
            }
        }, 300);
    });
}

// Close menu when clicking nav links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        closeMobileMenu();
    });
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu && hamburger) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navMenu && hamburger && navMenu.classList.contains('active')) {
        if (!navMenu.contains(e.target) && !hamburger.contains(e.target) && !e.target.closest('.search-container')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.feature-card').forEach(card => {
    observer.observe(card);
});

document.querySelectorAll('.product-card').forEach(card => {
    observer.observe(card);
});

document.querySelectorAll('.service-card').forEach(card => {
    observer.observe(card);
});

document.querySelectorAll('.contact-item').forEach(item => {
    observer.observe(item);
});

const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    observer.observe(contactForm);
}


// Form submission
const form = document.querySelector('.contact-form');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Add a simple animation feedback
        const button = form.querySelector('button');
        const originalText = button.textContent;
        button.textContent = 'Sending...';
        button.disabled = true;
        
        // Simulate form submission (replace with actual form handling)
        setTimeout(() => {
            button.textContent = 'Message Sent! ✓';
            button.style.background = '#4caf50';
            form.reset();
            
            setTimeout(() => {
                button.textContent = originalText;
                button.disabled = false;
                button.style.background = '';
            }, 3000);
        }, 1500);
    });
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const shapes = document.querySelectorAll('.shape');
    
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
    
    shapes.forEach((shape, index) => {
        const speed = 0.3 + (index * 0.1);
        shape.style.transform = `translateY(${scrolled * speed}px)`;
    });
});
 
// Logo Splash Screen Animation - Only show on first visit
window.addEventListener('load', () => {
    // Check if splash has been shown before (using sessionStorage)
    const splashShown = sessionStorage.getItem('splashShown');
    
    // Only show splash on first page load in this session
    if (splashShown) {
        // Splash already shown, skip it
        const mainContent = document.getElementById('mainContent');
        if (mainContent) {
            mainContent.classList.add('show');
        }
        const splashScreen = document.getElementById('splashScreen');
        if (splashScreen) {
            splashScreen.style.display = 'none';
        }
        return;
    }
    
    const splashScreen = document.getElementById('splashScreen');
    const mainContent = document.getElementById('mainContent');
    
    // Prevent scrolling during splash screen
    document.body.classList.add('splash-active');
    
    if (splashScreen && mainContent) {
        // Mark splash as shown
        sessionStorage.setItem('splashShown', 'true');
        
        // Show splash screen for 2.5 seconds with animations
        setTimeout(() => {
            // Hide splash screen
            splashScreen.classList.add('hide');
            
            // Show main content with smooth transition
            setTimeout(() => {
                mainContent.classList.add('show');
                // Re-enable scrolling
                document.body.classList.remove('splash-active');
                // Remove splash screen from DOM after transition
                setTimeout(() => {
                    splashScreen.style.display = 'none';
                }, 800);
            }, 100);
        }, 2500);
    } else {
        // Fallback if splash screen elements don't exist
        document.body.classList.remove('splash-active');
        if (mainContent) {
            mainContent.classList.add('show');
        }
    }
});

// Add cursor trail effect for premium feel
let cursorTrail = [];
const maxTrailLength = 20;

document.addEventListener('mousemove', (e) => {
    cursorTrail.push({ x: e.clientX, y: e.clientY, time: Date.now() });
    if (cursorTrail.length > maxTrailLength) {
        cursorTrail.shift();
    }
});

// Add smooth reveal animations on scroll
const revealElements = document.querySelectorAll('.feature-card, .product-card, .service-card, .contact-item');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
            }, index * 50);
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// Add magnetic effect to buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        btn.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) scale(1.05)`;
    });
    
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
    });
});

// Add subtle tilt effect to cards (only when hovering)
// Hover effect for cards (excluding category-card which has click navigation)
document.querySelectorAll('.feature-card, .product-card, .service-card, .testimonial-card').forEach(card => {
    let isHovering = false;
    
    card.addEventListener('mouseenter', () => {
        isHovering = true;
    });
    
    card.addEventListener('mousemove', (e) => {
        if (!isHovering) return;
        
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 15;
        const rotateY = (centerX - x) / 15;
        
        card.style.setProperty('--rotate-x', `${rotateX}deg`);
        card.style.setProperty('--rotate-y', `${rotateY}deg`);
    });
    
    card.addEventListener('mouseleave', () => {
        isHovering = false;
        card.style.setProperty('--rotate-x', '0deg');
        card.style.setProperty('--rotate-y', '0deg');
    });
});

// Vehicle Finder Functionality
const vehicleData = {
    maruti: {
        models: ['Swift', 'Dzire', 'Alto', 'Wagon R', 'Baleno', 'Vitara Brezza', 'Ertiga'],
        years: ['2020-2024', '2015-2019', '2010-2014', '2005-2009']
    },
    hyundai: {
        models: ['i20', 'i10', 'Creta', 'Verna', 'Elantra', 'Tucson', 'Venue'],
        years: ['2020-2024', '2015-2019', '2010-2014', '2005-2009']
    },
    tata: {
        models: ['Nexon', 'Harrier', 'Safari', 'Tiago', 'Altroz', 'Punch'],
        years: ['2020-2024', '2015-2019', '2010-2014']
    },
    mahindra: {
        models: ['XUV700', 'XUV300', 'Scorpio', 'Bolero', 'Thar'],
        years: ['2020-2024', '2015-2019', '2010-2014']
    },
    honda: {
        models: ['City', 'Amaze', 'WR-V', 'CR-V', 'Civic'],
        years: ['2020-2024', '2015-2019', '2010-2014']
    },
    toyota: {
        models: ['Innova', 'Fortuner', 'Camry', 'Corolla', 'Glanza'],
        years: ['2020-2024', '2015-2019', '2010-2014']
    },
    ford: {
        models: ['EcoSport', 'Endeavour', 'Figo', 'Aspire'],
        years: ['2020-2024', '2015-2019', '2010-2014']
    },
    volkswagen: {
        models: ['Polo', 'Vento', 'Virtus', 'Taigun', 'Tiguan'],
        years: ['2020-2024', '2015-2019', '2010-2014']
    }
};

// Vehicle Finder - Wait for DOM to be ready
function setupVehicleFinder(retryCount = 0) {
    const MAX_RETRIES = 50; // Maximum 50 retries (5 seconds total)
    const manufacturerSelect = document.getElementById('manufacturer');
    const modelSelect = document.getElementById('model');
    const yearSelect = document.getElementById('year');
    const findPartsBtn = document.getElementById('findPartsBtn');

    if (!manufacturerSelect || !modelSelect || !yearSelect || !findPartsBtn) {
        if (retryCount < MAX_RETRIES) {
            // Only log every 10th retry to avoid console spam
            if (retryCount % 10 === 0) {
                console.log(`⏳ Vehicle finder elements not found, retrying... (${retryCount}/${MAX_RETRIES})`);
            }
            setTimeout(() => setupVehicleFinder(retryCount + 1), 100);
            return;
        } else {
            // Elements not found after max retries - vehicle finder only exists on index.html
            // Silently return without logging (this is expected on other pages)
            return;
        }
    }

    // Vehicle finder elements found, proceed with setup

if (manufacturerSelect) {
    manufacturerSelect.addEventListener('change', (e) => {
        const manufacturer = e.target.value;
        if (manufacturer && vehicleData[manufacturer]) {
            modelSelect.innerHTML = '<option value="">Select Model</option>';
            vehicleData[manufacturer].models.forEach(model => {
                const option = document.createElement('option');
                option.value = model.toLowerCase();
                option.textContent = model;
                modelSelect.appendChild(option);
            });
            modelSelect.disabled = false;
            yearSelect.disabled = true;
            yearSelect.innerHTML = '<option value="">Select Year</option>';
            // Enable button even with just manufacturer selected
            findPartsBtn.disabled = false;
        }
    });
}

if (modelSelect) {
    modelSelect.addEventListener('change', (e) => {
        const manufacturer = manufacturerSelect.value;
        if (manufacturer && vehicleData[manufacturer]) {
            yearSelect.innerHTML = '<option value="">Select Year</option>';
            vehicleData[manufacturer].years.forEach(year => {
                const option = document.createElement('option');
                option.value = year;
                option.textContent = year;
                yearSelect.appendChild(option);
            });
            yearSelect.disabled = false;
            // Button should already be enabled, but ensure it is
            findPartsBtn.disabled = false;
        }
    });
}

if (findPartsBtn) {
    findPartsBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        console.log('🔍 Find Parts button clicked');
        
        const manufacturer = manufacturerSelect ? manufacturerSelect.value : '';
        const model = modelSelect ? modelSelect.value : '';
        const year = yearSelect ? yearSelect.value : '';
        
        console.log('📋 Selected values:', { manufacturer, model, year });
        
        // Allow navigation even if only manufacturer is selected (just filter by brand)
        if (manufacturer) {
            // Get display names
            const manufacturerName = manufacturerSelect.options[manufacturerSelect.selectedIndex].text;
            const modelName = model ? modelSelect.options[modelSelect.selectedIndex].text : '';
            
            // Map manufacturer value to actual car brand name
            const brandMap = {
                'maruti': 'Maruti Suzuki',
                'hyundai': 'Hyundai',
                'tata': 'Tata',
                'mahindra': 'Mahindra',
                'honda': 'Honda',
                'toyota': 'Toyota',
                'ford': 'Ford',
                'volkswagen': 'Volkswagen'
            };
            
            const carBrand = brandMap[manufacturer] || manufacturerName;
            
            // Build search query - include model if selected
            const searchQuery = modelName || '';
            
            // Navigate to search results page with car brand filter and model search
            const params = new URLSearchParams();
            params.append('carBrand', carBrand);
            if (searchQuery) {
                params.append('search', searchQuery);
            }
            
            const url = `category-parts.html?${params.toString()}`;
            console.log('🚀 Navigating to:', url);
            
            window.location.href = url;
        } else {
            console.warn('⚠️ No manufacturer selected');
            alert('Please select a manufacturer first');
        }
    });
}

}

// Initialize vehicle finder when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupVehicleFinder);
} else {
    setupVehicleFinder();
}

// Search Functionality - Connected to Database API
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const searchResults = document.getElementById('searchResults');

// API Base URL - use the one from config.js or admin-utils.js (loaded before this file)
// If neither is loaded, fallback to default
if (typeof window.API_BASE_URL === 'undefined') {
    // Default to localhost for development
    // For production, update config.js with your backend URL
    window.API_BASE_URL = 'http://localhost:3000/api';
}
// Use window.API_BASE_URL directly - don't redeclare to avoid conflicts

// Debounce function for search
let searchTimeout;
function debounceSearch(func, delay) {
    return function(...args) {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => func.apply(this, args), delay);
    };
}

// Search parts from database
async function searchParts(query) {
    if (!query || query.trim().length < 2) {
        searchResults.classList.remove('active');
        return;
    }

    try {
        const response = await fetch(`${window.API_BASE_URL}/parts?search=${encodeURIComponent(query)}`);
        const result = await response.json();
        
        if (result.success && result.data) {
            displaySearchResults(result.data);
        } else {
            displaySearchResults([]);
        }
    } catch (error) {
        console.error('Error searching parts:', error);
        displaySearchResults([]);
    }
}

if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim();
        if (query.length >= 2) {
            debounceSearch(() => searchParts(query), 300)();
        } else {
            searchResults.classList.remove('active');
        }
    });

    // Handle Enter key
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const query = searchInput.value.trim();
            if (query.length >= 2) {
                searchParts(query);
            }
        }
    });
}

if (searchBtn) {
    searchBtn.addEventListener('click', () => {
        const query = searchInput.value.trim();
        if (query.length >= 2) {
            searchParts(query);
        } else if (query.length > 0) {
            // If query is too short, show message
            searchResults.innerHTML = '<div class="search-result-item">Please enter at least 2 characters</div>';
            searchResults.classList.add('active');
        }
    });
}

function displaySearchResults(parts) {
    searchResults.innerHTML = '';
    
    if (parts.length > 0) {
        // Limit to 10 results for better UX
        const limitedParts = parts.slice(0, 10);
        
        limitedParts.forEach(part => {
            const item = document.createElement('div');
            item.className = 'search-result-item';
            item.innerHTML = `
                <div style="display: flex; align-items: center; gap: 10px;">
                    ${part.image ? `<img src="${part.image}" alt="${part.partName}" style="width: 40px; height: 40px; object-fit: cover; border-radius: 4px;" onerror="this.onerror=null; this.style.display='none'; this.nextElementSibling.style.display='flex';"><div style="width: 40px; height: 40px; background: #f0f0f0; border-radius: 4px; display: none; align-items: center; justify-content: center;"><i class="fas fa-image" style="color: #999;"></i></div>` : '<div style="width: 40px; height: 40px; background: #f0f0f0; border-radius: 4px; display: flex; align-items: center; justify-content: center;"><i class="fas fa-image" style="color: #999;"></i></div>'}
                    <div style="flex: 1;">
                        <strong>${part.partName}</strong>
                        <div style="font-size: 0.85rem; color: #666; margin-top: 3px;">
                            ${part.partBrand} | ${part.carBrand} | ${part.partNumber}
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 5px;">
                            <span style="font-size: 0.75rem; color: #999;">
                                ${part.category || 'Uncategorized'}
                            </span>
                            ${part.price ? `<span style="font-size: 0.9rem; color: #ff6b35; font-weight: 700;">₹${parseFloat(part.price).toLocaleString('en-IN')}</span>` : ''}
                        </div>
                    </div>
                </div>
            `;
            item.addEventListener('click', () => {
                searchInput.value = part.partName;
                searchResults.classList.remove('active');
                // Navigate to category page with this part's category
                window.location.href = `category-parts.html?category=${part.category}&search=${encodeURIComponent(part.partName)}`;
            });
            searchResults.appendChild(item);
        });
        
        if (parts.length > 10) {
            const moreItem = document.createElement('div');
            moreItem.className = 'search-result-item';
            moreItem.style.textAlign = 'center';
            moreItem.style.fontSize = '0.85rem';
            moreItem.style.color = '#666';
            moreItem.textContent = `+${parts.length - 10} more results. Click to see all.`;
            moreItem.addEventListener('click', () => {
                const query = searchInput.value.trim();
                window.location.href = `category-parts.html?search=${encodeURIComponent(query)}`;
            });
            searchResults.appendChild(moreItem);
        }
        
        searchResults.classList.add('active');
    } else {
        const item = document.createElement('div');
        item.className = 'search-result-item';
        item.textContent = 'No parts found';
        searchResults.appendChild(item);
        searchResults.classList.add('active');
    }
}

// Close search results when clicking outside
document.addEventListener('click', (e) => {
    if (searchResults && !searchInput.contains(e.target) && !searchResults.contains(e.target)) {
        searchResults.classList.remove('active');
    }
});

// Contact/Inquiry Functionality
function contactForProduct(productName) {
    // Scroll to contact section
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    // You can add auto-fill functionality here if needed
}

// Category Click Handler - Navigate to category parts page
function setupCategoryClickHandlers() {
    // Use event delegation on the categories grid for better reliability
    const categoriesGrid = document.querySelector('.categories-grid');
    
    if (!categoriesGrid) {
        // Categories grid only exists on index.html, so this is normal on other pages
        return;
    }
    
    // Remove any existing click handlers first
    const newGrid = categoriesGrid.cloneNode(true);
    categoriesGrid.parentNode.replaceChild(newGrid, categoriesGrid);
    
    // Use event delegation - listen on the grid, handle clicks on cards
    newGrid.addEventListener('click', function(e) {
        // Find the closest category card
        const card = e.target.closest('.category-card');
        
        if (!card) {
            return; // Click wasn't on a category card
        }
        
        e.preventDefault();
        e.stopPropagation();
        
        const category = card.getAttribute('data-category');
        
        if (!category) {
            return;
        }
        
        // Navigate to category page
        window.location.href = `category-parts.html?category=${category}`;
    }, true); // Use capture phase
    
    // Also add direct handlers to each card as backup
    const categoryCards = newGrid.querySelectorAll('.category-card');
    
    categoryCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        
        if (category) {
            // Make it clear it's clickable
            card.style.cursor = 'pointer';
            card.style.pointerEvents = 'auto';
            card.setAttribute('role', 'button');
            card.setAttribute('tabindex', '0');
            const categoryName = card.querySelector('h3')?.textContent || category;
            card.setAttribute('aria-label', `View ${categoryName} products`);
            
            // Add direct click handler as backup
            card.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                window.location.href = `category-parts.html?category=${category}`;
            });
            
            // Add keyboard support
            card.addEventListener('keypress', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    e.stopPropagation();
                    window.location.href = `category-parts.html?category=${category}`;
                }
            });
        }
    });
}

// Setup category handlers when DOM is ready (only on pages with categories grid)
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setupCategoryClickHandlers();
    });
} else {
    setupCategoryClickHandlers();
}

// Also setup after page load to catch dynamically loaded content
window.addEventListener('load', () => {
    setTimeout(() => {
        setupCategoryClickHandlers();
    }, 100);
});

// Re-setup handlers if categories section is dynamically loaded
function setupCategoriesObserver() {
    const categoriesGrid = document.querySelector('.categories-grid');
    if (categoriesGrid) {
        const categoriesObserver = new MutationObserver(() => {
            setupCategoryClickHandlers();
        });
        
        categoriesObserver.observe(categoriesGrid, {
            childList: true,
            subtree: true
        });
    }
}

// Setup observer when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupCategoriesObserver);
} else {
    setupCategoriesObserver();
}

// Car Make Selection (Inspired by motrparts.com)
function setupCarMakeHandlers() {
    const carMakeCards = document.querySelectorAll('.car-make-card');
    const shopByMakeBtn = document.getElementById('shopByMakeBtn');
    
    // Car make card click handler - filter by car make
    carMakeCards.forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault();
            const make = card.getAttribute('data-make');
            if (make) {
                // Navigate to categories page with car make filter
                // For now, just show all categories - can be enhanced later
                window.location.href = `index.html#categories`;
            }
        });
    });
    
    // Shop Now button - scroll to categories
    if (shopByMakeBtn) {
        shopByMakeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' });
        });
    }
}


// Setup car make handlers when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setupCarMakeHandlers();
        setupSubcategoriesDropdowns();
        setupPartsBrandDropdown();
    });
} else {
    setupCarMakeHandlers();
    setupSubcategoriesDropdowns();
    setupPartsBrandDropdown();
}

// Setup nested subcategories dropdowns (inspired by motrparts.com)
function setupSubcategoriesDropdowns() {
    if (typeof window.subcategories === 'undefined') return;
    
    const subcategories = window.subcategories;
    
    // Populate each category dropdown
    Object.keys(subcategories).forEach(category => {
        const menu = document.getElementById(`${category}-menu`);
        if (menu && subcategories[category]) {
            menu.innerHTML = subcategories[category].map(subcat => `
                <li><a href="category-parts.html?category=${category}&subcategory=${encodeURIComponent(subcat)}">${subcat}</a></li>
            `).join('');
        }
    });
}

// Setup Parts Brand dropdown in top bar
function setupPartsBrandDropdown() {
    if (typeof window.partsBrands === 'undefined') return;
    
    const menu = document.getElementById('partsBrandMenu');
    if (menu && window.partsBrands) {
        menu.innerHTML = window.partsBrands.map(brand => `
            <li><a href="category-parts.html?partBrand=${encodeURIComponent(brand)}">${brand}</a></li>
        `).join('');
    }
}

// Newsletter Form
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        alert(`Thank you for subscribing with ${email}!`);
        newsletterForm.reset();
    });
}

// Observe new elements for animation
document.querySelectorAll('.category-card, .brand-card, .testimonial-card').forEach(item => {
    observer.observe(item);
});

// Ensure categories and brands are visible on load
window.addEventListener('DOMContentLoaded', () => {
    // Make sure category and brand cards are visible
    document.querySelectorAll('.category-card, .brand-card').forEach(card => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Load sample products
function loadProducts() {
    const productsGrid = document.getElementById('productsGrid');
    if (productsGrid) {
        const sampleProducts = [
            { name: 'Oil Filter', icon: 'fa-filter' },
            { name: 'Brake Pad Set', icon: 'fa-stop-circle' },
            { name: 'Air Filter', icon: 'fa-wind' },
            { name: 'Spark Plug', icon: 'fa-bolt' },
            { name: 'Headlight', icon: 'fa-lightbulb' },
            { name: 'Shock Absorber', icon: 'fa-compress-alt' }
        ];
        
        productsGrid.innerHTML = sampleProducts.map(product => `
            <div class="product-card">
                <div class="product-image">
                    <div class="product-placeholder"><i class="fas ${product.icon}"></i></div>
                </div>
                <h3>${product.name}</h3>
                <button class="btn btn-primary" style="margin-top: 15px; padding: 10px 25px; font-size: 0.9rem;" onclick="contactForProduct('${product.name}')">
                    <i class="fas fa-phone"></i> Inquire Now
                </button>
            </div>
        `).join('');
        
        // Re-observe product cards
        document.querySelectorAll('.product-card').forEach(card => {
            observer.observe(card);
        });
    }
}

// Contact for product function
window.contactForProduct = function(productName) {
    // Scroll to contact section
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    // Optional: Pre-fill the contact form with product name
    setTimeout(() => {
        const messageField = document.querySelector('.contact-form textarea');
        if (messageField) {
            messageField.value = `I'm interested in: ${productName}`;
            messageField.focus();
        }
    }, 500);
};

// Load products on page load
window.addEventListener('load', () => {
    loadProducts();
});

// Handle URL parameters for contact form (from category parts page)
window.addEventListener('DOMContentLoaded', () => {
    const hash = window.location.hash;
    if (hash.includes('#contact')) {
        const urlParams = new URLSearchParams(window.location.search);
        const part = urlParams.get('part');
        const partNumber = urlParams.get('partNumber');
        
        if (part || partNumber) {
            setTimeout(() => {
                const messageField = document.querySelector('.contact-form textarea');
                if (messageField) {
                    let message = 'I\'m interested in: ';
                    if (part) message += part;
                    if (partNumber) message += ` (Part Number: ${partNumber})`;
                    messageField.value = message;
                    messageField.focus();
                }
            }, 500);
        }
    }
});

