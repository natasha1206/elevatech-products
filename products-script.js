// products-script.js - With Working Load More Feature

console.log('=== PRODUCTS-SCRIPT.JS LOADED ===');

// All available products data
const allProducts = [
    {
        id: 1,
        title: "Elevator Cabin AC System",
        category: "climate",
        description: "Specialized HVAC system for elevator cabins with energy-efficient operation.",
        specs: ["Energy Efficient", "Low Noise", "Compact Design"],
        price: "Contact for Quote",
        icon: "fas fa-snowflake"
    },
    {
        id: 2,
        title: "360° Surveillance Camera",
        category: "security",
        description: "Advanced 360-degree surveillance system with night vision.",
        specs: ["4K Resolution", "Night Vision", "Wide Angle"],
        price: "Contact for Quote",
        icon: "fas fa-video"
    },
    {
        id: 3,
        title: "Touch Screen Control Panel",
        category: "components",
        description: "Modern touch screen interface for elevator control.",
        specs: ["Touch Screen", "Multi-language", "ADA Compliant"],
        price: "Contact for Quote",
        icon: "fas fa-sliders-h"
    },
    {
        id: 4,
        title: "Digital Multimedia Display",
        category: "multimedia",
        description: "High-resolution digital display for elevator entertainment.",
        specs: ["Full HD", "Weatherproof", "Remote Management"],
        price: "Contact for Quote",
        icon: "fas fa-tv"
    },
    {
        id: 5,
        title: "IOT Smart Sensor Kit",
        category: "iot",
        description: "Wireless sensor kit for predictive maintenance.",
        specs: ["Wireless", "Real-time Data", "Predictive Alerts"],
        price: "Contact for Quote",
        icon: "fas fa-wifi"
    },
    {
        id: 6,
        title: "Emergency Communication System",
        category: "security",
        description: "Integrated emergency communication system.",
        specs: ["Two-way Audio", "Auto Alarm", "Battery Backup"],
        price: "Contact for Quote",
        icon: "fas fa-phone-alt"
    },
    {
        id: 7,
        title: "Ventilation Control Unit",
        category: "climate",
        description: "Advanced ventilation control for optimal air quality.",
        specs: ["Auto Mode", "Air Quality Sensor", "Quiet Operation"],
        price: "Contact for Quote",
        icon: "fas fa-wind"
    },
    {
        id: 8,
        title: "Premium Audio System",
        category: "multimedia",
        description: "High-fidelity audio system for elevator announcements.",
        specs: ["HD Audio", "Multi-zone", "Weather Resistant"],
        price: "Contact for Quote",
        icon: "fas fa-volume-up"
    },
    {
        id: 9,
        title: "LED Lighting System",
        category: "components",
        description: "Energy-efficient LED lighting with emergency backup.",
        specs: ["LED", "Energy Saving", "Emergency Backup"],
        price: "Contact for Quote",
        icon: "fas fa-lightbulb"
    },
    {
        id: 10,
        title: "Floor Position Indicator",
        category: "components",
        description: "Digital floor display with braille for accessibility.",
        specs: ["Digital Display", "Braille", "ADA Compliant"],
        price: "Contact for Quote",
        icon: "fas fa-layer-group"
    },
    {
        id: 11,
        title: "Door Safety Sensor",
        category: "security",
        description: "Advanced safety sensors for elevator doors.",
        specs: ["Laser Sensors", "Auto Reverse", "Safety Certified"],
        price: "Contact for Quote",
        icon: "fas fa-door-closed"
    },
    {
        id: 12,
        title: "Smart Control Panel",
        category: "iot",
        description: "AI-powered control system for smart elevators.",
        specs: ["AI Powered", "Touch Interface", "Cloud Connected"],
        price: "Contact for Quote",
        icon: "fas fa-brain"
    },
    {
        id: 13,
        title: "Emergency Lighting",
        category: "components",
        description: "Backup lighting system for power outages.",
        specs: ["LED", "Auto On", "Long Battery"],
        price: "Contact for Quote",
        icon: "fas fa-light-emergency"
    },
    {
        id: 14,
        title: "Air Purification System",
        category: "climate",
        description: "Advanced air purification for elevator cabins.",
        specs: ["HEPA Filter", "UV Sterilization", "Auto Mode"],
        price: "Contact for Quote",
        icon: "fas fa-air-freshener"
    },
    {
        id: 15,
        title: "Digital Signage Display",
        category: "multimedia",
        description: "Interactive digital signage for elevators.",
        specs: ["Interactive", "High Brightness", "Remote Update"],
        price: "Contact for Quote",
        icon: "fas fa-ad"
    }
];

