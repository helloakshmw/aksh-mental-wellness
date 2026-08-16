/* =========================================================
   AKSH — MEGHANA
   meghana.js
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const body = document.body;

    const nav = document.getElementById("meghana-nav");
    const menuButton = document.getElementById("menu-button");
    const mobileMenu = document.getElementById("mobile-menu");
    const mobileClose = document.getElementById("mobile-close");
    const year = document.getElementById("meghana-year");


    /* =====================================================
       YEAR
    ===================================================== */

    if (year) {
        year.textContent = new Date().getFullYear();
    }


    /* =====================================================
       NAVIGATION ON SCROLL
    ===================================================== */

    function updateNav() {

        if (!nav) return;

        if (window.scrollY > 40) {
            nav.classList.add("scrolled");
        } else {
            nav.classList.remove("scrolled");
        }
    }

    updateNav();

    window.addEventListener(
        "scroll",
        updateNav,
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

        body.classList.add("menu-open");

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

        mobileMenu.setAttribute(
            "aria-hidden",
            "true"
        );

        body.classList.remove("menu-open");

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
       ESCAPE TO CLOSE
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
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".profile-column, " +
            ".timeline-item, " +
            ".responsibility-grid > div, " +
            ".languages-list span"
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
       TIMELINE HOVER / TOUCH
    ===================================================== */

    const timelineItems =
        document.querySelectorAll(
            ".timeline-item"
        );


    timelineItems.forEach((item) => {

        item.addEventListener(
            "click",
            () => {

                timelineItems.forEach(
                    (otherItem) => {

                        if (otherItem !== item) {
                            otherItem.classList.remove(
                                "timeline-active"
                            );
                        }

                    }
                );

                item.classList.toggle(
                    "timeline-active"
                );

            }
        );

    });


    /* =====================================================
       PROFILE CARDS
    ===================================================== */

    const profileCards =
        document.querySelectorAll(
            ".profile-column"
        );


    profileCards.forEach((card) => {

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
       RESPONSIBILITY CARDS
    ===================================================== */

    const responsibilityCards =
        document.querySelectorAll(
            ".responsibility-grid > div"
        );


    responsibilityCards.forEach((card) => {

        card.addEventListener(
            "mouseenter",
            () => {
                card.classList.add(
                    "responsibility-active"
                );
            }
        );


        card.addEventListener(
            "mouseleave",
            () => {
                card.classList.remove(
                    "responsibility-active"
                );
            }
        );

    });


    /* =====================================================
       LANGUAGE INTERACTION
    ===================================================== */

    const languageItems =
        document.querySelectorAll(
            ".languages-list span"
        );


    languageItems.forEach((item) => {

        item.addEventListener(
            "click",
            () => {

                languageItems.forEach(
                    (language) => {

                        language.classList.remove(
                            "language-selected"
                        );

                    }
                );

                item.classList.add(
                    "language-selected"
                );

            }
        );

    });


    /* =====================================================
       IMAGE ERROR HANDLING
    ===================================================== */

    const images =
        document.querySelectorAll("img");


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
       PAGE READY
    ===================================================== */

    window.setTimeout(() => {

        document.documentElement.classList.add(
            "meghana-ready"
        );

    }, 100);

});
