// --- SweetAlert2: Show App Download QR Codes (Used by new modal & nav button) ---
function showContactPopup(event) {
    if (event) event.preventDefault();

    const androidAppLink = "https://play.google.com/store/apps/details?id=com.example.healthybites"; // Replace with your actual link
    const iosAppLink = "https://apps.apple.com/app/healthy-bites/id1234567890"; // Replace with your actual link

    const androidQRUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(androidAppLink)}`;
    const iosQRUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(iosAppLink)}`;

    Swal.fire({
        title: 'Get Our App',
        html: `
            <p style="margin-bottom: 20px; color: var(--text-light); font-size: 0.95rem;">Scan below to download our mobile app.</p>
            <div class="qr-popup-content">
                <div class="qr-code-item">
                    <img src="${androidQRUrl}" alt="Android App QR Code">
                    <span><i class="fab fa-google-play"></i> Google Play</span>
                </div>
                <div class="qr-code-item">
                    <img src="${iosQRUrl}" alt="iOS App QR Code">
                    <span><i class="fab fa-apple"></i> App Store</span>
                </div>
            </div>
            <p style="margin-top: 20px;"><a href="#footer" onclick="Swal.close(); setTimeout(() => document.getElementById('footer').scrollIntoView(), 0);" style="color: var(--accent-color);">View Contact Details</a></p>
        `,
        confirmButtonText: 'Close',
        confirmButtonColor: '#f5a623', // Accent color
        width: 'auto',
        padding: '1.5em'
    });
}

// --- SweetAlert2: Show Nutrient Info Popup (Original - for star snacks) ---
function showNutrientInfo(title, description) {
    Swal.fire({
        title: title,
        text: description,
        icon: 'info',
        confirmButtonText: 'Close',
        confirmButtonColor: '#f5a623',
    });
}

