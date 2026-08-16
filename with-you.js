/* =========================================================
   AKSH — WITH YOU
   with-you.js
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const body = document.body;

    const nav =
        document.getElementById("with-you-nav");

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
        { passive: true }
    );


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    function openMenu() {

        if (!mobileMenu) return;

        mobileMenu.classList.add("open");

        body.classList.add("menu-open");

        if (menuButton) {
            menuButton.setAttribute(
                "aria-expanded",
                "true"
            );
        }

        mobileMenu.setAttribute(
            "aria-hidden",
            "false"
        );
    }


    function closeMenu() {

        if (!mobileMenu) return;

        mobileMenu.classList.remove("open");

        body.classList.remove("menu-open");

        if (menuButton) {
            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );
        }

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
       MOBILE LINKS
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
       CLOSE MENU WHEN CLICKING OUTSIDE
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
       SUPPORT CARD INTERACTION
    ===================================================== */

    const supportCards =
        document.querySelectorAll(
            ".support-card"
        );


    supportCards.forEach((card) => {

        card.addEventListener(
            "mouseenter",
            () => {

                card.classList.add(
                    "card-active"
                );

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.classList.remove(
                    "card-active"
                );

            }
        );

    });


    /* =====================================================
       EXPERIENCE STEP INTERACTION
    ===================================================== */

    const experienceSteps =
        document.querySelectorAll(
            ".experience-step"
        );


    experienceSteps.forEach((step) => {

        step.addEventListener(
            "mouseenter",
            () => {

                step.classList.add(
                    "step-active"
                );

            }
        );


        step.addEventListener(
            "mouseleave",
            () => {

                step.classList.remove(
                    "step-active"
                );

            }
        );

    });


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".support-card, " +
            ".experience-step, " +
            ".access-item, " +
            ".trust-values > div"
        );


    if (
        "IntersectionObserver" in window
    ) {

        const observer =
            new IntersectionObserver(
                (entries, observerInstance) => {

                    entries.forEach((entry) => {

                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }

                        entry.target.classList.add(
                            "is-visible"
                        );

                        observerInstance.unobserve(
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

            observer.observe(element);

        });

    } else {

        revealElements.forEach((element) => {

            element.classList.add(
                "is-visible"
            );

        });

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
       PAGE READY
    ===================================================== */

    window.setTimeout(() => {

        document.documentElement.classList.add(
            "with-you-ready"
        );

    }, 100);

});
