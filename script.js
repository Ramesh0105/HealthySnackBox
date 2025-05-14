// --- SweetAlert2: Show App Download QR Codes with Fixed Footer Redirect ---
function showContactPopup(event) {
    if (event) event.preventDefault();

    const androidAppLink = "https://play.google.com/store/apps/details?id=com.example.healthybites"; // Replace with your actual link
    const iosAppLink = "https://apps.apple.com/app/healthy-bites/id1234567890"; // Replace with your actual link

    const androidQRUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(androidAppLink)}`;
    const iosQRUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(iosAppLink)}`;

    // Create a variable to store the popup instance
    const popup = Swal.fire({
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
            <p style="margin-top: 20px;">
                <button id="contactLinkInPopup" style="color: var(--accent-color); background: none; border: none; cursor: pointer; text-decoration: underline; font-size: 1rem; font-family: inherit; padding: 0;">
                    View Contact Details
                </button>
            </p>
        `,
        confirmButtonText: 'Close',
        confirmButtonColor: '#f5a623', // Accent color
        width: 'auto',
        padding: '1.5em',
        didOpen: () => {
            console.log("Popup opened");
            // Add click handler to the contact button
            document.getElementById('contactLinkInPopup').onclick = function() {
                console.log("Contact link clicked");
                // Close the popup
                Swal.close();
                
                // Define a function to scroll to the footer
                function scrollToFooter() {
                    const contactUsSection = document.getElementById('ContactUs');
                    console.log("Scrolling to section:", contactUsSection);
                    
                    if (contactUsSection) {
                        // Get nav height for offset
                        const navHeight = document.querySelector('.main-nav')?.offsetHeight || 0;
                        const scrollToPosition = contactUsSection.offsetTop - navHeight;
                        
                        console.log(`Scrolling to position: ${scrollToPosition}`);
                        
                        window.scrollTo({
                            top: scrollToPosition,
                            behavior: 'smooth'
                        });
                    }
                }
                
                // Wait a bit for the popup to close, then scroll
                setTimeout(scrollToFooter, 200);
            };
        }
    });
}

// --- SweetAlert2: Show Nutrient Info Popup (Fixed for HTML content) ---
function showNutrientInfo(title, description) {
    Swal.fire({
        title: title,
        html: description, // Changed from 'text' to 'html' to render HTML content
        confirmButtonText: 'Close',
        confirmButtonColor: '#f5a623'
    });
}

// --- Direct function to scroll to footer ---
function scrollToFooter() {
    const contactUsSection = document.getElementById('ContactUs');
    if (contactUsSection) {
        const navHeight = document.querySelector('.main-nav')?.offsetHeight || 0;
        window.scrollTo({
            top: contactUsSection.offsetTop - navHeight,
            behavior: 'smooth'
        });
    }
}

// --- DOM Ready ---
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded. Initializing scripts...");

    // AOS Animation Init
    try {
        AOS.init({ duration: 800, once: true, easing: 'ease-out-quad', offset: 50 });
        console.log("✅ AOS Initialized");
    } catch (e) { console.error("❌ AOS failed:", e); }

    // Navigation Scroll Highlight
    const sections = document.querySelectorAll('header[id], section[id], footer[id]'); // Changed ContactUs[id] to footer[id]
    const navLiAnchors = document.querySelectorAll('.main-nav ul li a');
    const navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height'), 10) || 70;

    if (sections.length > 0 && navLiAnchors.length > 0) {
        const updateActiveLink = () => {
            const scrollY = window.pageYOffset;
            const viewportHeight = window.innerHeight;
            const documentHeight = document.body.offsetHeight;

            let currentSectionId = '';

            // Priority 1: Footer if scrolled to the very bottom
            // Check if the bottom of the viewport is at or very near the bottom of the document
            if ((scrollY + viewportHeight) >= documentHeight - 30) { // 30px buffer from actual bottom
                currentSectionId = 'ContactUs';
            }
            // Priority 2: Home if at the very top
            else if (scrollY < 50) { // If scrolled less than 50px from the top
                currentSectionId = 'home';
            }
            // Priority 3: Other sections
            else {
                // Iterate from the bottom-most section upwards
                for (let i = sections.length - 1; i >= 0; i--) {
                    const section = sections[i];
                    const sectionTop = section.offsetTop;
                    // A section is considered active if its top has scrolled past a point
                    // slightly below the fixed navigation bar.
                    // (navHeight + a small buffer, e.g., 10px)
                    const activationPoint = scrollY + navHeight + 10;

                    if (sectionTop <= activationPoint) {
                        currentSectionId = section.getAttribute('id');
                        break; // Found the current section
                    }
                }
                // Fallback if no section was determined by the loop (e.g., in a gap)
                // and we are not at the very top (which is handled by Priority 2)
                if (!currentSectionId && document.getElementById('home')) {
                   currentSectionId = 'home'; // Default to home if in an unknown state
                }
            }

            // Apply 'active' class
            navLiAnchors.forEach(a => {
                a.classList.remove('active');
                if (a.getAttribute('href') === `#${currentSectionId}`) {
                    a.classList.add('active');
                }
            });
        };

        window.addEventListener('scroll', updateActiveLink);
        // Trigger once on load to set initial state
        updateActiveLink();

    } else {
        console.warn("Scroll highlight: Target sections or navigation links not found.");
    }

    // Mobile Nav Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navUl = document.querySelector('.main-nav ul');
    if (menuToggle && navUl) {
        menuToggle.addEventListener('click', () => navUl.classList.toggle('show-mobile-menu'));
    } else { console.warn("Mobile nav: Toggle or UL not found."); }

    // Mobile Nav Link Activation
    navLiAnchors.forEach(anchor => {
        anchor.addEventListener('click', (event) => {
            // Prevent default anchor behavior
            event.preventDefault();

            // Get the target section id from the href
            const targetId = anchor.getAttribute('href').substring(1);

            // Find the target section and scroll to it
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                const navHeight = document.querySelector('.main-nav')?.offsetHeight || 0;
                const scrollToPosition = targetSection.offsetTop - navHeight;

                window.scrollTo({
                    top: scrollToPosition,
                    behavior: 'smooth'
                });
            }

            // Remove active class from all anchors
            navLiAnchors.forEach(a => a.classList.remove('active'));

            // Add active class to the clicked anchor
            anchor.classList.add('active');

            // Close the mobile menu after clicking (optional)
            if (navUl.classList.contains('show-mobile-menu')) {
                navUl.classList.remove('show-mobile-menu');
            }
        });
    });

    // Star Snack card info buttons
    const foodCards = [
        {
            buttonSelector: '.food-card:nth-child(1) .add-button',
            title : 'Nuts Chikki Combo',
            description: `
                <ul style="padding-left: 1.2rem; line-height: 1.6; margin: 0;">
                    <li><strong>Nuts Chikki</strong> – Rich in protein and healthy fats</li>
                    <li><strong>Ragi Biscuits</strong> – Packed with fiber and minerals</li>
                    <li><strong>Seasonal Fruits</strong> – Full of vitamins and antioxidants</li>
                </ul>
                <p style="margin-top: 1rem;"><strong>Nutritional Highlights:</strong><br>
                Protein, fiber, vitamins</p>
            `
        },
        {
            buttonSelector: '.food-card:nth-child(2) .add-button',
            title: 'Pumpkin Chikki Combo',
            description: `
                <ul style="padding-left: 1.2rem; line-height: 1.6; margin: 0;">
                    <li><strong>Pumpkin Chikki</strong> – Packed with antioxidants and healthy fats</li>
                    <li><strong>Badam Biscuits</strong> – Nut-rich and heart-healthy</li>
                    <li><strong>Seasonal Fruits</strong> – Natural source of vitamins</li>
                </ul>
                <p style="margin-top: 1rem;"><strong>Nutritional Highlights:</strong><br>
                Antioxidants, healthy fats</p>
            `
        },
        {
            buttonSelector: '.food-card:nth-child(3) .add-button',
            title: 'Peanut Chikki Combo',
            description: `
                <ul style="padding-left: 1.2rem; line-height: 1.6; margin: 0;">
                    <li><strong>Peanut Chikki</strong> – Great source of energy and good fats</li>
                    <li><strong>Cashew Biscuits</strong> – Rich in healthy fats and nutrients</li>
                    <li><strong>Seasonal Fruits</strong> – Full of essential vitamins and fiber</li>
                </ul>
                <p style="margin-top: 1rem;"><strong>Nutritional Highlights:</strong><br>
                Energy, good fats, nutrients</p>
            `
        }
    ];

    foodCards.forEach(card => {
        const button = document.querySelector(card.buttonSelector);
        if (button) { button.addEventListener('click', () => showNutrientInfo(card.title, card.description)); }
        else { console.warn(`Food card button not found: ${card.buttonSelector}`);}
    });

    // Revert onclick attributes in HTML
    document.querySelectorAll('.download-button, .floating-download-button').forEach(button => {
        button.setAttribute('onclick', 'showContactPopup(event)');
    });

    // Also add direct handler to any popup contact links that might be present in the HTML
    document.querySelectorAll('[id="contactLinkInPopup"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            Swal.close();
            setTimeout(scrollToFooter, 200);
        });
    });

    console.log("✅ All DOMContentLoaded scripts executed.");
});
