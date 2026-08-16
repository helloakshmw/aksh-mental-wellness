/* =========================================================
   AKSH — PAGE 01
   aksh.js
   MASTER JAVASCRIPT
   ========================================================= */

(() => {
  "use strict";


  /* =======================================================
     DOM
     ======================================================= */

  const page = document.getElementById("aksh-world");
  const nav = document.getElementById("aksh-nav");

  const menuButton =
    document.getElementById("aksh-menu-button");

  const mobileMenu =
    document.getElementById("aksh-mobile-menu");

  const menuClose =
    document.getElementById("aksh-menu-close");

  const emotionCards =
    document.querySelectorAll(".emotion-card");

  const revealElements =
    document.querySelectorAll(
      ".aksh-introduction, .aksh-pillars, .aksh-explore, .aksh-final, .pillar-card, .explore-card"
    );


  /* =======================================================
     SAFETY CHECK
     ======================================================= */

  if (!page) {
    console.warn("AKSH: page root not found.");
    return;
  }


  /* =======================================================
     TIME OF DAY
     ======================================================= */

  function updateTimeOfDay() {

    const hour = new Date().getHours();

    page.classList.remove(
      "time-morning",
      "time-afternoon",
      "time-evening",
      "time-night"
    );


    /*
      05:00 — 11:59
      Morning

      12:00 — 16:59
      Afternoon

      17:00 — 20:59
      Evening

      21:00 — 04:59
      Night
    */

    if (hour >= 5 && hour < 12) {

      page.classList.add("time-morning");

    } else if (hour >= 12 && hour < 17) {

      page.classList.add("time-afternoon");

    } else if (hour >= 17 && hour < 21) {

      page.classList.add("time-evening");

    } else {

      page.classList.add("time-night");

    }

  }

  updateTimeOfDay();

  /*
    Check periodically so the atmosphere changes
    automatically even if the visitor keeps the page open.
  */

  setInterval(updateTimeOfDay, 60 * 1000);


  /* =======================================================
     STARS
     ======================================================= */

  const starsContainer =
    document.getElementById("stars");

  if (starsContainer) {

    const starCount =
      window.innerWidth < 600 ? 45 : 90;

    const fragment =
      document.createDocumentFragment();

    for (let i = 0; i < starCount; i++) {

      const star =
        document.createElement("span");

      star.className = "star";

      star.style.left =
        `${Math.random() * 100}%`;

      star.style.top =
        `${Math.random() * 75}%`;

      star.style.animationDelay =
        `${Math.random() * 3}s`;

      star.style.animationDuration =
        `${2 + Math.random() * 3}s`;

      fragment.appendChild(star);
    }

    starsContainer.appendChild(fragment);
  }


  /* =======================================================
     NAVIGATION SCROLL STATE
     ======================================================= */

  function updateNavigation() {

    if (!nav) return;

    if (window.scrollY > 30) {

      nav.classList.add("scrolled");

    } else {

      nav.classList.remove("scrolled");

    }

  }

  updateNavigation();

  window.addEventListener(
    "scroll",
    updateNavigation,
    { passive: true }
  );


  /* =======================================================
     MOBILE MENU
     ======================================================= */

  function openMenu() {

    if (!mobileMenu || !menuButton) return;

    mobileMenu.classList.add("open");

    menuButton.classList.add("active");

    menuButton.setAttribute(
      "aria-expanded",
      "true"
    );

    mobileMenu.setAttribute(
      "aria-hidden",
      "false"
    );

    document.body.classList.add("menu-open");

  }


  function closeMenu() {

    if (!mobileMenu || !menuButton) return;

    mobileMenu.classList.remove("open");

    menuButton.classList.remove("active");

    menuButton.setAttribute(
      "aria-expanded",
      "false"
    );

    mobileMenu.setAttribute(
      "aria-hidden",
      "true"
    );

    document.body.classList.remove("menu-open");

  }


  if (menuButton) {

    menuButton.addEventListener(
      "click",
      () => {

        if (
          mobileMenu &&
          mobileMenu.classList.contains("open")
        ) {

          closeMenu();

        } else {

          openMenu();

        }

      }
    );

  }


  if (menuClose) {

    menuClose.addEventListener(
      "click",
      closeMenu
    );

  }


  /* =======================================================
     CLOSE MOBILE MENU WHEN LINK IS SELECTED
     ======================================================= */

  const mobileLinks =
    document.querySelectorAll(
      ".mobile-navigation a"
    );

  mobileLinks.forEach((link) => {

    link.addEventListener(
      "click",
      closeMenu
    );

  });


  /* =======================================================
     ESCAPE KEY
     ======================================================= */

  document.addEventListener(
    "keydown",
    (event) => {

      if (event.key === "Escape") {

        closeMenu();

      }

    }
  );


  /* =======================================================
     EMOTION CARDS
     ======================================================= */

  const emotionMessages = {

    anxious: {
      title: "Take a breath.",
      text:
        "You don't have to solve everything right now. Start with one quiet moment."
    },

    overwhelmed: {
      title: "One thing at a time.",
      text:
        "You can slow down. You can pause. You don't have to carry everything at once."
    },

    talk: {
      title: "You can talk.",
      text:
        "Being heard can be a meaningful beginning. You don't need the perfect words."
    },

    exploring: {
      title: "Take your time.",
      text:
        "There is no pressure to begin anywhere specific. Explore AKSH at your own pace."
    }

  };


  emotionCards.forEach((card) => {

    const button =
      card.querySelector(".emotion-button");

    if (!button) return;


    button.addEventListener(
      "click",
      () => {

        const emotion =
          card.dataset.emotion;

        const wasActive =
          card.classList.contains("active");


        /*
          Close every card first.
        */

        emotionCards.forEach((otherCard) => {

          otherCard.classList.remove("active");

          const otherButton =
            otherCard.querySelector(
              ".emotion-button"
            );

          if (otherButton) {

            otherButton.setAttribute(
              "aria-expanded",
              "false"
            );

          }

          const oldPanel =
            otherCard.querySelector(
              ".emotion-response"
            );

          if (oldPanel) {

            oldPanel.remove();

          }

        });


        /*
          If the visitor tapped the same card
          again, simply close it.
        */

        if (wasActive) {

          return;

        }


        card.classList.add("active");

        button.setAttribute(
          "aria-expanded",
          "true"
        );


        /*
          Create the response panel.
        */

        const response =
          emotionMessages[emotion];

        if (!response) return;


        const panel =
          document.createElement("div");

        panel.className =
          "emotion-response";


        panel.innerHTML = `
          <strong>${response.title}</strong>
          <p>${response.text}</p>
          <a href="begin.html">
            CONTINUE →
          </a>
        `;


        card.appendChild(panel);

        requestAnimationFrame(() => {

          panel.classList.add("visible");

        });

      }
    );

  });


  /* =======================================================
     EMOTION RESPONSE STYLES
     ======================================================= */

  const emotionResponseStyles =
    document.createElement("style");

  emotionResponseStyles.textContent = `

    .emotion-response {
      position: relative;

      max-height: 0;
      overflow: hidden;

      opacity: 0;

      padding:
        0 27px;

      border-top:
        1px solid rgba(247,245,239,.08);

      transition:
        max-height .6s cubic-bezier(.16,1,.3,1),
        opacity .4s ease,
        padding .6s cubic-bezier(.16,1,.3,1);
    }

    .emotion-response.visible {
      max-height: 220px;

      opacity: 1;

      padding:
        24px 27px 28px;
    }

    .emotion-response strong {
      display: block;

      font-family:
        Georgia,
        "Times New Roman",
        serif;

      font-size: 23px;

      font-weight: 400;

      line-height: 1;
    }

    .emotion-response p {
      max-width: 300px;

      margin-top: 12px;

      font-size: 10px;

      line-height: 1.7;

      color:
        rgba(247,245,239,.6);
    }

    .emotion-response a {
      display: inline-flex;

      margin-top: 18px;

      font-size: 7px;

      letter-spacing: .2em;

      color:
        rgba(247,245,239,.9);
    }

  `;

  document.head.appendChild(
    emotionResponseStyles
  );


  /* =======================================================
     SCROLL REVEAL
     ======================================================= */

  revealElements.forEach((element) => {

    element.classList.add("reveal");

  });


  if (
    "IntersectionObserver" in window
  ) {

    const revealObserver =
      new IntersectionObserver(
        (entries, observer) => {

          entries.forEach((entry) => {

            if (!entry.isIntersecting) {
              return;
            }

            entry.target.classList.add(
              "visible"
            );

            observer.unobserve(
              entry.target
            );

          });

        },
        {
          threshold: 0.12,
          rootMargin: "0px 0px -50px 0px"
        }
      );


    revealElements.forEach((element) => {

      revealObserver.observe(element);

    });

  } else {

    revealElements.forEach((element) => {

      element.classList.add("visible");

    });

  }


  /* =======================================================
     STAGGER CARD REVEALS
     ======================================================= */

  const staggerGroups = [
    ".pillar-card",
    ".explore-card"
  ];


  staggerGroups.forEach((selector) => {

    const elements =
      document.querySelectorAll(selector);

    elements.forEach((element, index) => {

      element.style.transitionDelay =
        `${index * 70}ms`;

    });

  });


  /* =======================================================
     SMOOTH INTERNAL LINKS
     ======================================================= */

  document
    .querySelectorAll('a[href^="#"]')
    .forEach((link) => {

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

          if (!target) {
            return;
          }

          event.preventDefault();

          target.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });

        }
      );

    });


  /* =======================================================
     PREVENT DOUBLE-TAP ZOOM ON CTA AREAS
     ======================================================= */

  document
    .querySelectorAll(
      ".emotion-button, .final-cta, .aksh-book-button"
    )
    .forEach((button) => {

      button.addEventListener(
        "touchstart",
        () => {},
        { passive: true }
      );

    });


  /* =======================================================
     PAGE LOAD
     ======================================================= */

  window.addEventListener(
    "load",
    () => {

      page.classList.add("loaded");

      updateTimeOfDay();

      updateNavigation();

    }
  );


  /* =======================================================
     RESIZE
     ======================================================= */

  let resizeTimer;

  window.addEventListener(
    "resize",
    () => {

      clearTimeout(resizeTimer);

      resizeTimer =
        setTimeout(() => {

          updateTimeOfDay();

        }, 150);

    },
    { passive: true }
  );


  /* =======================================================
     DEBUG
     ======================================================= */

  console.log(
    "AKSH — Page 01 initialized."
  );

})();
