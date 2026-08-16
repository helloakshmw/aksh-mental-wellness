/* =========================================================
   AKSH — PAGE 01 JAVASCRIPT
   HOW ARE YOU FEELING TODAY?
   ========================================================= */

(() => {
  "use strict";

  /* =========================================================
     CONFIG
     ========================================================= */

  const CONFIG = {
    home: "index.html",
    booking: "page9.html",
    transitionTime: 650,
    storageKey: "aksh-selected-emotion"
  };

  /* =========================================================
     DOM
     ========================================================= */

  const page = document.querySelector(".page");

  const cards = Array.from(
    document.querySelectorAll(".emotion-card")
  );

  const buttons = Array.from(
    document.querySelectorAll(".emotion-button")
  );

  const brand = document.querySelector(".brand");

  /* =========================================================
     EMOTION DATA
     ========================================================= */

  const emotionData = {
    anxious: {
      title: "ANXIOUS",
      icon: "◌",
      message: "You don't have to figure everything out at once.",
      destination: CONFIG.booking
    },

    overwhelmed: {
      title: "OVERWHELMED",
      icon: "⌁",
      message: "You are allowed to pause.",
      destination: CONFIG.booking
    },

    talk: {
      title: "NEED TO TALK",
      icon: "○",
      message: "You don't need the perfect words.",
      destination: CONFIG.booking
    },

    exploring: {
      title: "JUST EXPLORING",
      icon: "✦",
      message: "Take your time. Explore AKSH at your own pace.",
      destination: null
    }
  };

  /* =========================================================
     STATE
     ========================================================= */

  let activeCard = null;
  let isTransitioning = false;

  /* =========================================================
     TRANSITION LAYER
     ========================================================= */

  const transition = document.createElement("div");

  transition.id = "aksh-page-transition";

  transition.style.cssText = `
    position: fixed;
    inset: 0;
    z-index: 99999;
    background: #050b09;
    opacity: 0;
    pointer-events: none;
    transition: opacity ${CONFIG.transitionTime}ms
      cubic-bezier(.16,1,.3,1);
  `;

  document.body.appendChild(transition);

  /* =========================================================
     NAVIGATION
     ========================================================= */

  function navigate(destination) {

    if (!destination || isTransitioning) {
      return;
    }

    isTransitioning = true;

    transition.style.pointerEvents = "auto";
    transition.style.opacity = "1";

    window.setTimeout(() => {
      window.location.href = destination;
    }, CONFIG.transitionTime);
  }

  /* =========================================================
     SELECT CARD
     ========================================================= */

  function selectCard(card) {

    if (!card) {
      return;
    }

    const emotion =
      card.dataset.emotion;

    if (!emotion) {
      return;
    }

    /* Remove active state from every card */

    cards.forEach((item) => {
      item.classList.remove("active");
      item.setAttribute(
        "aria-expanded",
        "false"
      );
    });

    /* Activate selected card */

    card.classList.add("active");

    card.setAttribute(
      "aria-expanded",
      "true"
    );

    activeCard = card;

    /* Remember selection */

    try {
      sessionStorage.setItem(
        CONFIG.storageKey,
        emotion
      );
    } catch (error) {
      /* Storage may be unavailable */
    }

    /* Update subtle page state */

    if (page) {

      page.dataset.emotion =
        emotion;

      page.classList.remove(
        "emotion-anxious",
        "emotion-overwhelmed",
        "emotion-talk",
        "emotion-exploring"
      );

      page.classList.add(
        `emotion-${emotion}`
      );
    }
  }

  /* =========================================================
     OPEN EMOTION EXPERIENCE
     ========================================================= */

  function openEmotion(card) {

    if (!card) {
      return;
    }

    const emotion =
      card.dataset.emotion;

    const data =
      emotionData[emotion];

    if (!data) {
      return;
    }

    /*
      First tap:
      reveal / activate card.

      Second tap:
      continue into its experience.
    */

    if (activeCard !== card) {

      selectCard(card);

      return;
    }

    /*
      EXPLORING stays inside Page 1.
      Scroll toward the next section when available.
    */

    if (emotion === "exploring") {

      const feelingArea =
        document.querySelector(
          ".feeling-area"
        );

      if (feelingArea) {

        feelingArea.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });

      }

      return;
    }

    /*
      Other emotions continue
      toward booking / next experience.
    */

    navigate(
      data.destination
    );
  }

  /* =========================================================
     CARD EVENTS
     ========================================================= */

  cards.forEach((card) => {

    const button =
      card.querySelector(
        ".emotion-button"
      );

    if (!button) {
      return;
    }

    button.setAttribute(
      "aria-expanded",
      "false"
    );

    button.addEventListener(
      "click",
      (event) => {

        event.preventDefault();
        event.stopPropagation();

        openEmotion(card);

      }
    );

  });

  /* =========================================================
     KEYBOARD SUPPORT
     ========================================================= */

  cards.forEach((card) => {

    card.addEventListener(
      "keydown",
      (event) => {

        if (
          event.key === "Enter" ||
          event.key === " "
        ) {

          event.preventDefault();

          openEmotion(card);
        }

      }
    );

  });

  /* =========================================================
     ESCAPE = CLOSE ACTIVE CARD
     ========================================================= */

  document.addEventListener(
    "keydown",
    (event) => {

      if (event.key !== "Escape") {
        return;
      }

      cards.forEach((card) => {
        card.classList.remove("active");

        card.setAttribute(
          "aria-expanded",
          "false"
        );
      });

      activeCard = null;

      if (page) {
        page.classList.remove(
          "emotion-anxious",
          "emotion-overwhelmed",
          "emotion-talk",
          "emotion-exploring"
        );
      }

    }
  );

  /* =========================================================
     BRAND / HOME
     ========================================================= */

  if (brand) {

    brand.addEventListener(
      "click",
      (event) => {

        /*
          If already on Page 1,
          don't reload unnecessarily.
        */

        if (
          window.location.pathname
            .endsWith("page1.html")
        ) {
          return;
        }

        event.preventDefault();

        navigate(
          CONFIG.home
        );

      }
    );

  }

  /* =========================================================
     TOUCH FEEDBACK
     ========================================================= */

  cards.forEach((card) => {

    card.addEventListener(
      "pointerdown",
      () => {

        card.style.transform =
          "translateY(-2px) scale(.995)";

      },
      { passive: true }
    );

    card.addEventListener(
      "pointerup",
      () => {

        card.style.transform = "";

      },
      { passive: true }
    );

    card.addEventListener(
      "pointercancel",
      () => {

        card.style.transform = "";

      },
      { passive: true }
    );

  });

  /* =========================================================
     POINTER ATMOSPHERE
     ========================================================= */

  let pointerX = 0;
  let pointerY = 0;

  function updatePointer(
    clientX,
    clientY
  ) {

    pointerX =
      (clientX /
        window.innerWidth) -
      0.5;

    pointerY =
      (clientY /
        window.innerHeight) -
      0.5;

    if (page) {

      page.style.setProperty(
        "--pointer-x",
        pointerX.toFixed(3)
      );

      page.style.setProperty(
        "--pointer-y",
        pointerY.toFixed(3)
      );

    }

  }

  window.addEventListener(
    "pointermove",
    (event) => {

      updatePointer(
        event.clientX,
        event.clientY
      );

    },
    { passive: true }
  );

  /* =========================================================
     RESTORE LAST SELECTION
     ========================================================= */

  function restoreSelection() {

    let previous = null;

    try {

      previous =
        sessionStorage.getItem(
          CONFIG.storageKey
        );

    } catch (error) {
      previous = null;
    }

    if (!previous) {
      return;
    }

    const card =
      cards.find(
        (item) =>
          item.dataset.emotion ===
          previous
      );

    /*
      Do not automatically open it.
      Just give it a subtle remembered state.
    */

    if (card) {

      card.classList.add(
        "previously-viewed"
      );

    }

  }

  /* =========================================================
     PAGE REVEAL
     ========================================================= */

  function revealPage() {

    if (!page) {
      return;
    }

    page.classList.add(
      "page-ready"
    );

    window.requestAnimationFrame(
      () => {

        page.classList.add(
          "page-visible"
        );

      }
    );

  }

  /* =========================================================
     MOBILE TOUCH DRAG SUPPORT
     ========================================================= */

  const track =
    document.querySelector(
      ".emotion-track"
    );

  if (track) {

    let startX = 0;
    let startScroll = 0;
    let dragging = false;

    track.addEventListener(
      "touchstart",
      (event) => {

        if (
          event.touches.length !== 1
        ) {
          return;
        }

        startX =
          event.touches[0].clientX;

        startScroll =
          track.scrollLeft;

        dragging = true;

      },
      { passive: true }
    );

    track.addEventListener(
      "touchmove",
      (event) => {

        if (!dragging) {
          return;
        }

        const currentX =
          event.touches[0].clientX;

        const difference =
          startX - currentX;

        if (
          track.scrollWidth >
          track.clientWidth
        ) {

          track.scrollLeft =
            startScroll +
            difference;

        }

      },
      { passive: true }
    );

    track.addEventListener(
      "touchend",
      () => {

        dragging = false;

      },
      { passive: true }
    );

  }

  /* =========================================================
     RESIZE
     ========================================================= */

  let resizeTimer;

  window.addEventListener(
    "resize",
    () => {

      window.clearTimeout(
        resizeTimer
      );

      resizeTimer =
        window.setTimeout(
          () => {

            if (page) {

              page.style.setProperty(
                "--viewport-width",
                `${window.innerWidth}px`
              );

              page.style.setProperty(
                "--viewport-height",
                `${window.innerHeight}px`
              );

            }

          },
          100
        );

    },
    { passive: true }
  );

  /* =========================================================
     VISIBILITY
     ========================================================= */

  document.addEventListener(
    "visibilitychange",
    () => {

      if (!page) {
        return;
      }

      if (
        document.visibilityState ===
        "hidden"
      ) {

        page.classList.add(
          "page-hidden"
        );

      } else {

        page.classList.remove(
          "page-hidden"
        );

      }

    }
  );

  /* =========================================================
     GLOBAL AKSH API
     ========================================================= */

  window.AKSHPage1 = {

    selectEmotion:
      selectCard,

    openEmotion,

    navigate,

    getActiveEmotion:
      () => {

        return activeCard
          ? activeCard.dataset.emotion
          : null;

      }

  };

  /* =========================================================
     INITIALISE
     ========================================================= */

  function init() {

    restoreSelection();

    revealPage();

  }

  if (
    document.readyState ===
    "loading"
  ) {

    document.addEventListener(
      "DOMContentLoaded",
      init,
      { once: true }
    );

  } else {

    init();

  }

})();
