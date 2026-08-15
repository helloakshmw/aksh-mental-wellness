/* =========================================================
   AKSH — PAGE 01 ENGINE
   HOW ARE YOU FEELING TODAY?
   ========================================================= */

"use strict";

/* =========================================================
   DOM
   ========================================================= */

const page = document.querySelector("#page1");

const emotionCards = document.querySelectorAll(
  ".emotion-card, .feeling-card, .card"
);

const transition =
  document.querySelector("#page-transition") ||
  document.querySelector(".page1-transition");

const bookingButtons = document.querySelectorAll(
  ".booking-cta, .book-button"
);

/* =========================================================
   EMOTION DATA
   ========================================================= */

const emotions = {
  anxious: {
    title: "ANXIOUS",
    message:
      "You don't have to figure everything out right now.",
    destination: "anxious.html"
  },

  overwhelmed: {
    title: "OVERWHELMED",
    message:
      "Let's make this moment a little lighter.",
    destination: "overwhelmed.html"
  },

  talk: {
    title: "NEED TO TALK",
    message:
      "Sometimes being heard is the first step.",
    destination: "talk.html"
  },

  exploring: {
    title: "JUST EXPLORING",
    message:
      "Take your time. There is no right way to begin.",
    destination: "explore.html"
  }
};

/* =========================================================
   HELPERS
   ========================================================= */

function getEmotionFromCard(card) {

  const raw =
    card.dataset.emotion ||
    card.dataset.feeling ||
    card.getAttribute("data-type") ||
    "";

  const value =
    raw
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-");

  if (value.includes("anx")) {
    return "anxious";
  }

  if (value.includes("over")) {
    return "overwhelmed";
  }

  if (
    value.includes("talk") ||
    value.includes("someone")
  ) {
    return "talk";
  }

  if (
    value.includes("explor")
  ) {
    return "exploring";
  }

  const text =
    card.textContent.toLowerCase();

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

  if (text.includes("exploring")) {
    return "exploring";
  }

  return null;
}

/* =========================================================
   PAGE TRANSITION
   ========================================================= */

let isTransitioning = false;

function cinematicTransition(destination) {

  if (isTransitioning) {
    return;
  }

  isTransitioning = true;

  if (transition) {
    transition.classList.add("active");
  }

  document.body.classList.add("page-leaving");

  setTimeout(() => {

    window.location.href = destination;

  }, 700);
}

/* =========================================================
   EMOTION CARD INTERACTION
   ========================================================= */

emotionCards.forEach((card) => {

  card.setAttribute("role", "button");
  card.setAttribute("tabindex", "0");

  card.addEventListener("click", () => {

    const emotion =
      getEmotionFromCard(card);

    if (!emotion) {
      return;
    }

    const data =
      emotions[emotion];

    if (!data) {
      return;
    }

    /* Small visual response before leaving */

    emotionCards.forEach((item) => {
      item.classList.remove("active");
    });

    card.classList.add("active");

    /*
       Give the visitor a very short cinematic
       moment before moving to the next world.
    */

    setTimeout(() => {

      cinematicTransition(
        data.destination
      );

    }, 180);

  });

  /* Keyboard support */

  card.addEventListener("keydown", (event) => {

    if (
      event.key === "Enter" ||
      event.key === " "
    ) {

      event.preventDefault();

      card.click();
    }

  });

});

/* =========================================================
   BOOKING
   ========================================================= */

bookingButtons.forEach((button) => {

  button.addEventListener("click", (event) => {

    event.preventDefault();

    cinematicTransition(
      "booking.html"
    );

  });

});

/* =========================================================
   MOUSE / POINTER DEPTH
   ========================================================= */

const canUsePointer =
  window.matchMedia(
    "(hover: hover) and (pointer: fine)"
  ).matches;

if (canUsePointer && page) {

  page.addEventListener(
    "pointermove",
    (event) => {

      const x =
        (event.clientX / window.innerWidth - 0.5);

      const y =
        (event.clientY / window.innerHeight - 0.5);

      page.style.setProperty(
        "--mouse-x",
        `${x * 20}px`
      );

      page.style.setProperty(
        "--mouse-y",
        `${y * 20}px`
      );

    },
    {
      passive: true
    }
  );

}

/* =========================================================
   PREVENT DOUBLE TAP ZOOM
   ========================================================= */

let lastTouchEnd = 0;

document.addEventListener(
  "touchend",
  (event) => {

    const now =
      Date.now();

    if (
      now - lastTouchEnd <= 300
    ) {
      event.preventDefault();
    }

    lastTouchEnd = now;

  },
  {
    passive: false
  }
);

/* =========================================================
   PAGE ENTER
   ========================================================= */

window.addEventListener(
  "pageshow",
  () => {

    isTransitioning = false;

    if (transition) {
      transition.classList.remove("active");
    }

  }
);

/* =========================================================
   ESCAPE
   ========================================================= */

document.addEventListener(
  "keydown",
  (event) => {

    if (
      event.key === "Escape" &&
      isTransitioning
    ) {

      isTransitioning = false;

      if (transition) {
        transition.classList.remove(
          "active"
        );
      }

    }

  }
);

/* =========================================================
   CONSOLE CHECK
   ========================================================= */

console.log(
  "AKSH — Page 01 loaded successfully."
);
