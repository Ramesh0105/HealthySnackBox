// --- SweetAlert2: Show Subscription QR Code ---
function showSubscriptionQRCode(plan) {
    const subscriptionLink = `https://healthybites.com/subscribe?plan=${plan.toLowerCase()}`;
    const qrCodeApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(subscriptionLink)}`;

    Swal.fire({
        title: `Subscribe to ${plan} Plan!`,
        text: 'Scan the code or click below to get started.',
        imageUrl: qrCodeApiUrl,
        imageWidth: 180,
        imageHeight: 180,
        confirmButtonText: 'Proceed to Subscribe',
        confirmButtonColor: '#f5a623',
        showCancelButton: true,
        cancelButtonText: 'Maybe Later',
        footer: `<a href="${subscriptionLink}" target="_blank" rel="noopener noreferrer" style="color: var(--accent-color);">Go to Subscription Page</a>`
    }).then((result) => {
        if (result.isConfirmed) {
            window.open(subscriptionLink, '_blank');
            console.log(`User wants to subscribe to ${plan}`);
        }
    });
}

// --- SweetAlert2: Show App Download QR Codes ---
function showContactPopup(event) {
    if (event) event.preventDefault();

    const androidAppLink = "https://play.google.com/store/apps/details?id=com.example.healthybites";
    const iosAppLink = "https://apps.apple.com/app/healthy-bites/id1234567890";

    const androidQRUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(androidAppLink)}`;
    const iosQRUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(iosAppLink)}`;

    Swal.fire({
        title: 'Get Our App / Contact',
        html: `
            <p style="margin-bottom: 20px; color: var(--text-light); font-size: 0.95rem;">Scan below to download our mobile app or view contact details in the footer.</p>
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
            <p style="margin-top: 20px;"><a href="#footer" onclick="Swal.close();" style="color: var(--accent-color);">View Contact Details</a></p>
        `,
        confirmButtonText: 'Close',
        confirmButtonColor: '#f5a623',
        width: 'auto',
        padding: '1.5em'
    });
}

// --- SweetAlert2: Show Nutrient Info Popup ---
function showNutrientInfo(title, description) {
    Swal.fire({
        title: title,
        text: description,
        icon: 'info',
        confirmButtonText: 'Close',
        confirmButtonColor: '#f5a623',
    });
}

// --- DOM Ready ---
document.addEventListener('DOMContentLoaded', () => {
    // AOS Animation Init
    try {
        AOS.init({
            duration: 800,
            once: true,
            easing: 'ease-out-quad',
            offset: 50
        });
        console.log("✅ AOS Initialized");
    } catch (e) {
        console.error("❌ AOS failed:", e);
    }

    // Navigation Scroll Highlight
    const sections = document.querySelectorAll('section[id]');
    const navLiAnchors = document.querySelectorAll('.main-nav ul li a');
    const navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height'), 10) || 70;

    if (sections.length && navLiAnchors.length) {
        window.addEventListener('scroll', () => {
            let current = 'home';
            const scrollPos = window.pageYOffset + navHeight * 1.5;

            sections.forEach(section => {
                if (scrollPos >= section.offsetTop) {
                    current = section.getAttribute('id');
                }
            });

            if (window.pageYOffset < window.innerHeight * 0.3) current = 'home';

            navLiAnchors.forEach(a => {
                a.classList.remove('active');
                if (a.getAttribute('href') === `#${current}`) {
                    a.classList.add('active');
                }
            });
        });
    } else {
        console.warn("No sections/nav links found for scroll highlight");
    }

    // Mobile Nav Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navUl = document.querySelector('.main-nav ul');

    if (menuToggle && navUl) {
        menuToggle.addEventListener('click', () => {
            navUl.classList.toggle('show-mobile-menu'); // Add CSS for this
        });
    }

    // Swiper Packages Slider
    const packageSliderElement = document.querySelector('.packages-slider');
    const nextArrow = document.querySelector('.package-arrow-next');
    const prevArrow = document.querySelector('.package-arrow-prev');

    if (packageSliderElement && typeof Swiper !== 'undefined') {
        const packagesSwiper = new Swiper('.packages-slider', {
            direction: 'horizontal',
            loop: true,
            slidesPerView: 1,
            spaceBetween: 30,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            },
            speed: 800,
            breakpoints: {
                640: { slidesPerView: 2, spaceBetween: 40 },
                1024: { slidesPerView: 3, spaceBetween: 50 }
            },
            navigation: {
                nextEl: '.package-arrow-next',
                prevEl: '.package-arrow-prev'
            },
            observer: true,
            observeParents: true,
        });

        console.log("✅ Swiper Packages Slider Initialized");
    } else {
        console.error("❌ Slider not initialized: Swiper or container missing");
    }

    // Attach event listeners to "+" buttons
    const foodCards = [
        {
            buttonSelector: '.food-card:nth-child(1) .add-button',
            title: 'Nuts Chikki Combo',
            description: 'A wholesome mix of Nuts Chikki, Raagi Biscuit, and Seasonal Fruits. Packed with protein, fiber, and essential vitamins for a healthy snack.'
        },
        {
            buttonSelector: '.food-card:nth-child(2) .add-button',
            title: 'Pumpkin Delight',
            description: 'Enjoy Pumpkin Chikki, Badam Biscuit, and Seasonal Fruits. A perfect blend of antioxidants, healthy fats, and natural sweetness.'
        },
        {
            buttonSelector: '.food-card:nth-child(3) .add-button',
            title: 'Peanut Power Pack',
            description: 'Includes Peanut Chikki, Cashew Biscuit, and Seasonal Fruits. Rich in energy, good fats, and nutrients to fuel your day.'
        }
    ];

    foodCards.forEach(card => {
        const button = document.querySelector(card.buttonSelector);
        if (button) {
            button.addEventListener('click', () => {
                showNutrientInfo(card.title, card.description);
            });
        }
    });

    console.log("✅ DOM fully loaded & scripts executed");
});
