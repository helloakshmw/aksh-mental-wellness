/* ============================================================
   AKSH PAGE 1
   CINEMATIC EXPERIENCE ENGINE
============================================================ */

(() => {

  "use strict";


  /* ==========================================================
     ELEMENTS
  ========================================================== */

  const world =
    document.getElementById("world");

  const worldVideo =
    document.getElementById("worldVideo");

  const timeTitle =
    document.getElementById("timeTitle");

  const heroQuote =
    document.getElementById("heroQuote");

  const heroDescription =
    document.getElementById("heroDescription");

  const noteGreeting =
    document.getElementById("noteGreeting");

  const dailyNoteText =
    document.getElementById("dailyNoteText");

  const currentDate =
    document.getElementById("currentDate");

  const currentDay =
    document.getElementById("currentDay");

  const emotionRail =
    document.getElementById("emotionRail");

  const emotionWorld =
    document.getElementById("emotionWorld");

  const emotionClose =
    document.getElementById("emotionClose");

  const emotionWorldKicker =
    document.getElementById("emotionWorldKicker");

  const emotionWorldTitle =
    document.getElementById("emotionWorldTitle");

  const emotionWorldText =
    document.getElementById("emotionWorldText");

  const worksModal =
    document.getElementById("worksModal");

  const listenButton =
    document.getElementById("listenButton");

  const modalClose =
    document.getElementById("modalClose");

  const heartButton =
    document.getElementById("heartButton");

  const menuButton =
    document.getElementById("menuButton");

  const mobileMenu =
    document.getElementById("mobileMenu");


  /* ==========================================================
     TIME CONFIGURATION

     Existing AKSH cinematic videos are used here.
  ========================================================== */

  const scenes = {

    morning: {
      label: "GOOD MORNING",

      greeting: "Good morning",

      description:
        "Begin gently. There is nothing you need to rush into.",

      quotes: [
        "You deserve a morning that begins gently.",
        "Let today arrive without asking too much of you.",
        "There is still room for something beautiful today.",
        "Start softly. You do not have to hurry."
      ],

      notes: [
        "A quiet beginning can change the whole rhythm of a day.",
        "Take one breath before you take on the world.",
        "You are allowed to begin slowly.",
        "Let the morning meet you exactly where you are."
      ],

      videos: [
        "aksh-morning.1.mov",
        "aksh-morning.2.mov",
        "aksh-morning.3.mov",
        "aksh-morning.4.mov"
      ]
    },


    afternoon: {
      label: "GOOD AFTERNOON",

      greeting: "Good afternoon",

      description:
        "Pause in the middle of the day. Notice what your mind needs.",

      quotes: [
        "Your wellbeing belongs in the middle of your day too.",
        "You are allowed to pause before continuing.",
        "A slower moment can change the rest of your day.",
        "Come back to yourself, even in the middle of everything."
      ],

      notes: [
        "You don't need to solve everything at once.",
        "Pause. Breathe. Continue when you are ready.",
        "Your mind deserves a little space today.",
        "Let this moment belong to you."
      ],

      videos: [
        "aksh-afternoon.1.mov",
        "aksh-afternoon.2.mov",
        "aksh-afternoon.3.mov",
        "aksh-afternoon.4.mov"
      ]
    },


    evening: {
      label: "GOOD EVENING",

      greeting: "Good evening",

      description:
        "The day can soften now. Let yourself come back home to yourself.",

      quotes: [
        "Let the evening hold what the day could not.",
        "You made it here. Take a moment to breathe.",
        "Not every feeling needs an answer tonight.",
        "Let the noise of the day become quiet."
      ],

      notes: [
        "You don't have to carry today's weight into tonight.",
        "Some things can wait until tomorrow.",
        "The evening is allowed to be gentle.",
        "Give yourself permission to exhale."
      ],

      videos: [
        "aksh-evening.1.mov",
        "aksh-evening.2.mov",
        "aksh-evening.3.mov"
      ]
    },


    night: {
      label: "GOOD NIGHT",

      greeting: "Good night",

      description:
        "The world can wait. Tonight, make some space for rest.",

      quotes: [
        "You have done enough for today. Let yourself rest.",
        "The night does not ask you to be anything.",
        "Some answers become clearer after a little rest.",
        "Close the day gently. Tomorrow can begin later."
      ],

      notes: [
        "Rest is not something you have to earn.",
        "Let today end without judging yourself.",
        "You can put some things down tonight.",
        "Tomorrow does not need to be solved right now."
      ],

      videos: [
        "aksh-night.1.mov",
        "aksh-night.2.mov"
      ]
    }

  };


  /* ==========================================================
     EMOTION CONTENT
  ========================================================== */

  const emotions = {

    anxious: {
      kicker: "WHEN YOUR MIND WON'T SLOW DOWN",

      title:
        "Let's make some room for your mind.",

      text:
        "You do not need to fight every thought. Start with one breath, one moment, and one small place to begin."
    },

    overwhelmed: {
      kicker: "WHEN EVERYTHING FEELS LIKE TOO MUCH",

      title:
        "You don't have to carry everything at once.",

      text:
        "Let's separate what is happening from what your mind is carrying. One piece at a time is enough."
    },

    talk: {
      kicker: "WHEN YOU NEED SOMEONE TO LISTEN",

      title:
        "You don't have to hold it alone.",

      text:
        "Sometimes the first step is simply being heard. You can begin here, and choose what happens next."
    },

    exploring: {
      kicker: "WHEN YOU WANT TO UNDERSTAND YOURSELF",

      title:
        "Curiosity can be a beautiful beginning.",

      text:
        "You don't need to arrive with a problem. Explore your thoughts, emotions and patterns at your own pace."
    }

  };


  /* ==========================================================
     DATE
  ========================================================== */

  function updateDate() {

    const now =
      new Date();

    const day =
      String(now.getDate())
        .padStart(2, "0");

    const month =
      String(now.getMonth() + 1)
        .padStart(2, "0");

    const year =
      now.getFullYear();

    currentDate.textContent =
      `${day}.${month}.${year}`;

    currentDay.textContent =
      now.toLocaleDateString(
        "en-IN",
        {
          weekday: "long"
        }
      );
  }


  /* ==========================================================
     TIME PERIOD
  ========================================================== */

  function getPeriod() {

    const hour =
      new Date().getHours();

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


  /* ==========================================================
     DAILY DETERMINISTIC QUOTE

     Same visitor/day gets a stable quote.
     Tomorrow changes automatically.
  ========================================================== */

  function dailyIndex(length, offset = 0) {

    const now =
      new Date();

    const dayNumber =
      Math.floor(
        Date.UTC(
          now.getFullYear(),
          now.getMonth(),
          now.getDate()
        ) / 86400000
      );

    return (
      Math.abs(dayNumber + offset) %
      length
    );
  }


  /* ==========================================================
     VIDEO SELECTION
  ========================================================== */

  function videoIndex(period) {

    const now =
      new Date();

    const hour =
      now.getHours();

    const minute =
      now.getMinutes();

    const totalMinutes =
      hour * 60 + minute;


    if (period === "morning") {

      if (totalMinutes < 360) {
        return 0;
      }

      if (totalMinutes < 480) {
        return 1;
      }

      if (totalMinutes < 600) {
        return 2;
      }

      return 3;
    }


    if (period === "afternoon") {

      if (totalMinutes < 780) {
        return 0;
      }

      if (totalMinutes < 870) {
        return 1;
      }

      if (totalMinutes < 960) {
        return 2;
      }

      return 3;
    }


    if (period === "evening") {

      if (totalMinutes < 1065) {
        return 0;
      }

      if (totalMinutes < 1140) {
        return 1;
      }

      return 2;
    }


    if (period === "night") {

      if (totalMinutes < 1440) {
        return 0;
      }

      return 1;
    }

    return 0;
  }


  /* ==========================================================
     APPLY WORLD
  ========================================================== */

  let activePeriod = null;


  function applyPeriod(force = false) {

    const period =
      getPeriod();

    if (
      !force &&
      period === activePeriod
    ) {
      return;
    }

    activePeriod =
      period;

    const scene =
      scenes[period];

    world.classList.remove(
      "morning",
      "afternoon",
      "evening",
      "night"
    );

    world.classList.add(period);


    timeTitle.textContent =
      scene.label;


    heroDescription.textContent =
      scene.description;


    heroQuote.style.opacity = "0";
    heroQuote.style.transform =
      "translateY(10px)";


    setTimeout(() => {

      heroQuote.textContent =
        scene.quotes[
          dailyIndex(
            scene.quotes.length
          )
        ];

      heroQuote.style.opacity = "1";
      heroQuote.style.transform =
        "translateY(0)";

    }, 220);


    noteGreeting.textContent =
      scene.greeting;


    dailyNoteText.textContent =
      scene.notes[
        dailyIndex(
          scene.notes.length,
          13
        )
      ];


    loadSceneVideo(
      scene,
      videoIndex(period)
    );
  }


  /* ==========================================================
     LOAD SCENE VIDEO
  ========================================================== */

  let currentVideoIndex = -1;


  function loadSceneVideo(scene, index) {

    if (!scene.videos.length) {
      return;
    }

    index =
      Math.max(
        0,
        Math.min(
          index,
          scene.videos.length - 1
        )
      );


    if (
      currentVideoIndex === index &&
      worldVideo.dataset.period === activePeriod
    ) {
      return;
    }

    currentVideoIndex =
      index;

    worldVideo.classList.add(
      "is-changing"
    );


    const source =
      scene.videos[index];


    setTimeout(() => {

      worldVideo.src =
        source;

      worldVideo.dataset.period =
        activePeriod;


      const playPromise =
        worldVideo.play();


      if (
        playPromise &&
        typeof playPromise.catch === "function"
      ) {

        playPromise.catch(() => {
          /*
            Browser may require a user gesture
            before media playback.
          */
        });

      }


      setTimeout(() => {

        worldVideo.classList.remove(
          "is-changing"
        );

      }, 400);

    }, 180);
  }


  /* ==========================================================
     HANDLE VIDEO LOOP

     Videos are used as cinematic ambience.
     When one ends, move through the period's scenes.
  ========================================================== */

  worldVideo.addEventListener(
    "ended",
    () => {

      const scene =
        scenes[activePeriod];

      if (!scene) {
        return;
      }

      let next =
        currentVideoIndex + 1;

      if (
        next >= scene.videos.length
      ) {
        next = 0;
      }

      loadSceneVideo(
        scene,
        next
      );
    }
  );


  /* ==========================================================
     VIDEO ERROR FALLBACK
  ========================================================== */

  worldVideo.addEventListener(
    "error",
    () => {

      worldVideo.style.background =
        "#050505";

    }
  );


  /* ==========================================================
     EMOTION WORLD
  ========================================================== */

  function openEmotion(key) {

    const data =
      emotions[key];

    if (!data) {
      return;
    }

    emotionWorldKicker.textContent =
      data.kicker;

    emotionWorldTitle.textContent =
      data.title;

    emotionWorldText.textContent =
      data.text;

    emotionWorld.classList.add("open");

    emotionWorld.setAttribute(
      "aria-hidden",
      "false"
    );

    document.body.style.overflow =
      "hidden";
  }


  function closeEmotion() {

    emotionWorld.classList.remove(
      "open"
    );

    emotionWorld.setAttribute(
      "aria-hidden",
      "true"
    );

    document.body.style.overflow =
      "";
  }


  document
    .querySelectorAll(".emotion")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          openEmotion(
            button.dataset.emotion
          );

        }
      );

    });


  emotionClose.addEventListener(
    "click",
    closeEmotion
  );


  emotionWorld.addEventListener(
    "click",
    event => {

      if (
        event.target === emotionWorld
      ) {
        closeEmotion();
      }

    }
  );


  /* ==========================================================
     HORIZONTAL DRAG
  ========================================================== */

  let dragging = false;
  let dragStartX = 0;
  let dragScrollLeft = 0;


  emotionRail.addEventListener(
    "pointerdown",
    event => {

      dragging = true;

      dragStartX =
        event.clientX;

      dragScrollLeft =
        emotionRail.scrollLeft;

      emotionRail.setPointerCapture(
        event.pointerId
      );

    }
  );


  emotionRail.addEventListener(
    "pointermove",
    event => {

      if (!dragging) {
        return;
      }

      const distance =
        event.clientX - dragStartX;

      emotionRail.scrollLeft =
        dragScrollLeft - distance;

    }
  );


  emotionRail.addEventListener(
    "pointerup",
    () => {
      dragging = false;
    }
  );


  emotionRail.addEventListener(
    "pointercancel",
    () => {
      dragging = false;
    }
  );


  /* ==========================================================
     HOW AKSH WORKS
  ========================================================== */

  listenButton.addEventListener(
    "click",
    () => {

      worksModal.classList.add(
        "open"
      );

      worksModal.setAttribute(
        "aria-hidden",
        "false"
      );

      document.body.style.overflow =
        "hidden";

    }
  );


  function closeWorks() {

    worksModal.classList.remove(
      "open"
    );

    worksModal.setAttribute(
      "aria-hidden",
      "true"
    );

    document.body.style.overflow =
      "";
  }


  modalClose.addEventListener(
    "click",
    closeWorks
  );


  worksModal.addEventListener(
    "click",
    event => {

      if (
        event.target === worksModal
      ) {
        closeWorks();
      }

    }
  );


  /* ==========================================================
     HEART
  ========================================================== */

  heartButton.addEventListener(
    "click",
    () => {

      heartButton.classList.toggle(
        "saved"
      );

      heartButton.textContent =
        heartButton.classList.contains(
          "saved"
        )
          ? "♥"
          : "♡";

    }
  );


  /* ==========================================================
     MOBILE MENU
  ========================================================== */

  menuButton.addEventListener(
    "click",
    () => {

      const open =
        mobileMenu.classList.toggle(
          "open"
        );

      menuButton.setAttribute(
        "aria-expanded",
        String(open)
      );

      mobileMenu.setAttribute(
        "aria-hidden",
        String(!open)
      );

      if (open) {
        document.body.style.overflow =
          "hidden";
      } else {
        document.body.style.overflow =
          "";
      }

    }
  );


  document
    .querySelectorAll(
      ".mobile-menu a"
    )
    .forEach(link => {

      link.addEventListener(
        "click",
        () => {

          mobileMenu.classList.remove(
            "open"
          );

          menuButton.setAttribute(
            "aria-expanded",
            "false"
          );

          mobileMenu.setAttribute(
            "aria-hidden",
            "true"
          );

          document.body.style.overflow =
            "";

        }
      );

    });


  /* ==========================================================
     ESCAPE KEY
  ========================================================== */

  document.addEventListener(
    "keydown",
    event => {

      if (
        event.key === "Escape"
      ) {

        closeEmotion();
        closeWorks();

        mobileMenu.classList.remove(
          "open"
        );

        document.body.style.overflow =
          "";

      }

    }
  );


  /* ==========================================================
     PERIOD CHECK

     Allows the page to change automatically
     when the real time moves into another period.
  ========================================================== */

  setInterval(
    () => {

      applyPeriod(false);

    },
    30000
  );


  /* ==========================================================
     INITIALISE
  ========================================================== */

  updateDate();

  applyPeriod(true);


})();