// --- Data for New Package Modal ---
const packageDetails = {
    basic: {
        displayName: "Basic Plan",
        durations: {
            '7days': { label: "7 Days", items: [ { name: "Nuts Chikki", imgSrc: "images/items/nuts-chikki.jpg", quantity: "2" }, { name: "Raagi Biscuits", imgSrc: "images/items/raagi-biscuit.jpg", quantity: "2" }, { name: "Small Fruit Mix", imgSrc: "images/items/fruit-mix-small.jpg", quantity: "Weekly" } ], cost: 210 },
            '15days': { label: "15 Days", items: [ { name: "Nuts Chikki", imgSrc: "images/items/nuts-chikki.jpg", quantity: "4" }, { name: "Raagi Biscuits", imgSrc: "images/items/raagi-biscuit.jpg", quantity: "4" }, { name: "Medium Fruit Mix", imgSrc: "images/items/fruit-mix-medium.jpg", quantity: "Bi-Weekly" } ], cost: 400 },
            '1month': { label: "1 Month", items: [ { name: "Nuts Chikki", imgSrc: "images/items/nuts-chikki.jpg", quantity: "8" }, { name: "Raagi Biscuits", imgSrc: "images/items/raagi-biscuit.jpg", quantity: "8" }, { name: "Large Fruit Mix", imgSrc: "images/items/fruit-mix-large.jpg", quantity: "Monthly" }, { name: "Surprise Treat", imgSrc: "images/items/surprise-treat.jpg", quantity: "1" } ], cost: 750 },
            '3months': { label: "3 Months", items: [ { name: "Nuts Chikki", imgSrc: "images/items/nuts-chikki.jpg", quantity: "24" }, { name: "Raagi Biscuits", imgSrc: "images/items/raagi-biscuit.jpg", quantity: "24" }, { name: "XL Fruit Mix", imgSrc: "images/items/fruit-mix-xl.jpg", quantity: "Quarterly" }, { name: "Surprise Treat", imgSrc: "images/items/surprise-treat.jpg", quantity: "3" }, { name: "Recipe Card", imgSrc: "images/items/recipe-card.jpg", quantity: "1" } ], cost: 2100 },
            '1year': { label: "1 Year", items: [ { name: "Nuts Chikki", imgSrc: "images/items/nuts-chikki.jpg", quantity: "100" }, { name: "Raagi Biscuits", imgSrc: "images/items/raagi-biscuit.jpg", quantity: "100" }, { name: "Annual Fruit Sub", imgSrc: "images/items/fruit-subscription.jpg", quantity: "Annual" }, { name: "Surprise Treat", imgSrc: "images/items/surprise-treat.jpg", quantity: "12" }, { name: "Recipe Book", imgSrc: "images/items/recipe-book.jpg", quantity: "1" } ], cost: 7800 }
        }
    },
    pro: {
        displayName: "Pro Plan",
        durations: {
            '7days': { label: "7 Days", items: [ { name: "Premium Chikki", imgSrc: "images/items/premium-chikki.jpg", quantity: "3" }, { name: "Seed Biscuits", imgSrc: "images/items/seed-biscuit.jpg", quantity: "3" }, { name: "Medium Fruit Mix", imgSrc: "images/items/fruit-mix-medium.jpg", quantity: "Weekly" }, { name: "Energy Bar", imgSrc: "images/items/energy-bar.jpg", quantity: "1" } ], cost: 350 },
            '15days': { label: "15 Days", items: [ { name: "Premium Chikki", imgSrc: "images/items/premium-chikki.jpg", quantity: "6" }, { name: "Seed Biscuits", imgSrc: "images/items/seed-biscuit.jpg", quantity: "6" }, { name: "Large Fruit Mix", imgSrc: "images/items/fruit-mix-large.jpg", quantity: "Bi-Weekly" }, { name: "Energy Bar", imgSrc: "images/items/energy-bar.jpg", quantity: "2" } ], cost: 650 },
            '1month': { label: "1 Month", items: [ { name: "Premium Chikki", imgSrc: "images/items/premium-chikki.jpg", quantity: "12" }, { name: "Seed Biscuits", imgSrc: "images/items/seed-biscuit.jpg", quantity: "12" }, { name: "XL Fruit Mix", imgSrc: "images/items/fruit-mix-xl.jpg", quantity: "Monthly" }, { name: "Energy Bar", imgSrc: "images/items/energy-bar.jpg", quantity: "4" }, { name: "Surprise Treat", imgSrc: "images/items/surprise-treat.jpg", quantity: "2" } ], cost: 1200 },
            '3months': { label: "3 Months", items: [ { name: "Premium Chikki", imgSrc: "images/items/premium-chikki.jpg", quantity: "36" }, { name: "Seed Biscuits", imgSrc: "images/items/seed-biscuit.jpg", quantity: "36" }, { name: "XXL Fruit Mix", imgSrc: "images/items/fruit-mix-xxl.jpg", quantity: "Quarterly" }, { name: "Energy Bar", imgSrc: "images/items/energy-bar.jpg", quantity: "12" }, { name: "Surprise Treat", imgSrc: "images/items/surprise-treat.jpg", quantity: "6" }, { name: "Recipe Book", imgSrc: "images/items/recipe-book.jpg", quantity: "1" } ], cost: 3300 },
            '1year': { label: "1 Year", items: [ { name: "Premium Chikki", imgSrc: "images/items/premium-chikki.jpg", quantity: "150" }, { name: "Seed Biscuits", imgSrc: "images/items/seed-biscuit.jpg", quantity: "150" }, { name: "Premium Fruit Sub", imgSrc: "images/items/fruit-subscription-premium.jpg", quantity: "Annual" }, { name: "Energy Bar", imgSrc: "images/items/energy-bar.jpg", quantity: "50" }, { name: "Surprise Treat", imgSrc: "images/items/surprise-treat.jpg", quantity: "24" }, { name: "Premium Recipe Book", imgSrc: "images/items/recipe-book-premium.jpg", quantity: "1" } ], cost: 12000 }
        }
    },
    ultraPro: {
        displayName: "Ultra Pro Plan",
        durations: {
            '7days': { label: "7 Days", items: [ { name: "Gourmet Chikki", imgSrc: "images/items/gourmet-chikki.jpg", quantity: "4" }, { name: "Superfood Biscuits", imgSrc: "images/items/superfood-biscuit.jpg", quantity: "4" }, { name: "Organic Fruit Mix (L)", imgSrc: "images/items/fruit-mix-l-organic.jpg", quantity: "Weekly" }, { name: "Protein Bar", imgSrc: "images/items/protein-bar.jpg", quantity: "2" }, { name: "Detox Drink", imgSrc: "images/items/detox-drink.jpg", quantity: "1" } ], cost: 500 },
            '15days': { label: "15 Days", items: [ { name: "Gourmet Chikki", imgSrc: "images/items/gourmet-chikki.jpg", quantity: "8" }, { name: "Superfood Biscuits", imgSrc: "images/items/superfood-biscuit.jpg", quantity: "8" }, { name: "Organic Fruit Mix (XL)", imgSrc: "images/items/fruit-mix-xl-organic.jpg", quantity: "Bi-Weekly" }, { name: "Protein Bar", imgSrc: "images/items/protein-bar.jpg", quantity: "4" }, { name: "Detox Drink", imgSrc: "images/items/detox-drink.jpg", quantity: "2" } ], cost: 950 },
            '1month': { label: "1 Month", items: [ { name: "Gourmet Chikki", imgSrc: "images/items/gourmet-chikki.jpg", quantity: "16" }, { name: "Superfood Biscuits", imgSrc: "images/items/superfood-biscuit.jpg", quantity: "16" }, { name: "Organic Fruit Mix (XXL)", imgSrc: "images/items/fruit-mix-xxl-organic.jpg", quantity: "Monthly" }, { name: "Protein Bar", imgSrc: "images/items/protein-bar.jpg", quantity: "8" }, { name: "Detox Drink", imgSrc: "images/items/detox-drink.jpg", quantity: "4" }, { name: "Personalized Snack", imgSrc: "images/items/personalized-snack.jpg", quantity: "1" } ], cost: 1800 },
            '3months': { label: "3 Months", items: [ { name: "Gourmet Chikki", imgSrc: "images/items/gourmet-chikki.jpg", quantity: "50" }, { name: "Superfood Biscuits", imgSrc: "images/items/superfood-biscuit.jpg", quantity: "50" }, { name: "Organic Fruit Mix (XXL)", imgSrc: "images/items/fruit-mix-xxl-organic.jpg", quantity: "Quarterly" }, { name: "Protein Bar", imgSrc: "images/items/protein-bar.jpg", quantity: "24" }, { name: "Detox Drink", imgSrc: "images/items/detox-drink.jpg", quantity: "12" }, { name: "Personalized Snack", imgSrc: "images/items/personalized-snack.jpg", quantity: "3" } ], cost: 5000 },
            '1year': { label: "1 Year", items: [ { name: "Gourmet Chikki", imgSrc: "images/items/gourmet-chikki.jpg", quantity: "200" }, { name: "Superfood Biscuits", imgSrc: "images/items/superfood-biscuit.jpg", quantity: "200" }, { name: "Gourmet Fruit Sub", imgSrc: "images/items/fruit-subscription-gourmet.jpg", quantity: "Annual" }, { name: "Protein Bar", imgSrc: "images/items/protein-bar.jpg", quantity: "100" }, { name: "Detox Drink", imgSrc: "images/items/detox-drink.jpg", quantity: "50" }, { name: "Personalized Snack", imgSrc: "images/items/personalized-snack.jpg", quantity: "12" } ], cost: 18000 }
        }
    }
};


