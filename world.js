/* =========================================================
   AKSH — THE WORLD
   world.js
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const body = document.body;
    const nav = document.getElementById("world-nav");

    const menuButton = document.getElementById("menu-button");
    const mobileMenu = document.getElementById("mobile-menu");
    const mobileClose = document.getElementById("mobile-close");

    const yearElement = document.getElementById("world-year");


    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }


    /* =====================================================
       NAVIGATION — SCROLL EFFECT
    ===================================================== */

    function updateNavigation() {

        if (!nav) return;

        if (window.scrollY > 40) {
            nav.classList.add("scrolled");
        } else {
            nav.classList.remove("scrolled");
        }

    }

    updateNavigation();

    window.addEventListener(
        "scroll",
        updateNavigation,
        { passive: true }
    );


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    function openMenu() {

        if (!mobileMenu || !menuButton) return;

        mobileMenu.classList.add("open");

        body.classList.add("menu-open");

        menuButton.setAttribute(
            "aria-expanded",
            "true"
        );

        mobileMenu.setAttribute(
            "aria-hidden",
            "false"
        );

    }


    function closeMenu() {

        if (!mobileMenu || !menuButton) return;

        mobileMenu.classList.remove("open");

        body.classList.remove("menu-open");

        menuButton.setAttribute(
            "aria-expanded",
            "false"
        );

        mobileMenu.setAttribute(
            "aria-hidden",
            "true"
        );

    }


    if (menuButton) {

        menuButton.addEventListener(
            "click",
            openMenu
        );

    }


    if (mobileClose) {

        mobileClose.addEventListener(
            "click",
            closeMenu
        );

    }


    /* =====================================================
       CLOSE MOBILE MENU WHEN LINK IS CLICKED
    ===================================================== */

    if (mobileMenu) {

        const mobileLinks =
            mobileMenu.querySelectorAll("a");

        mobileLinks.forEach((link) => {

            link.addEventListener(
                "click",
                closeMenu
            );

        });

    }


    /* =====================================================
       ESCAPE KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (event.key === "Escape") {
                closeMenu();
            }

        }
    );


    /* =====================================================
       CLOSE MENU WHEN CLICKING OUTSIDE CONTENT
    ===================================================== */

    if (mobileMenu) {

        mobileMenu.addEventListener(
            "click",
            (event) => {

                if (event.target === mobileMenu) {
                    closeMenu();
                }

            }
        );

    }


    /* =====================================================
       SMOOTH INTERNAL SCROLL
    ===================================================== */

    const internalLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );

    internalLinks.forEach((link) => {

        link.addEventListener(
            "click",
            (event) => {

                const targetId =
                    link.getAttribute("href");

                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }

                const target =
                    document.querySelector(targetId);

                if (!target) {
                    return;
                }

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    });


    /* =====================================================
       REVEAL ANIMATION
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".purpose-card, " +
            ".service-item, " +
            ".beyond-point, " +
            ".value"
        );


    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach((entry) => {

                        if (!entry.isIntersecting) {
                            return;
                        }

                        entry.target.classList.add(
                            "is-visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    });

                },
                {
                    threshold: 0.12
                }
            );


        revealElements.forEach((element) => {

            element.classList.add(
                "reveal-element"
            );

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach((element) => {

            element.classList.add(
                "is-visible"
            );

        });

    }


    /* =====================================================
       SERVICE ITEM INTERACTION
    ===================================================== */

    const serviceItems =
        document.querySelectorAll(
            ".service-item"
        );


    serviceItems.forEach((item) => {

        item.addEventListener(
            "mouseenter",
            () => {

                serviceItems.forEach((otherItem) => {

                    if (otherItem !== item) {
                        otherItem.classList.add(
                            "dimmed"
                        );
                    }

                });

            }
        );


        item.addEventListener(
            "mouseleave",
            () => {

                serviceItems.forEach((otherItem) => {

                    otherItem.classList.remove(
                        "dimmed"
                    );

                });

            }
        );

    });


    /* =====================================================
       PARALLAX — VERY SUBTLE
    ===================================================== */

    const heroContent =
        document.querySelector(
            ".hero-content"
        );


    let ticking = false;


    function updateParallax() {

        if (!heroContent) {
            ticking = false;
            return;
        }

        const scrollPosition =
            window.scrollY;

        if (scrollPosition < window.innerHeight) {

            const movement =
                scrollPosition * 0.08;

            heroContent.style.transform =
                `translateY(${movement}px)`;

        }

        ticking = false;

    }


    window.addEventListener(
        "scroll",
        () => {

            if (!ticking) {

                window.requestAnimationFrame(
                    updateParallax
                );

                ticking = true;

            }

        },
        { passive: true }
    );


    /* =====================================================
       PREVENT BROKEN IMAGE ICONS FROM LOOKING UGLY
    ===================================================== */

    const images =
        document.querySelectorAll("img");


    images.forEach((image) => {

        image.addEventListener(
            "error",
            () => {

                image.classList.add(
                    "image-missing"
                );

            }
        );

    });


    /* =====================================================
       PAGE LOADED
    ===================================================== */

    window.setTimeout(() => {

        document.documentElement.classList.add(
            "world-loaded"
        );

    }, 100);

});
