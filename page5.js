/* =========================================================
   AKSH — 05 MEGHANA KAVERAPPA
   page5.js
   ========================================================= */

(() => {
  "use strict";

  /* -------------------------------------------------------
     PAGE READY
     ------------------------------------------------------- */

  const page = document.querySelector(".meghana-page");

  if (!page) return;


  /* -------------------------------------------------------
     HERO INTRODUCTION
     ------------------------------------------------------- */

  window.requestAnimationFrame(() => {
    window.setTimeout(() => {
      page.classList.add("world-loaded");
    }, 120);
  });


  /* -------------------------------------------------------
     HEADER SCROLL EFFECT
     ------------------------------------------------------- */

  const header = document.getElementById("meghana-header");

  const updateHeader = () => {
    if (!header) return;

    if (window.scrollY > 30) {
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


  /* -------------------------------------------------------
     SCROLL REVEALS
     ------------------------------------------------------- */

  const revealElements = document.querySelectorAll(
    [
      ".meghana-introduction-content",
      ".statement-content",
      ".profile-card",
      ".experience-item",
      ".education-item",
      ".aksh-role-copy",
      ".role-item",
      ".meghana-languages",
      ".meghana-final"
    ].join(",")
  );

  revealElements.forEach((element) => {
    element.classList.add("reveal-item");
  });


  if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {

        entries.forEach((entry) => {

          if (!entry.isIntersecting) return;

          entry.target.classList.add("is-visible");

          observer.unobserve(entry.target);

        });

      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
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


  /* -------------------------------------------------------
     STAGGER EXPERIENCE ITEMS
     ------------------------------------------------------- */

  const experienceItems = document.querySelectorAll(
    ".experience-item"
  );

  experienceItems.forEach((item, index) => {
    item.style.transitionDelay =
      `${Math.min(index * 80, 400)}ms`;
  });


  /* -------------------------------------------------------
     STAGGER EDUCATION ITEMS
     ------------------------------------------------------- */

  const educationItems = document.querySelectorAll(
    ".education-item"
  );

  educationItems.forEach((item, index) => {
    item.style.transitionDelay =
      `${Math.min(index * 80, 400)}ms`;
  });


  /* -------------------------------------------------------
     STAGGER PROFILE CARDS
     ------------------------------------------------------- */

  const profileCards = document.querySelectorAll(
    ".profile-card"
  );

  profileCards.forEach((card, index) => {
    card.style.transitionDelay =
      `${Math.min(index * 100, 500)}ms`;
  });


  /* -------------------------------------------------------
     SMOOTH INTERNAL NAVIGATION
     ------------------------------------------------------- */

  const internalLinks = document.querySelectorAll(
    'a[href^="#"]'
  );

  internalLinks.forEach((link) => {

    link.addEventListener("click", (event) => {

      const targetID =
        link.getAttribute("href");

      if (
        !targetID ||
        targetID === "#"
      ) {
        return;
      }

      const target =
        document.querySelector(targetID);

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    });

  });


  /* -------------------------------------------------------
     IMAGE LOAD STATE
     ------------------------------------------------------- */

  const founderImage =
    document.querySelector(".meghana-hero-image");

  if (founderImage) {

    const markImageLoaded = () => {
      founderImage.classList.add("image-loaded");
    };

    if (founderImage.complete) {
      markImageLoaded();
    } else {
      founderImage.addEventListener(
        "load",
        markImageLoaded,
        { once: true }
      );

      founderImage.addEventListener(
        "error",
        () => {
          console.warn(
            "AKSH: Meghana image could not be loaded."
          );
        },
        { once: true }
      );
    }
  }


  /* -------------------------------------------------------
     PAGE VISIBILITY
     ------------------------------------------------------- */

  document.addEventListener(
    "visibilitychange",
    () => {

      if (
        document.visibilityState === "visible"
      ) {
        page.classList.add("page-active");
      } else {
        page.classList.remove("page-active");
      }

    }
  );


  /* -------------------------------------------------------
     BASIC KEYBOARD ACCESSIBILITY
     ------------------------------------------------------- */

  document.addEventListener(
    "keydown",
    (event) => {

      if (event.key !== "Escape") return;

      const activeElement =
        document.activeElement;

      if (
        activeElement &&
        typeof activeElement.blur === "function"
      ) {
        activeElement.blur();
      }

    }
  );


  /* -------------------------------------------------------
     DEBUG MESSAGE
     ------------------------------------------------------- */

  console.log(
    "AKSH — Page 05: Meghana Kaverappa loaded."
  );

})();
