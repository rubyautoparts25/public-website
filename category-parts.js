// Category Parts Page JavaScript

// Get category and filters from URL parameters
const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get('category');
const subcategory = urlParams.get('subcategory');
const partBrandFromUrl = urlParams.get('partBrand');
const searchFromUrl = urlParams.get('search');
const carBrandFromUrl = urlParams.get('carBrand');

// Category name mapping (matches public website categories)
const categoryNames = {
    'air-conditioning': 'Air Conditioning System',
    'body-parts': 'Body Parts',
    'lamp-parts': 'Lamp and Parts',
    'suspension-steering': 'Suspension and Steering Parts',
    'engine': 'Engine Parts',
    'electrical': 'Electrical',
    'wheels-tires': 'Wheels and Tires',
    'oil-fluids': 'Oil and Fluids',
    'windscreen-cleaning': 'Windscreen Cleaning System',
    'clutch': 'Clutch System',
    'transmission': 'Transmission',
    'filters': 'Filters',
    'interiors': 'Interiors Comfort and Safety',
    'gasket-seals': 'Gasket and Seals',
    'fuel': 'Fuel System',
    'exhaust': 'Exhaust System',
    'cooling': 'Cooling System',
    'service-kit': 'Service Kit',
    'accessories': 'Car Accessories',
    'brake': 'Brake System',
    'belt-chain': 'Belt and Chain Drive',
    'fasteners': 'Fasteners',
    'lighting': 'Lighting',
    'universal': 'UNIVERSAL'
};

// Sample parts data structure
// You can replace this with actual data from your database/API
let partsData = [];

// Initialize page
async function initializePage() {
    // If vehicle filter or search exists but no category, show all parts matching filters
    if (!category && (carBrandFromUrl || searchFromUrl)) {
        // Load all parts and filter by vehicle/search
        await loadPartsData();
        // Set all parts as partsData for filtering
        const allParts = Object.values(PARTS_DATA).flat();
        partsData = allParts;
        populateFilters();
        
        // Set search input if search query exists
        if (searchFromUrl) {
            const partSearchInput = document.getElementById('partSearchInput');
            if (partSearchInput) {
                partSearchInput.value = searchFromUrl;
            }
        }
        
        // Set car brand filter if exists
        if (carBrandFromUrl) {
            const carBrandFilter = document.getElementById('carBrandFilter');
            if (carBrandFilter) {
                // Try to find matching option in dropdown
                const options = Array.from(carBrandFilter.options);
                const matchingOption = options.find(opt => 
                    opt.text.toLowerCase().includes(carBrandFromUrl.toLowerCase()) ||
                    opt.value.toLowerCase().includes(carBrandFromUrl.toLowerCase())
                );
                if (matchingOption) {
                    carBrandFilter.value = matchingOption.value;
                } else {
                    carBrandFilter.value = carBrandFromUrl;
                }
            }
        }
        
        // Set page title
        let titleText = 'Parts';
        if (carBrandFromUrl && searchFromUrl) {
            // Extract model from search query if possible
            const modelMatch = searchFromUrl.match(/\b(Swift|Dzire|Alto|Wagon R|Baleno|i20|i10|Creta|Verna|Nexon|Harrier|City|Amaze|Innova|Fortuner|EcoSport|Polo|Vento)\b/i);
            if (modelMatch) {
                titleText = `${carBrandFromUrl} ${modelMatch[1]} Parts`;
            } else {
                titleText = `${carBrandFromUrl} Parts`;
            }
        } else if (carBrandFromUrl) {
            titleText = `${carBrandFromUrl} Parts`;
        } else if (searchFromUrl) {
            titleText = `Search Results: "${searchFromUrl}"`;
        }
        
        document.getElementById('categoryTitle').textContent = titleText;
        document.getElementById('categoryName').textContent = titleText;
        updateResultsCount(partsData.length);
        setupFilters();
        applyFilters();
        return;
    }
    
    if (!category) {
        // Redirect to home if no category specified and no search
        window.location.href = 'index.html';
        return;
    }
    

    // Load parts data first
    await loadPartsData();

    // Set category name
    const categoryName = categoryNames[category] || category;
    document.getElementById('categoryTitle').textContent = categoryName;
    document.getElementById('categoryName').textContent = categoryName;

    // Set default sort to Car Brand
    document.getElementById('sortBy').value = 'carBrand';

    // Load parts for this category (await to ensure data is loaded)
    await loadCategoryParts(category);

    // Apply URL parameters if present (functional filtering)
    if (partBrandFromUrl) {
        const partBrandFilter = document.getElementById('partBrandFilter');
        if (partBrandFilter) {
            partBrandFilter.value = partBrandFromUrl;
        }
    }
    
    // Apply vehicle filters from URL (from vehicle finder)
    if (carBrandFromUrl) {
        const carBrandFilter = document.getElementById('carBrandFilter');
        if (carBrandFilter) {
            // Try to find matching option in dropdown
            const options = Array.from(carBrandFilter.options);
            const matchingOption = options.find(opt => 
                opt.text.toLowerCase().includes(carBrandFromUrl.toLowerCase()) ||
                opt.value.toLowerCase().includes(carBrandFromUrl.toLowerCase())
            );
            if (matchingOption) {
                carBrandFilter.value = matchingOption.value;
            } else {
                // If no exact match, set the value directly
                carBrandFilter.value = carBrandFromUrl;
            }
        }
    }
    
    // Apply search query from URL
    if (searchFromUrl) {
        const partSearchInput = document.getElementById('partSearchInput');
        if (partSearchInput) {
            partSearchInput.value = searchFromUrl;
        }
    }
    
    // Update page title if vehicle filter is applied
    if (carBrandFromUrl) {
        const titleText = `${categoryName} - ${carBrandFromUrl}`;
        document.getElementById('categoryTitle').textContent = titleText;
    }
    
    // Note: subcategory filtering can be added here if you want to filter by subcategory name
    // For now, clicking subcategory just goes to the main category page

    // Setup filter event listeners
    setupFilters();
    
    // Apply filters immediately if URL parameters exist
    if (partBrandFromUrl || searchFromUrl || carBrandFromUrl) {
        applyFilters();
    }
}

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePage);
} else {
    initializePage();
}

