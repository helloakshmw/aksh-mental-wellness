/* =========================================================
   AKSH — WITH YOU
   with-you.js
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const page =
        document.getElementById("with-you-page") ||
        document.querySelector(".with-you-page");

    const nav =
        document.getElementById("with-you-nav") ||
        document.querySelector(".with-you-nav");

    const menuButton =
        document.getElementById("menu-button");

    const mobileMenu =
        document.getElementById("mobile-menu");

    const mobileClose =
        document.getElementById("mobile-close");

    const year =
        document.getElementById("with-you-year");


    /* =====================================================
       YEAR
    ===================================================== */

    if (year) {
        year.textContent = new Date().getFullYear();
    }


    /* =====================================================
       PAGE READY
    ===================================================== */

    requestAnimationFrame(() => {

        document.documentElement.classList.add(
            "with-you-ready"
        );

        if (page) {
            page.classList.add("page-ready");
        }

    });


    /* =====================================================
       NAVIGATION — SCROLL STATE
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
       MOBILE MENU LINKS
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

                closeAllPanels();

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
       SUPPORT DATA
    ===================================================== */

    const supportData = {

        individual: {

            title:
                "Individual Counselling",

            eyebrow:
                "01 — INDIVIDUAL",

            text:
                "A private space to slow down, understand what you are experiencing and work towards meaningful change.",

            points: [
                "Personal concerns",
                "Emotional wellbeing",
                "Stress and anxiety",
                "Self-understanding",
                "Personal growth"
            ]

        },


        adolescent: {

            title:
                "Child & Adolescent Support",

            eyebrow:
                "02 — YOUNG MINDS",

            text:
                "A supportive environment where young people can talk about emotions, relationships, academic pressure and the experiences that shape their everyday lives.",

            points: [
                "Emotional wellbeing",
                "Behavioural concerns",
                "Academic pressure",
                "Relationships",
                "Developmental experiences"
            ]

        },


        relationship: {

            title:
                "Relationship & Couples Support",

            eyebrow:
                "03 — CONNECTION",

            text:
                "A space to explore communication, emotional connection, boundaries, conflict and the patterns that influence relationships.",

            points: [
                "Communication",
                "Emotional connection",
                "Conflict",
                "Boundaries",
                "Relationship patterns"
            ]

        },


        stress: {

            title:
                "Stress & Emotional Wellness",

            eyebrow:
                "04 — WELLBEING",

            text:
                "Support for understanding emotional pressure and developing greater awareness of what may be affecting your everyday wellbeing.",

            points: [
                "Stress",
                "Emotional pressure",
                "Everyday challenges",
                "Self-awareness",
                "Healthy coping"
            ]

        },


        career: {

            title:
                "Career & Academic Counselling",

            eyebrow:
                "05 — DIRECTION",

            text:
                "A space to think through academic choices, career decisions, uncertainty and the expectations that can surround them.",

            points: [
                "Academic decisions",
                "Career direction",
                "Decision-making",
                "Performance pressure",
                "Future planning"
            ]

        },


        workshops: {

            title:
                "Workshops & Mental Wellness Education",

            eyebrow:
                "06 — EDUCATION",

            text:
                "Mental wellness education designed to make psychological knowledge easier to understand, discuss and apply in everyday environments.",

            points: [
                "Mental wellness awareness",
                "Psychoeducation",
                "Schools",
                "Workplaces",
                "Communities"
            ]

        }

    };


    /* =====================================================
       GENERIC PANEL ELEMENTS
    ===================================================== */

    const supportPanel =
        document.getElementById("support-panel") ||
        document.querySelector(".support-panel");

    const supportPanelTitle =
        document.getElementById("support-panel-title") ||
        document.querySelector(".support-panel-title");

    const supportPanelEyebrow =
        document.getElementById("support-panel-eyebrow") ||
        document.querySelector(".support-panel-eyebrow");

    const supportPanelText =
        document.getElementById("support-panel-text") ||
        document.querySelector(".support-panel-text");

    const supportPanelList =
        document.getElementById("support-panel-list") ||
        document.querySelector(".support-panel-list");

    const supportPanelClose =
        document.getElementById("support-panel-close") ||
        document.querySelector(".support-panel-close");


    /* =====================================================
       CLOSE ALL PANELS
    ===================================================== */

    function closeAllPanels() {

        if (supportPanel) {

            supportPanel.classList.remove(
                "open"
            );

            supportPanel.setAttribute(
                "aria-hidden",
                "true"
            );

        }

        document.body.classList.remove(
            "support-panel-open"
        );

    }


    /* =====================================================
       OPEN SUPPORT PANEL
    ===================================================== */

    function openSupportPanel(key) {

        const data =
            supportData[key];

        if (!data) return;


        /* -----------------------------------------------
           Title
        ------------------------------------------------ */

        if (supportPanelTitle) {

            supportPanelTitle.textContent =
                data.title;

        }


        /* -----------------------------------------------
           Eyebrow
        ------------------------------------------------ */

        if (supportPanelEyebrow) {

            supportPanelEyebrow.textContent =
                data.eyebrow;

        }


        /* -----------------------------------------------
           Description
        ------------------------------------------------ */

        if (supportPanelText) {

            supportPanelText.textContent =
                data.text;

        }


        /* -----------------------------------------------
           Points
        ------------------------------------------------ */

        if (supportPanelList) {

            supportPanelList.innerHTML = "";

            data.points.forEach((point) => {

                const item =
                    document.createElement("li");

                item.textContent =
                    point;

                supportPanelList.appendChild(
                    item
                );

            });

        }


        /* -----------------------------------------------
           Panel
        ------------------------------------------------ */

        if (supportPanel) {

            supportPanel.classList.add(
                "open"
            );

            supportPanel.setAttribute(
                "aria-hidden",
                "false"
            );

        }

        document.body.classList.add(
            "support-panel-open"
        );

    }


    /* =====================================================
       SUPPORT CARDS
    ===================================================== */

    const supportCards =
        document.querySelectorAll(
            "[data-support], " +
            ".support-card, " +
            ".support-item"
        );


    supportCards.forEach((card) => {

        card.addEventListener(
            "click",
            () => {

                const key =
                    card.dataset.support ||
                    card.dataset.category ||
                    card.dataset.service;

                if (key) {

                    openSupportPanel(
                        key
                    );

                }

            }
        );

    });


    /* =====================================================
       CLOSE SUPPORT PANEL
    ===================================================== */

    if (supportPanelClose) {

        supportPanelClose.addEventListener(
            "click",
            closeAllPanels
        );

    }


    /* =====================================================
       CLICK PANEL BACKDROP
    ===================================================== */

    if (supportPanel) {

        supportPanel.addEventListener(
            "click",
            (event) => {

                if (
                    event.target === supportPanel
                ) {

                    closeAllPanels();

                }

            }
        );

    }


    /* =====================================================
       PRIMARY CTA BUTTONS
    ===================================================== */

    const ctaButtons =
        document.querySelectorAll(
            ".primary-button, " +
            ".support-button, " +
            ".begin-button, " +
            ".final-cta"
        );


    ctaButtons.forEach((button) => {

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

    });


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
                    link.getAttribute(
                        "href"
                    );

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

    const revealElements =
        document.querySelectorAll(
            ".with-you-hero, " +
            ".with-you-intro, " +
            ".support-section, " +
            ".support-grid, " +
            ".services-section, " +
            ".services-list, " +
            ".how-it-works, " +
            ".process-section, " +
            ".approach-section, " +
            ".why-aksh, " +
            ".with-you-final, " +
            ".support-card, " +
            ".service-item, " +
            ".process-item, " +
            ".approach-card"
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


                            entry.target.classList.add(
                                "is-visible"
                            );


                            observer.unobserve(
                                entry.target
                            );

                        }
                    );

                },
                {
                    threshold: 0.08,
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

                element.classList.add(
                    "is-visible"
                );

            }
        );

    }


    /* =====================================================
       STAGGERED CARD REVEAL
    ===================================================== */

    const staggerGroups = [
        ".support-card",
        ".service-item",
        ".process-item",
        ".approach-card"
    ];


    staggerGroups.forEach((selector) => {

        const items =
            document.querySelectorAll(
                selector
            );

        items.forEach(
            (item, index) => {

                item.style.setProperty(
                    "--reveal-delay",
                    `${index * 90}ms`
                );

            }
        );

    });


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const currentPage =
        window.location.pathname
            .split("/")
            .pop();


    const navLinks =
        document.querySelectorAll(
            ".desktop-nav a, " +
            ".mobile-menu a"
        );


    navLinks.forEach((link) => {

        const href =
            link.getAttribute("href");

        if (
            href &&
            href === currentPage
        ) {

            link.classList.add(
                "active"
            );

        }

    });


    /* =====================================================
       IMAGE FALLBACK
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

                image.setAttribute(
                    "aria-hidden",
                    "true"
                );

            }
        );

    });


    /* =====================================================
       REDUCE MOTION SUPPORT
    ===================================================== */

    const reducedMotion =
        window.matchMedia &&
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    if (reducedMotion) {

        document.documentElement.classList.add(
            "reduced-motion"
        );

    }


    /* =====================================================
       VISIBILITY / TAB STATE
    ===================================================== */

    document.addEventListener(
        "visibilitychange",
        () => {

            if (
                document.hidden
            ) {

                document.documentElement.classList.add(
                    "page-hidden"
                );

            } else {

                document.documentElement.classList.remove(
                    "page-hidden"
                );

            }

        }
    );


    /* =====================================================
       RESIZE HANDLING
    ===================================================== */

    let resizeTimer = null;


    window.addEventListener(
        "resize",
        () => {

            clearTimeout(
                resizeTimer
            );

            resizeTimer =
                setTimeout(
                    () => {

                        if (
                            window.innerWidth > 900
                        ) {

                            closeMenu();

                        }

                    },
                    150
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


    if (supportPanel) {

        supportPanel.setAttribute(
            "aria-hidden",
            "true"
        );

    }


    /* =====================================================
       FINAL INITIALISATION
    ===================================================== */

    updateNavigation();

});
