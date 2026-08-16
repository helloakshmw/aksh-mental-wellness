/* =========================================================
   AKSH — THE MIND
   mind.js
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const body = document.body;
    const nav = document.getElementById("mind-nav");

    const menuButton =
        document.getElementById("menu-button");

    const mobileMenu =
        document.getElementById("mobile-menu");

    const mobileClose =
        document.getElementById("mobile-close");

    const year =
        document.getElementById("mind-year");


    /* =====================================================
       YEAR
    ===================================================== */

    if (year) {
        year.textContent = new Date().getFullYear();
    }


    /* =====================================================
       NAVIGATION SCROLL
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
       REVEAL ELEMENTS
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".mind-card, " +
            ".experience-item, " +
            ".myth-row, " +
            ".education-point, " +
            ".approach-values > div"
        );


    if (
        "IntersectionObserver" in window &&
        revealElements.length
    ) {

        const observer =
            new IntersectionObserver(
                (entries, observerInstance) => {

                    entries.forEach((entry) => {

                        if (!entry.isIntersecting) {
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
       EXPERIENCE HOVER
    ===================================================== */

    const experienceItems =
        document.querySelectorAll(
            ".experience-item"
        );


    experienceItems.forEach((item) => {

        item.addEventListener(
            "mouseenter",
            () => {

                experienceItems.forEach(
                    (otherItem) => {

                        if (otherItem !== item) {

                            otherItem.classList.add(
                                "dimmed"
                            );

                        }

                    }
                );

            }
        );


        item.addEventListener(
            "mouseleave",
            () => {

                experienceItems.forEach(
                    (otherItem) => {

                        otherItem.classList.remove(
                            "dimmed"
                        );

                    }
                );

            }
        );

    });


    /* =====================================================
       MIND CARDS
    ===================================================== */

    const mindCards =
        document.querySelectorAll(
            ".mind-card"
        );


    mindCards.forEach((card) => {

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
       SUBTLE HERO MOVEMENT
    ===================================================== */

    const heroContent =
        document.querySelector(
            ".hero-content"
        );

    let ticking = false;


    function heroParallax() {

        if (!heroContent) {
            ticking = false;
            return;
        }

        const scroll =
            window.scrollY;

        if (
            scroll >= 0 &&
            scroll < window.innerHeight
        ) {

            heroContent.style.transform =
                `translateY(${scroll * 0.06}px)`;

        }

        ticking = false;
    }


    window.addEventListener(
        "scroll",
        () => {

            if (!ticking) {

                window.requestAnimationFrame(
                    heroParallax
                );

                ticking = true;

            }

        },
        { passive: true }
    );


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
            "mind-ready"
        );

    }, 100);

});