// Load parts for category (make it globally accessible)
async function loadCategoryParts(category) {
    const normalizedCategory = (category || '').trim().toLowerCase();
    console.log('🔄 Loading parts for category:', normalizedCategory);
    
    // Reload parts from API to get latest data
    await loadPartsData();
    
    // Get parts for this category
    partsData = getSamplePartsForCategory(normalizedCategory);
    
    if (partsData.length === 0) {
        console.warn('⚠️ No parts found for category:', normalizedCategory);
        updateResultsCount(0);
        displayParts([]);
        return;
    }
    
    // Sort parts by default: Car Brand -> Part Brand -> Part Number
    partsData.sort((a, b) => {
        const carBrandCompare = a.carBrand.localeCompare(b.carBrand);
        if (carBrandCompare !== 0) return carBrandCompare;
        const partBrandCompare = a.partBrand.localeCompare(b.partBrand);
        if (partBrandCompare !== 0) return partBrandCompare;
        return a.partNumber.localeCompare(b.partNumber);
    });
    
    // Populate filter dropdowns
    populateFilters();
    
    // Display parts (applyFilters will be called when filters change)
    updateResultsCount(partsData.length);
    displayParts(partsData);
}

// Make functions globally accessible for admin-utils.js (after they're defined)
window.loadPartsData = loadPartsData;
window.loadCategoryParts = loadCategoryParts;

// API Configuration - Use the one from admin-utils.js (loaded before this file)
// API_BASE_URL is already declared in admin-utils.js, so we just use it

// Parts data - loaded from API
let PARTS_DATA = {};

