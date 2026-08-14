/* =========================================================
   AKSH PAGE 1
   Cinematic atmosphere + navigation + emotions
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  const page = document.getElementById("akshPage");

  const menuButton = document.getElementById("menuButton");
  const mobileMenu = document.getElementById("mobileMenu");

  const dailyGreeting = document.getElementById("dailyGreeting");
  const dailyDate = document.getElementById("dailyDate");
  const dailyQuote = document.getElementById("dailyQuote");

  const emotionTrack = document.getElementById("emotionTrack");
  const emotionPrev = document.getElementById("emotionPrev");
  const emotionNext = document.getElementById("emotionNext");
  const trackProgress = document.getElementById("trackProgress");

  const emotionWorld = document.getElementById("emotionWorld");
  const worldClose = document.getElementById("worldClose");
  const worldBack = document.getElementById("worldBack");

  const worldEyebrow = document.getElementById("worldEyebrow");
  const worldTitle = document.getElementById("worldTitle");
  const worldDescription = document.getElementById("worldDescription");

  const currentYear = document.getElementById("currentYear");


  /* =========================================================
     DATE
  ========================================================= */

  const now = new Date();

  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = now.getFullYear();

  const formattedDate = `${day}.${month}.${year}`;

  dailyDate.textContent = formattedDate;

  if (currentYear) {
    currentYear.textContent = year;
  }


  /* =========================================================
     TIME OF DAY
  ========================================================= */

  function getTimePeriod(hour) {

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


  function getGreeting(period) {

    const greetings = {
      morning: "GOOD MORNING",
      afternoon: "GOOD AFTERNOON",
      evening: "GOOD EVENING",
      night: "GOOD NIGHT"
    };

    return greetings[period];
  }


  const period = getTimePeriod(now.getHours());

  page.classList.add(period);

  dailyGreeting.textContent = getGreeting(period);


  /* =========================================================
     DAILY QUOTES
  ========================================================= */

  const quotes = {

    morning: [
      "You do not have to have everything figured out today.",
      "A new morning can begin with one quiet breath.",
      "Give yourself permission to begin slowly.",
      "There is still room for something good today.",
      "You are allowed to take this morning at your own pace."
    ],

    afternoon: [
      "Your wellbeing belongs in the middle of your day too.",
      "Pause for a moment. Notice where you are.",
      "You can continue without carrying everything at once.",
      "A small pause can change the rest of your day.",
      "Take a breath. You are still allowed to slow down."
    ],

    evening: [
      "Let the day become quieter around you.",
      "You made it through another day. Be gentle with yourself.",
      "Some moments are meant to be felt, not solved.",
      "Let yourself arrive softly at the end of today.",
      "You don't have to carry today into tomorrow."
    ],

    night: [
      "The world can wait. You are allowed to rest.",
      "Let your mind become quiet, one thought at a time.",
      "Tonight, choose gentleness over perfection.",
      "Rest is not something you need to earn.",
      "Tomorrow does not need to be solved tonight."
    ]

  };


  /* =========================================================
     DIFFERENT QUOTE FOR VISITORS
  ========================================================= */

  function getVisitorQuote() {

    const pool = quotes[period];

    const storageKey = `akshQuote_${formattedDate}`;

    let usedQuotes = [];

    try {
      usedQuotes = JSON.parse(
        localStorage.getItem(storageKey) || "[]"
      );
    } catch {
      usedQuotes = [];
    }

    let available = pool.filter(
      quote => !usedQuotes.includes(quote)
    );

    if (!available.length) {
      usedQuotes = [];
      available = [...pool];
    }

    const selected =
      available[
        Math.floor(Math.random() * available.length)
      ];

    usedQuotes.push(selected);

    try {
      localStorage.setItem(
        storageKey,
        JSON.stringify(usedQuotes)
      );
    } catch {}

    return selected;
  }


  dailyQuote.textContent = getVisitorQuote();


  /* =========================================================
     MOBILE MENU
  ========================================================= */

  function closeMenu() {

    mobileMenu.classList.remove("open");

    menuButton.classList.remove("active");

    menuButton.setAttribute(
      "aria-expanded",
      "false"
    );

    document.body.style.overflow = "";

  }


  menuButton.addEventListener("click", () => {

    const open =
      mobileMenu.classList.toggle("open");

    menuButton.classList.toggle(
      "active",
      open
    );

    menuButton.setAttribute(
      "aria-expanded",
      String(open)
    );

    document.body.style.overflow =
      open ? "hidden" : "";

  });


  mobileMenu
    .querySelectorAll("a")
    .forEach(link => {

      link.addEventListener(
        "click",
        closeMenu
      );

    });


  /* =========================================================
     EMOTION SIDEWAYS SCROLL
  ========================================================= */

  const cards =
    [...document.querySelectorAll(".emotion-card")];

  function updateProgress() {

    if (!emotionTrack || !trackProgress) {
      return;
    }

    const maxScroll =
      emotionTrack.scrollWidth -
      emotionTrack.clientWidth;

    if (maxScroll <= 0) {
      trackProgress.style.width = "100%";
      return;
    }

    const percentage =
      emotionTrack.scrollLeft /
      maxScroll;

    trackProgress.style.width =
      `${Math.max(25, percentage * 100)}%`;

  }


  emotionTrack.addEventListener(
    "scroll",
    updateProgress,
    { passive: true }
  );


  emotionNext.addEventListener("click", () => {

    emotionTrack.scrollBy({
      left:
        emotionTrack.clientWidth * .78,
      behavior: "smooth"
    });

  });


  emotionPrev.addEventListener("click", () => {

    emotionTrack.scrollBy({
      left:
        -emotionTrack.clientWidth * .78,
      behavior: "smooth"
    });

  });


  updateProgress();


  /* =========================================================
     EMOTION WORLDS
  ========================================================= */

  const worlds = {

    anxious: {

      eyebrow: "A QUIETER SPACE",

      title: "Let's slow this down.",

      description:
        "You don't have to fight every thought right now. Stay here for a moment, breathe, and give yourself permission to feel a little lighter."

    },

    overwhelmed: {

      eyebrow: "ONE THING AT A TIME",

      title: "You can put some of it down.",

      description:
        "Everything does not need your attention at the same time. Let's create some space between you and everything that feels too much."

    },

    talk: {

      eyebrow: "YOU DON'T HAVE TO HOLD IT ALONE",

      title: "Someone can listen.",

      description:
        "You don't need the perfect words. You can begin exactly where you are and take the next step towards professional support."

    },

    explore: {

      eyebrow: "WELCOME TO AKSH",

      title: "Take your time.",

      description:
        "Explore the spaces, resources and support available at AKSH. There is no pressure to decide anything today."

    }

  };


  function openWorld(type) {

    const world = worlds[type];

    if (!world) {
      return;
    }

    worldEyebrow.textContent =
      world.eyebrow;

    worldTitle.textContent =
      world.title;

    worldDescription.textContent =
      world.description;

    emotionWorld.classList.add("open");

    emotionWorld.setAttribute(
      "aria-hidden",
      "false"
    );

    document.body.style.overflow =
      "hidden";

  }


  function closeWorld() {

    emotionWorld.classList.remove("open");

    emotionWorld.setAttribute(
      "aria-hidden",
      "true"
    );

    document.body.style.overflow =
      "";

  }


  cards.forEach(card => {

    card.addEventListener("click", () => {

      const emotion =
        card.dataset.emotion;

      openWorld(emotion);

    });

  });


  worldClose.addEventListener(
    "click",
    closeWorld
  );


  worldBack.addEventListener(
    "click",
    closeWorld
  );


  emotionWorld.addEventListener(
    "click",
    event => {

      if (
        event.target === emotionWorld
      ) {
        closeWorld();
      }

    }
  );


  document.addEventListener(
    "keydown",
    event => {

      if (
        event.key === "Escape" &&
        emotionWorld.classList.contains("open")
      ) {
        closeWorld();
      }

    }
  );


  /* =========================================================
     SMOOTH INTERNAL NAVIGATION
  ========================================================= */

  document
    .querySelectorAll('a[href^="#"]')
    .forEach(link => {

      link.addEventListener(
        "click",
        event => {

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


  /* =========================================================
     SUBTLE MOUSE ATMOSPHERE
  ========================================================= */

  const atmosphere =
    document.querySelector(".atmosphere");

  if (
    window.matchMedia(
      "(pointer:fine)"
    ).matches
  ) {

    window.addEventListener(
      "mousemove",
      event => {

        const x =
          (event.clientX /
            window.innerWidth -
            .5) * 8;

        const y =
          (event.clientY /
            window.innerHeight -
            .5) * 5;

        atmosphere.style.transform =
          `translate(${x * .15}px,${y * .15}px)`;

      },
      { passive: true }
    );

  }


  /* =========================================================
     REDUCE MOTION ACCESSIBILITY
  ========================================================= */

  const reducedMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

  if (reducedMotion.matches) {

    document.documentElement.style
      .scrollBehavior = "auto";

    document
      .querySelectorAll("*")
      .forEach(element => {
        element.style.animationDuration = "0.01ms";
        element.style.animationIterationCount = "1";
      });

  }


});
