/* =========================================================
   AKSH — 03 THE MIND
   page3.js
   ========================================================= */

(() => {
  "use strict";

  /* =======================================================
     CONFIG
     ======================================================= */

  const CONFIG = {
    transitionDuration: 600
  };


  /* =======================================================
     ELEMENTS
     ======================================================= */

  const page =
    document.querySelector("#mind-page");

  const header =
    document.querySelector(".mind-header");

  const floatingBook =
    document.querySelector(".mind-floating-book");

  const revealItems =
    document.querySelectorAll(
      ".mind-introduction-content, " +
      ".mind-layer-card, " +
      ".mind-experiences-heading, " +
      ".mind-experience, " +
      ".mind-learning-copy, " +
      ".learning-item, " +
      ".mind-support-content, " +
      ".mind-ai, " +
      ".mind-next"
    );


  /* =======================================================
     PAGE TRANSITION
     ======================================================= */

  const transition =
    document.createElement("div");

  transition.setAttribute(
    "aria-hidden",
    "true"
  );

  transition.style.cssText = `
    position: fixed;
    inset: 0;
    z-index: 99999;
    background: #0b0b0d;
    opacity: 0;
    pointer-events: none;
    transition:
      opacity ${CONFIG.transitionDuration}ms
      cubic-bezier(.16,1,.3,1);
  `;

  document.body.appendChild(
    transition
  );


  let navigating = false;


  function navigateTo(url) {

    if (
      !url ||
      navigating
    ) {
      return;
    }

    navigating = true;

    transition.style.pointerEvents =
      "auto";

    transition.style.opacity =
      "1";

    window.setTimeout(
      () => {
        window.location.href = url;
      },
      CONFIG.transitionDuration
    );

  }


  /* =======================================================
     INTERNAL NAVIGATION
     ======================================================= */

  const navigationLinks =
    document.querySelectorAll(
      "a[href]"
    );


  navigationLinks.forEach(
    (link) => {

      link.addEventListener(
        "click",
        (event) => {

          const href =
            link.getAttribute("href");

          if (!href) {
            return;
          }

          /*
             Allow:
             - anchors
             - telephone links
             - email links
             - external links
          */

          if (
            href.startsWith("#") ||
            href.startsWith("tel:") ||
            href.startsWith("mailto:") ||
            href.startsWith("http://") ||
            href.startsWith("https://")
          ) {
            return;
          }

          event.preventDefault();

          navigateTo(href);

        }
      );

    }
  );


  /* =======================================================
     HEADER SCROLL STATE
     ======================================================= */

  function updateHeader() {

    if (!header) {
      return;
    }

    if (
      window.scrollY > 30
    ) {

      header.classList.add(
        "header-scrolled"
      );

    } else {

      header.classList.remove(
        "header-scrolled"
      );

    }

  }


  window.addEventListener(
    "scroll",
    updateHeader,
    {
      passive: true
    }
  );


  updateHeader();


  /* =======================================================
     REVEAL ANIMATIONS
     ======================================================= */

  revealItems.forEach(
    (item) => {

      item.classList.add(
        "reveal-item"
      );

    }
  );


  const reduceMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;


  if (
    reduceMotion ||
    !("IntersectionObserver" in window)
  ) {

    revealItems.forEach(
      (item) => {

        item.classList.add(
          "is-visible"
        );

      }
    );

  } else {

    const revealObserver =
      new IntersectionObserver(
        (entries) => {

          entries.forEach(
            (entry) => {

              if (
                entry.isIntersecting
              ) {

                entry.target.classList.add(
                  "is-visible"
                );

                revealObserver.unobserve(
                  entry.target
                );

              }

            }
          );

        },
        {
          threshold: 0.12,
          rootMargin: "0px 0px -40px 0px"
        }
      );


    revealItems.forEach(
      (item) => {

        revealObserver.observe(
          item
        );

      }
    );

  }


  /* =======================================================
     LAYER CARD INTERACTION
     ======================================================= */

  const layerCards =
    Array.from(
      document.querySelectorAll(
        ".mind-layer-card"
      )
    );


  layerCards.forEach(
    (card) => {

      card.setAttribute(
        "tabindex",
        "0"
      );


      card.addEventListener(
        "click",
        () => {

          layerCards.forEach(
            (otherCard) => {

              otherCard.classList.remove(
                "world-card-active"
              );

            }
          );

          card.classList.add(
            "world-card-active"
          );

        }
      );


      card.addEventListener(
        "keydown",
        (event) => {

          if (
            event.key === "Enter" ||
            event.key === " "
          ) {

            event.preventDefault();

            card.click();

          }

        }
      );

    }
  );


  /* =======================================================
     EXPERIENCE LIST INTERACTION
     ======================================================= */

  const experiences =
    document.querySelectorAll(
      ".mind-experience"
    );


  experiences.forEach(
    (item) => {

      item.addEventListener(
        "click",
        () => {

          experiences.forEach(
            (otherItem) => {

              otherItem.classList.remove(
                "experience-active"
              );

            }
          );

          item.classList.add(
            "experience-active"
          );

        }
      );

    }
  );


  /* =======================================================
     LEARNING ITEMS
     ======================================================= */

  const learningItems =
    document.querySelectorAll(
      ".learning-item"
    );


  learningItems.forEach(
    (item) => {

      item.addEventListener(
        "click",
        () => {

          learningItems.forEach(
            (otherItem) => {

              otherItem.classList.remove(
                "learning-active"
              );

            }
          );

          item.classList.add(
            "learning-active"
          );

        }
      );

    }
  );


  /* =======================================================
     FLOATING BOOK BUTTON
     ======================================================= */

  let previousScroll =
    window.scrollY;


  function updateFloatingBook() {

    if (!floatingBook) {
      return;
    }

    const currentScroll =
      window.scrollY;


    /*
       Keep the booking button visible
       near the top of the page.
    */

    if (
      currentScroll < 180
    ) {

      floatingBook.classList.remove(
        "book-hidden"
      );

      previousScroll =
        currentScroll;

      return;

    }


    /*
       Hide while scrolling down.
    */

    if (
      currentScroll >
      previousScroll + 5
    ) {

      floatingBook.classList.add(
        "book-hidden"
      );

    }


    /*
       Show while scrolling up.
    */

    if (
      currentScroll <
      previousScroll - 5
    ) {

      floatingBook.classList.remove(
        "book-hidden"
      );

    }


    previousScroll =
      currentScroll;

  }


  window.addEventListener(
    "scroll",
    updateFloatingBook,
    {
      passive: true
    }
  );


  /* =======================================================
     SMOOTH ANCHOR SCROLL
     ======================================================= */

  document
    .querySelectorAll(
      'a[href^="#"]'
    )
    .forEach(
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

            target.scrollIntoView({
              behavior:
                reduceMotion
                  ? "auto"
                  : "smooth",
              block: "start"
            });

          }
        );

      }
    );


  /* =======================================================
     PAGE LOAD
     ======================================================= */

  function initialise() {

    if (page) {

      page.classList.add(
        "world-ready"
      );

    }

    /*
       Small delay prevents the page from
       appearing unfinished during loading.
    */

    window.setTimeout(
      () => {

        if (page) {

          page.classList.add(
            "world-loaded"
          );

        }

      },
      50
    );

  }


  /* =======================================================
     PAGE CACHE / BACK BUTTON
     ======================================================= */

  window.addEventListener(
    "pageshow",
    () => {

      navigating = false;

      transition.style.opacity =
        "0";

      transition.style.pointerEvents =
        "none";

    }
  );


  /* =======================================================
     PUBLIC AKSH OBJECT
     ======================================================= */

  window.AKSHMind = {

    navigateTo,

    getLayerCards() {
      return layerCards;
    },

    getExperiences() {
      return Array.from(
        experiences
      );
    }

  };


  /* =======================================================
     START
     ======================================================= */

  if (
    document.readyState ===
    "loading"
  ) {

    document.addEventListener(
      "DOMContentLoaded",
      initialise,
      {
        once: true
      }
    );

  } else {

    initialise();

  }

})();
