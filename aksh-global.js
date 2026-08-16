/* =========================================================
   AKSH — GLOBAL WEBSITE CONTROL
   aksh-global.js

   This file controls common behaviour across AKSH pages.
   Page-specific JavaScript should remain inside its own file.
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       GLOBAL PAGE READY
       ===================================================== */

    document.documentElement.classList.add("aksh-ready");


    /* =====================================================
       CURRENT YEAR
       Works with:
       #year
       #journal-year
       #stories-year
       #footer-year
       .current-year
       ===================================================== */

    const currentYear =
        new Date().getFullYear();

    const yearElements =
        document.querySelectorAll(
            "#year, " +
            "#journal-year, " +
            "#stories-year, " +
            "#footer-year, " +
            ".current-year"
        );

    yearElements.forEach((element) => {

        element.textContent =
            currentYear;

    });


    /* =====================================================
       CURRENT PAGE
       Automatically marks matching navigation links
       ===================================================== */

    const currentPath =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();


    const navigationLinks =
        document.querySelectorAll(
            "a[href]"
        );


    navigationLinks.forEach((link) => {

        const href =
            link.getAttribute("href");

        if (!href) return;


        /*
         * Ignore:
         * - external websites
         * - telephone links
         * - WhatsApp links
         * - email links
         * - page anchors
         */

        if (
            href.startsWith("http://") ||
            href.startsWith("https://") ||
            href.startsWith("tel:") ||
            href.startsWith("mailto:") ||
            href.startsWith("whatsapp:") ||
            href.startsWith("#")
        ) {

            return;

        }


        const linkPath =
            href
                .split("/")
                .pop()
                .toLowerCase();


        /*
         * Homepage handling
         */

        const isHome =
            (
                currentPath === "" ||
                currentPath === "index.html"
            );


        const linkIsHome =
            (
                linkPath === "" ||
                linkPath === "index.html"
            );


        if (
            (isHome && linkIsHome) ||
            (
                !isHome &&
                linkPath === currentPath
            )
        ) {

            link.classList.add(
                "aksh-current-page"
            );

            link.setAttribute(
                "aria-current",
                "page"
            );

        }

    });


    /* =====================================================
       INTERNAL PAGE TRANSITIONS
       ===================================================== */

    const pageLinks =
        document.querySelectorAll(
            'a[href$=".html"], ' +
            'a[href="./"], ' +
            'a[href="../"]'
        );


    pageLinks.forEach((link) => {

        link.addEventListener(
            "click",
            (event) => {

                /*
                 * Do not interfere with:
                 * - Command/Ctrl clicks
                 * - Middle mouse clicks
                 * - Downloads
                 * - External links
                 */

                if (
                    event.ctrlKey ||
                    event.metaKey ||
                    event.shiftKey ||
                    event.altKey ||
                    event.button !== 0
                ) {

                    return;

                }


                const href =
                    link.getAttribute("href");


                if (!href) return;


                if (
                    href.startsWith("http://") ||
                    href.startsWith("https://") ||
                    href.startsWith("mailto:") ||
                    href.startsWith("tel:")
                ) {

                    return;

                }


                /*
                 * Respect reduced-motion preference.
                 */

                if (
                    window.matchMedia(
                        "(prefers-reduced-motion: reduce)"
                    ).matches
                ) {

                    return;

                }


                event.preventDefault();


                document.documentElement.classList.add(
                    "aksh-leaving"
                );


                setTimeout(
                    () => {

                        window.location.href =
                            href;

                    },
                    180
                );

            }
        );

    });


    /* =====================================================
       BACK BUTTON / BROWSER HISTORY
       ===================================================== */

    window.addEventListener(
        "pageshow",
        () => {

            document.documentElement.classList.remove(
                "aksh-leaving"
            );

        }
    );


    /* =====================================================
       ESCAPE KEY
       Sends a global event.

       Individual pages can listen for:
       document.addEventListener(
           "aksh:escape",
           ...
       );
       ===================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape"
            ) {

                document.dispatchEvent(
                    new CustomEvent(
                        "aksh:escape"
                    )
                );

            }

        }
    );


    /* =====================================================
       GLOBAL BACK TO TOP
       Any element with:
       data-aksh-top
       can be used.
       ===================================================== */

    const topButtons =
        document.querySelectorAll(
            "[data-aksh-top]"
        );


    topButtons.forEach((button) => {

        button.addEventListener(
            "click",
            (event) => {

                event.preventDefault();


                window.scrollTo({
                    top: 0,
                    behavior:
                        window.matchMedia(
                            "(prefers-reduced-motion: reduce)"
                        ).matches
                            ? "auto"
                            : "smooth"
                });

            }
        );

    });


    /* =====================================================
       EXTERNAL LINKS
       Add safe behaviour to links leaving AKSH.
       ===================================================== */

    const externalLinks =
        document.querySelectorAll(
            'a[href^="http://"], ' +
            'a[href^="https://"]'
        );


    externalLinks.forEach((link) => {

        const currentHost =
            window.location.hostname;


        try {

            const target =
                new URL(
                    link.href,
                    window.location.href
                );


            if (
                target.hostname !==
                currentHost
            ) {

                link.setAttribute(
                    "target",
                    "_blank"
                );

                link.setAttribute(
                    "rel",
                    "noopener noreferrer"
                );

            }

        } catch (error) {

            /*
             * Invalid URLs are left untouched.
             */

        }

    });


    /* =====================================================
       PHONE LINKS
       ===================================================== */

    const phoneLinks =
        document.querySelectorAll(
            'a[href^="tel:"]'
        );


    phoneLinks.forEach((link) => {

        link.setAttribute(
            "aria-label",
            link.getAttribute(
                "aria-label"
            ) ||
            "Call AKSH"
        );

    });


    /* =====================================================
       WHATSAPP LINKS
       ===================================================== */

    const whatsappLinks =
        document.querySelectorAll(
            'a[href*="wa.me"], ' +
            'a[href*="whatsapp.com"]'
        );


    whatsappLinks.forEach((link) => {

        link.setAttribute(
            "target",
            "_blank"
        );

        link.setAttribute(
            "rel",
            "noopener noreferrer"
        );

    });


    /* =====================================================
       IMAGES
       ===================================================== */

    const images =
        document.querySelectorAll(
            "img"
        );


    images.forEach((image) => {

        /*
         * Prevent broken image layout
         * from becoming visually distracting.
         */

        image.addEventListener(
            "error",
            () => {

                image.classList.add(
                    "aksh-image-error"
                );

            }
        );

    });


    /* =====================================================
       TOUCH DEVICE DETECTION
       ===================================================== */

    if (
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0
    ) {

        document.documentElement.classList.add(
            "aksh-touch"
        );

    } else {

        document.documentElement.classList.add(
            "aksh-pointer"
        );

    }


    /* =====================================================
       ONLINE / OFFLINE STATE
       ===================================================== */

    function updateConnectionState() {

        document.documentElement.classList.toggle(
            "aksh-offline",
            !navigator.onLine
        );

    }


    updateConnectionState();


    window.addEventListener(
        "online",
        updateConnectionState
    );


    window.addEventListener(
        "offline",
        updateConnectionState
    );


    /* =====================================================
       GLOBAL VISIBILITY STATE
       ===================================================== */

    document.addEventListener(
        "visibilitychange",
        () => {

            document.documentElement.classList.toggle(
                "aksh-tab-hidden",
                document.hidden
            );

        }
    );


    /* =====================================================
       FINAL GLOBAL EVENT
       Other AKSH files can listen for this.
       ===================================================== */

    document.dispatchEvent(
        new CustomEvent(
            "aksh:global-ready"
        )
    );


    console.log(
        "AKSH Global System — Ready"
    );

});
