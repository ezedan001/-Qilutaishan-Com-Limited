// <!-- CLEAN INTERACTIVE TRANSITION ENGINE -->

function toggleTranslator() {
    const menu = document.getElementById('langMenu');
    const btn = document.getElementById('langBtn');
    menu.classList.toggle('show');
    btn.classList.toggle('active');
}

// Structural Event Listener to dismiss dropdown immediately when clicking out
window.addEventListener('click', function (e) {
    const dropdown = document.querySelector('.translator-dropdown');
    if (!dropdown.contains(e.target)) {
        document.getElementById('langMenu').classList.remove('show');
        document.getElementById('langBtn').classList.remove('active');
    }
});
































// CLEAN PANEL INTERACTION LOGIC/////

window.addEventListener('scroll', function () {
    // Watches if the page has been scrolled down past the 40px top bar
    if (window.scrollY > 40) {
        document.body.classList.add('is-scrolled');
    } else {
        document.body.classList.remove('is-scrolled');
    }
});

// Your existing mobile panel drawer script stays here...
function handleMobilePanel(openState) {
    const overlay = document.getElementById('panelOverlay');
    const drawer = document.getElementById('mobileDrawerPanel');
    if (openState) {
        overlay.classList.add('active');
        drawer.classList.add('open');
    } else {
        overlay.classList.remove('active');
        drawer.classList.remove('open');
    }
}







































/* ================= ABOUT SECTION ANIMATION ================= */

document.addEventListener("DOMContentLoaded", () => {
    // Select all the milestone statistic number elements
    const statNumbers = document.querySelectorAll(".stat-number");

    // Options for the scroll detector (trigger when 20% of the card is visible)
    const observerOptions = {
        root: null,
        threshold: 0.2,
    };

    // The function that runs the dynamic counting animation
    const animateCount = (element) => {
        const rawTarget = element.innerText;
        // Clean the text to extract just the pure number (e.g., "5000+" becomes 5000, "100%" becomes 100)
        const targetNumber = parseInt(rawTarget.replace(/[^0-9]/g, ""), 10);
        // Keep track of the original suffix (like "+" or "%") to re-attach it later
        const suffix = rawTarget.replace(/[0-9]/g, "");

        let startNumber = 0;
        // Adjust duration (in milliseconds) - 2000ms means the count lasts exactly 2 seconds
        const duration = 2000;
        const startTime = performance.now();

        const updateNumber = (currentTime) => {
            const elapsedTime = currentTime - startTime;
            if (elapsedTime < duration) {
                // Smooth easing progress calculation
                const progress = elapsedTime / duration;
                const currentCount = Math.floor(progress * targetNumber);

                element.innerText = currentCount + suffix;
                requestAnimationFrame(updateNumber);
            } else {
                // Ensure it ends precisely on the exact target number
                element.innerText = rawTarget;
            }
        };

        requestAnimationFrame(updateNumber);
    };

    // Use IntersectionObserver to look for when the stats grid scrolls onto the screen
    const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetElement = entry.target;
                // Run the animation
                animateCount(targetElement);
                // Stop observing so the counter only animates once per page load
                observer.unobserve(targetElement);
            }
        });
    }, observerOptions);

    // Attach the scroll observer to each number card
    statNumbers.forEach(number => statsObserver.observe(number));
});































//    <!-- ================= PRODUCTS SECTION ================= -->
document.addEventListener("DOMContentLoaded", () => {
    // 1. SELECT PRODUCT ELEMENTS
    const productCards = document.querySelectorAll(".product-showcase-card");
    const productsGrid = document.querySelector(".products-display-grid");

    // 2. MAKE ENTIRE CARD CLICKABLE
    // Enhances user experience so clicking anywhere on the card triggers the action
    productCards.forEach(card => {
        card.addEventListener("click", function () {
            // Finds the exact title text to use for dynamic routing or modal behaviors
            const productTitle = this.querySelector(".product-card-title").textContent;

            // Example Action: Smooth scroll to a contact/order form or link to a sub-page
            // For now, it anchors smoothly down to your placeholder or global handler
            const targetSection = document.querySelector("#all-products");
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: "smooth" });
            }

            console.log(`Product selected: ${productTitle}`);
        });
    });

    // 3. SCROLL-REVEAL CASCADE ANIMATION
    // Configures the structural point when the element triggers (15% visibility)
    const revealOptions = {
        root: null,
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealProducts = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Selects all individual cards inside the current intersecting container
                const cards = entry.target.querySelectorAll(".product-showcase-card");

                // Loops through each card with an increasing delay to create a premium stagger cascade effect
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = "1";
                        card.style.transform = "translateY(0)";
                    }, index * 80); // 80ms structural separation step between cards
                });

                // Disconnect container after running once to protect system resources
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    // 4. PREPARE INITIAL CSS INJECTION FOR ANIMATION CORE
    // Sets up properties directly to prevent any layout shifts or flashes before JS mounts
    if (productsGrid) {
        productCards.forEach(card => {
            card.style.opacity = "0";
            card.style.transform = "translateY(30px)";
            card.style.transition = "opacity 0.6s ease, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease";
        });

        // Initialize monitoring on the grid container
        revealProducts.observe(productsGrid);
    }
});






















