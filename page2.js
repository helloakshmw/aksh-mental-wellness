/* =========================================================
   AKSH — 02 THE WORLD
   page2.js
   ========================================================= */

(() => {
  "use strict";

  /* =======================================================
     CONFIG
     ======================================================= */

  const CONFIG = {
    page1: "page1.html",
    page3: "page3.html",
    booking: "page9.html",
    transitionDuration: 600
  };


  /* =======================================================
     ELEMENTS
     ======================================================= */

  const page =
    document.querySelector("#world-page");

  const cards =
    Array.from(
      document.querySelectorAll(".world-card")
    );

  const links =
    Array.from(
      document.querySelectorAll("a")
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
     NAVIGATION LINKS
     ======================================================= */

  links.forEach((link) => {

    link.addEventListener(
      "click",
      (event) => {

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

        event.preventDefault();

        navigateTo(href);

      }
    );

  });


  /* =======================================================
     CARD INTERACTION
     ======================================================= */

  cards.forEach((card) => {

    card.addEventListener(
      "click",
      () => {

        cards.forEach(
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


    /* Keyboard accessibility */

    card.setAttribute(
      "tabindex",
      "0"
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

  });


  /* =======================================================
     REVEAL OBSERVER
     ======================================================= */

  const revealItems =
    document.querySelectorAll(
      ".world-card, \
       .world-introduction-content, \
       .world-support-heading, \
       .world-access-copy, \
       .world-access-options, \
       .world-purpose, \
       .world-next"
    );


  if (
    "IntersectionObserver"
    in window
  ) {

    const observer =
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

                observer.unobserve(
                  entry.target
                );

              }

            }
          );

        },
        {
          threshold: 0.12
        }
      );


    revealItems.forEach(
      (item) => {

        item.classList.add(
          "reveal-item"
        );

        observer.observe(
          item
        );

      }
    );

  } else {

    revealItems.forEach(
      (item) => {

        item.classList.add(
          "is-visible"
        );

      }
    );

  }


  /* =======================================================
     CURRENT SECTION INDICATOR
     ======================================================= */

  const sectionNumber =
    document.querySelector(
      ".world-section-number"
    );


  function updateSectionIndicator() {

    if (!sectionNumber) {
      return;
    }

    const scrollTop =
      window.scrollY;

    const pageHeight =
      document.documentElement.scrollHeight -
      window.innerHeight;

    if (
      pageHeight <= 0
    ) {
      return;
    }

    const percentage =
      Math.round(
        (scrollTop / pageHeight) *
        100
      );

    sectionNumber.textContent =
      `02 / ${String(
        percentage
      ).padStart(2, "0")}`;

  }


  window.addEventListener(
    "scroll",
    updateSectionIndicator,
    {
      passive: true
    }
  );


  updateSectionIndicator();


  /* =======================================================
     HEADER BACKGROUND ON SCROLL
     ======================================================= */

  const header =
    document.querySelector(
      ".world-header"
    );


  function updateHeader() {

    if (!header) {
      return;
    }

    if (
      window.scrollY > 35
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
     FLOATING BOOK BUTTON
     ======================================================= */

  const floatingBook =
    document.querySelector(
      ".floating-book"
    );


  if (floatingBook) {

    let lastScroll =
      window.scrollY;

    window.addEventListener(
      "scroll",
      () => {

        const currentScroll =
          window.scrollY;

        if (
          currentScroll >
          lastScroll &&
          currentScroll > 250
        ) {

          floatingBook.classList.add(
            "book-hidden"
          );

        } else {

          floatingBook.classList.remove(
            "book-hidden"
          );

        }

        lastScroll =
          currentScroll;

      },
      {
        passive: true
      }
    );

  }


  /* =======================================================
     PAGE LOAD
     ======================================================= */

  function initialise() {

    if (page) {

      page.classList.add(
        "world-ready"
      );

    }

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
     BACK/FORWARD CACHE
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
     REDUCED MOTION
     ======================================================= */

  if (
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
  ) {

    revealItems.forEach(
      (item) => {

        item.classList.add(
          "is-visible"
        );

      }
    );

  }


  /* =======================================================
     AKSH GLOBAL
     ======================================================= */

  window.AKSHWorld = {

    navigateTo,

    getCards: () => {
      return cards;
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
