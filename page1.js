/* =========================================================
   AKSH — PAGE 01 JAVASCRIPT
   THE WORLD
   A SAFE SPACE FOR EVERY MIND
   ========================================================= */

(() => {
  "use strict";

  /* =========================================================
     CONFIGURATION
     ========================================================= */

  const CONFIG = {
    homePage: "index.html",

    pages: {
      world: "page1.html",
      mind: "page3.html",
      withYou: "page4.html",
      meghana: "page5.html",
      journey: "page6.html",
      stories: "page7.html",
      journal: "page8.html",
      ai: "page8.html",
      begin: "page9.html"
    },

    transitionDuration: 650,

    storageKey: "aksh-page1-emotion"
  };

  /* =========================================================
     EXPERIENCE DATA
     ========================================================= */

  const experiences = {
    anxious: {
      title: "ANXIOUS",

      icon: "◌",

      eyebrow:
        "WHEN YOUR MIND WON'T SLOW DOWN",

      message:
        "You don't have to figure everything out at once.",

      description:
        "Sometimes the first step is simply creating a little space to breathe, understand what you're feeling, and feel supported.",

      action:
        "I WANT TO FEEL CALMER",

      destination:
        "page9.html"
    },

    overwhelmed: {
      title: "OVERWHELMED",

      icon: "≈",

      eyebrow:
        "WHEN EVERYTHING FEELS LIKE TOO MUCH",

      message:
        "You are allowed to pause.",

      description:
        "You don't have to carry everything at the same time. AKSH is a space to slow down, organise what you're feeling, and find your next step.",

      action:
        "I NEED SOME SPACE",

      destination:
        "page9.html"
    },

    talk: {
      title:
        "NEED TO TALK TO SOMEONE",

      icon: "○",

      eyebrow:
        "WHEN YOU JUST WANT TO BE HEARD",

      message:
        "You don't need the perfect words.",

      description:
        "AKSH is built around empathy, confidentiality, and professional psychological support — a place where you can speak without judgment.",

      action:
        "I WANT TO TALK",

      destination:
        "page9.html"
    },

    exploring: {
      title: "JUST EXPLORING",

      icon: "✦",

      eyebrow:
        "THERE IS NO RIGHT WAY TO BEGIN",

      message:
        "Take your time. Explore at your own pace.",

      description:
        "Discover AKSH, understand your mind, meet the people behind the space, and find what feels right for you.",

      action:
        "EXPLORE AKSH",

      destination:
        "page2.html"
    }
  };

  /* =========================================================
     DOM HELPERS
     ========================================================= */

  const $ = (
    selector,
    parent = document
  ) => parent.querySelector(selector);

  const $$ = (
    selector,
    parent = document
  ) => Array.from(
    parent.querySelectorAll(selector)
  );

  /* =========================================================
     ELEMENTS
     ========================================================= */

  const page =
    document.body;

  const transition =
    $("#page-transition");

  /*
    Supports the current HTML:
    .emotion

    Also supports the alternative
    .emotion-card selector.
  */

  const cards =
    $$(".emotion, .emotion-card");

  const navLinks =
    $$("[data-page]");

  const menuButton =
    $("#menu-button") ||
    $(".menu-button") ||
    $("#page1-menu") ||
    $(".page1-menu");

  const menu =
    $("#mobile-menu") ||
    $(".mobile-overlay") ||
    $(".page1-mobile-menu");

  const closeMenuButton =
    $("#close-menu");

  const beginButtons =
    $$("[data-begin]");

  const backButton =
    $("[data-back]");

  /* =========================================================
     STATE
     ========================================================= */

  let currentExperience = null;

  let isTransitioning = false;

  let menuOpen = false;

  /* =========================================================
     TRANSITION
     ========================================================= */

  function startTransition(
    destination
  ) {

    if (
      !destination ||
      isTransitioning
    ) {
      return;
    }

    isTransitioning = true;

    if (transition) {

      transition.classList.add(
        "active"
      );

    }

    document.documentElement.classList.add(
      "aksh-is-transitioning"
    );

    window.setTimeout(
      () => {

        window.location.href =
          destination;

      },
      CONFIG.transitionDuration
    );
  }

  /* =========================================================
     BACKGROUND STATE
     ========================================================= */

  function changeBackground(
    className
  ) {

    const possibleClasses = [
      "state-anxious",
      "state-overwhelmed",
      "state-talk",
      "state-exploring"
    ];

    possibleClasses.forEach(
      (name) => {

        page.classList.remove(
          name
        );

      }
    );

    if (className) {

      page.classList.add(
        className
      );

    }
  }

  /* =========================================================
     DETECT CARD TYPE
     ========================================================= */

  function detectCardType(
    card
  ) {

    const explicit =
      card.dataset.emotion ||
      card.dataset.type ||
      "";

    const value =
      explicit
        .toLowerCase()
        .replace(/\s+/g, "-");

    if (
      value === "anxious"
    ) {

      return "anxious";

    }

    if (
      value === "overwhelmed"
    ) {

      return "overwhelmed";

    }

    if (
      value === "talk" ||
      value === "need-to-talk" ||
      value ===
        "need-to-talk-to-someone"
    ) {

      return "talk";

    }

    if (
      value === "exploring" ||
      value === "just-exploring"
    ) {

      return "exploring";

    }

    /*
      Fallback:
      Read the actual visible card text.
    */

    const text =
      card.textContent
        .toLowerCase()
        .replace(/\s+/g, " ")
        .trim();

    if (
      text.includes("anxious")
    ) {

      return "anxious";

    }

    if (
      text.includes("overwhelmed")
    ) {

      return "overwhelmed";

    }

    if (
      text.includes("need to talk") ||
      text.includes("talk to someone")
    ) {

      return "talk";

    }

    if (
      text.includes("exploring") ||
      text.includes("explore")
    ) {

      return "exploring";

    }

    return null;
  }

  /* =========================================================
     PREPARE CARDS
     ========================================================= */

  function prepareCards() {

    cards.forEach(
      (card, index) => {

        const type =
          detectCardType(card);

        if (!type) {
          return;
        }

        card.dataset.emotion =
          type;

        card.setAttribute(
          "role",
          "button"
        );

        card.setAttribute(
          "tabindex",
          "0"
        );

        card.setAttribute(
          "aria-label",
          experiences[type].title
        );

        card.style.setProperty(
          "--emotion-index",
          index
        );

        /*
          Do NOT replace the existing
          SVG icons in page1.html.
        */

      }
    );
  }

  /* =========================================================
     ACTIVATE CARD
     ========================================================= */

  function activateCard(
    card
  ) {

    cards.forEach(
      (item) => {

        item.classList.remove(
          "is-active"
        );

      }
    );

    card.classList.add(
      "is-active"
    );

    const type =
      card.dataset.emotion;

    if (type) {

      currentExperience =
        type;

      changeBackground(
        `state-${type}`
      );

    }

  }

  /* =========================================================
     MOBILE CARD BEHAVIOUR
     ========================================================= */

  function activateMobileCard(
    card
  ) {

    if (
      !window.matchMedia(
        "(max-width: 600px)"
      ).matches
    ) {

      return false;

    }

    const alreadyActive =
      card.classList.contains(
        "active"
      );

    cards.forEach(
      (item) => {

        item.classList.remove(
          "active"
        );

      }
    );

    if (!alreadyActive) {

      card.classList.add(
        "active"
      );

      card.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center"
      });

    }

    return !alreadyActive;
  }

  /* =========================================================
     OPEN EXPERIENCE
     ========================================================= */

  function openExperience(
    type
  ) {

    const experience =
      experiences[type];

    if (!experience) {
      return;
    }

    currentExperience =
      type;

    sessionStorage.setItem(
      CONFIG.storageKey,
      type
    );

    const card =
      cards.find(
        (item) =>
          item.dataset.emotion ===
          type
      );

    if (card) {

      activateCard(card);

    }

    showExperienceOverlay(
      experience
    );

  }

  /* =========================================================
     EXPERIENCE OVERLAY
     ========================================================= */

  function showExperienceOverlay(
    experience
  ) {

    let overlay =
      $("#experience-overlay");

    if (!overlay) {

      overlay =
        document.createElement(
          "div"
        );

      overlay.id =
        "experience-overlay";

      overlay.className =
        "experience-overlay";

      document.body.appendChild(
        overlay
      );

    }

    overlay.innerHTML = `
      <div
        class="experience-backdrop"
        data-close-experience
      ></div>

      <section
        class="experience-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="experience-title"
      >

        <button
          class="experience-close"
          type="button"
          aria-label="Close"
          data-close-experience
        >
          ×
        </button>

        <div class="experience-symbol">
          ${experience.icon}
        </div>

        <div class="experience-eyebrow">
          ${experience.eyebrow}
        </div>

        <h2
          id="experience-title"
          class="experience-title"
        >
          ${experience.title}
        </h2>

        <p class="experience-message">
          ${experience.message}
        </p>

        <p class="experience-description">
          ${experience.description}
        </p>

        <button
          class="experience-action"
          type="button"
          data-experience-action
        >
          ${experience.action}
          <span>→</span>
        </button>

      </section>
    `;

    requestAnimationFrame(
      () => {

        overlay.classList.add(
          "is-visible"
        );

      }
    );

    $$(
      "[data-close-experience]",
      overlay
    ).forEach(
      (element) => {

        element.addEventListener(
          "click",
          closeExperience
        );

      }
    );

    const action =
      $(
        "[data-experience-action]",
        overlay
      );

    if (action) {

      action.addEventListener(
        "click",
        () => {

          startTransition(
            experience.destination
          );

        }
      );

    }

    document.body.classList.add(
      "experience-open"
    );

  }

  /* =========================================================
     CLOSE EXPERIENCE
     ========================================================= */

  function closeExperience() {

    const overlay =
      $("#experience-overlay");

    if (!overlay) {
      return;
    }

    overlay.classList.remove(
      "is-visible"
    );

    document.body.classList.remove(
      "experience-open"
    );

    window.setTimeout(
      () => {

        if (overlay) {
          overlay.remove();
        }

      },
      450
    );

  }

  /* =========================================================
     CARD EVENTS
     ========================================================= */

  function setupCardEvents() {

    cards.forEach(
      (card) => {

        const type =
          detectCardType(card);

        if (!type) {
          return;
        }

        /*
          Desktop hover
        */

        card.addEventListener(
          "mouseenter",
          () => {

            activateCard(card);

          }
        );

        /*
          Keyboard focus
        */

        card.addEventListener(
          "focus",
          () => {

            activateCard(card);

          }
        );

        /*
          Click / tap
        */

        card.addEventListener(
          "click",
          (event) => {

            /*
              On mobile:
              first tap expands the small
              card instead of immediately
              opening the experience.
            */

            if (
              window.matchMedia(
                "(max-width: 600px)"
              ).matches
            ) {

              const expanded =
                activateMobileCard(
                  card
                );

              if (expanded) {

                event.preventDefault();

                activateCard(
                  card
                );

                return;

              }

            }

            openExperience(
              type
            );

          }
        );

        /*
          Keyboard activation
        */

        card.addEventListener(
          "keydown",
          (event) => {

            if (
              event.key === "Enter" ||
              event.key === " "
            ) {

              event.preventDefault();

              openExperience(
                type
              );

            }

          }
        );

      }
    );

  }

  /* =========================================================
     NAVIGATION
     ========================================================= */

  function setupNavigation() {

    navLinks.forEach(
      (link) => {

        link.addEventListener(
          "click",
          (event) => {

            const destination =
              link.dataset.page;

            /*
              Normal anchor links such as
              #world should continue working.
            */

            if (!destination) {
              return;
            }

            event.preventDefault();

            closeMenu();

            startTransition(
              destination
            );

          }
        );

      }
    );

  }

  /* =========================================================
     BEGIN BUTTONS
     ========================================================= */

  function setupBeginButtons() {

    beginButtons.forEach(
      (button) => {

        button.addEventListener(
          "click",
          (event) => {

            const destination =
              button.dataset.begin ||
              CONFIG.pages.begin;

            if (!destination) {
              return;
            }

            event.preventDefault();

            startTransition(
              destination
            );

          }
        );

      }
    );

  }

  /* =========================================================
     MOBILE MENU
     ========================================================= */

  function openMenu() {

    if (!menu) {
      return;
    }

    menuOpen =
      true;

    menu.classList.add(
      "is-open"
    );

    menu.classList.add(
      "active"
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

    if (!menu) {
      return;
    }

    menuOpen =
      false;

    menu.classList.remove(
      "is-open"
    );

    menu.classList.remove(
      "active"
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

  function setupMenu() {

    if (menuButton) {

      menuButton.addEventListener(
        "click",
        () => {

          if (menuOpen) {

            closeMenu();

          } else {

            openMenu();

          }

        }
      );

    }

    if (closeMenuButton) {

      closeMenuButton.addEventListener(
        "click",
        closeMenu
      );

    }

  }

  /* =========================================================
     ESCAPE KEY
     ========================================================= */

  function setupKeyboard() {

    document.addEventListener(
      "keydown",
      (event) => {

        if (
          event.key === "Escape"
        ) {

          closeExperience();

          closeMenu();

          cards.forEach(
            (card) => {

              card.classList.remove(
                "active"
              );

            }
          );

        }

      }
    );

  }

  /* =========================================================
     POINTER MOTION
     ========================================================= */

  function setupPointerMotion() {

    if (
      window.matchMedia(
        "(pointer: coarse)"
      ).matches
    ) {

      return;

    }

    let pointerX = 0;
    let pointerY = 0;

    let targetX = 0;
    let targetY = 0;

    document.addEventListener(
      "pointermove",
      (event) => {

        targetX =
          (
            event.clientX /
            window.innerWidth -
            0.5
          ) * 2;

        targetY =
          (
            event.clientY /
            window.innerHeight -
            0.5
          ) * 2;

      },
      {
        passive: true
      }
    );

    function animate() {

      pointerX +=
        (
          targetX -
          pointerX
        ) * 0.035;

      pointerY +=
        (
          targetY -
          pointerY
        ) * 0.035;

      document.documentElement.style.setProperty(
        "--pointer-x",
        pointerX.toFixed(4)
      );

      document.documentElement.style.setProperty(
        "--pointer-y",
        pointerY.toFixed(4)
      );

      requestAnimationFrame(
        animate
      );

    }

    animate();

  }

  /* =========================================================
     DESKTOP CARD PARALLAX
     ========================================================= */

  function setupCardParallax() {

    if (
      window.matchMedia(
        "(pointer: coarse)"
      ).matches
    ) {

      return;

    }

    cards.forEach(
      (card) => {

        card.addEventListener(
          "pointermove",
          (event) => {

            const rect =
              card.getBoundingClientRect();

            if (
              rect.width === 0 ||
              rect.height === 0
            ) {
              return;
            }

            const x =
              (
                event.clientX -
                rect.left
              ) / rect.width;

            const y =
              (
                event.clientY -
                rect.top
              ) / rect.height;

            const rotateX =
              (0.5 - y) * 4;

            const rotateY =
              (x - 0.5) * 4;

            card.style.setProperty(
              "--card-rotate-x",
              `${rotateX}deg`
            );

            card.style.setProperty(
              "--card-rotate-y",
              `${rotateY}deg`
            );

          },
          {
            passive: true
          }
        );

        card.addEventListener(
          "pointerleave",
          () => {

            card.style.setProperty(
              "--card-rotate-x",
              "0deg"
            );

            card.style.setProperty(
              "--card-rotate-y",
              "0deg"
            );

          }
        );

      }
    );

  }

  /* =========================================================
     SCROLL STATE
     ========================================================= */

  function setupScroll() {

    let ticking =
      false;

    window.addEventListener(
      "scroll",
      () => {

        if (ticking) {
          return;
        }

        ticking = true;

        requestAnimationFrame(
          () => {

            document.documentElement.style.setProperty(
              "--page-scroll",
              `${window.scrollY}px`
            );

            ticking = false;

          }
        );

      },
      {
        passive: true
      }
    );

  }

  /* =========================================================
     TOUCH FEEDBACK
     ========================================================= */

  function setupTouchFeedback() {

    cards.forEach(
      (card) => {

        card.addEventListener(
          "touchstart",
          () => {

            card.classList.add(
              "is-touching"
            );

          },
          {
            passive: true
          }
        );

        card.addEventListener(
          "touchend",
          () => {

            window.setTimeout(
              () => {

                card.classList.remove(
                  "is-touching"
                );

              },
              160
            );

          },
          {
            passive: true
          }
        );

      }
    );

  }

  /* =========================================================
     DOUBLE TAP PROTECTION
     ========================================================= */

  function setupInteractionProtection() {

    const interactive = [
      ...cards,
      ...beginButtons,
      ...navLinks
    ];

    interactive.forEach(
      (element) => {

        element.addEventListener(
          "dblclick",
          (event) => {

            event.preventDefault();

          }
        );

      }
    );

  }

  /* =========================================================
     DAILY MICRO VARIATION
     ========================================================= */

  function setDailyAtmosphere() {

    const now =
      new Date();

    const start =
      new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate()
      );

    const day =
      Math.floor(
        start.getTime() /
        86400000
      );

    const variation =
      Math.abs(day) % 4;

    document.documentElement.style.setProperty(
      "--daily-variation",
      variation
    );

    page.dataset.dayVariation =
      variation;

  }

  /* =========================================================
     RESTORE LAST CARD
     ========================================================= */

  function restoreExperienceState() {

    const previous =
      sessionStorage.getItem(
        CONFIG.storageKey
      );

    if (!previous) {
      return;
    }

    const card =
      cards.find(
        (item) =>
          item.dataset.emotion ===
          previous
      );

    if (card) {

      card.classList.add(
        "previously-selected"
      );

    }

  }

  /* =========================================================
     PAGE VISIBILITY
     ========================================================= */

  function setupVisibility() {

    document.addEventListener(
      "visibilitychange",
      () => {

        if (
          document.visibilityState ===
          "visible"
        ) {

          page.classList.remove(
            "page-hidden"
          );

        } else {

          page.classList.add(
            "page-hidden"
          );

        }

      }
    );

  }

  /* =========================================================
     BACK BUTTON
     ========================================================= */

  function setupBackButton() {

    if (!backButton) {
      return;
    }

    backButton.addEventListener(
      "click",
      (event) => {

        event.preventDefault();

        if (
          document.referrer &&
          document.referrer.includes(
            window.location.hostname
          )
        ) {

          window.history.back();

        } else {

          startTransition(
            CONFIG.homePage
          );

        }

      }
    );

  }

  /* =========================================================
     PAGE REVEAL
     ========================================================= */

  function revealPage() {

    page.classList.add(
      "page-ready"
    );

    requestAnimationFrame(
      () => {

        page.classList.add(
          "page-visible"
        );

      }
    );

  }

  /* =========================================================
     GLOBAL API
     ========================================================= */

  window.AKSHPage1 = {

    openExperience,

    closeExperience,

    openMenu,

    closeMenu,

    navigate:
      startTransition

  };

  /* =========================================================
     INITIALISE
     ========================================================= */

  function init() {

    prepareCards();

    setupCardEvents();

    setupNavigation();

    setupBeginButtons();

    setupMenu();

    setupKeyboard();

    setupBackButton();

    setupPointerMotion();

    setupCardParallax();

    setupScroll();

    setupTouchFeedback();

    setupInteractionProtection();

    setDailyAtmosphere();

    restoreExperienceState();

    setupVisibility();

    revealPage();

  }

  /* =========================================================
     START
     ========================================================= */

  if (
    document.readyState ===
    "loading"
  ) {

    document.addEventListener(
      "DOMContentLoaded",
      init,
      {
        once: true
      }
    );

  } else {

    init();

  }

})();