// <!-- ================= BRANDS SECTION ================= -->

document.addEventListener("DOMContentLoaded", () => {
    const sliderTrack = document.querySelector(".brands-slider-track");
    const originalLogos = sliderTrack ? sliderTrack.querySelectorAll(".brand-logo-card:not([aria-hidden='true'])") : [];

    if (sliderTrack && originalLogos.length > 0) {
        /**
         * DYNAMIC LAYOUT STABILIZER
         * Calculates precise dimensions to guarantee a seamless infinite scroll loop.
         */
        const adjustSliderTrack = () => {
            const firstLogo = originalLogos[0];
            const logoWidth = firstLogo.getBoundingClientRect().width;

            // Get the live CSS gap pixel value parsed from your layout stylesheet
            const trackComputedStyle = window.getComputedStyle(sliderTrack);
            const gapValue = parseFloat(trackComputedStyle.gap) || 0;

            // Calculate total distance of exactly one full logo cycle
            const singleCycleWidth = (logoWidth + gapValue) * originalLogos.length;

            // Inject the precise custom negative offset variable straight into your CSS runtime
            // This forces the keyframe loop to shift exactly where the duplicate set begins
            sliderTrack.style.setProperty("--scroll-distance", `-${singleCycleWidth}px`);
        };

        // Run calculations immediately when DOM finishes mounting
        adjustSliderTrack();

        // Recalculate dynamically if the user resizes their desktop monitor or flips orientation
        window.addEventListener("resize", adjustSliderTrack);
    }
});



















//  <!-- 8. WHY CHOOSE US SECTION CONTAINER -->
document.addEventListener("DOMContentLoaded", () => {
    // Select all counter numbers within the Why Choose Us section
    const counterNumbers = document.querySelectorAll("#why-choose-us .counter-number");

    // Animation configuration parameters
    const observerOptions = {
        root: null, // Tracks visibility within the browser viewport
        threshold: 0.2 // Triggers when 20% of the counter card is visible
    };

    /**
     * CORE COUNT-UP ENGINE
     * Smoothly increments integers using requestAnimationFrame for optimal 60fps rendering.
     */
    const startCounterAnimation = (element) => {
        // Skip text-based strings like "24/7" to keep them completely legible
        if (element.classList.contains("string-counter")) {
            return;
        }

        const rawTarget = element.getAttribute("data-target");
        const targetValue = parseInt(rawTarget, 10);

        // Safety check if data-target attribute is missing or malformed
        if (isNaN(targetValue)) return;

        // Check if your HTML included an inline span suffix like "+"
        const suffixSpan = element.querySelector("span");
        const suffixText = suffixSpan ? suffixSpan.outerHTML : "";

        const duration = 2000; // Complete animation window duration in milliseconds
        const startTime = performance.now();

        const updateCount = (currentTime) => {
            const elapsed = currentTime - startTime;

            if (elapsed < duration) {
                // Progress percentage variable (linear 0 to 1)
                const progress = elapsed / duration;

                // Calculate current structural value to print
                const currentValue = Math.floor(progress * targetValue);

                // Format display text alongside any existing span elements
                element.innerHTML = currentValue + suffixText;

                // Call next frame smoothly
                requestAnimationFrame(updateCount);
            } else {
                // Ensure the final layout stops precisely on your target value
                element.innerHTML = targetValue + suffixText;
            }
        };

        requestAnimationFrame(updateCount);
    };

    /**
     * INTERSECTION VIEWPORT SCROLL MONITOR
     */
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetCardNum = entry.target;

                // Trigger animation engine sequence
                startCounterAnimation(targetCardNum);

                // Unobserve card frame once initialized so it only triggers once per scroll load
                observer.unobserve(targetCardNum);
            }
        });
    }, observerOptions);

    // Bind observation listeners to every matching data card item array node
    counterNumbers.forEach(number => counterObserver.observe(number));
});
























