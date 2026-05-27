// ================= NAVBAR FUNCTIONALITY =================

// Get elements
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");

// Toggle mobile menu
hamburger.addEventListener("click", function () {
    mobileMenu.classList.toggle("active");

    // Optional: change icon (bars ↔ close)
    hamburger.classList.toggle("active");
});

// Close menu when clicking outside
document.addEventListener("click", function (event) {
    const isClickInsideMenu = mobileMenu.contains(event.target);
    const isClickOnHamburger = hamburger.contains(event.target);

    if (!isClickInsideMenu && !isClickOnHamburger) {
        mobileMenu.classList.remove("active");
        hamburger.classList.remove("active");
    }
});

// Close menu when clicking a link (mobile UX improvement)
const mobileLinks = document.querySelectorAll(".mobile-menu a");

mobileLinks.forEach(link => {
    link.addEventListener("click", () => {
        mobileMenu.classList.remove("active");
        hamburger.classList.remove("active");
    });
});

// Prevent body scroll when menu is open (professional UX)
hamburger.addEventListener("click", function () {
    if (mobileMenu.classList.contains("active")) {
        document.body.style.overflow = "hidden";
    } else {
        document.body.style.overflow = "auto";
    }
});

// Also reset scroll when closing via outside click
document.addEventListener("click", function (event) {
    if (!mobileMenu.contains(event.target) && !hamburger.contains(event.target)) {
        document.body.style.overflow = "auto";
    }
});




























// ================= HERO ANIMATION CONTROLLER =================
document.addEventListener("DOMContentLoaded", function () {

    const heroTitle = document.querySelector(".hero-title");
    const heroSubtext = document.querySelector(".hero-subtext");
    const heroButtons = document.querySelector(".hero-buttons");
    const companyName = document.querySelector(".company-name");
    const heroImage = document.querySelector(".hero-bg img");

    // ================= INITIAL STATE =================
    companyName.style.opacity = "0";
    companyName.style.transform = "translateY(-10px)";

    heroTitle.style.opacity = "0";
    heroTitle.style.transform = "translateY(20px)";

    heroSubtext.style.opacity = "0";
    heroSubtext.style.transform = "translateY(20px)";

    heroButtons.style.opacity = "0";
    heroButtons.style.transform = "translateY(20px)";

    // ================= ANIMATION SEQUENCE =================
    setTimeout(() => {
        companyName.style.transition = "all 0.6s ease";
        companyName.style.opacity = "1";
        companyName.style.transform = "translateY(0)";
    }, 200);

    setTimeout(() => {
        heroTitle.style.transition = "all 0.8s ease";
        heroTitle.style.opacity = "1";
        heroTitle.style.transform = "translateY(0)";
    }, 500);

    setTimeout(() => {
        heroSubtext.style.transition = "all 0.8s ease";
        heroSubtext.style.opacity = "1";
        heroSubtext.style.transform = "translateY(0)";
    }, 800);

    setTimeout(() => {
        heroButtons.style.transition = "all 0.8s ease";
        heroButtons.style.opacity = "1";
        heroButtons.style.transform = "translateY(0)";
    }, 1100);

    // ================= SUBTLE BACKGROUND ZOOM EFFECT =================
    let scale = 1.05;
    setInterval(() => {
        scale = scale === 1.05 ? 1.08 : 1.05;
        heroImage.style.transition = "transform 6s ease-in-out";
        heroImage.style.transform = `scale(${scale})`;
    }, 6000);

});

// ================= SCROLL RE-ANIMATION (OPTIONAL PREMIUM FEEL) =================
window.addEventListener("scroll", function () {

    const heroSection = document.querySelector(".hero-section");
    const rect = heroSection.getBoundingClientRect();

    if (rect.top < window.innerHeight && rect.bottom > 0) {
        heroSection.classList.add("active");
    }
});

























// ================= PRODUCT CATEGORIES ANIMATION =================
document.addEventListener("DOMContentLoaded", function () {

    const cards = document.querySelectorAll(".category-card");

    // ================= INITIAL STATE =================
    cards.forEach(card => {
        card.style.opacity = "0";
        card.style.transform = "translateY(30px)";
    });

    // ================= SCROLL REVEAL =================
    const revealOnScroll = () => {
        const triggerBottom = window.innerHeight * 0.85;

        cards.forEach((card, index) => {
            const cardTop = card.getBoundingClientRect().top;

            if (cardTop < triggerBottom) {
                setTimeout(() => {
                    card.style.transition = "all 0.6s ease";
                    card.style.opacity = "1";
                    card.style.transform = "translateY(0)";
                }, index * 120); // stagger effect
            }
        });
    };

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll(); // run on load

});

// ================= SMOOTH SCROLL FOR BUTTONS =================
document.querySelectorAll(".category-btn").forEach(btn => {
    btn.addEventListener("click", function (e) {
        e.preventDefault();

        const target = document.querySelector("#products");

        if (target) {
            target.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});


























// ================= ABOUT SECTION SCROLL ANIMATION =================
document.addEventListener("DOMContentLoaded", function () {

    const aboutSection = document.querySelector(".about-company");
    const aboutImage = document.querySelector(".about-image");
    const aboutContent = document.querySelector(".about-content");
    const infoBoxes = document.querySelectorAll(".info-box");

    // ================= INITIAL STATE =================
    aboutImage.style.opacity = "0";
    aboutImage.style.transform = "translateX(-60px)";

    aboutContent.style.opacity = "0";
    aboutContent.style.transform = "translateX(60px)";

    infoBoxes.forEach(box => {
        box.style.opacity = "0";
        box.style.transform = "translateY(30px)";
    });

    // ================= SCROLL OBSERVER =================
    const observer = new IntersectionObserver((entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                // IMAGE ANIMATION
                aboutImage.style.transition = "all 0.8s ease";
                aboutImage.style.opacity = "1";
                aboutImage.style.transform = "translateX(0)";

                // CONTENT ANIMATION
                setTimeout(() => {
                    aboutContent.style.transition = "all 0.8s ease";
                    aboutContent.style.opacity = "1";
                    aboutContent.style.transform = "translateX(0)";
                }, 200);

                // INFO BOXES STAGGER ANIMATION
                infoBoxes.forEach((box, index) => {
                    setTimeout(() => {
                        box.style.transition = "all 0.5s ease";
                        box.style.opacity = "1";
                        box.style.transform = "translateY(0)";
                    }, 400 + index * 120);
                });

                observer.unobserve(aboutSection);
            }
        });

    }, {
        threshold: 0.2
    });

    observer.observe(aboutSection);
});