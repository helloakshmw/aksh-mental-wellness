/* =========================================================
   AKSH — PAGE 01
   COMPLETE PAGE 1 JAVASCRIPT
   ========================================================= */

(() => {
  "use strict";

  const body = document.body;
  const header = document.getElementById("site-header");
  const menuButton = document.getElementById("menu-button");
  const mobileNavigation = document.getElementById("mobile-navigation");
  const mobileOverlay = document.getElementById("mobile-overlay");


  /* =========================================================
     TIME OF DAY
     ========================================================= */

  function getTimeState(hour) {
    if (hour >= 5 && hour < 12) return "morning";
    if (hour >= 12 && hour < 17) return "afternoon";
    if (hour >= 17 && hour < 21) return "evening";
    return "night";
  }

  function updateTimeOfDay() {
    const hour = new Date().getHours();
    const state = getTimeState(hour);

    body.classList.remove(
      "morning",
      "afternoon",
      "evening",
      "night"
    );

    body.classList.add(state);
  }

  updateTimeOfDay();

  setInterval(updateTimeOfDay, 60000);


  /* =========================================================
     HEADER SCROLL
     ========================================================= */

  function updateHeader() {
    if (!header) return;

    if (window.scrollY > 35) {
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


  /* =========================================================
     MOBILE MENU
     ========================================================= */

  function openMenu() {
    if (!header || !menuButton) return;

    header.classList.add("mobile-open");

    if (mobileOverlay) {
      mobileOverlay.classList.add("is-visible");
    }

    body.classList.add("menu-locked");

    menuButton.setAttribute("aria-expanded", "true");
    menuButton.setAttribute(
      "aria-label",
      "Close navigation"
    );
  }

  function closeMenu() {
    if (!header || !menuButton) return;

    header.classList.remove("mobile-open");

    if (mobileOverlay) {
      mobileOverlay.classList.remove("is-visible");
    }

    body.classList.remove("menu-locked");

    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute(
      "aria-label",
      "Open navigation"
    );
  }

  function toggleMenu() {
    if (!header) return;

    if (header.classList.contains("mobile-open")) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  if (menuButton) {
    menuButton.addEventListener(
      "click",
      toggleMenu
    );
  }

  if (mobileOverlay) {
    mobileOverlay.addEventListener(
      "click",
      closeMenu
    );
  }

  if (mobileNavigation) {
    mobileNavigation
      .querySelectorAll("a")
      .forEach((link) => {
        link.addEventListener(
          "click",
          closeMenu
        );
      });
  }


  /* =========================================================
     ESCAPE KEY
     ========================================================= */

  document.addEventListener(
    "keydown",
    (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    }
  );


  /* =========================================================
     SMOOTH INTERNAL NAVIGATION
     ========================================================= */

  document
    .querySelectorAll('a[href^="#"]')
    .forEach((link) => {

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
            document.querySelector(targetId);

          if (!target) {
            return;
          }

          event.preventDefault();

          const headerHeight = header
            ? header.getBoundingClientRect().height
            : 0;

          const targetTop =
            target.getBoundingClientRect().top +
            window.scrollY -
            headerHeight;

          window.scrollTo({
            top: Math.max(0, targetTop),
            behavior: "smooth"
          });

          closeMenu();
        }
      );

    });


  /* =========================================================
     EMOTION EXPERIENCE
     ========================================================= */

  const emotionData = {

    anxious: {
      eyebrow: "A quiet place to slow down",

      title:
        "You don't have to solve everything right now.",

      text:
        "Start by noticing what is happening. Breathe. Name what feels loud. Understanding can begin before an answer does."
    },

    overwhelmed: {
      eyebrow: "One thing at a time",

      title:
        "You are allowed to put some things down.",

      text:
        "When everything feels urgent, creating a little space can help you see what actually needs your attention first."
    },

    "need-talk": {
      eyebrow: "You can be heard here",

      title:
        "You don't need the perfect words.",

      text:
        "A conversation can begin with confusion, silence, a question or simply: I don't know what is happening to me."
    },

    exploring: {
      eyebrow: "Curiosity is a beginning",

      title:
        "There is more to understand about you.",

      text:
        "Explore your thoughts, emotions, relationships and patterns at your own pace. You can begin simply by being curious."
    }

  };


  let emotionModal = null;


  /* =========================================================
     CREATE EMOTION MODAL
     ========================================================= */

  function createEmotionModal() {

    if (emotionModal) {
      return emotionModal;
    }

    emotionModal =
      document.createElement("div");

    emotionModal.className =
      "emotion-modal";

    emotionModal.setAttribute(
      "role",
      "dialog"
    );

    emotionModal.setAttribute(
      "aria-modal",
      "true"
    );

    emotionModal.setAttribute(
      "aria-label",
      "Feeling space"
    );

    emotionModal.innerHTML = `

      <div class="emotion-modal-backdrop"></div>

      <div class="emotion-modal-panel">

        <button
          class="emotion-modal-close"
          type="button"
          aria-label="Close feeling space"
        >
          ×
        </button>

        <div
          class="emotion-modal-eyebrow"
        ></div>

        <h3
          class="emotion-modal-title"
        ></h3>

        <p
          class="emotion-modal-text"
        ></p>

        <div
          class="emotion-modal-actions"
        >

          <a
            href="#begin"
            class="emotion-modal-primary"
          >
            Take the next step →
          </a>

          <button
            type="button"
            class="emotion-modal-secondary"
          >
            Keep exploring
          </button>

        </div>

      </div>
    `;

    document.body.appendChild(
      emotionModal
    );


    /* =======================================================
       MODAL STYLES
       ======================================================= */

    const style =
      document.createElement("style");

    style.textContent = `

      .emotion-modal {
        position: fixed;
        inset: 0;
        z-index: 500;

        display: grid;
        place-items: center;

        padding: 24px;

        opacity: 0;
        visibility: hidden;
        pointer-events: none;

        transition:
          opacity .45s var(--ease),
          visibility .45s ease;
      }


      .emotion-modal.is-open {
        opacity: 1;
        visibility: visible;
        pointer-events: auto;
      }


      .emotion-modal-backdrop {
        position: absolute;
        inset: 0;

        background:
          rgba(2,5,12,.55);

        backdrop-filter:
          blur(18px);

        -webkit-backdrop-filter:
          blur(18px);
      }


      .emotion-modal-panel {
        position: relative;
        z-index: 2;

        width:
          min(700px,100%);

        padding:
          clamp(34px,6vw,70px)
          clamp(26px,6vw,65px);

        border:
          1px solid
          rgba(255,255,255,.2);

        border-radius: 28px;

        background:
          linear-gradient(
            145deg,
            rgba(255,255,255,.13),
            rgba(255,255,255,.045)
          );

        box-shadow:
          0 40px 130px
          rgba(0,0,0,.4);

        transform:
          translateY(20px)
          scale(.98);

        transition:
          transform .6s var(--slow);
      }


      .emotion-modal.is-open
      .emotion-modal-panel {
        transform:
          translateY(0)
          scale(1);
      }


      .emotion-modal-close {
        position: absolute;

        top: 18px;
        right: 18px;

        width: 40px;
        height: 40px;

        border-radius: 50%;

        background:
          rgba(255,255,255,.08);

        border:
          1px solid
          rgba(255,255,255,.18);

        color: #fff;

        font-size: 25px;
        line-height: 1;

        cursor: pointer;
      }


      .emotion-modal-eyebrow {
        font-size: 9px;

        letter-spacing: .24em;

        text-transform: uppercase;

        color:
          rgba(255,255,255,.55);
      }


      .emotion-modal-title {
        margin-top: 20px;

        max-width: 600px;

        font-family:
          "Times New Roman",
          Georgia,
          serif;

        font-size:
          clamp(40px,6vw,74px);

        line-height: .92;

        font-weight: 400;

        letter-spacing: -.045em;
      }


      .emotion-modal-text {
        max-width: 560px;

        margin-top: 24px;

        color:
          rgba(255,255,255,.68);

        font-size: 15px;

        line-height: 1.75;
      }


      .emotion-modal-actions {
        display: flex;

        flex-wrap: wrap;

        gap: 12px;

        margin-top: 30px;
      }


      .emotion-modal-primary,
      .emotion-modal-secondary {
        display: inline-flex;

        align-items: center;
        justify-content: center;

        min-height: 48px;

        padding:
          0 20px;

        border-radius: 999px;

        font-size: 9px;

        letter-spacing: .16em;

        text-transform: uppercase;

        cursor: pointer;
      }


      .emotion-modal-primary {
        border:
          1px solid
          rgba(255,255,255,.45);

        background:
          rgba(255,255,255,.11);

        color: #fff;
      }


      .emotion-modal-secondary {
        border:
          1px solid
          rgba(255,255,255,.2);

        background: transparent;

        color:
          rgba(255,255,255,.72);
      }


      @media(max-width:480px) {

        .emotion-modal {
          padding: 16px;
        }

        .emotion-modal-panel {
          border-radius: 22px;
        }

        .emotion-modal-actions {
          flex-direction: column;
        }

        .emotion-modal-primary,
        .emotion-modal-secondary {
          width: 100%;
        }

      }


      @media(prefers-reduced-motion:reduce) {

        .emotion-modal,
        .emotion-modal-panel {
          transition: none;
        }

      }

    `;

    document.head.appendChild(style);


    /* =======================================================
       MODAL CONTROLS
       ======================================================= */

    const closeButton =
      emotionModal.querySelector(
        ".emotion-modal-close"
      );

    const backdrop =
      emotionModal.querySelector(
        ".emotion-modal-backdrop"
      );

    const secondaryButton =
      emotionModal.querySelector(
        ".emotion-modal-secondary"
      );

    const primaryLink =
      emotionModal.querySelector(
        ".emotion-modal-primary"
      );


    function closeEmotionModal() {

      emotionModal.classList.remove(
        "is-open"
      );

      body.classList.remove(
        "menu-locked"
      );
    }


    closeButton.addEventListener(
      "click",
      closeEmotionModal
    );

    backdrop.addEventListener(
      "click",
      closeEmotionModal
    );

    secondaryButton.addEventListener(
      "click",
      closeEmotionModal
    );

    primaryLink.addEventListener(
      "click",
      closeEmotionModal
    );


    emotionModal._close =
      closeEmotionModal;


    return emotionModal;
  }


  /* =========================================================
     OPEN EMOTION
     ========================================================= */

  function openEmotion(emotionKey) {

    const data =
      emotionData[emotionKey];

    if (!data) {
      return;
    }

    const modal =
      createEmotionModal();


    modal.querySelector(
      ".emotion-modal-eyebrow"
    ).textContent =
      data.eyebrow;


    modal.querySelector(
      ".emotion-modal-title"
    ).textContent =
      data.title;


    modal.querySelector(
      ".emotion-modal-text"
    ).textContent =
      data.text;


    modal.classList.add(
      "is-open"
    );

    body.classList.add(
      "menu-locked"
    );


    setTimeout(() => {

      const closeButton =
        modal.querySelector(
          ".emotion-modal-close"
        );

      if (closeButton) {
        closeButton.focus();
      }

    }, 50);

  }


  /* =========================================================
     EMOTION CARDS
     ========================================================= */

  document
    .querySelectorAll(".emotion")
    .forEach((card) => {

      const open = () => {

        openEmotion(
          card.dataset.emotion
        );

      };


      card.addEventListener(
        "click",
        open
      );


      card.addEventListener(
        "keydown",
        (event) => {

          if (
            event.key === "Enter" ||
            event.key === " "
          ) {

            event.preventDefault();

            open();

          }

        }
      );

    });


  /* =========================================================
     CLOSE EMOTION WITH ESCAPE
     ========================================================= */

  document.addEventListener(
    "keydown",
    (event) => {

      if (
        event.key === "Escape" &&
        emotionModal &&
        emotionModal.classList.contains(
          "is-open"
        )
      ) {

        emotionModal._close();

      }

    }
  );


  /* =========================================================
     FOUNDER IMAGE FALLBACK
     ========================================================= */

  const founderPhoto =
    document.querySelector(
      ".founder-photo"
    );


  if (founderPhoto) {

    founderPhoto.addEventListener(
      "error",
      () => {

        founderPhoto.style.visibility =
          "hidden";

        if (founderPhoto.parentElement) {

          founderPhoto.parentElement.classList.add(
            "founder-photo-unavailable"
          );

        }

      }
    );

  }


  /* =========================================================
     INTERSECTION REVEAL
     ========================================================= */

  const revealTargets =
    document.querySelectorAll(
      ".hero-inner, .section-inner, .footer"
    );


  if (
    "IntersectionObserver" in window &&
    !window
      .matchMedia(
        "(prefers-reduced-motion: reduce)"
      )
      .matches
  ) {

    revealTargets.forEach(
      (element) => {

        element.classList.add(
          "reveal-ready"
        );

      }
    );


    const observer =
      new IntersectionObserver(
        (entries) => {

          entries.forEach(
            (entry) => {

              if (
                entry.isIntersecting
              ) {

                entry.target.classList.add(
                  "revealed"
                );

                observer.unobserve(
                  entry.target
                );

              }

            }
          );

        },
        {
          threshold: 0.08,

          rootMargin:
            "0px 0px -40px 0px"
        }
      );


    revealTargets.forEach(
      (element) => {

        observer.observe(
          element
        );

      }
    );

  }


  /* =========================================================
     RESIZE — CLOSE MOBILE MENU ON DESKTOP
     ========================================================= */

  window.addEventListener(
    "resize",
    () => {

      if (
        window.innerWidth > 900 &&
        header &&
        header.classList.contains(
          "mobile-open"
        )
      ) {

        closeMenu();

      }

    }
  );


})();