// Global variables
let currentProducts = [];
let productsToShow = 6; // Initial number of products to show
const productsPerLoad = 3; // How many more to load each time

// Initialize products
function initProducts() {
    console.log('Initializing products...');
    
    // Hide loading
    const loading = document.querySelector('.products-loading');
    if (loading) {
        loading.style.display = 'none';
        console.log('Loading hidden');
    }
    
    // Get container
    const container = document.getElementById('productsContainer');
    if (!container) {
        console.error('ERROR: No productsContainer found!');
        return;
    }
    
    console.log('Container found, loading products...');
    
    // Set initial products to show
    currentProducts = allProducts.slice(0, productsToShow);
    renderProducts();
    updateProductCount();
    setupFiltering();
    setupFAQ();
}

// Render products to container
function renderProducts(productsArray = currentProducts) {
    const container = document.getElementById('productsContainer');
    if (!container) return;
    
    container.innerHTML = '';
    
    productsArray.forEach(product => {
        const productElement = createProductElement(product);
        container.appendChild(productElement);
    });

    setupQuickViewButtons();
    
    console.log('Products rendered:', productsArray.length);
}

// Create product element (REPLACEMENT)
function createProductElement(product) {
    const div = document.createElement('div');
    div.className = `product-item ${product.category}`;
    div.dataset.id = product.id;
    div.dataset.slug = product.id; // if you later create full pages, use slug
    div.dataset.title = product.title;
    div.dataset.description = product.description;
    div.dataset.img = product.img || '';
    div.dataset.tags = JSON.stringify(product.specs || []);

    const specsHTML = (product.specs || []).map(spec =>
        `<div class="product-spec">${spec}</div>`
    ).join('');

    // Use a safe image fallback if none provided
    const imgHTML = product.img
      ? `<img src="${product.img}" alt="${escapeHtml(product.title)}" />`
      : `<div class="product-image-fallback"><i class="${product.icon}"></i></div>`;

    div.innerHTML = `
        <div class="product-image">
            ${imgHTML}
            <div class="product-badge">${product.category.toUpperCase()}</div>
        </div>
        <div class="product-content">
            <div class="product-category">${getCategoryName(product.category)}</div>
            <h3 class="product-title">${escapeHtml(product.title)}</h3>
            <p class="product-description">${escapeHtml(product.description)}</p>
            <div class="product-specs">${specsHTML}</div>
            <div class="product-actions">
                <div class="product-price">${escapeHtml(product.price)}</div>
                <button class="product-btn view-details-btn" data-id="${product.id}">
                    <i class="fas fa-eye"></i>
                    <span>View Details</span>
                </button>
            </div>
        </div>
    `;

    return div;
}

// small helper to avoid injecting raw HTML from product text
function escapeHtml(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}


// Get category display name
function getCategoryName(category) {
    const categories = {
        'climate': 'Climate Control',
        'security': 'Security Systems',
        'multimedia': 'Multimedia',
        'iot': 'IOT & Smart Systems',
        'components': 'Electronic Components'
    };
    return categories[category] || category;
}

// Update product count display
function updateProductCount() {
    const productCount = document.getElementById('productCount');
    if (productCount) {
        productCount.textContent = currentProducts.length;
        
        // Hide "Load More" button if all products are shown
        const loadMoreBtn = document.getElementById('loadMore');
        if (loadMoreBtn) {
            if (currentProducts.length >= allProducts.length) {
                loadMoreBtn.style.display = 'none';
            } else {
                loadMoreBtn.style.display = 'flex';
            }
        }
    }
}

