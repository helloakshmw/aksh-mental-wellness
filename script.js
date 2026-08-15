/* =========================================================
   AKSH — SHARED SITE ENGINE
   script.js
   ========================================================= */

(() => {
  "use strict";

  /* =========================================================
     01 — BASIC SETUP
     ========================================================= */

  const root = document.documentElement;
  const body = document.body;

  if (!root || !body) return;


  /* =========================================================
     02 — TIME PERIOD
     ========================================================= */

  function getTimePeriod(date = new Date()) {
    const minutes =
      date.getHours() * 60 +
      date.getMinutes();

    if (minutes >= 300 && minutes < 720) {
      return "morning";
    }

    if (minutes >= 720 && minutes < 1020) {
      return "afternoon";
    }

    if (minutes >= 1020 && minutes < 1200) {
      return "evening";
    }

    return "night";
  }


  /* =========================================================
     03 — GLOBAL TIME STATE
     ========================================================= */

  function updateTimeState() {
    const period = getTimePeriod();

    root.dataset.time = period;

    body.classList.remove(
      "time-morning",
      "time-afternoon",
      "time-evening",
      "time-night"
    );

    body.classList.add(
      `time-${period}`
    );

    return period;
  }

  updateTimeState();

  setInterval(
    updateTimeState,
    60000
  );


  /* =========================================================
     04 — DATE / DAY HELPERS
     ========================================================= */

  function getDateInformation() {
    const now = new Date();

    return {
      day:
        now.toLocaleDateString(
          "en-IN",
          {
            weekday: "long"
          }
        ),

      date:
        now.toLocaleDateString(
          "en-IN",
          {
            day: "2-digit",
            month: "short",
            year: "numeric"
          }
        ),

      time:
        now.toLocaleTimeString(
          "en-IN",
          {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true
          }
        )
    };
  }


  /* =========================================================
     05 — UPDATE COMMON DATE ELEMENTS
     ========================================================= */

  function updateCommonDateElements() {
    const information =
      getDateInformation();

    document
      .querySelectorAll(
        "[data-aksh-day]"
      )
      .forEach(element => {
        element.textContent =
          information.day;
      });

    document
      .querySelectorAll(
        "[data-aksh-date]"
      )
      .forEach(element => {
        element.textContent =
          information.date;
      });

    document
      .querySelectorAll(
        "[data-aksh-time]"
      )
      .forEach(element => {
        element.textContent =
          information.time;
      });
  }

  updateCommonDateElements();

  setInterval(
    updateCommonDateElements,
    1000
  );


  /* =========================================================
     06 — SMOOTH INTERNAL NAVIGATION
     ========================================================= */

  function handleInternalLinks() {
    document
      .querySelectorAll(
        'a[href^="#"]'
      )
      .forEach(link => {

        link.addEventListener(
          "click",
          event => {

            const targetID =
              link
                .getAttribute("href");

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
  }

  handleInternalLinks();


  /* =========================================================
     07 — REVEAL ELEMENTS
     ========================================================= */

  const revealElements =
    document.querySelectorAll(
      [
        "[data-reveal]",
        ".reveal",
        ".reveal-up",
        ".fade-in"
      ].join(",")
    );


  if (
    revealElements.length &&
    "IntersectionObserver" in window
  ) {

    const revealObserver =
      new IntersectionObserver(
        entries => {

          entries.forEach(
            entry => {

              if (
                !entry.isIntersecting
              ) {
                return;
              }

              entry.target.classList.add(
                "is-visible"
              );

              entry.target.classList.add(
                "visible"
              );

              revealObserver.unobserve(
                entry.target
              );

            }
          );

        },
        {
          threshold: 0.12,
          rootMargin:
            "0px 0px -40px 0px"
        }
      );

    revealElements.forEach(
      element => {
        revealObserver.observe(
          element
        );
      }
    );

  } else {

    revealElements.forEach(
      element => {

        element.classList.add(
          "is-visible"
        );

        element.classList.add(
          "visible"
        );

      }
    );

  }


  /* =========================================================
     08 — MOBILE MENU
     ========================================================= */

  const menuButton =
    document.querySelector(
      ".menu-button"
    );

  const mobileMenu =
    document.querySelector(
      ".mobile-menu"
    );

  const closeMenu =
    document.querySelector(
      ".close-menu"
    );


  function openMobileMenu() {

    if (!mobileMenu) return;

    mobileMenu.classList.add(
      "open"
    );

    mobileMenu.setAttribute(
      "aria-hidden",
      "false"
    );

    body.classList.add(
      "menu-open"
    );

    body.classList.add(
      "modal-open"
    );

  }


  function closeMobileMenu() {

    if (!mobileMenu) return;

    mobileMenu.classList.remove(
      "open"
    );

    mobileMenu.setAttribute(
      "aria-hidden",
      "true"
    );

    body.classList.remove(
      "menu-open"
    );

    body.classList.remove(
      "modal-open"
    );

  }


  if (menuButton) {

    menuButton.addEventListener(
      "click",
      event => {

        event.preventDefault();

        openMobileMenu();

      }
    );

  }


  if (closeMenu) {

    closeMenu.addEventListener(
      "click",
      event => {

        event.preventDefault();

        closeMobileMenu();

      }
    );

  }


  if (mobileMenu) {

    mobileMenu
      .querySelectorAll("a")
      .forEach(link => {

        link.addEventListener(
          "click",
          closeMobileMenu
        );

      });

  }


  /* =========================================================
     09 — ESC KEY
     ========================================================= */

  document.addEventListener(
    "keydown",
    event => {

      if (
        event.key === "Escape"
      ) {

        closeMobileMenu();

        document
          .querySelectorAll(
            ".open"
          )
          .forEach(element => {

            if (
              element.classList.contains(
                "emotion-modal"
              ) ||
              element.classList.contains(
                "quiet-overlay"
              ) ||
              element.classList.contains(
                "ai-panel"
              )
            ) {

              element.classList.remove(
                "open"
              );

            }

          });

        body.classList.remove(
          "modal-open"
        );

      }

    }
  );


  /* =========================================================
     10 — BACK TO TOP
     ========================================================= */

  document
    .querySelectorAll(
      "[data-back-top]"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        event => {

          event.preventDefault();

          window.scrollTo({
            top: 0,
            behavior: "smooth"
          });

        }
      );

    });


  /* =========================================================
     11 — BUTTON PRESS FEEDBACK
     ========================================================= */

  document
    .querySelectorAll(
      "button"
    )
    .forEach(button => {

      button.addEventListener(
        "pointerdown",
        () => {

          button.classList.add(
            "is-pressed"
          );

        }
      );

      button.addEventListener(
        "pointerup",
        () => {

          button.classList.remove(
            "is-pressed"
          );

        }
      );

      button.addEventListener(
        "pointercancel",
        () => {

          button.classList.remove(
            "is-pressed"
          );

        }
      );

      button.addEventListener(
        "pointerleave",
        () => {

          button.classList.remove(
            "is-pressed"
          );

        }
      );

    });


  /* =========================================================
     12 — PAGE TRANSITION
     ========================================================= */

  function goToPage(
    url,
    duration = 650
  ) {

    if (!url) return;

    const transition =
      document.querySelector(
        "#page-transition"
      );

    if (!transition) {

      window.location.href =
        url;

      return;

    }

    transition.classList.add(
      "active"
    );

    window.setTimeout(
      () => {

        window.location.href =
          url;

      },
      duration
    );

  }


  document
    .querySelectorAll(
      "[data-page-link]"
    )
    .forEach(link => {

      link.addEventListener(
        "click",
        event => {

          const url =
            link.getAttribute(
              "data-page-link"
            );

          if (!url) return;

          event.preventDefault();

          goToPage(url);

        }
      );

    });


  /* =========================================================
     13 — HORIZONTAL TOUCH / DRAG SCROLL
     ========================================================= */

  document
    .querySelectorAll(
      "[data-horizontal-scroll]"
    )
    .forEach(container => {

      let dragging = false;
      let startX = 0;
      let startScroll = 0;

      container.addEventListener(
        "pointerdown",
        event => {

          dragging = true;

          startX =
            event.clientX;

          startScroll =
            container.scrollLeft;

          container.classList.add(
            "dragging"
          );

        }
      );


      container.addEventListener(
        "pointermove",
        event => {

          if (!dragging) {
            return;
          }

          const distance =
            event.clientX -
            startX;

          container.scrollLeft =
            startScroll -
            distance;

        }
      );


      function stopDragging() {

        dragging = false;

        container.classList.remove(
          "dragging"
        );

      }


      container.addEventListener(
        "pointerup",
        stopDragging
      );

      container.addEventListener(
        "pointercancel",
        stopDragging
      );

      container.addEventListener(
        "pointerleave",
        stopDragging
      );

    });


  /* =========================================================
     14 — REDUCED MOTION
     ========================================================= */

  const reducedMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

  if (
    reducedMotion.matches
  ) {

    root.dataset.motion =
      "reduced";

  } else {

    root.dataset.motion =
      "full";

  }


  /* =========================================================
     15 — PUBLIC AKSH UTILITIES
     ========================================================= */

  window.AKSH = {

    getTimePeriod,

    getDateInformation,

    updateTimeState,

    updateCommonDateElements,

    goToPage

  };


  /* =========================================================
     16 — READY STATE
     ========================================================= */

  root.classList.add(
    "aksh-ready"
  );

  body.classList.add(
    "aksh-ready"
  );

})();