// Load parts data from API
async function loadPartsData() {
    try {
        const response = await fetch(`${window.API_BASE_URL}/parts`);
        
        if (response.ok) {
            const result = await response.json();
            const allParts = result.data || [];
            
            // Debug: Log sample parts to check image URLs
            if (allParts.length > 0) {
                console.log('🔍 Sample parts with images:');
                allParts.slice(0, 3).forEach(p => {
                    console.log(`  - ${p.partName}:`, {
                        hasImage: !!p.image,
                        imageUrl: p.image ? p.image.substring(0, 50) + '...' : 'null',
                        imageType: typeof p.image
                    });
                });
            }
            
            // Initialize all categories
            PARTS_DATA = {
                'air-conditioning': [],
                'body-parts': [],
                'lamp-parts': [],
                'suspension-steering': [],
                'engine': [],
                'electrical': [],
                'wheels-tires': [],
                'oil-fluids': [],
                'windscreen-cleaning': [],
                'clutch': [],
                'transmission': [],
                'filters': [],
                'interiors': [],
                'gasket-seals': [],
                'fuel': [],
                'exhaust': [],
                'cooling': [],
                'service-kit': [],
                'accessories': [],
                'brake': [],
                'belt-chain': [],
                'fasteners': [],
                'lighting': [],
                'universal': []
            };
            
            // Organize parts by category (normalize to lowercase for matching)
            allParts.forEach(part => {
                const category = (part.category || '').trim().toLowerCase();
                if (category) {
                    if (!PARTS_DATA[category]) {
                        PARTS_DATA[category] = [];
                    }
                    PARTS_DATA[category].push(part);
                }
            });
            
            console.log('✅ Loaded', allParts.length, 'parts from API');
            console.log('📊 Parts by category:', Object.keys(PARTS_DATA).filter(cat => PARTS_DATA[cat].length > 0).map(cat => `${cat}: ${PARTS_DATA[cat].length}`).join(', '));
        } else {
            console.warn('Could not load parts from API, using fallback data');
            PARTS_DATA = {};
        }
    } catch (error) {
        console.error('Error loading parts data from API:', error);
        // Try to load from JSON as fallback
        try {
            const response = await fetch('parts-data.json');
            if (response.ok) {
                PARTS_DATA = await response.json();
            } else {
                PARTS_DATA = {};
            }
        } catch (jsonError) {
            console.error('Error loading fallback JSON:', jsonError);
            PARTS_DATA = {};
        }
    }
}

// Get parts for category from PARTS_DATA
function getSamplePartsForCategory(category) {
    const normalizedCategory = (category || '').trim().toLowerCase();
    
    if (PARTS_DATA && PARTS_DATA[normalizedCategory] && Array.isArray(PARTS_DATA[normalizedCategory])) {
        console.log(`✅ Found ${PARTS_DATA[normalizedCategory].length} parts for category: ${normalizedCategory}`);
        return PARTS_DATA[normalizedCategory];
    }
    
    console.warn(`❌ No parts found for category: "${normalizedCategory}"`);
    console.warn('Available categories with parts:', Object.keys(PARTS_DATA).filter(cat => PARTS_DATA[cat] && PARTS_DATA[cat].length > 0));
    return [];
}

// Populate filter dropdowns
function populateFilters() {
    const carBrands = [...new Set(partsData.map(part => part.carBrand))].sort();
    const partBrands = [...new Set(partsData.map(part => part.partBrand))].sort();

    const carBrandFilter = document.getElementById('carBrandFilter');
    const partBrandFilter = document.getElementById('partBrandFilter');

    // Populate car brands
    carBrands.forEach(brand => {
        const option = document.createElement('option');
        option.value = brand;
        option.textContent = brand;
        carBrandFilter.appendChild(option);
    });

    // Populate part brands
    partBrands.forEach(brand => {
        const option = document.createElement('option');
        option.value = brand;
        option.textContent = brand;
        partBrandFilter.appendChild(option);
    });
}

