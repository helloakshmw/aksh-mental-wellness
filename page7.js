/* =========================================================
   AKSH — 07 STORIES
   page7.js
   ========================================================= */

(() => {
  "use strict";

  const page = document.getElementById("stories-page");

  if (!page) {
    console.warn("AKSH Page 07: stories-page not found.");
    return;
  }


  /* =======================================================
     PAGE INTRO
     ======================================================= */

  window.requestAnimationFrame(() => {
    page.classList.add("world-loaded");
  });


  /* =======================================================
     HEADER SCROLL STATE
     ======================================================= */

  const header =
    document.getElementById("stories-header");

  const updateHeader = () => {

    if (!header) return;

    if (window.scrollY > 40) {
      header.classList.add("header-scrolled");
    } else {
      header.classList.remove("header-scrolled");
    }

  };

  updateHeader();

  window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
  );


  /* =======================================================
     SCROLL REVEAL
     ======================================================= */

  const revealSelectors = [
    ".stories-intro-content",
    ".stories-principles-heading",
    ".story-principle",
    ".stories-collection-heading",
    ".story-card",
    ".stories-founder-content",
    ".stories-community-heading",
    ".community-card",
    ".stories-closing"
  ];

  const revealElements =
    document.querySelectorAll(
      revealSelectors.join(",")
    );


  revealElements.forEach((element) => {
    element.classList.add("stories-reveal");
  });


  if (
    "IntersectionObserver" in window
  ) {

    const revealObserver =
      new IntersectionObserver(
        (entries, observer) => {

          entries.forEach((entry) => {

            if (!entry.isIntersecting) {
              return;
            }

            entry.target.classList.add(
              "is-visible"
            );

            observer.unobserve(
              entry.target
            );

          });

        },
        {
          threshold: 0.12,
          rootMargin:
            "0px 0px -50px 0px"
        }
      );


    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });

  } else {

    revealElements.forEach((element) => {
      element.classList.add("is-visible");
    });

  }


  /* =======================================================
     STAGGER PRINCIPLES
     ======================================================= */

  const principles =
    document.querySelectorAll(
      ".story-principle"
    );

  principles.forEach(
    (item, index) => {

      item.style.transitionDelay =
        `${Math.min(index * 90, 360)}ms`;

    }
  );


  /* =======================================================
     STAGGER STORY CARDS
     ======================================================= */

  const storyCards =
    document.querySelectorAll(
      ".story-card"
    );

  storyCards.forEach(
    (card, index) => {

      card.style.transitionDelay =
        `${Math.min(index * 100, 300)}ms`;

    }
  );


  /* =======================================================
     STAGGER COMMUNITY CARDS
     ======================================================= */

  const communityCards =
    document.querySelectorAll(
      ".community-card"
    );

  communityCards.forEach(
    (card, index) => {

      card.style.transitionDelay =
        `${Math.min(index * 90, 270)}ms`;

    }
  );


  /* =======================================================
     SMOOTH INTERNAL ANCHOR LINKS
     ======================================================= */

  const anchorLinks =
    document.querySelectorAll(
      'a[href^="#"]'
    );

  anchorLinks.forEach((link) => {

    link.addEventListener(
      "click",
      (event) => {

        const targetID =
          link.getAttribute("href");

        if (
          !targetID ||
          targetID === "#"
        ) {
          return;
        }

        const target =
          document.querySelector(
            targetID
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


  /* =======================================================
     STORY CARD INTERACTION
     ======================================================= */

  storyCards.forEach((card) => {

    card.addEventListener(
      "mouseenter",
      () => {
        card.classList.add(
          "story-active"
        );
      }
    );

    card.addEventListener(
      "mouseleave",
      () => {
        card.classList.remove(
          "story-active"
        );
      }
    );

  });


  /* =======================================================
     COMMUNITY CARD INTERACTION
     ======================================================= */

  communityCards.forEach((card) => {

    card.addEventListener(
      "mouseenter",
      () => {
        card.classList.add(
          "community-active"
        );
      }
    );

    card.addEventListener(
      "mouseleave",
      () => {
        card.classList.remove(
          "community-active"
        );
      }
    );

  });


  /* =======================================================
     KEYBOARD ACCESSIBILITY
     ======================================================= */

  const interactiveElements =
    document.querySelectorAll(
      "a, button"
    );

  interactiveElements.forEach(
    (element) => {

      element.addEventListener(
        "focus",
        () => {
          element.classList.add(
            "keyboard-focused"
          );
        }
      );

      element.addEventListener(
        "blur",
        () => {
          element.classList.remove(
            "keyboard-focused"
          );
        }
      );

    }
  );


  /* =======================================================
     ESCAPE KEY
     ======================================================= */

  document.addEventListener(
    "keydown",
    (event) => {

      if (event.key !== "Escape") {
        return;
      }

      const activeElement =
        document.activeElement;

      if (
        activeElement &&
        typeof activeElement.blur ===
          "function"
      ) {
        activeElement.blur();
      }

    }
  );


  /* =======================================================
     PAGE VISIBILITY
     ======================================================= */

  document.addEventListener(
    "visibilitychange",
    () => {

      if (
        document.visibilityState ===
        "visible"
      ) {

        page.classList.add(
          "page-active"
        );

      } else {

        page.classList.remove(
          "page-active"
        );

      }

    }
  );


  /* =======================================================
     REDUCED MOTION
     ======================================================= */

  const reducedMotion =
    window.matchMedia &&
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;


  if (reducedMotion) {

    page.classList.add(
      "reduced-motion"
    );

  }


  /* =======================================================
     SAFETY CHECK
     ======================================================= */

  const missingLinks = [];

  document
    .querySelectorAll("a[href]")
    .forEach((link) => {

      const href =
        link.getAttribute("href");

      if (
        !href ||
        href.startsWith("#") ||
        href.startsWith("http") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:")
      ) {
        return;
      }

      /*
       * We intentionally do not fetch pages here.
       * This keeps Page 7 lightweight and avoids
       * unnecessary network requests.
       */
    });


  /* =======================================================
     DEBUG
     ======================================================= */

  console.log(
    "AKSH — Page 07: Stories loaded successfully."
  );

})();