// Load more products
function loadMoreProducts() {
    console.log('Loading more products...');
    
    const loadMoreBtn = document.getElementById('loadMore');
    if (!loadMoreBtn) return;
    
    // Show loading state
    const originalHTML = loadMoreBtn.innerHTML;
    loadMoreBtn.innerHTML = `
        <div class="loading-spinner" style="width: 16px; height: 16px; margin-right: 8px;"></div>
        <span>Loading...</span>
    `;
    loadMoreBtn.disabled = true;
    
    // Simulate API delay
    setTimeout(() => {
        // Calculate how many more to show
        const nextIndex = currentProducts.length;
        const endIndex = Math.min(nextIndex + productsPerLoad, allProducts.length);
        
        // Add more products
        const newProducts = allProducts.slice(nextIndex, endIndex);
        currentProducts = [...currentProducts, ...newProducts];
        
        // Render all products again (or append new ones)
        renderProducts();
        updateProductCount();
        
        // Restore button
        loadMoreBtn.innerHTML = originalHTML;
        loadMoreBtn.disabled = false;
        
        // Scroll to newly loaded products
        if (newProducts.length > 0) {
            const lastProduct = document.querySelector('.product-item:last-child');
            if (lastProduct) {
                lastProduct.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }
        
        console.log('Loaded', newProducts.length, 'more products. Total:', currentProducts.length);
        
    }, 800); // Simulated delay
}

// Setup filtering
function setupFiltering() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const searchInput = document.querySelector('.search-input');
    const sortSelect = document.querySelector('.sort-select');
    
    // Filter buttons
    if (filterButtons) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Filter products
                const filter = button.dataset.filter;
                filterAndSortProducts(filter, searchInput?.value || '', sortSelect?.value || 'featured');
            });
        });
    }
    
    // Search input
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const activeFilter = document.querySelector('.filter-btn.active');
            filterAndSortProducts(
                activeFilter?.dataset.filter || 'all',
                e.target.value,
                sortSelect?.value || 'featured'
            );
        });
    }
    
    // Sort select
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            const activeFilter = document.querySelector('.filter-btn.active');
            filterAndSortProducts(
                activeFilter?.dataset.filter || 'all',
                searchInput?.value || '',
                e.target.value
            );
        });
    }
}

// Filter and sort products
function filterAndSortProducts(filter = 'all', search = '', sort = 'featured') {
    let filtered = [...allProducts];
    
    // Apply filter
    if (filter !== 'all') {
        filtered = filtered.filter(product => product.category === filter);
    }
    
    // Apply search
    if (search.trim()) {
        const searchTerm = search.toLowerCase().trim();
        filtered = filtered.filter(product => 
            product.title.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm)
        );
    }
    
    // Apply sorting
    switch(sort) {
        case 'newest':
            filtered.sort((a, b) => b.id - a.id);
            break;
        case 'price':
            // Since all are "Contact for Quote", keep as is
            break;
        case 'popular':
            // Simulate popularity (higher IDs = newer = more popular)
            filtered.sort((a, b) => b.id - a.id);
            break;
        case 'featured':
        default:
            // Keep original order
            break;
    }
    
    // Update current products and render
    currentProducts = filtered.slice(0, productsToShow);
    renderProducts(currentProducts);
    updateProductCount();
    
    // Show/hide load more based on filtered results
    const loadMoreBtn = document.getElementById('loadMore');
    if (loadMoreBtn) {
        if (currentProducts.length >= filtered.length) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'flex';
        }
    }
}

// Setup FAQ functionality
function setupFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', () => {
                // Close other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current item
                item.classList.toggle('active');
            });
        });
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        initProducts();
        
        // Setup load more button
        const loadMoreBtn = document.getElementById('loadMore');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', loadMoreProducts);
        }
    });
} else {
    initProducts();
    
    // Setup load more button
    const loadMoreBtn = document.getElementById('loadMore');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', loadMoreProducts);
    }
}

// Export for debugging
window.productsScript = {
    initProducts,
    loadMoreProducts,
    allProducts,
    currentProducts
};

console.log('Products script initialization complete');

// Quick View Modal Logic
function setupQuickViewButtons() {
    const buttons = document.querySelectorAll('.view-details-btn');

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.dataset.id;
            const product = allProducts.find(p => p.id == id);
            openQuickView(product);
        });
    });
}

function openQuickView(product) {
    const modal = document.getElementById('quickViewModal');
    if (!modal || !product) return;

    document.getElementById('qv-title').textContent = product.title;
    document.getElementById('qv-category').textContent = product.category.toUpperCase();
    document.getElementById('qv-desc').textContent = product.description;
    document.getElementById('qv-img').src = product.img || "";

    const tagsContainer = document.getElementById('qv-tags');
    tagsContainer.innerHTML = product.specs.map(s => `<span class="tag">${s}</span>`).join('');

    const iconElement = document.getElementById('qv-icon');
    iconElement.className = `${product.icon}`;
    iconElement.style.fontSize = "4rem";

    modal.classList.add('open');
}

// Close modal
document.addEventListener('click', e => {
    const modal = document.getElementById('quickViewModal');
    if (!modal) return;

    if (
        e.target.classList.contains('qv-backdrop') ||
        e.target.classList.contains('qv-close')
    ) {
        modal.classList.remove('open');
    }
});