// Setup filter event listeners
function setupFilters() {
    const carBrandFilter = document.getElementById('carBrandFilter');
    const partBrandFilter = document.getElementById('partBrandFilter');
    const sortBy = document.getElementById('sortBy');
    const partSearchInput = document.getElementById('partSearchInput');
    const partSearchBtn = document.getElementById('partSearchBtn');
    const clearFiltersBtn = document.getElementById('clearFilters');
    const filterToggleBtn = document.getElementById('filterToggleBtn');
    const closeFilterBtn = document.getElementById('closeFilterBtn');
    const filterSidebar = document.getElementById('filterSidebar');
    const filterOverlay = document.getElementById('filterOverlay');

    carBrandFilter.addEventListener('change', applyFilters);
    partBrandFilter.addEventListener('change', applyFilters);
    sortBy.addEventListener('change', applyFilters);
    
    // Search functionality
    if (partSearchInput) {
        partSearchInput.addEventListener('input', debounce(applyFilters, 300));
        partSearchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                applyFilters();
            }
        });
    }
    
    if (partSearchBtn) {
        partSearchBtn.addEventListener('click', applyFilters);
    }
    
    // Filter sidebar toggle
    if (filterToggleBtn) {
        filterToggleBtn.addEventListener('click', () => {
            filterSidebar.classList.add('active');
            filterOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    if (closeFilterBtn) {
        closeFilterBtn.addEventListener('click', closeFilterSidebar);
    }
    
    if (filterOverlay) {
        filterOverlay.addEventListener('click', closeFilterSidebar);
    }
    
    // Clear filters
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', () => {
            carBrandFilter.value = '';
            partBrandFilter.value = '';
            sortBy.value = 'carBrand';
            if (partSearchInput) partSearchInput.value = '';
            applyFilters();
            closeFilterSidebar();
        });
    }
}