/* --- 10. LOCATIONS SECTION CSS --- */
document.addEventListener("DOMContentLoaded", () => {
    // 1. SELECT TARGET ELEMENT MATRICES
    const locationCards = document.querySelectorAll(".office-branch-card");
    const mapMarkers = {
        "Sagamu Office": document.querySelector(".marker-sagamu"),
        "Enugu Branch": document.querySelector(".marker-enugu")
    };
    const locationsGrid = document.querySelector(".locations-grid-layout");

    // 2. INTERACTIVE MAP HIGHLIGHT LINKAGE
    // Connects physical branch card hovers directly to the central map tracking pins
    locationCards.forEach(card => {
        const branchName = card.querySelector(".branch-name").textContent.trim();
        const correspondingMarker = mapMarkers[branchName];

        if (correspondingMarker) {
            // Trigger enhanced pulsing when mouse intersects the branch info card
            card.addEventListener("mouseenter", () => {
                correspondingMarker.style.transform = "scale(1.8)";
                correspondingMarker.style.backgroundColor = "#FFFFFF"; // Shifts to high-contrast white
                correspondingMarker.style.boxShadow = "0 0 15px #D4AF37";
            });

            // Revert smoothly to natural CSS state when mouse departs card frame
            card.addEventListener("mouseleave", () => {
                correspondingMarker.style.transform = "scale(1)";
                correspondingMarker.style.backgroundColor = ""; // Inherits base theme CSS variables
                correspondingMarker.style.boxShadow = "";
            });
        }
    });

    // 3. ENHANCED GEOLOCATION REDIRECT HANDLER (OPTIONAL SAFETY NET)
    // Ensures fallback handling for your map deep links if raw HTML anchors ever alter string states
    const mapButtons = document.querySelectorAll(".btn-location-map");
    mapButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            const currentHref = button.getAttribute("href");
            // Detect placeholder structures and prevent dead page breaks
            if (currentHref.includes("googleusercontent.com") || currentHref === "#" || currentHref === "") {
                e.preventDefault();
                const parentBranch = button.closest(".office-branch-card").querySelector(".branch-name").textContent;
                console.warn(`Map Routing Pending: Direct official Google Maps URL required for ${parentBranch}.`);
            }
        });
    });

    // 4. SMOOTH SCROLL-REVEAL ARCHITECTURE
    const revealOptions = {
        root: null,
        threshold: 0.15
    };

    const revealLocations = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Cascades layout layers elegantly onto the active viewport frame
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    // Mount initial runtime visual baselines for the animation handler
    if (locationsGrid) {
        locationsGrid.style.opacity = "0";
        locationsGrid.style.transform = "translateY(40px)";
        locationsGrid.style.transition = "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)";

        revealLocations.observe(locationsGrid);
    }
});




























