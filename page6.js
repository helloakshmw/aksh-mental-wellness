/* =========================================================
   AKSH — 06 THE JOURNEY
   page6.js
   ========================================================= */

(() => {
  "use strict";

  const page = document.getElementById("journey-page");

  if (!page) return;


  /* =======================================================
     PAGE LOAD
     ======================================================= */

  window.requestAnimationFrame(() => {
    page.classList.add("world-loaded");
  });


  /* =======================================================
     HEADER
     ======================================================= */

  const header =
    document.getElementById("journey-header");

  const updateHeader = () => {

    if (!header) return;

    if (window.scrollY > 35) {
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
    ".journey-intro-content",
    ".journey-steps-heading",
    ".journey-step",
    ".journey-support-copy",
    ".journey-support-item",
    ".journey-paths-heading",
    ".journey-path",
    ".journey-growth-heading",
    ".growth-phase",
    ".journey-closing"
  ];

  const revealElements =
    document.querySelectorAll(
      revealSelectors.join(",")
    );


  revealElements.forEach((element) => {
    element.classList.add("journey-reveal");
  });


  if ("IntersectionObserver" in window) {

    const revealObserver =
      new IntersectionObserver(
        (entries, observer) => {

          entries.forEach((entry) => {

            if (!entry.isIntersecting) return;

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
            "0px 0px -45px 0px"
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
     STAGGER JOURNEY STEPS
     ======================================================= */

  const journeySteps =
    document.querySelectorAll(
      ".journey-step"
    );

  journeySteps.forEach(
    (step, index) => {

      step.style.transitionDelay =
        `${Math.min(index * 90, 450)}ms`;

    }
  );


  /* =======================================================
     STAGGER SUPPORT ITEMS
     ======================================================= */

  const supportItems =
    document.querySelectorAll(
      ".journey-support-item"
    );

  supportItems.forEach(
    (item, index) => {

      item.style.transitionDelay =
        `${Math.min(index * 90, 360)}ms`;

    }
  );


  /* =======================================================
     STAGGER PATH CARDS
     ======================================================= */

  const pathCards =
    document.querySelectorAll(
      ".journey-path"
    );

  pathCards.forEach(
    (card, index) => {

      card.style.transitionDelay =
        `${Math.min(index * 80, 320)}ms`;

    }
  );


  /* =======================================================
     STAGGER GROWTH PHASES
     ======================================================= */

  const growthPhases =
    document.querySelectorAll(
      ".growth-phase"
    );

  growthPhases.forEach(
    (phase, index) => {

      phase.style.transitionDelay =
        `${Math.min(index * 100, 400)}ms`;

    }
  );


  /* =======================================================
     SMOOTH INTERNAL LINKS
     ======================================================= */

  const internalLinks =
    document.querySelectorAll(
      'a[href^="#"]'
    );

  internalLinks.forEach((link) => {

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

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      }
    );

  });


  /* =======================================================
     JOURNEY STEP HOVER
     ======================================================= */

  journeySteps.forEach((step) => {

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


  /* =======================================================
     PATH CARD KEYBOARD ACCESS
     ======================================================= */

  pathCards.forEach((card) => {

    card.addEventListener(
      "focus",
      () => {
        card.classList.add(
          "path-focused"
        );
      }
    );

    card.addEventListener(
      "blur",
      () => {
        card.classList.remove(
          "path-focused"
        );
      }
    );

  });


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
     ESCAPE KEY
     ======================================================= */

  document.addEventListener(
    "keydown",
    (event) => {

      if (event.key !== "Escape") return;

      const active =
        document.activeElement;

      if (
        active &&
        typeof active.blur ===
        "function"
      ) {

        active.blur();

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
     DEBUG
     ======================================================= */

  console.log(
    "AKSH — Page 06: The Journey loaded."
  );

})();