function closeFilterSidebar() {
    const filterSidebar = document.getElementById('filterSidebar');
    const filterOverlay = document.getElementById('filterOverlay');
    if (filterSidebar) filterSidebar.classList.remove('active');
    if (filterOverlay) filterOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

// Debounce function for search
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

// Apply filters and sorting
function applyFilters() {
    const carBrandFilter = document.getElementById('carBrandFilter');
    const partBrandFilter = document.getElementById('partBrandFilter');
    const carBrand = carBrandFilter ? carBrandFilter.value : '';
    const partBrand = partBrandFilter ? partBrandFilter.value : '';
    const sortBy = document.getElementById('sortBy').value;
    const searchQuery = document.getElementById('partSearchInput')?.value.toLowerCase().trim() || '';

    // Use URL parameters if available (from vehicle finder)
    const carBrandToUse = carBrandFromUrl || carBrand;

    let filtered = [...partsData];

    // Filter by search query (searches in part name, part number, car brand, part brand, and description)
    // Split search query into words for more flexible matching
    if (searchQuery) {
        const searchTerms = searchQuery.toLowerCase().split(/\s+/).filter(term => term.length > 0);
        filtered = filtered.filter(part => {
            const partNameLower = part.partName.toLowerCase();
            const partNumberLower = part.partNumber.toLowerCase();
            const carBrandLower = part.carBrand.toLowerCase();
            const partBrandLower = part.partBrand.toLowerCase();
            const descriptionLower = (part.description || '').toLowerCase();
            
            // Check if ALL search terms match (AND logic) or if full query matches (OR logic for exact matches)
            const fullQueryMatch = partNameLower.includes(searchQuery) ||
                partNumberLower.includes(searchQuery) ||
                carBrandLower.includes(searchQuery) ||
                partBrandLower.includes(searchQuery) ||
                descriptionLower.includes(searchQuery);
            
            if (fullQueryMatch) return true;
            
            // Check if individual words match (at least one word must match)
            return searchTerms.some(term => 
                partNameLower.includes(term) ||
                partNumberLower.includes(term) ||
                carBrandLower.includes(term) ||
                partBrandLower.includes(term) ||
                descriptionLower.includes(term)
            );
        });
    }

    // Filter by car brand (supports partial matching for vehicle finder)
    if (carBrandToUse) {
        filtered = filtered.filter(part => 
            part.carBrand.toLowerCase().includes(carBrandToUse.toLowerCase())
        );
    }

    // Filter by part brand
    if (partBrand) {
        filtered = filtered.filter(part => part.partBrand === partBrand);
    }

    // Sort with multi-level sorting
    filtered.sort((a, b) => {
        let primaryCompare = 0;
        let secondaryCompare = 0;
        let tertiaryCompare = 0;

        switch (sortBy) {
            case 'carBrand':
                primaryCompare = a.carBrand.localeCompare(b.carBrand);
                secondaryCompare = a.partBrand.localeCompare(b.partBrand);
                tertiaryCompare = a.partNumber.localeCompare(b.partNumber);
                break;
            case 'carBrandDesc':
                primaryCompare = b.carBrand.localeCompare(a.carBrand);
                secondaryCompare = a.partBrand.localeCompare(b.partBrand);
                tertiaryCompare = a.partNumber.localeCompare(b.partNumber);
                break;
            case 'partBrand':
                primaryCompare = a.partBrand.localeCompare(b.partBrand);
                secondaryCompare = a.carBrand.localeCompare(b.carBrand);
                tertiaryCompare = a.partNumber.localeCompare(b.partNumber);
                break;
            case 'partBrandDesc':
                primaryCompare = b.partBrand.localeCompare(a.partBrand);
                secondaryCompare = a.carBrand.localeCompare(b.carBrand);
                tertiaryCompare = a.partNumber.localeCompare(b.partNumber);
                break;
            case 'partNumber':
                primaryCompare = a.partNumber.localeCompare(b.partNumber);
                secondaryCompare = a.carBrand.localeCompare(b.carBrand);
                tertiaryCompare = a.partBrand.localeCompare(b.partBrand);
                break;
            case 'partNumberDesc':
                primaryCompare = b.partNumber.localeCompare(a.partNumber);
                secondaryCompare = a.carBrand.localeCompare(b.carBrand);
                tertiaryCompare = a.partBrand.localeCompare(b.partBrand);
                break;
            case 'partName':
                primaryCompare = a.partName.localeCompare(b.partName);
                secondaryCompare = a.carBrand.localeCompare(b.carBrand);
                tertiaryCompare = a.partBrand.localeCompare(b.partBrand);
                break;
            case 'partNameDesc':
                primaryCompare = b.partName.localeCompare(a.partName);
                secondaryCompare = a.carBrand.localeCompare(b.carBrand);
                tertiaryCompare = a.partBrand.localeCompare(b.partBrand);
                break;
            case 'priceLow':
                const priceALow = (a.price || 0);
                const priceBLow = (b.price || 0);
                primaryCompare = priceALow - priceBLow;
                secondaryCompare = a.carBrand.localeCompare(b.carBrand);
                tertiaryCompare = a.partBrand.localeCompare(b.partBrand);
                break;
            case 'priceHigh':
                const priceAHigh = (a.price || 0);
                const priceBHigh = (b.price || 0);
                primaryCompare = priceBHigh - priceAHigh;
                secondaryCompare = a.carBrand.localeCompare(b.carBrand);
                tertiaryCompare = a.partBrand.localeCompare(b.partBrand);
                break;
            default:
                primaryCompare = a.carBrand.localeCompare(b.carBrand);
                secondaryCompare = a.partBrand.localeCompare(b.partBrand);
                tertiaryCompare = a.partNumber.localeCompare(b.partNumber);
        }

        if (primaryCompare !== 0) return primaryCompare;
        if (secondaryCompare !== 0) return secondaryCompare;
        return tertiaryCompare;
    });

    // Update quick filter chips
    updateQuickFilters(carBrand, partBrand, searchQuery);
    
    // Update filter count badge
    updateFilterCount(carBrand, partBrand, searchQuery);

    // Update results count
    updateResultsCount(filtered.length);
    
    displayParts(filtered);
}

// Update quick filter chips
function updateQuickFilters(carBrand, partBrand, searchQuery) {
    const quickFilters = document.getElementById('quickFilters');
    if (!quickFilters) return;
    
    quickFilters.innerHTML = '';
    
    if (carBrand) {
        const chip = document.createElement('div');
        chip.className = 'filter-chip active';
        chip.innerHTML = `
            <i class="fas fa-car"></i>
            <span>Car: ${carBrand}</span>
            <span class="remove-chip" onclick="removeFilter('carBrand')">&times;</span>
        `;
        quickFilters.appendChild(chip);
    }
    
    if (partBrand) {
        const chip = document.createElement('div');
        chip.className = 'filter-chip active';
        chip.innerHTML = `
            <i class="fas fa-tag"></i>
            <span>Brand: ${partBrand}</span>
            <span class="remove-chip" onclick="removeFilter('partBrand')">&times;</span>
        `;
        quickFilters.appendChild(chip);
    }
    
    if (searchQuery) {
        const chip = document.createElement('div');
        chip.className = 'filter-chip active';
        chip.innerHTML = `
            <i class="fas fa-search"></i>
            <span>Search: "${searchQuery}"</span>
            <span class="remove-chip" onclick="removeFilter('search')">&times;</span>
        `;
        quickFilters.appendChild(chip);
    }
}

// Remove filter
window.removeFilter = function(filterType) {
    if (filterType === 'carBrand') {
        document.getElementById('carBrandFilter').value = '';
    } else if (filterType === 'partBrand') {
        document.getElementById('partBrandFilter').value = '';
    } else if (filterType === 'search') {
        document.getElementById('partSearchInput').value = '';
    }
    applyFilters();
}

// Update filter count badge
function updateFilterCount(carBrand, partBrand, searchQuery) {
    const filterCount = document.getElementById('activeFilterCount');
    if (!filterCount) return;
    
    let count = 0;
    if (carBrand) count++;
    if (partBrand) count++;
    if (searchQuery) count++;
    
    if (count > 0) {
        filterCount.textContent = count;
        filterCount.classList.add('active');
    } else {
        filterCount.classList.remove('active');
    }
}

// Update results count
function updateResultsCount(count) {
    const resultsInfo = document.getElementById('resultsInfo');
    const resultsCount = document.getElementById('resultsCount');
    if (resultsInfo && resultsCount) {
        resultsCount.textContent = count;
        resultsInfo.style.display = count === 0 ? 'none' : 'block';
    }
}

// Image error handler
function handleImageError(img) {
    console.error('❌ Image failed to load:', img.src);
    console.error('❌ Image error details:', {
        src: img.src,
        complete: img.complete,
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight,
        parentElement: img.parentElement?.className
    });
    
    // Check if URL is valid
    if (!img.src || img.src === '' || img.src === 'undefined' || img.src === 'null') {
        console.error('❌ Invalid image URL detected');
    }
    
    img.style.display = 'none';
    
    // Try to find placeholder - could be next sibling or in parent
    let placeholder = img.nextElementSibling;
    if (!placeholder || (!placeholder.classList.contains('part-image-placeholder') && !placeholder.classList.contains('part-details-image-placeholder'))) {
        placeholder = img.parentElement?.querySelector('.part-image-placeholder') || 
                     img.parentElement?.querySelector('.part-details-image-placeholder');
    }
    if (placeholder) {
        placeholder.style.display = 'flex';
    }
    
    const loading = img.parentElement?.querySelector('.part-image-loading');
    if (loading) loading.style.display = 'none';
}

// Image load handler
function handleImageLoad(img) {
    console.log('✅ Image loaded successfully:', img.src);
    img.style.display = 'block';
    
    // Try to find placeholder - could be next sibling or in parent
    let placeholder = img.nextElementSibling;
    if (!placeholder || (!placeholder.classList.contains('part-image-placeholder') && !placeholder.classList.contains('part-details-image-placeholder'))) {
        placeholder = img.parentElement?.querySelector('.part-image-placeholder') || 
                     img.parentElement?.querySelector('.part-details-image-placeholder');
    }
    if (placeholder) {
        placeholder.style.display = 'none';
    }
    
    const loading = img.parentElement?.querySelector('.part-image-loading');
    if (loading) loading.style.display = 'none';
}

// Make handlers globally available
window.handleImageError = handleImageError;
window.handleImageLoad = handleImageLoad;

// Display parts in grid
function displayParts(parts) {
    const partsGrid = document.getElementById('partsGrid');
    const noResults = document.getElementById('noResults');

    if (parts.length === 0) {
        partsGrid.style.display = 'none';
        noResults.style.display = 'block';
        return;
    }

    partsGrid.style.display = 'grid';
    noResults.style.display = 'none';

    const isAdminMode = sessionStorage.getItem('isAdmin') === 'true';
    
    partsGrid.innerHTML = parts.map(part => `
        <div class="part-card ${isAdminMode ? 'admin-mode' : ''}" onclick="openPartDetails('${part._id}')" data-part-id="${part._id}">
            ${isAdminMode ? `
            <div class="admin-part-actions" onclick="event.stopPropagation();">
                <button class="admin-edit-btn" onclick="openEditPartModal('${part._id}')" title="Edit Part">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="admin-delete-btn" onclick="deletePart('${part._id}', '${part.partName.replace(/'/g, "\\'")}')" title="Delete Part">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
            ` : ''}
            <div class="part-image-container">
                ${part.image 
                    ? `<div class="part-image-wrapper">
                        <img src="${part.image}" alt="${part.partName}" class="part-image" loading="lazy" 
                             onerror="console.error('❌ Card Image Error:', this.src); handleImageError(this)" 
                             onload="console.log('✅ Card Image Loaded:', this.src); handleImageLoad(this)">
                        <div class="part-image-placeholder" style="display:none;"><i class="fas fa-image"></i></div>
                        <div class="part-image-loading" style="display:none;"><i class="fas fa-spinner fa-spin"></i></div>
                       </div>`
                    : `<div class="part-image-placeholder"><i class="fas fa-image"></i></div>`
                }
            </div>
            <div class="part-card-content">
                <h3 class="part-name">${part.partName}</h3>
                <div class="part-details">
                    <div class="part-detail-item">
                        <span class="part-detail-label"><i class="fas fa-tag"></i> ${part.partBrand}</span>
                        <span class="part-detail-value">${part.carBrand}</span>
                    </div>
                    <div class="part-detail-item">
                        <span class="part-detail-label"><i class="fas fa-barcode"></i> Part No:</span>
                        <span class="part-detail-value">${part.partNumber}</span>
                    </div>
                </div>
                ${part.price ? `
                <div class="part-price">
                    <span class="price-label">Price:</span>
                    <span class="price-value">₹${parseFloat(part.price).toLocaleString('en-IN')}</span>
                </div>
                ` : ''}
            </div>
            <div class="part-card-footer" onclick="event.stopPropagation();">
                <button class="inquire-btn" onclick="contactForPart('${part.partName}', '${part.partNumber}')">
                    <i class="fas fa-phone"></i> Inquire Now
                </button>
            </div>
        </div>
    `).join('');
    
    // Show admin controls after parts are displayed
    if (isAdminMode && typeof showAdminControls === 'function') {
        showAdminControls();
    }
}

