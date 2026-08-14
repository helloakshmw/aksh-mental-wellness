/* =========================================================
   AKSH — PAGE 01
   PREMIUM CINEMATIC WORLD
   COMPLETE PAGE 1 JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     ELEMENTS
     ======================================================= */

  const body = document.body;
  const header = document.querySelector(".header");
  const menuButton = document.querySelector(".menu-button");
  const nav = document.querySelector(".nav");
  const emotions = document.querySelectorAll(".emotion");
  const beginButtons = document.querySelectorAll(
    ".begin-button, .begin-primary, .begin-secondary, .ai-button"
  );


  /* =======================================================
     TIME OF DAY
     ======================================================= */

  function updateTimeOfDay() {

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

  updateTimeOfDay();

  setInterval(updateTimeOfDay, 60000);


  /* =======================================================
     HEADER SCROLL
     ======================================================= */

  function updateHeader() {

    if (!header) return;

    if (window.scrollY > 40) {

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

      const isOpen =
        header.classList.toggle("mobile-open");

      menuButton.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

    });

  }


  /* =======================================================
     CLOSE MOBILE MENU WHEN NAV ITEM IS CLICKED
     ======================================================= */

  if (nav && header) {

    nav.querySelectorAll("a").forEach(link => {

      link.addEventListener("click", () => {

        header.classList.remove("mobile-open");

        if (menuButton) {
          menuButton.setAttribute(
            "aria-expanded",
            "false"
          );
        }

      });

    });

  }


  /* =======================================================
     ESCAPE KEY — CLOSE MENU
     ======================================================= */

  document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

      header?.classList.remove("mobile-open");

      menuButton?.setAttribute(
        "aria-expanded",
        "false"
      );

    }

  });


  /* =======================================================
     EMOTION CARDS
     ======================================================= */

  emotions.forEach(card => {

    card.addEventListener("click", () => {

      const target =
        card.dataset.target ||
        card.getAttribute("data-target");

      if (target) {

        const destination =
          document.querySelector(target);

        if (destination) {

          destination.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });

        }

      }

      card.classList.add("emotion-active");

      setTimeout(() => {

        card.classList.remove("emotion-active");

      }, 700);

    });

  });


  /* =======================================================
     HORIZONTAL EMOTION TRACK
     MOUSE WHEEL → HORIZONTAL SCROLL
     ======================================================= */

  const emotionTrack =
    document.querySelector(".emotion-track");

  if (emotionTrack) {

    emotionTrack.addEventListener(
      "wheel",
      event => {

        if (
          Math.abs(event.deltaY) >
          Math.abs(event.deltaX)
        ) {

          if (
            emotionTrack.scrollWidth >
            emotionTrack.clientWidth
          ) {

            event.preventDefault();

            emotionTrack.scrollLeft +=
              event.deltaY;

          }

        }

      },
      { passive: false }
    );

  }


  /* =======================================================
     CARD PARALLAX
     ======================================================= */

  emotions.forEach(card => {

    const background =
      card.querySelector(".emotion-bg");

    if (!background) return;

    card.addEventListener("pointermove", event => {

      if (window.innerWidth < 901) return;

      const rect =
        card.getBoundingClientRect();

      const x =
        (event.clientX - rect.left) /
        rect.width -
        0.5;

      const y =
        (event.clientY - rect.top) /
        rect.height -
        0.5;

      background.style.transform =
        `scale(1.06)
         translate3d(${x * 12}px, ${y * 12}px, 0)`;

    });

    card.addEventListener("pointerleave", () => {

      background.style.transform =
        "scale(1) translate3d(0,0,0)";

    });

  });


  /* =======================================================
     INTERSECTION REVEALS
     ======================================================= */

  const revealElements =
    document.querySelectorAll(
      ".hero-inner, .section-inner, .emotion, .journey-step, .founder-photo, .ai-orb"
    );

  if ("IntersectionObserver" in window) {

    const observer =
      new IntersectionObserver(
        entries => {

          entries.forEach(entry => {

            if (entry.isIntersecting) {

              entry.target.classList.add(
                "is-visible"
              );

              observer.unobserve(
                entry.target
              );

            }

          });

        },
        {
          threshold: 0.12,
          rootMargin: "0px 0px -40px 0px"
        }
      );

    revealElements.forEach(element => {

      element.classList.add("reveal");

      observer.observe(element);

    });

  } else {

    revealElements.forEach(element => {

      element.classList.add("is-visible");

    });

  }


  /* =======================================================
     SMOOTH INTERNAL LINKS
     ======================================================= */

  document
    .querySelectorAll('a[href^="#"]')
    .forEach(link => {

      link.addEventListener("click", event => {

        const href =
          link.getAttribute("href");

        if (
          !href ||
          href === "#" ||
          href === "#!"
        ) {
          return;
        }

        const target =
          document.querySelector(href);

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      });

    });


  /* =======================================================
     AI ORB — SUBTLE INTERACTION
     ======================================================= */

  const orb =
    document.querySelector(".ai-orb");

  if (orb) {

    orb.addEventListener("pointermove", event => {

      if (window.innerWidth < 901) return;

      const rect =
        orb.getBoundingClientRect();

      const x =
        (event.clientX - rect.left) /
        rect.width -
        0.5;

      const y =
        (event.clientY - rect.top) /
        rect.height -
        0.5;

      orb.style.transform =
        `translate(${x * 8}px, ${y * 8}px)`;

    });

    orb.addEventListener("pointerleave", () => {

      orb.style.transform =
        "";

    });

  }


  /* =======================================================
     BUTTON MICRO INTERACTION
     ======================================================= */

  beginButtons.forEach(button => {

    button.addEventListener("pointerdown", () => {

      button.style.transform =
        "scale(.97)";

    });

    button.addEventListener("pointerup", () => {

      button.style.transform =
        "";

    });

    button.addEventListener("pointercancel", () => {

      button.style.transform =
        "";

    });

  });


  /* =======================================================
     PREVENT DOUBLE TAP ZOOM ON INTERACTIVE ELEMENTS
     ======================================================= */

  document
    .querySelectorAll(
      "button, .emotion, .begin-button, .ai-button"
    )
    .forEach(element => {

      element.style.touchAction =
        "manipulation";

    });


  /* =======================================================
     PAGE READY
     ======================================================= */

  requestAnimationFrame(() => {

    body.classList.add("page-ready");

  });

});