// /* --- 12. PREMIUM DARK TESTIMONIALS --- */
document.addEventListener("DOMContentLoaded", () => {
    // 1. DOM ELEMENT SELECTORS
    const sliderTrack = document.querySelector("#client-reviews .testimonials-slider-track");
    const slides = document.querySelectorAll("#client-reviews .testimonial-slide");
    const prevBtn = document.querySelector("#client-reviews .btn-prev");
    const nextBtn = document.querySelector("#client-reviews .btn-next");
    const dots = document.querySelectorAll("#client-reviews .nav-dot");

    let currentIndex = 0;
    let autoplayTimer = null;
    const AUTOPLAY_DELAY = 6000; // Time per slide in milliseconds (6 seconds)

    // 2. CORE CAROUSEL ROTATION ENGINE
    const updateCarouselState = (targetIndex) => {
        // Remove active flags from current slide and dot tracking nodes
        slides[currentIndex].classList.remove("active");
        dots[currentIndex].classList.remove("active");

        // Establish the new indexed position boundary
        currentIndex = targetIndex;

        // Add active flags to the newly targeted slide and dot tracking nodes
        slides[currentIndex].classList.add("active");
        dots[currentIndex].classList.add("active");
    };

    const navigateNext = () => {
        // Loop back to the first slide if clicking next on the final slide
        const nextIndex = (currentIndex + 1) % slides.length;
        updateCarouselState(nextIndex);
    };

    const navigatePrev = () => {
        // Loop around to the last slide if clicking previous on the first slide
        const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateCarouselState(prevIndex);
    };

    // 3. EVENT LISTENER ATTACHMENTS
    nextBtn.addEventListener("click", () => {
        navigateNext();
        resetAutoplayCycle(); // Reset timer on manual user interaction
    });

    prevBtn.addEventListener("click", () => {
        navigatePrev();
        resetAutoplayCycle(); // Reset timer on manual user interaction
    });

    // Handle linear progression indicator dot clicks
    dots.forEach((dot) => {
        dot.addEventListener("click", (e) => {
            const targetSlideIndex = parseInt(e.target.getAttribute("data-slide"), 10);
            if (targetSlideIndex !== currentIndex) {
                updateCarouselState(targetSlideIndex);
                resetAutoplayCycle();
            }
        });
    });

    // 4. SMART AUTOPLAY AND INTERACTION MANAGEMENT
    const startAutoplayCycle = () => {
        if (!autoplayTimer) {
            autoplayTimer = setInterval(navigateNext, AUTOPLAY_DELAY);
        }
    };

    const stopAutoplayCycle = () => {
        if (autoplayTimer) {
            clearInterval(autoplayTimer);
            autoplayTimer = null;
        }
    };

    const resetAutoplayCycle = () => {
        stopAutoplayCycle();
        startAutoplayCycle();
    };

    // Pause slideshow on hover to let users read reviews comfortably
    if (sliderTrack) {
        sliderTrack.addEventListener("mouseenter", stopAutoplayCycle);
        sliderTrack.addEventListener("mouseleave", startAutoplayCycle);
    }

    // 5. INITIALIZE TRACKING SYSTEM
    startAutoplayCycle();
});




















/**
 * QILUTAISHAN MANUFACTURING CO. LTD. - FOOTER ENGINE
 * Coordinates high-performance scroll micro-interactions and dynamic data states for the footer system.
//  */

document.addEventListener("DOMContentLoaded", () => {
    // 1. CHRONOS DATE ENGINE - AUTOMATIC YEAR SYNCHRONIZATION
    // Automatically keeps the copyright year perfectly accurate without manual hardcoding
    const copyrightElement = document.querySelector(".main-footer-section .copyright-text");
    if (copyrightElement) {
        const currentYear = new Date().getFullYear();
        copyrightElement.innerHTML = `&copy; ${currentYear} Qilutaishan Manufacturing Co. Ltd. All Rights Reserved.`;
    }

    // 2. PREMIUM SEQUENTIAL SCROLL REVEAL MECHANIC
    // Uses IntersectionObserver to trigger high-end micro-animations as columns enter the viewport
    const footerColumns = document.querySelectorAll(".main-footer-section .footer-column-block");

    const revealOptions = {
        root: null,         // Tracks boundaries relative to the device viewport
        threshold: 0.1,     // Fires as soon as 10% of the column frame drops into view
        rootMargin: "0px 0px -20px 0px"
    };

    const footerObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // target column becomes visible
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";

                // Once animated, cut tracking loops to optimize CPU load
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    // Mount initial hidden visual CSS benchmarks before observation loops run
    footerColumns.forEach((column, index) => {
        column.style.opacity = "0";
        column.style.transform = "translateY(30px)";
        // Applies a professional staggered mechanical delay loop across each of the 4 columns
        column.style.transition = `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.12}s, 
                                   transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.12}s`;

        footerObserver.observe(column);
    });

    // 3. SECURE PREVENTATIVE LINK HANDLER (DEVELOPMENT SAFEGUARD)
    // Silently catches and handles empty placeholder anchor routing arrays inside navigation matrix columns
    const footerAnchors = document.querySelectorAll(".main-footer-section a[href='#']");
    footerAnchors.forEach(anchor => {
        anchor.addEventListener("click", (e) => {
            e.preventDefault();
            // Smoothly returns users to the absolute header apex rather than causing harsh jumping 
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    });
});


































