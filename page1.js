/* =========================================================
   AKSH — 01 AKSH
   PAGE 1 JAVASCRIPT
   A SAFE SPACE FOR EVERY MIND
   ========================================================= */

(() => {
  "use strict";

  /* =======================================================
     CONFIG
     ======================================================= */

  const CONFIG = {
    homePage: "index.html",

    pages: {
      world: "page2.html",
      mind: "page3.html",
      withYou: "page4.html",
      meghana: "page5.html",
      journey: "page6.html",
      stories: "page7.html",
      journal: "page8.html",
      begin: "page9.html"
    },

    transitionDuration: 650,

    storageKey: "aksh-page1-visited"
  };

  /* =======================================================
     AKSH EXPERIENCE DATA
     ======================================================= */

  const experiences = {

    anxious: {
      title: "ANXIOUS",

      icon: "◌",

      eyebrow: "WHEN YOUR MIND WON'T SLOW DOWN",

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

      eyebrow: "WHEN EVERYTHING FEELS LIKE TOO MUCH",

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
      title: "NEED TO TALK TO SOMEONE",

      icon: "○",

      eyebrow: "WHEN YOU JUST WANT TO BE HEARD",

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

      eyebrow: "THERE IS NO RIGHT WAY TO BEGIN",

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

  /* =======================================================
     DOM HELPERS
     ======================================================= */

  const $ = (selector, parent = document) =>
    parent.querySelector(selector);

  const $$ = (selector, parent = document) =>
    Array.from(parent.querySelectorAll(selector));

  /* =======================================================
     ELEMENT REFERENCES
     ======================================================= */

  const page =
    document.body;

  const transition =
    $("#page-transition");

  const cards =
    $$(".emotion-card");

  const navLinks =
    $$("[data-page]");

  const menuButton =
    $("#menu-button");

  const menu =
    $("#mobile-menu");

  const closeMenuButton =
    $("#close-menu");

  const beginButtons =
    $$("[data-begin]");

  const backButton =
    $("[data-back]");

  /* =======================================================
     PAGE STATE
     ======================================================= */

  let currentExperience = null;

  let isTransitioning = false;

  let menuOpen = false;

  /* =======================================================
     TRANSITION ENGINE
     ======================================================= */

  function startTransition(destination) {

    if (!destination || isTransitioning) {
      return;
    }

    isTransitioning = true;

    if (transition) {
      transition.classList.add("active");
    }

    document.documentElement.classList.add(
      "aksh-is-transitioning"
    );

    window.setTimeout(() => {

      window.location.href = destination;

    }, CONFIG.transitionDuration);
  }

  /* =======================================================
     BACKGROUND TRANSITION
     ======================================================= */

  function changeBackground(className) {

    const possibleClasses = [
      "state-anxious",
      "state-overwhelmed",
      "state-talk",
      "state-exploring"
    ];

    possibleClasses.forEach((name) => {
      page.classList.remove(name);
    });

    if (className) {
      page.classList.add(className);
    }
  }

  /* =======================================================
     ICON CREATION
     ======================================================= */

  function getCardIcon(card, type) {

    let icon =
      $(".emotion-icon", card);

    if (!icon) {

      icon =
        document.createElement("span");

      icon.className =
        "emotion-icon";

      const title =
        $(".emotion-title", card);

      if (title) {
        card.insertBefore(
          icon,
          title
        );
      } else {
        card.prepend(icon);
      }
    }

    if (experiences[type]) {
      icon.textContent =
        experiences[type].icon;
    }
  }

  /* =======================================================
     DETECT CARD TYPE
     ======================================================= */

  function detectCardType(card) {

    const explicit =
      card.dataset.emotion ||
      card.dataset.type;

    if (explicit) {

      const value =
        explicit
          .toLowerCase()
          .replace(/\s+/g, "-");

      if (
        value === "anxious" ||
        value === "overwhelmed" ||
        value === "talk" ||
        value === "need-to-talk" ||
        value === "need-to-talk-to-someone" ||
        value === "exploring" ||
        value === "just-exploring"
      ) {

        if (value === "need-to-talk" ||
            value === "need-to-talk-to-someone") {
          return "talk";
        }

        if (value === "just-exploring") {
          return "exploring";
        }

        return value;
      }
    }

    const text =
      card.textContent
        .toLowerCase()
        .replace(/\s+/g, " ")
        .trim();

    if (text.includes("anxious")) {
      return "anxious";
    }

    if (text.includes("overwhelmed")) {
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

  /* =======================================================
     PREPARE CARDS
     ======================================================= */

  function prepareCards() {

    cards.forEach((card, index) => {

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

      getCardIcon(
        card,
        type
      );

    });

  }

  /* =======================================================
     CARD HOVER
     ======================================================= */

  function activateCard(card) {

    cards.forEach((item) => {

      item.classList.remove(
        "is-active"
      );

    });

    card.classList.add(
      "is-active"
    );

    const type =
      card.dataset.emotion;

    if (type) {

      changeBackground(
        `state-${type}`
      );

      currentExperience =
        type;

    }

  }

  /* =======================================================
     CARD CLICK
     ======================================================= */

  function openExperience(type) {

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
        item =>
          item.dataset.emotion === type
      );

    if (card) {
      activateCard(card);
    }

    showExperienceOverlay(
      experience
    );

  }

  /* =======================================================
     EXPERIENCE OVERLAY
     ======================================================= */

  function showExperienceOverlay(experience) {

    let overlay =
      $("#experience-overlay");

    if (!overlay) {

      overlay =
        document.createElement("div");

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
        data-close-experience>
      </div>

      <section
        class="experience-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="experience-title">

        <button
          class="experience-close"
          type="button"
          aria-label="Close"
          data-close-experience>
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
          class="experience-title">
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
          data-experience-action>
          ${experience.action}
          <span>→</span>
        </button>

      </section>
    `;

    requestAnimationFrame(() => {

      overlay.classList.add(
        "is-visible"
      );

    });

    $$(
      "[data-close-experience]",
      overlay
    ).forEach((element) => {

      element.addEventListener(
        "click",
        closeExperience
      );

    });

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

  /* =======================================================
     CLOSE EXPERIENCE
     ======================================================= */

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

    window.setTimeout(() => {

      overlay.remove();

    }, 450);

  }

  /* =======================================================
     CARD EVENTS
     ======================================================= */

  function setupCardEvents() {

    cards.forEach((card) => {

      const type =
        detectCardType(card);

      if (!type) {
        return;
      }

      card.addEventListener(
        "mouseenter",
        () => {
          activateCard(card);
        }
      );

      card.addEventListener(
        "focus",
        () => {
          activateCard(card);
        }
      );

      card.addEventListener(
        "click",
        () => {
          openExperience(type);
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

            openExperience(type);

          }

        }
      );

    });

  }

  /* =======================================================
     NAVIGATION
     ======================================================= */

  function setupNavigation() {

    navLinks.forEach((link) => {

      link.addEventListener(
        "click",
        (event) => {

          const destination =
            link.dataset.page;

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

    });

  }

  /* =======================================================
     BEGIN BUTTONS
     ======================================================= */

  function setupBeginButtons() {

    beginButtons.forEach((button) => {

      button.addEventListener(
        "click",
        () => {

          const destination =
            button.dataset.begin ||
            CONFIG.pages.begin;

          startTransition(
            destination
          );

        }
      );

    });

  }

  /* =======================================================
     MOBILE MENU
     ======================================================= */

  function openMenu() {

    if (!menu) {
      return;
    }

    menuOpen =
      true;

    menu.classList.add(
      "is-open"
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

  /* =======================================================
     BACK BUTTON
     ======================================================= */

  function setupBackButton() {

    if (!backButton) {
      return;
    }

    backButton.addEventListener(
      "click",
      () => {

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

  /* =======================================================
     KEYBOARD ESCAPE
     ======================================================= */

  document.addEventListener(
    "keydown",
    (event) => {

      if (event.key !== "Escape") {
        return;
      }

      closeExperience();
      closeMenu();

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

  /* =======================================================
     SMOOTH POINTER MOVEMENT
     ======================================================= */

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

    let animationFrame = null;

    document.addEventListener(
      "pointermove",
      (event) => {

        targetX =
          (event.clientX /
            window.innerWidth -
            0.5) * 2;

        targetY =
          (event.clientY /
            window.innerHeight -
            0.5) * 2;

      },
      {
        passive: true
      }
    );

    function animate() {

      pointerX +=
        (targetX - pointerX) *
        0.035;

      pointerY +=
        (targetY - pointerY) *
        0.035;

      document.documentElement.style.setProperty(
        "--pointer-x",
        pointerX.toFixed(4)
      );

      document.documentElement.style.setProperty(
        "--pointer-y",
        pointerY.toFixed(4)
      );

      animationFrame =
        requestAnimationFrame(
          animate
        );

    }

    if (!animationFrame) {
      animate();
    }

  }

  /* =======================================================
     CARD PARALLAX
     ======================================================= */

  function setupCardParallax() {

    if (
      window.matchMedia(
        "(pointer: coarse)"
      ).matches
    ) {
      return;
    }

    cards.forEach((card) => {

      card.addEventListener(
        "pointermove",
        (event) => {

          const rect =
            card.getBoundingClientRect();

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
            (0.5 - y) * 5;

          const rotateY =
            (x - 0.5) * 5;

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

    });

  }

  /* =======================================================
     SCROLL / WHEEL BEHAVIOUR
     ======================================================= */

  function setupScrollExperience() {

    let lastScroll =
      0;

    window.addEventListener(
      "scroll",
      () => {

        const current =
          window.scrollY;

        if (
          Math.abs(
            current - lastScroll
          ) < 2
        ) {
          return;
        }

        lastScroll =
          current;

        document.documentElement.style.setProperty(
          "--page-scroll",
          `${current}px`
        );

      },
      {
        passive: true
      }
    );

  }

  /* =======================================================
     RANDOM MICRO DETAIL
     ======================================================= */

  function setDailyAtmosphere() {

    const now =
      new Date();

    const day =
      Math.floor(
        new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate()
        ).getTime() /
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

  /* =======================================================
     ACTIVE NAVIGATION ITEM
     ======================================================= */

  function setActiveNavigation() {

    const currentPage =
      window.location.pathname
        .split("/")
        .pop();

    navLinks.forEach((link) => {

      const target =
        link.dataset.page;

      if (
        target === currentPage
      ) {

        link.classList.add(
          "is-current"
        );

        link.setAttribute(
          "aria-current",
          "page"
        );

      } else {

        link.classList.remove(
          "is-current"
        );

        link.removeAttribute(
          "aria-current"
        );

      }

    });

  }

  /* =======================================================
     TOUCH FEEDBACK
     ======================================================= */

  function setupTouchFeedback() {

    cards.forEach((card) => {

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

    });

  }

  /* =======================================================
     PREVENT DOUBLE TAP ZOOM ON INTERACTIVE ELEMENTS
     ======================================================= */

  function setupInteractionProtection() {

    const interactive =
      [
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

  /* =======================================================
     INITIAL PAGE REVEAL
     ======================================================= */

  function revealPage() {

    page.classList.add(
      "page-ready"
    );

    window.setTimeout(
      () => {

        page.classList.add(
          "page-visible"
        );

      },
      40
    );

  }

  /* =======================================================
     RESTORE LAST EXPERIENCE
     ======================================================= */

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
        item =>
          item.dataset.emotion ===
          previous
      );

    if (card) {

      card.classList.add(
        "previously-selected"
      );

    }

  }

  /* =======================================================
     CLEAN SESSION WHEN LEAVING
     ======================================================= */

  window.addEventListener(
    "pagehide",
    () => {

      document.body.classList.remove(
        "experience-open"
      );

      document.body.classList.remove(
        "menu-open"
      );

    }
  );

  /* =======================================================
     GLOBAL API
     ======================================================= */

  window.AKSHPage1 = {

    openExperience,

    closeExperience,

    openMenu,

    closeMenu,

    navigate: startTransition

  };

  /* =======================================================
     INITIALISE
     ======================================================= */

  function init() {

    prepareCards();

    setupCardEvents();

    setupNavigation();

    setupBeginButtons();

    setupMenu();

    setupBackButton();

    setupPointerMotion();

    setupCardParallax();

    setupScrollExperience();

    setupTouchFeedback();

    setupInteractionProtection();

    setDailyAtmosphere();

    setActiveNavigation();

    restoreExperienceState();

    revealPage();

  }

  /* =======================================================
     START
     ======================================================= */

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
