/* =========================================================
   AKSH — MEGHANA
   meghana.js
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

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


    /* =====================================================
       YEAR
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
                    mobileMenu.classList.contains("open");

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
       MOBILE NAVIGATION LINKS
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
       HERO IMAGE LOAD
    ===================================================== */

    const portrait =
        document.querySelector(
            ".hero-portrait img"
        );


    if (portrait) {

        portrait.addEventListener(
            "load",
            () => {

                portrait.classList.add(
                    "loaded"
                );

            }
        );


        if (portrait.complete) {

            portrait.classList.add(
                "loaded"
            );

        }


        portrait.addEventListener(
            "error",
            () => {

                portrait.classList.add(
                    "image-error"
                );

            }
        );

    }


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".meghana-intro, " +
            ".meghana-journey, " +
            ".education-section, " +
            ".expertise-section, " +
            ".philosophy-section, " +
            ".why-aksh-section, " +
            ".meghana-final"
        );


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
                    threshold: 0.08,
                    rootMargin: "0px 0px -40px 0px"
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
       TIMELINE REVEAL
    ===================================================== */

    const timelineItems =
        document.querySelectorAll(
            ".timeline-item"
        );


    if (
        "IntersectionObserver" in window
    ) {

        const timelineObserver =
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
                                "timeline-visible"
                            );


                            observer.unobserve(
                                entry.target
                            );

                        }
                    );

                },
                {
                    threshold: 0.12
                }
            );


        timelineItems.forEach(
            (item) => {

                timelineObserver.observe(
                    item
                );

            }
        );

    } else {

        timelineItems.forEach(
            (item) => {

                item.classList.add(
                    "timeline-visible"
                );

            }
        );

    }


    /* =====================================================
       EXPERTISE CARDS
    ===================================================== */

    const expertiseCards =
        document.querySelectorAll(
            ".expertise-grid article"
        );


    expertiseCards.forEach(
        (card, index) => {

            card.style.setProperty(
                "--reveal-delay",
                `${index * 80}ms`
            );

        }
    );


    /* =====================================================
       EDUCATION ITEMS
    ===================================================== */

    const educationItems =
        document.querySelectorAll(
            ".education-list article"
        );


    educationItems.forEach(
        (item, index) => {

            item.style.setProperty(
                "--reveal-delay",
                `${index * 100}ms`
            );

        }
    );


    /* =====================================================
       SMOOTH INTERNAL LINKS
    ===================================================== */

    const internalLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    internalLinks.forEach(
        (link) => {

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


                    if (!target) {

                        return;

                    }


                    event.preventDefault();


                    closeMenu();


                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }
            );

        }
    );


    /* =====================================================
       HERO SCROLL
    ===================================================== */

    const heroScroll =
        document.querySelector(
            ".hero-scroll"
        );


    const introSection =
        document.getElementById(
            "about-meghana"
        );


    if (
        heroScroll &&
        introSection
    ) {

        heroScroll.addEventListener(
            "click",
            () => {

                introSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );


        heroScroll.style.cursor =
            "pointer";

    }


    /* =====================================================
       PARALLAX PORTRAIT
    ===================================================== */

    const heroPortrait =
        document.querySelector(
            ".hero-portrait"
        );


    let ticking = false;


    function updateParallax() {

        if (
            !heroPortrait ||
            window.innerWidth < 768
        ) {

            ticking = false;

            return;

        }


        const scrollY =
            window.scrollY;


        const amount =
            Math.min(
                scrollY * 0.08,
                35
            );


        heroPortrait.style.transform =
            `translate3d(0, ${amount}px, 0)`;


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
       ACTIVE NAVIGATION
    ===================================================== */

    const navLinks =
        document.querySelectorAll(
            ".desktop-nav a"
        );


    navLinks.forEach(
        (link) => {

            const href =
                link.getAttribute("href");


            if (
                href === "meghana.html"
            ) {

                link.classList.add(
                    "active"
                );

            }

        }
    );


    /* =====================================================
       IMAGE FALLBACK
    ===================================================== */

    const images =
        document.querySelectorAll(
            "img"
        );


    images.forEach(
        (image) => {

            image.addEventListener(
                "error",
                () => {

                    image.classList.add(
                        "image-error"
                    );

                }
            );

        }
    );


    /* =====================================================
       PAGE READY
    ===================================================== */

    requestAnimationFrame(
        () => {

            document.documentElement.classList.add(
                "meghana-ready"
            );

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

});
