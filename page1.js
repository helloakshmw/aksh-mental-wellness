/* =========================================================
   AKSH — PAGE 01 JAVASCRIPT
   COME AS YOU ARE
   PREMIUM INTERACTION SYSTEM
   ========================================================= */

(() => {
  "use strict";

  /* =======================================================
     GLOBAL CONFIGURATION
     ======================================================= */

  const CONFIG = {
    nextPage: "page2.html",

    selectors: {
      page: ".aksh-page",
      atmosphere: ".atmosphere",
      hero: ".hero",
      menuButton: ".menu-button",
      mobileMenu: ".mobile-menu",
      mobileMenuClose: ".mobile-menu-top button",

      emotionWrapper: ".emotion-track-wrapper",
      emotionTrack: ".emotion-track",
      emotionCard: ".emotion-card",
      emotionButton: ".emotion-enter",

      emotionWorld: ".emotion-world",
      emotionWorldClose: ".world-close",

      pageTransition: ".page-transition",

      progressLine: ".progress-line i",

      reveal: ".reveal",

      exploreButton: ".explore-button",
      aiButton: ".ai-enter",

      pathway: ".pathway",
      finalBook: ".final-book"
    },

    timing: {
      transition: 850,
      revealOffset: 0.88,
      dragMultiplier: 1.15
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
     PAGE
     ======================================================= */

  const page =
    $(CONFIG.selectors.page) ||
    document.body;


  /* =======================================================
     TIME / ATMOSPHERE
     ======================================================= */

  function getTimePeriod() {
    const now = new Date();
    const hour = now.getHours();

    if (hour >= 5 && hour < 12) {
      return "morning";
    }

    if (hour >= 12 && hour < 17) {
      return "afternoon";
    }

    if (hour >= 17 && hour < 20) {
      return "evening";
    }

    return "night";
  }


  function setTimeAtmosphere() {
    const period = getTimePeriod();

    page.classList.remove(
      "time-morning",
      "time-afternoon",
      "time-evening",
      "time-night"
    );

    page.classList.add(`time-${period}`);

    document.documentElement.dataset.akshTime = period;

    return period;
  }


  setTimeAtmosphere();


  /*
   * Keep the atmosphere accurate if the visitor
   * stays on the page across a time boundary.
   */
  let lastPeriod = getTimePeriod();

  setInterval(() => {
    const currentPeriod = getTimePeriod();

    if (currentPeriod !== lastPeriod) {
      lastPeriod = currentPeriod;
      setTimeAtmosphere();
    }
  }, 30000);


  /* =======================================================
     MOBILE MENU
     ======================================================= */

  const menuButton = $(CONFIG.selectors.menuButton);
  const mobileMenu = $(CONFIG.selectors.mobileMenu);
  const mobileMenuClose = $(CONFIG.selectors.mobileMenuClose);


  function openMobileMenu() {
    if (!mobileMenu) return;

    mobileMenu.classList.add("open");
    document.body.classList.add("menu-open");

    if (menuButton) {
      menuButton.setAttribute("aria-expanded", "true");
    }
  }


  function closeMobileMenu() {
    if (!mobileMenu) return;

    mobileMenu.classList.remove("open");
    document.body.classList.remove("menu-open");

    if (menuButton) {
      menuButton.setAttribute("aria-expanded", "false");
    }
  }


  if (menuButton) {
    menuButton.addEventListener("click", () => {
      if (mobileMenu?.classList.contains("open")) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }


  if (mobileMenuClose) {
    mobileMenuClose.addEventListener(
      "click",
      closeMobileMenu
    );
  }


  $$(".mobile-navigation a").forEach(link => {
    link.addEventListener("click", () => {
      closeMobileMenu();
    });
  });


  /* =======================================================
     ESCAPE KEY
     ======================================================= */

  document.addEventListener("keydown", event => {

    if (event.key === "Escape") {
      closeMobileMenu();
      closeEmotionWorld();
    }

  });


  /* =======================================================
     PAGE TRANSITION
     ======================================================= */

  const pageTransition =
    $(CONFIG.selectors.pageTransition);


  function transitionTo(url) {

    if (!url) return;

    if (!pageTransition) {
      window.location.href = url;
      return;
    }

    pageTransition.classList.add("active");

    setTimeout(() => {
      window.location.href = url;
    }, CONFIG.timing.transition);
  }


  /* =======================================================
     INTERNAL NAVIGATION
     ======================================================= */

  $$("a[href]").forEach(link => {

    const href = link.getAttribute("href");

    if (
      !href ||
      href.startsWith("#") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:") ||
      href.startsWith("javascript:") ||
      link.target === "_blank"
    ) {
      return;
    }


    /*
     * Only animate local page navigation.
     */
    const isExternal =
      href.startsWith("http://") ||
      href.startsWith("https://");


    if (isExternal) return;


    link.addEventListener("click", event => {

      /*
       * Don't interfere with same-page anchors.
       */
      if (href.startsWith("#")) return;

      event.preventDefault();

      closeMobileMenu();

      transitionTo(href);

    });

  });


  /* =======================================================
     EXPLORE / BEGIN JOURNEY
     ======================================================= */

  const exploreButton =
    $(CONFIG.selectors.exploreButton);


  if (exploreButton) {

    exploreButton.addEventListener("click", event => {

      event.preventDefault();

      const target =
        document.querySelector("#feeling") ||
        document.querySelector(".feeling-section");

      if (target) {

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      }

    });

  }


  /* =======================================================
     SCROLL PROGRESS
     ======================================================= */

  const progress =
    $(CONFIG.selectors.progressLine);


  function updateScrollProgress() {

    if (!progress) return;

    const scrollTop =
      window.scrollY || window.pageYOffset;

    const documentHeight =
      document.documentElement.scrollHeight -
      window.innerHeight;

    if (documentHeight <= 0) {
      progress.style.height = "0%";
      return;
    }

    const percentage =
      Math.min(
        100,
        Math.max(
          0,
          (scrollTop / documentHeight) * 100
        )
      );

    progress.style.height = `${percentage}%`;

  }


  window.addEventListener(
    "scroll",
    updateScrollProgress,
    { passive: true }
  );

  updateScrollProgress();


  /* =======================================================
     REVEAL SYSTEM
     ======================================================= */

  const revealElements =
    $$(CONFIG.selectors.reveal);


  if ("IntersectionObserver" in window) {

    const revealObserver =
      new IntersectionObserver(
        entries => {

          entries.forEach(entry => {

            if (entry.isIntersecting) {

              entry.target.classList.add("visible");

              revealObserver.unobserve(
                entry.target
              );

            }

          });

        },
        {
          threshold: 0.12,
          rootMargin: "0px 0px -8% 0px"
        }
      );


    revealElements.forEach(element => {
      revealObserver.observe(element);
    });

  } else {

    revealElements.forEach(element => {
      element.classList.add("visible");
    });

  }


  /* =======================================================
     EMOTION HORIZONTAL TRACK
     ======================================================= */

  const emotionWrapper =
    $(CONFIG.selectors.emotionWrapper);

  const emotionTrack =
    $(CONFIG.selectors.emotionTrack);


  let isDragging = false;
  let dragStartX = 0;
  let initialScrollLeft = 0;


  if (emotionWrapper && emotionTrack) {

    emotionWrapper.addEventListener(
      "pointerdown",
      event => {

        /*
         * Don't start dragging when pressing
         * an interactive button.
         */
        if (
          event.target.closest(
            "button, a, input"
          )
        ) {
          return;
        }

        isDragging = true;

        emotionWrapper.classList.add("dragging");

        dragStartX = event.clientX;

        initialScrollLeft =
          emotionWrapper.scrollLeft;

        emotionWrapper.setPointerCapture(
          event.pointerId
        );

      }
    );


    emotionWrapper.addEventListener(
      "pointermove",
      event => {

        if (!isDragging) return;

        const distance =
          event.clientX - dragStartX;

        emotionWrapper.scrollLeft =
          initialScrollLeft -
          distance *
          CONFIG.timing.dragMultiplier;

      }
    );


    const stopDragging = event => {

      if (!isDragging) return;

      isDragging = false;

      emotionWrapper.classList.remove(
        "dragging"
      );

      try {
        emotionWrapper.releasePointerCapture(
          event.pointerId
        );
      } catch (_) {}

    };


    emotionWrapper.addEventListener(
      "pointerup",
      stopDragging
    );

    emotionWrapper.addEventListener(
      "pointercancel",
      stopDragging
    );

    emotionWrapper.addEventListener(
      "pointerleave",
      event => {

        if (
          event.pointerType === "mouse"
        ) {
          stopDragging(event);
        }

      }
    );

  }


  /* =======================================================
     EMOTION TRACK BUTTONS
     ======================================================= */

  const emotionButtons =
    $$(CONFIG.selectors.emotionButton);


  /* =======================================================
     EMOTION WORLD DATA
     ======================================================= */

  const emotionWorlds = {

    anxious: {
      title: "You can breathe.",
      kicker: "A QUIET PLACE FOR ANXIOUS MOMENTS",
      description:
        "Nothing needs to be solved right now. Take a moment. Slow down. Let yourself arrive.",
      background:
        "radial-gradient(circle at 50% 28%, rgba(150,190,205,.32), transparent 40%), linear-gradient(180deg,#253a43,#0b1318)"
    },

    overwhelmed: {
      title: "One thing at a time.",
      kicker: "A SPACE TO SLOW THE NOISE",
      description:
        "You don't have to carry everything at once. Let's create a little room around what you're feeling.",
      background:
        "radial-gradient(circle at 50% 30%, rgba(224,180,142,.25), transparent 40%), linear-gradient(180deg,#493d3c,#121114)"
    },

    talk: {
      title: "You don't have to be alone.",
      kicker: "WHEN YOU NEED SOMEONE TO TALK TO",
      description:
        "Sometimes being heard is where everything begins. You can talk, explore or take the next step when you're ready.",
      background:
        "radial-gradient(circle at 50% 25%, rgba(195,165,225,.32), transparent 40%), linear-gradient(180deg,#453752,#101018)"
    },

    exploring: {
      title: "Take your time.",
      kicker: "WELCOME TO AKSH",
      description:
        "Explore at your own pace. Discover the space, understand your mind and find what feels right for you.",
      background:
        "radial-gradient(circle at 50% 28%, rgba(160,205,184,.3), transparent 40%), linear-gradient(180deg,#304a43,#0c1412)"
    }

  };


  /* =======================================================
     GET EMOTION
     ======================================================= */

  function getEmotionFromCard(card) {

    if (!card) return "exploring";

    const explicitEmotion =
      card.dataset.emotion;

    if (explicitEmotion) {
      return explicitEmotion.toLowerCase();
    }


    const text =
      card.textContent.toLowerCase();


    if (
      text.includes("anxious") ||
      text.includes("anxiety")
    ) {
      return "anxious";
    }


    if (
      text.includes("overwhelmed") ||
      text.includes("overwhelm")
    ) {
      return "overwhelmed";
    }


    if (
      text.includes("talk") ||
      text.includes("someone")
    ) {
      return "talk";
    }


    return "exploring";
  }


  /* =======================================================
     OPEN EMOTION WORLD
     ======================================================= */

  function openEmotionWorld(emotion) {

    const world =
      $(CONFIG.selectors.emotionWorld);

    if (!world) return;


    const data =
      emotionWorlds[emotion] ||
      emotionWorlds.exploring;


    world.classList.add("open");

    document.body.classList.add(
      "emotion-world-open"
    );


    const background =
      $(".emotion-world-background", world);

    if (background) {
      background.style.background =
        data.background;
    }


    const kicker =
      $(".world-kicker", world);

    if (kicker) {
      kicker.textContent =
        data.kicker;
    }


    const title =
      $(".world-content h2", world);

    if (title) {
      title.textContent =
        data.title;
    }


    const description =
      $(".world-description", world);

    if (description) {
      description.textContent =
        data.description;
    }


    world.dataset.emotion =
      emotion;


    /*
     * Start/reset breathing animation.
     */
    const breathCircle =
      $(".breath-circle", world);

    if (breathCircle) {

      breathCircle.style.animation =
        "none";

      void breathCircle.offsetWidth;

      breathCircle.style.animation =
        "breath 5s ease-in-out infinite";

    }

  }


  /* =======================================================
     CLOSE EMOTION WORLD
     ======================================================= */

  function closeEmotionWorld() {

    const world =
      $(CONFIG.selectors.emotionWorld);

    if (!world) return;

    world.classList.remove("open");

    document.body.classList.remove(
      "emotion-world-open"
    );

  }


  /* =======================================================
     EMOTION CARD EVENTS
     ======================================================= */

  emotionButtons.forEach(button => {

    button.addEventListener(
      "click",
      event => {

        event.preventDefault();

        event.stopPropagation();

        const card =
          button.closest(
            CONFIG.selectors.emotionCard
          );


        const emotion =
          getEmotionFromCard(card);


        openEmotionWorld(emotion);

      }
    );

  });


  /* =======================================================
     EMOTION CARD KEYBOARD ACCESS
     ======================================================= */

  $$(CONFIG.selectors.emotionCard)
    .forEach(card => {

      card.addEventListener(
        "keydown",
        event => {

          if (
            event.key !== "Enter" &&
            event.key !== " "
          ) {
            return;
          }


          /*
           * Only activate the card itself
           * if there isn't already a button.
           */
          if (
            event.target.closest(
              "button, a"
            )
          ) {
            return;
          }


          event.preventDefault();

          openEmotionWorld(
            getEmotionFromCard(card)
          );

        }
      );

    });


  /* =======================================================
     WORLD CLOSE
     ======================================================= */

  const worldClose =
    $(CONFIG.selectors.emotionWorldClose);


  if (worldClose) {

    worldClose.addEventListener(
      "click",
      event => {

        event.preventDefault();

        closeEmotionWorld();

      }
    );

  }


  /* =======================================================
     CLICK OUTSIDE WORLD
     ======================================================= */

  const emotionWorld =
    $(CONFIG.selectors.emotionWorld);


  if (emotionWorld) {

    emotionWorld.addEventListener(
      "click",
      event => {

        if (
          event.target === emotionWorld
        ) {
          closeEmotionWorld();
        }

      }
    );

  }


  /* =======================================================
     WORLD BOOKING BUTTON
     ======================================================= */

  $$(".world-primary").forEach(button => {

    button.addEventListener(
      "click",
      event => {

        event.preventDefault();

        /*
         * Booking will eventually become
         * its own dedicated page.
         */
        transitionTo("booking.html");

      }
    );

  });


  /* =======================================================
     WORLD AI BUTTON
     ======================================================= */

  $$(".world-secondary").forEach(button => {

    button.addEventListener(
      "click",
      event => {

        event.preventDefault();

        /*
         * AI will eventually have its own
         * dedicated immersive experience.
         */
        const aiSection =
          document.querySelector(
            ".ai-section"
          );

        closeEmotionWorld();

        if (aiSection) {

          setTimeout(() => {

            aiSection.scrollIntoView({
              behavior: "smooth",
              block: "start"
            });

          }, 350);

        }

      }
    );

  });


  /* =======================================================
     AI ENTER
     ======================================================= */

  const aiButton =
    $(CONFIG.selectors.aiButton);


  if (aiButton) {

    aiButton.addEventListener(
      "click",
      event => {

        event.preventDefault();

        /*
         * AI page can be connected later
         * without changing Page 1 design.
         */
        const aiTarget =
          aiButton.dataset.aiUrl ||
          "ai.html";

        transitionTo(aiTarget);

      }
    );

  }


  /* =======================================================
     PATHWAY INTERACTIONS
     ======================================================= */

  $$(CONFIG.selectors.pathway)
    .forEach(pathway => {

      pathway.addEventListener(
        "click",
        () => {

          const url =
            pathway.dataset.url;

          if (url) {
            transitionTo(url);
          }

        }
      );


      pathway.addEventListener(
        "keydown",
        event => {

          if (
            event.key !== "Enter" &&
            event.key !== " "
          ) {
            return;
          }

          event.preventDefault();

          const url =
            pathway.dataset.url;

          if (url) {
            transitionTo(url);
          }

        }
      );

    });


  /* =======================================================
     FINAL BOOKING
     ======================================================= */

  const finalBook =
    $(CONFIG.selectors.finalBook);


  if (finalBook) {

    finalBook.addEventListener(
      "click",
      event => {

        event.preventDefault();

        const url =
          finalBook.getAttribute("href") ||
          "booking.html";

        transitionTo(url);

      }
    );

  }


  /* =======================================================
     SMART HORIZONTAL WHEEL
     ======================================================= */

  if (emotionWrapper) {

    emotionWrapper.addEventListener(
      "wheel",
      event => {

        /*
         * Convert vertical mouse wheel movement
         * into horizontal emotion movement.
         */
        if (
          Math.abs(event.deltaY) >
          Math.abs(event.deltaX)
        ) {

          const atStart =
            emotionWrapper.scrollLeft <= 0 &&
            event.deltaY < 0;

          const atEnd =
            emotionWrapper.scrollLeft +
            emotionWrapper.clientWidth >=
            emotionWrapper.scrollWidth - 2 &&
            event.deltaY > 0;


          /*
           * Allow normal page scrolling at
           * the beginning/end of the track.
           */
          if (atStart || atEnd) {
            return;
          }


          event.preventDefault();

          emotionWrapper.scrollLeft +=
            event.deltaY * 1.15;

        }

      },
      { passive: false }
    );

  }


  /* =======================================================
     TOUCH FRIENDLY EMOTION TRACK
     ======================================================= */

  if (emotionWrapper) {

    let touchStartX = 0;
    let touchStartScroll = 0;


    emotionWrapper.addEventListener(
      "touchstart",
      event => {

        if (!event.touches.length) return;

        touchStartX =
          event.touches[0].clientX;

        touchStartScroll =
          emotionWrapper.scrollLeft;

      },
      { passive: true }
    );


    emotionWrapper.addEventListener(
      "touchmove",
      event => {

        if (!event.touches.length) return;

        const currentX =
          event.touches[0].clientX;

        const difference =
          currentX - touchStartX;

        emotionWrapper.scrollLeft =
          touchStartScroll - difference;

      },
      { passive: true }
    );

  }


  /* =======================================================
     PARALLAX ATMOSPHERE
     ======================================================= */

  const clouds =
    $$(".cloud");


  if (
    clouds.length &&
    !window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
  ) {

    let targetX = 0;
    let targetY = 0;

    let currentX = 0;
    let currentY = 0;


    window.addEventListener(
      "pointermove",
      event => {

        targetX =
          (event.clientX /
            window.innerWidth -
            .5) * 2;

        targetY =
          (event.clientY /
            window.innerHeight -
            .5) * 2;

      },
      { passive: true }
    );


    function animateAtmosphere() {

      currentX +=
        (targetX - currentX) * .025;

      currentY +=
        (targetY - currentY) * .025;


      clouds.forEach(
        (cloud, index) => {

          const multiplier =
            (index + 1) * 6;

          cloud.style.marginLeft =
            `${currentX * multiplier}px`;

          cloud.style.marginTop =
            `${currentY * multiplier}px`;

        }
      );


      requestAnimationFrame(
        animateAtmosphere
      );

    }


    animateAtmosphere();

  }


  /* =======================================================
     MOUSE PARALLAX FOR AI ORBIT
     ======================================================= */

  const aiOrbit =
    $(".ai-orbit");


  if (
    aiOrbit &&
    window.matchMedia(
      "(pointer: fine)"
    ).matches
  ) {

    let targetX = 0;
    let targetY = 0;

    let currentX = 0;
    let currentY = 0;


    window.addEventListener(
      "pointermove",
      event => {

        targetX =
          (event.clientX /
            window.innerWidth -
            .5) * 10;

        targetY =
          (event.clientY /
            window.innerHeight -
            .5) * 10;

      },
      { passive: true }
    );


    function animateAIOrbit() {

      currentX +=
        (targetX - currentX) * .035;

      currentY +=
        (targetY - currentY) * .035;


      aiOrbit.style.transform =
        `translate3d(${currentX}px, ${currentY}px, 0)`;


      requestAnimationFrame(
        animateAIOrbit
      );

    }


    animateAIOrbit();

  }


  /* =======================================================
     IMAGE LOADING ENHANCEMENT
     ======================================================= */

  $$("img").forEach(image => {

    image.addEventListener(
      "load",
      () => {
        image.classList.add("loaded");
      },
      { once: true }
    );

  });


  /* =======================================================
     ACTIVE NAVIGATION
     ======================================================= */

  const currentPage =
    window.location.pathname
      .split("/")
      .pop()
      .toLowerCase();


  $$(
    ".desktop-nav a, .mobile-navigation a"
  ).forEach(link => {

    const href =
      (link.getAttribute("href") || "")
        .split("/")
        .pop()
        .toLowerCase();


    if (
      href &&
      href === currentPage
    ) {

      link.classList.add("active");

    }

  });


  /* =======================================================
     SECTION OBSERVER
     ======================================================= */

  const sections =
    $$("section[id]");


  if (
    sections.length &&
    "IntersectionObserver" in window
  ) {

    const sectionObserver =
      new IntersectionObserver(
        entries => {

          entries.forEach(entry => {

            if (
              entry.isIntersecting
            ) {

              document.body.dataset.activeSection =
                entry.target.id;

            }

          });

        },
        {
          threshold: .35
        }
      );


    sections.forEach(section => {

      sectionObserver.observe(section);

    });

  }


  /* =======================================================
     PREVENT DOUBLE TAP ZOOM ON BUTTONS
     ======================================================= */

  $$(
    "button, .emotion-enter, .explore-button"
  ).forEach(button => {

    button.addEventListener(
      "touchend",
      () => {},
      { passive: true }
    );

  });


  /* =======================================================
     PAGE 1 READY STATE
     ======================================================= */

  requestAnimationFrame(() => {

    page.classList.add("page-ready");

  });


  /* =======================================================
     DEBUG-SAFE ERROR HANDLING
     ======================================================= */

  window.AKSHPage1 = {
    getTimePeriod,
    setTimeAtmosphere,
    openEmotionWorld,
    closeEmotionWorld,
    transitionTo
  };


})();
