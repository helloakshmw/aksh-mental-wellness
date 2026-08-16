/* =========================================================
   AKSH — JOURNAL
   journal.js
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const nav =
        document.getElementById("journal-nav");

    const menuButton =
        document.getElementById("menu-button");

    const mobileMenu =
        document.getElementById("mobile-menu");

    const mobileClose =
        document.getElementById("mobile-close");

    const reader =
        document.getElementById("article-reader");

    const readerClose =
        document.getElementById("reader-close");

    const readerTitle =
        document.getElementById("reader-title");

    const readerBody =
        document.getElementById("reader-body");

    const year =
        document.getElementById("journal-year");


    /* =====================================================
       YEAR
    ===================================================== */

    if (year) {
        year.textContent =
            new Date().getFullYear();
    }


    /* =====================================================
       NAVIGATION ON SCROLL
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
       CLOSE MOBILE MENU WHEN LINK IS CLICKED
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
       CLOSE MENU WITH ESCAPE
    ===================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (event.key === "Escape") {

                closeMenu();

                closeReader();

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
       ARTICLE DATA
    ===================================================== */

    const articles = {

        featured: {

            title:
                "When your mind feels tired before your day even begins.",

            body: [

                "Sometimes emotional exhaustion does not arrive loudly. It can appear as difficulty concentrating, feeling disconnected, losing motivation or simply needing more space than usual.",

                "A tired mind does not always mean that something is wrong with you. Our emotional and psychological energy can be influenced by stress, responsibilities, relationships, uncertainty and the amount of recovery we allow ourselves.",

                "The first step does not always have to be fixing everything. Sometimes it can simply be noticing what is happening without judging yourself for it.",

                "If these experiences are persistent, intense or affecting everyday life, speaking with a qualified mental-health professional can provide a more individual understanding of what you are experiencing."

            ]

        },


        mind: {

            title:
                "Why do I keep overthinking everything?",

            body: [

                "Thinking helps us understand situations, prepare for possibilities and make decisions. Overthinking can feel different because the same thoughts may continue without bringing us closer to clarity.",

                "You may notice yourself replaying conversations, imagining different outcomes or repeatedly questioning decisions that have already been made.",

                "Instead of immediately fighting the thoughts, it can be useful to notice the pattern: What triggers it? What emotion is underneath it? What are you hoping to resolve?",

                "Understanding the pattern can create a little distance between you and the thought itself."

            ]

        },


        stress: {

            title:
                "What stress is trying to tell you.",

            body: [

                "Stress is part of the human response to situations that feel demanding, uncertain or threatening.",

                "The experience can affect attention, sleep, emotions, energy and the way we respond to people around us.",

                "Rather than treating every signal as something to suppress, noticing what is creating pressure can be an important part of understanding your needs.",

                "Small changes in rest, boundaries, support and daily routines may matter. When stress becomes persistent or significantly affects your life, professional support may be appropriate."

            ]

        },


        relationships: {

            title:
                "Boundaries are not walls.",

            body: [

                "A boundary communicates what feels acceptable, what does not and what you need in order to participate in a relationship in a healthier way.",

                "Boundaries are not necessarily about pushing people away. They can create clearer expectations and make relationships more honest.",

                "Healthy boundaries can look different from person to person. They may involve time, communication, emotional space, privacy or responsibilities.",

                "Learning to communicate a boundary does not guarantee that everyone will agree with it. It does, however, allow you to communicate your needs more clearly."

            ]

        },


        "young-minds": {

            title:
                "When academic pressure becomes emotional pressure.",

            body: [

                "Academic environments can bring achievement, expectations, comparison and uncertainty into a young person's everyday life.",

                "When performance becomes closely connected with identity or self-worth, ordinary academic challenges can begin to feel much heavier.",

                "Young people may need space to talk about more than marks. Their emotions, relationships, fears, identity and sense of belonging are also part of their wellbeing.",

                "Support begins with listening without immediately turning every conversation into a solution."

            ]

        },


        "self-care": {

            title:
                "Rest is not something you have to earn.",

            body: [

                "Rest is often treated as something we deserve only after everything else is finished.",

                "But recovery is part of functioning. Constantly pushing through exhaustion can make it harder to think clearly, regulate emotions and stay connected with ourselves and others.",

                "Rest can mean sleep, quiet, movement, time away from demands, meaningful connection or simply allowing yourself not to be productive for a while.",

                "There is no single definition of healthy rest. The important part is noticing what genuinely helps you recover."

            ]

        }

    };


    /* =====================================================
       OPEN ARTICLE
    ===================================================== */

    function openArticle(articleKey) {

        if (!reader) return;

        const article =
            articles[articleKey];

        if (!article) return;

        if (readerTitle) {

            readerTitle.textContent =
                article.title;

        }


        if (readerBody) {

            readerBody.innerHTML = "";

            article.body.forEach(
                (paragraph) => {

                    const p =
                        document.createElement("p");

                    p.textContent =
                        paragraph;

                    readerBody.appendChild(p);

                }
            );

        }


        reader.classList.add("open");

        reader.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.classList.add(
            "reader-open"
        );

        reader.scrollTop = 0;

    }


    /* =====================================================
       CLOSE ARTICLE
    ===================================================== */

    function closeReader() {

        if (!reader) return;

        reader.classList.remove("open");

        reader.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.classList.remove(
            "reader-open"
        );

    }


    /* =====================================================
       FEATURED ARTICLE BUTTON
    ===================================================== */

    const readButton =
        document.querySelector(
            ".read-button"
        );

    if (readButton) {

        readButton.addEventListener(
            "click",
            () => {

                const articleKey =
                    readButton.dataset.article ||
                    "featured";

                openArticle(articleKey);

            }
        );

    }


    /* =====================================================
       ARTICLE ROWS
    ===================================================== */

    const articleRows =
        document.querySelectorAll(
            ".article-row"
        );

    articleRows.forEach((row) => {

        row.addEventListener(
            "click",
            () => {

                const category =
                    row.dataset.category;

                if (category) {

                    openArticle(category);

                }

            }
        );

    });


    /* =====================================================
       CLOSE READER
    ===================================================== */

    if (readerClose) {

        readerClose.addEventListener(
            "click",
            closeReader
        );

    }


    /* =====================================================
       CATEGORY FILTER / INTERACTION
    ===================================================== */

    const categoryCards =
        document.querySelectorAll(
            ".category-card"
        );


    categoryCards.forEach((card) => {

        card.addEventListener(
            "click",
            () => {

                const category =
                    card.dataset.category;

                categoryCards.forEach(
                    (otherCard) => {

                        otherCard.classList.remove(
                            "selected"
                        );

                    }
                );

                card.classList.add(
                    "selected"
                );


                if (!category) return;


                const matchingArticles =
                    document.querySelectorAll(
                        `.article-row[data-category="${category}"]`
                    );


                if (
                    matchingArticles.length > 0
                ) {

                    matchingArticles[0].scrollIntoView({
                        behavior: "smooth",
                        block: "center"
                    });

                }

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

                if (!target) return;

                event.preventDefault();

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
            ".journal-intro, " +
            ".featured-section, " +
            ".journal-categories, " +
            ".latest-section, " +
            ".expert-section, " +
            ".education-section, " +
            ".journal-note, " +
            ".journal-final"
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
                    threshold: 0.08
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
       IMAGE FALLBACK
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
       PAGE READY
    ===================================================== */

    requestAnimationFrame(() => {

        document.documentElement.classList.add(
            "journal-ready"
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

    if (reader) {

        reader.setAttribute(
            "aria-hidden",
            "true"
        );

    }

});