// Contact for part function
window.contactForPart = function(partName, partNumber) {
    // Directly open phone call
    window.location.href = 'tel:+918881888934';
};

// Open part details modal
window.openPartDetails = async function(partId) {
    try {
        const response = await fetch(`${window.API_BASE_URL}/parts/${partId}`);
        const result = await response.json();
        
        if (result.success && result.data) {
            const part = result.data;
            console.log('📦 Part data loaded:', {
                id: part._id,
                name: part.partName,
                image: part.image,
                hasImage: !!part.image,
                imageType: typeof part.image,
                imageLength: part.image ? part.image.length : 0
            });
            
            // Debug: Check if image URL is valid
            if (part.image) {
                console.log('🔍 Image URL validation:');
                console.log('  - Starts with http:', part.image.startsWith('http'));
                console.log('  - Contains cloudinary:', part.image.includes('cloudinary'));
                console.log('  - Full URL:', part.image);
            } else {
                console.warn('⚠️ No image URL in part data');
            }
            
            showPartDetailsModal(part);
        } else {
            alert('Part details not found');
        }
    } catch (error) {
        console.error('Error fetching part details:', error);
        alert('Error loading part details');
    }
};

// Show part details modal
function showPartDetailsModal(part) {
    // Create modal if it doesn't exist
    let modal = document.getElementById('partDetailsModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'partDetailsModal';
        modal.className = 'part-details-modal';
        document.body.appendChild(modal);
    }
    
    // Escape HTML and quotes for safe insertion
    const escapedImageUrl = part.image ? part.image.replace(/'/g, "\\'").replace(/"/g, '&quot;') : '';
    const escapedPartName = part.partName.replace(/'/g, "\\'").replace(/"/g, '&quot;');
    
    // Log image URL for debugging
    console.log('🖼️ Modal - Part image URL:', part.image);
    console.log('🖼️ Modal - Escaped image URL:', escapedImageUrl);
    
    modal.innerHTML = `
        <div class="part-details-modal-content">
            <span class="part-details-close" onclick="closePartDetailsModal()">&times;</span>
            <div class="part-details-header">
                ${part.image ? `<div class="part-details-image-wrapper">
                    <img src="${escapedImageUrl}" alt="${escapedPartName}" class="part-details-image" 
                         onerror="console.error('❌ Modal Image Error:', this.src); handleImageError(this); if(this.parentElement) { const placeholder = this.parentElement.querySelector('.part-details-image-placeholder'); if(placeholder) placeholder.style.display='flex'; }" 
                         onload="console.log('✅ Modal Image Loaded:', this.src); handleImageLoad(this); if(this.parentElement) { const placeholder = this.parentElement.querySelector('.part-details-image-placeholder'); if(placeholder) placeholder.style.display='none'; }">
                    <div class="part-details-image-placeholder" style="display:none;"><i class="fas fa-image"></i></div>
                </div>` : '<div class="part-details-image-placeholder"><i class="fas fa-image"></i></div>'}
                <div class="part-details-title">
                    <h2>${escapedPartName}</h2>
                    <p class="part-details-number">Part Number: ${part.partNumber || 'N/A'}</p>
                </div>
            </div>
            <div class="part-details-body">
                <div class="part-details-row">
                    <div class="part-details-item">
                        <span class="part-details-label"><i class="fas fa-car"></i> Car Brand:</span>
                        <span class="part-details-value">${part.carBrand}</span>
                    </div>
                    <div class="part-details-item">
                        <span class="part-details-label"><i class="fas fa-tag"></i> Part Brand:</span>
                        <span class="part-details-value">${part.partBrand}</span>
                    </div>
                </div>
                <div class="part-details-row">
                    <div class="part-details-item">
                        <span class="part-details-label"><i class="fas fa-folder"></i> Category:</span>
                        <span class="part-details-value">${categoryNames[part.category] || part.category}</span>
                    </div>
                    ${part.price ? `
                    <div class="part-details-item">
                        <span class="part-details-label"><i class="fas fa-rupee-sign"></i> Price:</span>
                        <span class="part-details-value" style="font-size: 1.3rem; color: var(--orange-dark); font-weight: 700;">₹${parseFloat(part.price).toLocaleString('en-IN')}</span>
                    </div>
                    ` : ''}
                </div>
                ${part.description ? `
                <div class="part-details-section">
                    <h3>Description</h3>
                    <p>${part.description}</p>
                </div>
                ` : ''}
                ${part.specifications ? `
                <div class="part-details-section">
                    <h3>Specifications</h3>
                    <p>${part.specifications}</p>
                </div>
                ` : ''}
            </div>
            <div class="part-details-footer">
                <button class="btn btn-primary" onclick="contactForPart('${part.partName}', '${part.partNumber}')">
                    <i class="fas fa-phone"></i> Inquire Now
                </button>
            </div>
        </div>
    `;
    
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// Close part details modal
window.closePartDetailsModal = function() {
    const modal = document.getElementById('partDetailsModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
};

// Close modal when clicking outside
document.addEventListener('click', (e) => {
    const modal = document.getElementById('partDetailsModal');
    if (modal && e.target === modal) {
        closePartDetailsModal();
    }
});

// Mobile menu toggle is handled by script.js (loaded before this file)
// No need to redeclare hamburger - it's already set up in script.js

