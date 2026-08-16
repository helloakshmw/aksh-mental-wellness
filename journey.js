/* =========================================================
   AKSH — JOURNEY
   journey.js
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const nav = document.getElementById("journey-nav");
    const menuButton = document.getElementById("menu-button");
    const mobileMenu = document.getElementById("mobile-menu");
    const mobileClose = document.getElementById("mobile-close");
    const year = document.getElementById("journey-year");

    /* =====================================================
       YEAR
    ===================================================== */

    if (year) {
        year.textContent = new Date().getFullYear();
    }


    /* =====================================================
       NAVIGATION
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
        mobileMenu.setAttribute("aria-hidden", "false");

        document.body.classList.add("menu-open");

        if (menuButton) {
            menuButton.setAttribute(
                "aria-expanded",
                "true"
            );
        }
    }


    function closeMenu() {

        if (!mobileMenu) return;

        mobileMenu.classList.remove("open");
        mobileMenu.setAttribute("aria-hidden", "true");

        document.body.classList.remove("menu-open");

        if (menuButton) {
            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );
        }
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
       CLOSE MENU WHEN LINK IS CLICKED
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
       ESC KEY
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
       CLICK OUTSIDE
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
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".journey-step, " +
            ".support-values > div, " +
            ".current-grid > div, " +
            ".future-phases > div"
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
                            "journey-visible"
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

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach((element) => {

            element.classList.add(
                "journey-visible"
            );

        });

    }


    /* =====================================================
       JOURNEY STEP INTERACTION
    ===================================================== */

    const journeySteps =
        document.querySelectorAll(
            ".journey-step"
        );


    journeySteps.forEach((step) => {

        step.addEventListener(
            "click",
            () => {

                journeySteps.forEach(
                    (otherStep) => {

                        if (otherStep !== step) {
                            otherStep.classList.remove(
                                "step-selected"
                            );
                        }

                    }
                );

                step.classList.toggle(
                    "step-selected"
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

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    });


    /* =====================================================
       IMAGE FALLBACK
    ===================================================== */

    document
        .querySelectorAll("img")
        .forEach((image) => {

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

});
