/* =========================================================
   AKSH — PAGE 1 JAVASCRIPT
   MATCHED TO page1.html + page1.css
   ========================================================= */

(() => {

  "use strict";


  /* =======================================================
     CONFIG
     ======================================================= */

  const CONFIG = {

    home: "index.html",

    booking: "page9.html",

    transitionDuration: 650

  };


  /* =======================================================
     DOM
     ======================================================= */

  const body =
    document.body;

  const header =
    document.querySelector(".site-header");

  const menuButton =
    document.getElementById("menu-button");

  const mobileMenu =
    document.getElementById("mobile-menu");

  const mobileClose =
    document.getElementById("mobile-close");

  const mobileLinks =
    document.querySelectorAll(
      ".mobile-menu a"
    );

  const transition =
    document.getElementById("page-transition");

  const cards =
    document.querySelectorAll(
      ".emotion-card"
    );

  const panel =
    document.getElementById(
      "experience-panel"
    );

  const panelClose =
    document.getElementById(
      "experience-close"
    );

  const experienceNumber =
    document.getElementById(
      "experience-number"
    );

  const experienceEyebrow =
    document.getElementById(
      "experience-eyebrow"
    );

  const experienceIcon =
    document.getElementById(
      "experience-icon"
    );

  const experienceTitle =
    document.getElementById(
      "experience-title"
    );

  const experienceMessage =
    document.getElementById(
      "experience-message"
    );

  const experienceDescription =
    document.getElementById(
      "experience-description"
    );

  const experienceAction =
    document.getElementById(
      "experience-action"
    );

  const experienceButton =
    document.getElementById(
      "experience-button"
    );


  /* =======================================================
     EXPERIENCE DATA
     ======================================================= */

  const experiences = {

    anxious: {

      number: "01",

      icon: "◌",

      eyebrow:
        "WHEN YOUR MIND WON'T SLOW DOWN",

      title:
        "Anxious",

      message:
        "You don't have to figure everything out at once.",

      description:
        "Sometimes the first step is simply creating a little space to breathe, understand what you're feeling, and feel supported.",

      action:
        "I WANT TO FEEL CALMER"

    },


    overwhelmed: {

      number: "02",

      icon: "≈",

      eyebrow:
        "WHEN EVERYTHING FEELS LIKE TOO MUCH",

      title:
        "Overwhelmed",

      message:
        "You are allowed to pause.",

      description:
        "You don't have to carry everything at the same time. AKSH is a space to slow down, organise what you're feeling, and find your next step.",

      action:
        "I NEED SOME SPACE"

    },


    talk: {

      number: "03",

      icon: "○",

      eyebrow:
        "WHEN YOU JUST WANT TO BE HEARD",

      title:
        "Need to talk",

      message:
        "You don't need the perfect words.",

      description:
        "AKSH is built around empathy, confidentiality and professional psychological support — a place where you can speak without judgment.",

      action:
        "I WANT TO TALK"

    },


    exploring: {

      number: "04",

      icon: "✦",

      eyebrow:
        "THERE IS NO RIGHT WAY TO BEGIN",

      title:
        "Just exploring",

      message:
        "Take your time. Explore at your own pace.",

      description:
        "Discover AKSH, understand your mind, meet the people behind the space and find what feels right for you.",

      action:
        "EXPLORE AKSH"

    }

  };


  /* =======================================================
     PAGE TRANSITION
     ======================================================= */

  let transitioning = false;


  function goToPage(
    destination
  ){

    if(
      !destination ||
      transitioning
    ){
      return;
    }

    transitioning = true;

    if(transition){

      transition.classList.add(
        "active"
      );

    }

    window.setTimeout(
      () => {

        window.location.href =
          destination;

      },
      CONFIG.transitionDuration
    );

  }


  /* =======================================================
     HEADER ON SCROLL
     ======================================================= */

  function updateHeader(){

    if(
      window.scrollY > 30
    ){

      header?.classList.add(
        "scrolled"
      );

    }else{

      header?.classList.remove(
        "scrolled"
      );

    }

  }


  window.addEventListener(
    "scroll",
    updateHeader,
    {
      passive:true
    }
  );

  updateHeader();


  /* =======================================================
     MOBILE MENU
     ======================================================= */

  function openMenu(){

    if(!mobileMenu){
      return;
    }

    mobileMenu.classList.add(
      "open"
    );

    body.classList.add(
      "menu-open"
    );

    menuButton?.setAttribute(
      "aria-expanded",
      "true"
    );

    mobileMenu.setAttribute(
      "aria-hidden",
      "false"
    );

  }


  function closeMenu(){

    if(!mobileMenu){
      return;
    }

    mobileMenu.classList.remove(
      "open"
    );

    body.classList.remove(
      "menu-open"
    );

    menuButton?.setAttribute(
      "aria-expanded",
      "false"
    );

    mobileMenu.setAttribute(
      "aria-hidden",
      "true"
    );

  }


  menuButton?.addEventListener(
    "click",
    openMenu
  );


  mobileClose?.addEventListener(
    "click",
    closeMenu
  );


  mobileLinks.forEach(
    link => {

      link.addEventListener(
        "click",
        closeMenu
      );

    }
  );


  document.addEventListener(
    "keydown",
    event => {

      if(
        event.key === "Escape"
      ){

        closeMenu();
        closeExperience();

      }

    }
  );


  /* =======================================================
     EXPERIENCE PANEL
     ======================================================= */

  function openExperience(
    type
  ){

    const data =
      experiences[type];

    if(
      !data ||
      !panel
    ){
      return;
    }


    experienceNumber.textContent =
      data.number;

    experienceEyebrow.textContent =
      data.eyebrow;

    experienceIcon.textContent =
      data.icon;

    experienceTitle.textContent =
      data.title;

    experienceMessage.textContent =
      data.message;

    experienceDescription.textContent =
      data.description;

    experienceAction.textContent =
      data.action;


    /*
      Exploring can remain on the page.
      The actual action still goes toward
      the booking/exploration route.
    */

    if(type === "exploring"){

      experienceButton.href =
        "#mind";

    }else{

      experienceButton.href =
        CONFIG.booking;

    }


    panel.classList.add(
      "open"
    );

    panel.setAttribute(
      "aria-hidden",
      "false"
    );

    body.classList.add(
      "panel-open"
    );

  }


  function closeExperience(){

    if(!panel){
      return;
    }

    panel.classList.remove(
      "open"
    );

    panel.setAttribute(
      "aria-hidden",
      "true"
    );

    body.classList.remove(
      "panel-open"
    );

  }


  panelClose?.addEventListener(
    "click",
    closeExperience
  );


  panel?.addEventListener(
    "click",
    event => {

      if(
        event.target === panel
      ){

        closeExperience();

      }

    }
  );


  /* =======================================================
     EMOTION CARD CLICK
     ======================================================= */

  cards.forEach(
    card => {

      const type =
        card.dataset.experience;


      card.addEventListener(
        "click",
        () => {

          openExperience(
            type
          );

        }
      );


      /* Keyboard */

      card.addEventListener(
        "keydown",
        event => {

          if(
            event.key === "Enter" ||
            event.key === " "
          ){

            event.preventDefault();

            openExperience(
              type
            );

          }

        }
      );

    }
  );


  /* =======================================================
     DESKTOP CARD PARALLAX
     ======================================================= */

  const finePointer =
    window.matchMedia(
      "(pointer:fine)"
    );


  if(
    finePointer.matches
  ){

    cards.forEach(
      card => {

        card.addEventListener(
          "pointermove",
          event => {

            const rect =
              card.getBoundingClientRect();

            const x =
              (
                event.clientX -
                rect.left
              ) /
              rect.width;

            const y =
              (
                event.clientY -
                rect.top
              ) /
              rect.height;


            const rotateY =
              (x - .5) * 5;

            const rotateX =
              (.5 - y) * 5;


            card.style.setProperty(
              "--rx",
              `${rotateX}deg`
            );

            card.style.setProperty(
              "--ry",
              `${rotateY}deg`
            );

          },
          {
            passive:true
          }
        );


        card.addEventListener(
          "pointerleave",
          () => {

            card.style.setProperty(
              "--rx",
              "0deg"
            );

            card.style.setProperty(
              "--ry",
              "0deg"
            );

          }
        );

      }
    );

  }


  /* =======================================================
     HORIZONTAL TOUCH FEEL
     ======================================================= */

  const track =
    document.getElementById(
      "emotion-track"
    );


  let dragging = false;

  let startX = 0;

  let startScroll = 0;


  track?.addEventListener(
    "pointerdown",
    event => {

      /*
        Don't interfere with clicking
        a card itself.
      */

      if(
        event.target.closest(
          ".emotion-card"
        )
      ){
        return;
      }

      dragging = true;

      startX =
        event.clientX;

      startScroll =
        track.scrollLeft;

    }
  );


  track?.addEventListener(
    "pointermove",
    event => {

      if(!dragging){
        return;
      }

      const distance =
        event.clientX -
        startX;

      track.scrollLeft =
        startScroll -
        distance;

    }
  );


  window.addEventListener(
    "pointerup",
    () => {

      dragging = false;

    }
  );


  /* =======================================================
     SMOOTH ANCHOR NAVIGATION
     ======================================================= */

  document
    .querySelectorAll(
      'a[href^="#"]'
    )
    .forEach(
      link => {

        link.addEventListener(
          "click",
          event => {

            const targetId =
              link.getAttribute(
                "href"
              );

            if(
              !targetId ||
              targetId === "#"
            ){
              return;
            }


            const target =
              document.querySelector(
                targetId
              );

            if(!target){
              return;
            }


            /*
              The experience button
              can close its panel before
              moving to the target.
            */

            if(
              link === experienceButton
            ){

              closeExperience();

            }


            event.preventDefault();


            target.scrollIntoView({
              behavior:"smooth",
              block:"start"
            });

          }
        );

      }
    );


  /* =======================================================
     CLOSE PANEL WHEN BOOKING
     ======================================================= */

  experienceButton?.addEventListener(
    "click",
    event => {

      const href =
        experienceButton.getAttribute(
          "href"
        );

      if(
        href &&
        href !== "#mind"
      ){

        event.preventDefault();

        closeExperience();

        window.setTimeout(
          () => {

            goToPage(
              href
            );

          },
          180
        );

      }

    }
  );


  /* =======================================================
     PREVENT DOUBLE TAP ZOOM
     ======================================================= */

  let lastTouchEnd = 0;


  document.addEventListener(
    "touchend",
    event => {

      const now =
        Date.now();

      if(
        now - lastTouchEnd <= 300
      ){

        event.preventDefault();

      }

      lastTouchEnd =
        now;

    },
    {
      passive:false
    }
  );


  /* =======================================================
     IMAGE ERROR PROTECTION
     ======================================================= */

  document
    .querySelectorAll("img")
    .forEach(
      image => {

        image.addEventListener(
          "error",
          () => {

            image.style.opacity =
              "0";

          }
        );

      }
    );


  /* =======================================================
     INITIAL REVEAL
     ======================================================= */

  requestAnimationFrame(
    () => {

      body.classList.add(
        "page-ready"
      );

    }
  );


})();
