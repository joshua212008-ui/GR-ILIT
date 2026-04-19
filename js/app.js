// State
let currentFilter = 'All';
let currentLang = 'en';
let liveInventory = {}; // { stripeProductId: { active: true/false } }

// DOM Elements
const productGrid = document.getElementById('product-grid');
const filterBtns = document.querySelectorAll('.filter-btn');

// Initialize
document.addEventListener('DOMContentLoaded', async () => {
    applyTranslations();
    renderProducts();
    setupEventListeners();
    await syncInventoryWithStripe();

    // Splash Screen Entrance Logic
    setTimeout(() => {
        const splash = document.getElementById('splash-screen');
        if (splash) {
            splash.classList.add('hidden');
        }
    }, 3500); // 3.5 seconds immersion before door rolls up
});

function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[currentLang][key]) {
            el.innerHTML = translations[currentLang][key];
        }
    });
}

// Setup Listeners
function setupEventListeners() {
    // Language Selector
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentLang = e.target.getAttribute('data-lang');
            applyTranslations();
            renderProducts();
        });
    });

    // Category / Icon Filters
    document.querySelectorAll('.cat-icon').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const target = e.target.closest('.cat-icon');
            if(!target) return;
            
            document.querySelectorAll('.cat-icon').forEach(b => b.classList.remove('active'));
            target.classList.add('active');
            currentFilter = target.getAttribute('data-category');
            renderProducts();
        });
    });
}

// Render Products
function renderProducts() {
    productGrid.innerHTML = '';
    const filtered = currentFilter === 'All' 
        ? products 
        : products.filter(p => p.category === currentFilter);

    filtered.forEach((product, index) => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.style.animation = `fadeInSlide 0.5s ease-out forwards`;
        card.style.animationDelay = `${index * 0.1}s`;

        // Determine if sold out (prioritize live sync data if available)
        let isSoldOut = product.inventory === 0;
        if (product.stripeProductId && liveInventory[product.stripeProductId]) {
            // If Stripe says the product is inactive, it's sold out
            isSoldOut = !liveInventory[product.stripeProductId].active;
        }

        card.innerHTML = `
            <div class="product-image-wrap">
                <img src="${product.image}" alt="Product" class="product-image">
                ${isSoldOut ? `<div class="sold-out-badge">${translations[currentLang].soldOut}</div>` : ''}
            </div>
            
            <div class="product-info">
                <div class="product-header">
                    <h3 class="product-title">${product.name[currentLang]}</h3>
                    <span class="product-price">${formatPrice(product.price)}</span>
                </div>
                
                <p class="product-desc">${product.description[currentLang]}</p>
                
                <div class="product-actions">
                    ${isSoldOut ? 
                        `<button class="btn btn-disabled" disabled>${translations[currentLang].soldOut}</button>` : 
                        product.stripeLink ? 
                        `<button class="btn btn-primary" onclick="window.location.href='${product.stripeLink}'" style="width: 100%; background: #635bff;"><i class="fa-solid fa-credit-card"></i> ${currentLang === 'ja' ? '今すぐ購入' : 'PURCHASE'}</button>` :
                        product.baseLink ?
                        `<button class="btn btn-primary" onclick="window.location.href='${product.baseLink}'" style="width: 100%;"><i class="fa-solid fa-cart-shopping"></i> ${currentLang === 'ja' ? 'BASEで購入' : 'BUY ON BASE'}</button>` :
                        `<button class="btn btn-disabled" disabled>${currentLang === 'ja' ? 'リンク未設定' : 'NO LINK'}</button>`
                    }
                </div>
            </div>
        `;
        
        productGrid.appendChild(card);
    });
}

// Sync Inventory with Stripe via Netlify Function
async function syncInventoryWithStripe() {
    const stripeProductIds = products
        .map(p => p.stripeProductId)
        .filter(id => id && id.trim() !== '');

    if (stripeProductIds.length === 0) return;

    try {
        console.log("Syncing inventory with Stripe...");
        const response = await fetch('/.netlify/functions/get-inventory', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ stripeProductIds })
        });

        if (response.ok) {
            liveInventory = await response.json();
            console.log("Live inventory updated:", liveInventory);
            renderProducts(); // Re-render with new data
        }
    } catch (error) {
        console.error("Failed to sync inventory:", error);
    }
}