// --- DOM Ready ---
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded. Initializing scripts...");

    // AOS Animation Init
    try {
        AOS.init({ duration: 800, once: true, easing: 'ease-out-quad', offset: 50 });
        console.log("✅ AOS Initialized");
    } catch (e) { console.error("❌ AOS failed:", e); }

    // Navigation Scroll Highlight
    const sections = document.querySelectorAll('section[id], footer[id]'); // Include footer
    const navLiAnchors = document.querySelectorAll('.main-nav ul li a');
    const navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height'), 10) || 70;

    if (sections.length && navLiAnchors.length) {
        window.addEventListener('scroll', () => {
            let current = 'home';
            const scrollPos = window.pageYOffset + navHeight * 1.5;

            sections.forEach(section => {
                if (section.offsetTop <= scrollPos && (section.offsetTop + section.offsetHeight) > scrollPos) {
                    current = section.getAttribute('id');
                }
            });
             if (window.pageYOffset < (document.getElementById('home')?.offsetHeight || window.innerHeight) * 0.7) {
                current = 'home';
            }

            navLiAnchors.forEach(a => {
                a.classList.remove('active');
                if (a.getAttribute('href') === `#${current}`) {
                    a.classList.add('active');
                }
            });
        });
    } else { console.warn("Scroll highlight: Sections, nav links, or navHeight not found."); }

    // Mobile Nav Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navUl = document.querySelector('.main-nav ul');
    if (menuToggle && navUl) {
        menuToggle.addEventListener('click', () => navUl.classList.toggle('show-mobile-menu'));
    } else { console.warn("Mobile nav: Toggle or UL not found."); }

    // Star Snack card info buttons
    const foodCards = [
        { buttonSelector: '.food-card:nth-child(1) .add-button', title: 'Nuts Chikki Combo', description: 'Nuts Chikki, Raagi Biscuit, Seasonal Fruits. Protein, fiber, vitamins.'},
        { buttonSelector: '.food-card:nth-child(2) .add-button', title: 'Pumpkin Delight', description: 'Pumpkin Chikki, Badam Biscuit, Seasonal Fruits. Antioxidants, healthy fats.'},
        { buttonSelector: '.food-card:nth-child(3) .add-button', title: 'Peanut Power Pack', description: 'Peanut Chikki, Cashew Biscuit, Seasonal Fruits. Energy, good fats, nutrients.'}
    ];
    foodCards.forEach(card => {
        const button = document.querySelector(card.buttonSelector);
        if (button) { button.addEventListener('click', () => showNutrientInfo(card.title, card.description)); }
        else { console.warn(`Food card button not found: ${card.buttonSelector}`);}
    });

    console.log("✅ All DOMContentLoaded scripts executed.");
});