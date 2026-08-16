/* =========================================================
   AKSH — MEGHANA
   meghana.js
   PAGE 05
   Founder & Chief Psychologist Experience
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const page =
        document.getElementById("meghana-page");

    const nav =
        document.getElementById("meghana-nav");

    const menuButton =
        document.getElementById("menu-button");

    const mobileMenu =
        document.getElementById("mobile-menu");

    const mobileClose =
        document.getElementById("mobile-close");

    const year =
        document.getElementById("meghana-year");

    const portrait =
        document.querySelector(".meghana-portrait");

    const portraitImage =
        document.querySelector(".meghana-portrait img");

    const revealElements =
        document.querySelectorAll(
            ".meghana-hero-content, " +
            ".meghana-intro, " +
            ".founder-story, " +
            ".credentials-section, " +
            ".experience-section, " +
            ".approach-section, " +
            ".meghana-quote, " +
            ".meghana-final"
        );


    /* =====================================================
       PAGE READY
    ===================================================== */

    requestAnimationFrame(() => {

        document.documentElement.classList.add(
            "meghana-ready"
        );

        if (page) {

            page.classList.add(
                "page-ready"
            );

        }

    });


    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    if (year) {

        year.textContent =
            new Date().getFullYear();

    }


    /* =====================================================
       NAVIGATION SCROLL
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

        if (!mobileMenu) return;

        mobileMenu.classList.add("open");

        mobileMenu.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.classList.add(
            "menu-open"
        );

        if (menuButton) {

            menuButton.setAttribute(
                "aria-expanded",
                "true"
            );

            menuButton.setAttribute(
                "aria-label",
                "Close navigation"
            );

        }

    }


    function closeMenu() {

        if (!mobileMenu) return;

        mobileMenu.classList.remove("open");

        mobileMenu.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.classList.remove(
            "menu-open"
        );

        if (menuButton) {

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

            menuButton.setAttribute(
                "aria-label",
                "Open navigation"
            );

        }

    }


    if (menuButton) {

        menuButton.addEventListener(
            "click",
            () => {

                const isOpen =
                    mobileMenu &&
                    mobileMenu.classList.contains(
                        "open"
                    );

                if (isOpen) {

                    closeMenu();

                } else {

                    openMenu();

                }

            }
        );

    }


    if (mobileClose) {

        mobileClose.addEventListener(
            "click",
            closeMenu
        );

    }


    /* =====================================================
       MOBILE MENU LINKS
    ===================================================== */

    if (mobileMenu) {

        const mobileLinks =
            mobileMenu.querySelectorAll(
                "a"
            );

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
       CLICK OUTSIDE MOBILE MENU
    ===================================================== */

    if (mobileMenu) {

        mobileMenu.addEventListener(
            "click",
            (event) => {

                if (
                    event.target === mobileMenu
                ) {

                    closeMenu();

                }

            }
        );

    }


    /* =====================================================
       SMOOTH INTERNAL LINKS
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
                    document.querySelector(
                        targetId
                    );

                if (!target) return;

                event.preventDefault();

                closeMenu();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    });


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    if (
        "IntersectionObserver" in window
    ) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(
                        (entry) => {

                            if (
                                !entry.isIntersecting
                            ) {

                                return;

                            }

                            entry.target.classList.add(
                                "story-visible"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }
                    );

                },
                {
                    threshold: 0.10,
                    rootMargin:
                        "0px 0px -40px 0px"
                }
            );


        revealElements.forEach(
            (element) => {

                revealObserver.observe(
                    element
                );

            }
        );

    } else {

        revealElements.forEach(
            (element) => {

                element.classList.add(
                    "story-visible"
                );

            }
        );

    }


    /* =====================================================
       PORTRAIT PARALLAX
       ===================================================== */

    let ticking = false;


    function updatePortrait() {

        if (
            !portrait ||
            window.innerWidth < 768
        ) {

            ticking = false;

            return;

        }


        const rect =
            portrait.getBoundingClientRect();

        const windowHeight =
            window.innerHeight;


        const center =
            rect.top +
            rect.height / 2;


        const distance =
            center -
            windowHeight / 2;


        const movement =
            distance * -0.025;


        portrait.style.setProperty(
            "--portrait-shift",
            `${movement}px`
        );


        ticking = false;

    }


    function requestPortraitUpdate() {

        if (ticking) return;

        ticking = true;

        requestAnimationFrame(
            updatePortrait
        );

    }


    if (portrait) {

        window.addEventListener(
            "scroll",
            requestPortraitUpdate,
            { passive: true }
        );

        window.addEventListener(
            "resize",
            requestPortraitUpdate
        );

        requestPortraitUpdate();

    }


    /* =====================================================
       IMAGE LOADING
    ===================================================== */

    if (portraitImage) {

        if (portraitImage.complete) {

            portraitImage.classList.add(
                "loaded"
            );

        } else {

            portraitImage.addEventListener(
                "load",
                () => {

                    portraitImage.classList.add(
                        "loaded"
                    );

                }
            );

        }


        portraitImage.addEventListener(
            "error",
            () => {

                portraitImage.classList.add(
                    "image-error"
                );

                if (portrait) {

                    portrait.classList.add(
                        "image-error"
                    );

                }

            }
        );

    }


    /* =====================================================
       IMAGE FALLBACK — ALL PAGE IMAGES
    ===================================================== */

    const images =
        document.querySelectorAll(
            "img"
        );


    images.forEach((image) => {

        image.addEventListener(
            "error",
            () => {

                image.classList.add(
                    "image-error"
                );

            }
        );

    });


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const desktopLinks =
        document.querySelectorAll(
            ".desktop-nav a"
        );


    desktopLinks.forEach((link) => {

        const href =
            link.getAttribute("href");


        if (
            href === "meghana.html"
        ) {

            link.classList.add(
                "active"
            );

        }

    });


    /* =====================================================
       NAVIGATION HOVER INTELLIGENCE
    ===================================================== */

    const navLinks =
        document.querySelectorAll(
            ".desktop-nav a"
        );


    navLinks.forEach((link) => {

        link.addEventListener(
            "mouseenter",
            () => {

                navLinks.forEach(
                    (otherLink) => {

                        if (
                            otherLink !== link
                        ) {

                            otherLink.classList.add(
                                "nav-dimmed"
                            );

                        }

                    }
                );

            }
        );


        link.addEventListener(
            "mouseleave",
            () => {

                navLinks.forEach(
                    (otherLink) => {

                        otherLink.classList.remove(
                            "nav-dimmed"
                        );

                    }
                );

            }
        );

    });


    /* =====================================================
       EXPERIENCE ITEMS
       ===================================================== */

    const experienceItems =
        document.querySelectorAll(
            ".experience-item"
        );


    experienceItems.forEach(
        (item, index) => {

            item.style.setProperty(
                "--item-index",
                index
            );


            item.addEventListener(
                "mouseenter",
                () => {

                    item.classList.add(
                        "is-hovered"
                    );

                }
            );


            item.addEventListener(
                "mouseleave",
                () => {

                    item.classList.remove(
                        "is-hovered"
                    );

                }
            );

        }
    );


    /* =====================================================
       APPROACH ITEMS
    ===================================================== */

    const approachItems =
        document.querySelectorAll(
            ".approach-item, " +
            ".approach-value, " +
            ".founder-value"
        );


    approachItems.forEach(
        (item, index) => {

            item.style.setProperty(
                "--item-index",
                index
            );

        }
    );


    /* =====================================================
       STAT / CREDENTIAL COUNTERS
       Only activates when matching numeric
       data-target attributes exist.
    ===================================================== */

    const counters =
        document.querySelectorAll(
            "[data-target]"
        );


    function animateCounter(
        element
    ) {

        const target =
            Number(
                element.dataset.target
            );


        if (
            Number.isNaN(target)
        ) {

            return;

        }


        const duration =
            Number(
                element.dataset.duration
            ) || 1200;


        const startTime =
            performance.now();


        function update(
            currentTime
        ) {

            const elapsed =
                currentTime -
                startTime;


            const progress =
                Math.min(
                    elapsed / duration,
                    1
                );


            const eased =
                1 -
                Math.pow(
                    1 - progress,
                    3
                );


            element.textContent =
                Math.round(
                    target * eased
                );


            if (progress < 1) {

                requestAnimationFrame(
                    update
                );

            } else {

                element.textContent =
                    target;

            }

        }


        requestAnimationFrame(
            update
        );

    }


    if (
        counters.length &&
        "IntersectionObserver" in window
    ) {

        const counterObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(
                        (entry) => {

                            if (
                                !entry.isIntersecting
                            ) {

                                return;

                            }

                            animateCounter(
                                entry.target
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }
                    );

                },
                {
                    threshold: 0.5
                }
            );


        counters.forEach(
            (counter) => {

                counterObserver.observe(
                    counter
                );

            }
        );

    }


    /* =====================================================
       QUOTE REVEAL
       ===================================================== */

    const quote =
        document.querySelector(
            ".meghana-quote blockquote"
        );


    if (quote) {

        quote.classList.add(
            "quote-ready"
        );

    }


    /* =====================================================
       FINAL CTA HOVER
       ===================================================== */

    const finalButtons =
        document.querySelectorAll(
            ".primary-button, " +
            ".secondary-button, " +
            ".meghana-cta"
        );


    finalButtons.forEach(
        (button) => {

            button.addEventListener(
                "mouseenter",
                () => {

                    button.classList.add(
                        "cta-hover"
                    );

                }
            );


            button.addEventListener(
                "mouseleave",
                () => {

                    button.classList.remove(
                        "cta-hover"
                    );

                }
            );

        }
    );


    /* =====================================================
       REDUCED MOTION
    ===================================================== */

    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );


    function handleReducedMotion() {

        if (
            reducedMotion.matches
        ) {

            document.documentElement.classList.add(
                "reduced-motion"
            );

        } else {

            document.documentElement.classList.remove(
                "reduced-motion"
            );

        }

    }


    handleReducedMotion();


    if (
        reducedMotion.addEventListener
    ) {

        reducedMotion.addEventListener(
            "change",
            handleReducedMotion
        );

    }


    /* =====================================================
       PAGE VISIBILITY
    ===================================================== */

    document.addEventListener(
        "visibilitychange",
        () => {

            if (
                document.hidden
            ) {

                document.body.classList.add(
                    "page-hidden"
                );

            } else {

                document.body.classList.remove(
                    "page-hidden"
                );

            }

        }
    );


    /* =====================================================
       INITIAL ACCESSIBILITY STATE
    ===================================================== */

    if (mobileMenu) {

        mobileMenu.setAttribute(
            "aria-hidden",
            "true"
        );

    }


    if (menuButton) {

        menuButton.setAttribute(
            "aria-expanded",
            "false"
        );

    }


    /* =====================================================
       PAGE CLEANUP ON PAGE EXIT
    ===================================================== */

    window.addEventListener(
        "pagehide",
        () => {

            document.body.classList.remove(
                "menu-open"
            );

        }
    );


    /* =====================================================
       FINAL READY STATE
    ===================================================== */

    setTimeout(() => {

        document.documentElement.classList.add(
            "meghana-interactive"
        );

    }, 50);

});
