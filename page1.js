/* =========================================================
   AKSH — PAGE 01 JS
   PREMIUM CINEMATIC ATMOSPHERIC WORLD
   ========================================================= */

(() => {
  "use strict";

  /* =======================================================
     DOM
     ======================================================= */

  const body = document.body;

  const header = document.querySelector(".header");
  const menuButton = document.querySelector(".menu-button");
  const nav = document.querySelector(".nav");

  const emotionTrack = document.querySelector(".emotion-track");
  const emotions = document.querySelectorAll(".emotion");

  const beginButtons = document.querySelectorAll(
    ".begin-button, .begin-primary, .ai-button"
  );

  const exploreLinks = document.querySelectorAll(
    ".explore-link, .founder-link"
  );


  /* =======================================================
     TIME OF DAY
     Automatically changes the atmosphere.

     Morning   : 05:00 — 11:59
     Afternoon : 12:00 — 16:59
     Evening   : 17:00 — 20:59
     Night     : 21:00 — 04:59
     ======================================================= */

  function updateTimeAtmosphere() {
    const hour = new Date().getHours();

    body.classList.remove(
      "morning",
      "afternoon",
      "evening",
      "night"
    );

    if (hour >= 5 && hour < 12) {
      body.classList.add("morning");
    } else if (hour >= 12 && hour < 17) {
      body.classList.add("afternoon");
    } else if (hour >= 17 && hour < 21) {
      body.classList.add("evening");
    } else {
      body.classList.add("night");
    }
  }

  updateTimeAtmosphere();

  /* Update every minute */
  setInterval(updateTimeAtmosphere, 60000);


  /* =======================================================
     HEADER SCROLL
     ======================================================= */

  function updateHeader() {
    if (!header) return;

    if (window.scrollY > 30) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }

  updateHeader();

  window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
  );


  /* =======================================================
     MOBILE MENU
     ======================================================= */

  if (menuButton && header) {
    menuButton.addEventListener("click", () => {
      const isOpen = header.classList.toggle("mobile-open");

      menuButton.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

      document.body.style.overflow = isOpen
        ? "hidden"
        : "";
    });
  }


  /* =======================================================
     CLOSE MOBILE MENU WHEN NAV ITEM IS CLICKED
     ======================================================= */

  if (nav && header) {
    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        header.classList.remove("mobile-open");

        if (menuButton) {
          menuButton.setAttribute(
            "aria-expanded",
            "false"
          );
        }

        document.body.style.overflow = "";
      });
    });
  }


  /* =======================================================
     ESCAPE KEY
     ======================================================= */

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      if (header) {
        header.classList.remove("mobile-open");
      }

      if (menuButton) {
        menuButton.setAttribute(
          "aria-expanded",
          "false"
        );
      }

      document.body.style.overflow = "";
    }
  });


  /* =======================================================
     EMOTION CARDS
     Small cinematic interaction.

     Cards remain compact.
     Clicking a card can reveal its state without
     forcing the user into a huge popup.
     ======================================================= */

  emotions.forEach((card) => {
    card.addEventListener("click", () => {

      emotions.forEach((item) => {
        item.classList.remove("active");
      });

      card.classList.add("active");

      const emotionName =
        card.querySelector(".emotion-title")?.textContent?.trim();

      if (emotionName) {
        console.log(
          `AKSH feeling selected: ${emotionName}`
        );
      }
    });
  });


  /* =======================================================
     HORIZONTAL EMOTION TRACK
     DESKTOP MOUSE WHEEL

     Converts vertical wheel movement into subtle
     horizontal movement only while the emotion track
     can still scroll horizontally.
     ======================================================= */

  if (emotionTrack) {

    emotionTrack.addEventListener(
      "wheel",
      (event) => {

        const canScrollLeft =
          emotionTrack.scrollLeft > 0;

        const canScrollRight =
          emotionTrack.scrollLeft +
          emotionTrack.clientWidth <
          emotionTrack.scrollWidth - 1;

        if (
          (event.deltaY > 0 && canScrollRight) ||
          (event.deltaY < 0 && canScrollLeft)
        ) {
          event.preventDefault();

          emotionTrack.scrollLeft +=
            event.deltaY * 0.85;
        }
      },
      { passive: false }
    );
  }


  /* =======================================================
     DRAG TO EXPLORE EMOTION WORLD
     Desktop only.
     ======================================================= */

  if (emotionTrack) {

    let isDragging = false;
    let startX = 0;
    let startScrollLeft = 0;

    emotionTrack.addEventListener(
      "pointerdown",
      (event) => {

        if (event.pointerType === "touch") return;

        isDragging = true;

        startX = event.clientX;
        startScrollLeft = emotionTrack.scrollLeft;

        emotionTrack.setPointerCapture?.(
          event.pointerId
        );
      }
    );

    emotionTrack.addEventListener(
      "pointermove",
      (event) => {

        if (!isDragging) return;

        const distance =
          event.clientX - startX;

        emotionTrack.scrollLeft =
          startScrollLeft - distance;
      }
    );

    const stopDragging = () => {
      isDragging = false;
    };

    emotionTrack.addEventListener(
      "pointerup",
      stopDragging
    );

    emotionTrack.addEventListener(
      "pointercancel",
      stopDragging
    );

    emotionTrack.addEventListener(
      "pointerleave",
      stopDragging
    );
  }


  /* =======================================================
     SMOOTH INTERNAL LINKS
     ======================================================= */

  document
    .querySelectorAll('a[href^="#"]')
    .forEach((link) => {

      link.addEventListener("click", (event) => {

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

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      });
    });


  /* =======================================================
     REVEAL ANIMATIONS
     ======================================================= */

  const revealElements = document.querySelectorAll(
    ".hero-kicker, .hero-title, .hero-description, " +
    ".hero-actions, .section-label, .section-title, " +
    ".section-intro, .emotion, .ai-layout, " +
    ".journey-step, .founder-layout, .begin-title, " +
    ".begin-copy, .begin-actions"
  );

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
          rootMargin: "0px 0px -8% 0px"
        }
      );

    revealElements.forEach((element) => {
      element.classList.add("aksh-reveal");
      revealObserver.observe(element);
    });

  } else {

    revealElements.forEach((element) => {
      element.classList.add("is-visible");
    });
  }


  /* =======================================================
     SUBTLE PARALLAX
     ======================================================= */

  const atmosphereElements = document.querySelectorAll(
    ".cloud, .light, .rainbow, .moon"
  );

  let ticking = false;

  function parallaxAtmosphere() {

    if (ticking) return;

    ticking = true;

    requestAnimationFrame(() => {

      const scrollY = window.scrollY;

      atmosphereElements.forEach(
        (element, index) => {

          const multiplier =
            index % 2 === 0
              ? 0.025
              : 0.04;

          element.style.transform =
            `translate3d(0, ${scrollY * multiplier}px, 0)`;
        }
      );

      ticking = false;
    });
  }

  window.addEventListener(
    "scroll",
    parallaxAtmosphere,
    { passive: true }
  );


  /* =======================================================
     BUTTON MICRO-INTERACTION
     ======================================================= */

  beginButtons.forEach((button) => {

    button.addEventListener(
      "pointerenter",
      () => {
        button.style.setProperty(
          "--aksh-hover-scale",
          "1.015"
        );
      }
    );

    button.addEventListener(
      "pointerleave",
      () => {
        button.style.setProperty(
          "--aksh-hover-scale",
          "1"
        );
      }
    );
  });


  /* =======================================================
     PREVENT DOUBLE-TAP ZOOM ON INTERACTIVE ELEMENTS
     ======================================================= */

  document
    .querySelectorAll(
      ".emotion, .begin-button, .begin-primary, " +
      ".begin-secondary, .ai-button, .menu-button"
    )
    .forEach((element) => {

      element.addEventListener(
        "touchstart",
        () => {},
        { passive: true }
      );
    });


  /* =======================================================
     PAGE VISIBILITY
     Pause unnecessary atmosphere calculations when
     the page is not visible.
     ======================================================= */

  document.addEventListener(
    "visibilitychange",
    () => {

      if (document.hidden) {
        body.classList.add(
          "aksh-page-hidden"
        );
      } else {
        body.classList.remove(
          "aksh-page-hidden"
        );

        updateTimeAtmosphere();
      }

    }
  );


  /* =======================================================
     ACCESSIBILITY
     ======================================================= */

  if (menuButton) {
    menuButton.setAttribute(
      "aria-expanded",
      "false"
    );

    menuButton.setAttribute(
      "aria-label",
      "Open AKSH navigation"
    );
  }


  /* =======================================================
     INITIALISE
     ======================================================= */

  document.documentElement.classList.add(
    "aksh-ready"
  );

  body.classList.add(
    "aksh-page-ready"
  );

})(); 
