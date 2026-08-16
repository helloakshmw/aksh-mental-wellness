/* =========================================================
   AKSH — 04 WITH YOU
   page4.js
   ========================================================= */

(() => {
  "use strict";

  /* =======================================================
     ELEMENTS
     ======================================================= */

  const page =
    document.getElementById("withyou-page");

  const header =
    document.getElementById("withyou-header");

  const floatingBook =
    document.querySelector(".withyou-floating-book");

  const revealElements =
    document.querySelectorAll(
      ".withyou-intro-content, " +
      ".withyou-service-card, " +
      ".withyou-feature-content, " +
      ".withyou-relationship, " +
      ".withyou-education-copy, " +
      ".education-item, " +
      ".withyou-online, " +
      ".withyou-safe-inner, " +
      ".withyou-ai, " +
      ".withyou-final"
    );


  /* =======================================================
     SETTINGS
     ======================================================= */

  const reduceMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;


  /* =======================================================
     PAGE READY
     ======================================================= */

  function initialisePage() {

    if (page) {
      page.classList.add("world-ready");
    }

    requestAnimationFrame(() => {

      if (page) {
        page.classList.add("world-loaded");
      }

    });

  }


  /* =======================================================
     HEADER SCROLL EFFECT
     ======================================================= */

  function updateHeader() {

    if (!header) {
      return;
    }

    if (window.scrollY > 30) {

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
     SCROLL REVEALS
     ======================================================= */

  revealElements.forEach(
    (element) => {

      element.classList.add(
        "reveal-item"
      );

    }
  );


  if (
    reduceMotion ||
    !("IntersectionObserver" in window)
  ) {

    revealElements.forEach(
      (element) => {

        element.classList.add(
          "is-visible"
        );

      }
    );

  } else {

    const revealObserver =
      new IntersectionObserver(
        (entries, observer) => {

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
          threshold: 0.12,
          rootMargin:
            "0px 0px -50px 0px"
        }
      );


    revealElements.forEach(
      (element) => {

        revealObserver.observe(
          element
        );

      }
    );

  }


  /* =======================================================
     SMOOTH INTERNAL ANCHOR LINKS
     ======================================================= */

  const anchorLinks =
    document.querySelectorAll(
      'a[href^="#"]'
    );


  anchorLinks.forEach(
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
     PAGE NAVIGATION TRANSITION
     ======================================================= */

  const transition =
    document.createElement("div");

  transition.setAttribute(
    "aria-hidden",
    "true"
  );

  transition.style.position =
    "fixed";

  transition.style.inset =
    "0";

  transition.style.zIndex =
    "99999";

  transition.style.background =
    "#0b0b0d";

  transition.style.opacity =
    "0";

  transition.style.pointerEvents =
    "none";

  transition.style.transition =
    "opacity .6s cubic-bezier(.16,1,.3,1)";

  document.body.appendChild(
    transition
  );


  let navigating = false;


  function navigateWithTransition(
    url
  ) {

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

        window.location.href =
          url;

      },
      600
    );

  }


  /* =======================================================
     NORMAL INTERNAL PAGE LINKS
     ======================================================= */

  const internalLinks =
    document.querySelectorAll(
      'a[href]'
    );


  internalLinks.forEach(
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
             Do not intercept:
             - same-page anchors
             - phone
             - email
             - external URLs
             - new-tab links
          */

          if (
            href.startsWith("#") ||
            href.startsWith("tel:") ||
            href.startsWith("mailto:") ||
            href.startsWith("http://") ||
            href.startsWith("https://") ||
            link.target === "_blank"
          ) {
            return;
          }

          event.preventDefault();

          navigateWithTransition(
            href
          );

        }
      );

    }
  );


  /* =======================================================
     SERVICE CARD INTERACTION
     ======================================================= */

  const serviceCards =
    document.querySelectorAll(
      ".withyou-service-card"
    );


  serviceCards.forEach(
    (card) => {

      card.addEventListener(
        "click",
        () => {

          serviceCards.forEach(
            (otherCard) => {

              otherCard.classList.remove(
                "service-active"
              );

            }
          );

          card.classList.add(
            "service-active"
          );

        }
      );

    }
  );


  /* =======================================================
     EDUCATION ITEM INTERACTION
     ======================================================= */

  const educationItems =
    document.querySelectorAll(
      ".education-item"
    );


  educationItems.forEach(
    (item) => {

      item.addEventListener(
        "click",
        () => {

          educationItems.forEach(
            (otherItem) => {

              otherItem.classList.remove(
                "education-active"
              );

            }
          );

          item.classList.add(
            "education-active"
          );

        }
      );

    }
  );


  /* =======================================================
     FLOATING BOOK BUTTON
     ======================================================= */

  let lastScrollY =
    window.scrollY;


  function updateFloatingBook() {

    if (!floatingBook) {
      return;
    }

    const currentScrollY =
      window.scrollY;


    /*
       Always show near the top.
    */

    if (
      currentScrollY < 150
    ) {

      floatingBook.classList.remove(
        "book-hidden"
      );

      lastScrollY =
        currentScrollY;

      return;

    }


    /*
       Scrolling down:
       hide slightly.
    */

    if (
      currentScrollY >
      lastScrollY + 8
    ) {

      floatingBook.classList.add(
        "book-hidden"
      );

    }


    /*
       Scrolling up:
       show again.
    */

    if (
      currentScrollY <
      lastScrollY - 8
    ) {

      floatingBook.classList.remove(
        "book-hidden"
      );

    }


    lastScrollY =
      currentScrollY;

  }


  window.addEventListener(
    "scroll",
    updateFloatingBook,
    {
      passive: true
    }
  );


  /* =======================================================
     BACK / FORWARD CACHE HANDLING
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
     PUBLIC AKSH WITH YOU OBJECT
     ======================================================= */

  window.AKSHWithYou = {

    navigateTo(url) {
      navigateWithTransition(url);
    },

    scrollTo(sectionId) {

      const target =
        document.getElementById(
          sectionId
        );

      if (!target) {
        return;
      }

      target.scrollIntoView({
        behavior:
          reduceMotion
            ? "auto"
            : "smooth",
        block: "start"
      });

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
      initialisePage,
      {
        once: true
      }
    );

  } else {

    initialisePage();

  }

})();
