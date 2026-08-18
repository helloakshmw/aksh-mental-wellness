/* =========================================================
   AKSH — JOURNEY
   journey.js
   PAGE 06
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const nav =
        document.getElementById("journey-nav");

    const menuButton =
        document.getElementById("menu-button");

    const mobileMenu =
        document.getElementById("mobile-menu");

    const mobileClose =
        document.getElementById("mobile-close");

    const year =
        document.getElementById("journey-year");


    /* =====================================================
       YEAR
    ===================================================== */

    if (year) {

        year.textContent =
            new Date().getFullYear();

    }


    /* =====================================================
       NAVIGATION
    ===================================================== */

    function updateNavigation() {

        if (!nav) return;

        if (window.scrollY > 35) {

            nav.classList.add("scrolled");

        } else {

            nav.classList.remove("scrolled");

        }

    }


    updateNavigation();


    window.addEventListener(
        "scroll",
        updateNavigation,
        {
            passive: true
        }
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

                if (
                    mobileMenu &&
                    mobileMenu.classList.contains("open")
                ) {

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

        const links =
            mobileMenu.querySelectorAll("a");

        links.forEach((link) => {

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


                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });


                if (
                    history.pushState
                ) {

                    history.pushState(
                        null,
                        "",
                        targetId
                    );

                }

            }
        );

    });


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".journey-intro, " +
            ".steps-section, " +
            ".expect-section, " +
            ".pathways-section, " +
            ".phase-section, " +
            ".reassurance-section, " +
            ".journey-final"
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
       STEP INTERACTION
    ===================================================== */

    const stepItems =
        document.querySelectorAll(
            ".step-item"
        );


    stepItems.forEach((item) => {

        item.addEventListener(
            "click",
            () => {

                stepItems.forEach(
                    (otherItem) => {

                        otherItem.classList.remove(
                            "selected"
                        );

                    }
                );


                item.classList.add(
                    "selected"
                );

            }
        );

    });


    /* =====================================================
       PATHWAY INTERACTION
    ===================================================== */

    const pathwayCards =
        document.querySelectorAll(
            ".pathway-card"
        );


    pathwayCards.forEach((card) => {

        card.addEventListener(
            "mouseenter",
            () => {

                card.classList.add(
                    "active"
                );

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.classList.remove(
                    "active"
                );

            }
        );

    });


    /* =====================================================
       KEYBOARD ACCESSIBILITY
    ===================================================== */

    stepItems.forEach((item) => {

        if (
            !item.hasAttribute("tabindex")
        ) {

            item.setAttribute(
                "tabindex",
                "0"
            );

        }


        item.addEventListener(
            "keydown",
            (event) => {

                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    event.preventDefault();

                    item.click();

                }

            }
        );

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

            }
        );

    });


    /* =====================================================
       PAGE READY
    ===================================================== */

    requestAnimationFrame(() => {

        document.documentElement.classList.add(
            "journey-ready"
        );

    });


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
       RESIZE HANDLING
    ===================================================== */

    let resizeTimer;


    window.addEventListener(
        "resize",
        () => {

            clearTimeout(resizeTimer);


            resizeTimer =
                setTimeout(() => {

                    if (
                        window.innerWidth > 800
                    ) {

                        closeMenu();

                    }

                }, 150);

        },
        {
            passive: true
        }
    );


    /* =====================================================
       PAGE LOAD
    ===================================================== */

    window.addEventListener(
        "load",
        () => {

            document.documentElement.classList.add(
                "journey-loaded"
            );

        }
    );

});
