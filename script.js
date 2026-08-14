/* =========================================================
   AKSH — SCRIPT
   ========================================================= */


/* =========================================================
   BASIC ELEMENTS
   ========================================================= */

const arrival = document.getElementById("arrival");
const arrivalVideo = document.getElementById("arrivalVideo");
const arrivalVideoSource = document.getElementById("arrivalVideoSource");

const currentDate = document.getElementById("currentDate");
const currentDay = document.getElementById("currentDay");

const timeGreeting = document.getElementById("timeGreeting");
const arrivalQuote = document.getElementById("arrivalQuote");

const soundButton = document.getElementById("soundButton");
const soundIcon = document.getElementById("soundIcon");
const soundText = document.getElementById("soundText");

const enterButton = document.getElementById("enterButton");
const enterWorld = document.getElementById("begin");

const feelingHorizontal =
  document.getElementById("feelingHorizontal");


/* =========================================================
   AKSH TIME
   ========================================================= */

function getCurrentTime() {

  return new Date();

}


/* =========================================================
   FORMAT DATE
   Example:
   14.08.2026
   Friday
   ========================================================= */

function updateDate() {

  const now = getCurrentTime();

  const day = String(
    now.getDate()
  ).padStart(2, "0");

  const month = String(
    now.getMonth() + 1
  ).padStart(2, "0");

  const year = now.getFullYear();

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  currentDate.textContent =
    `${day}.${month}.${year}`;

  currentDay.textContent =
    days[now.getDay()];

}


/* =========================================================
   TIME PERIOD
   =========================================================

   05:00 – 11:59  GOOD MORNING

   12:00 – 16:59  GOOD AFTERNOON

   17:00 – 19:59  GOOD EVENING

   20:00 – 04:59  GOOD NIGHT

   ========================================================= */

function getTimePeriod() {

  const now = getCurrentTime();

  const hour = now.getHours();

  const minutes = now.getMinutes();

  const totalMinutes =
    (hour * 60) + minutes;


  /* GOOD MORNING */

  if (
    totalMinutes >= 300 &&
    totalMinutes < 720
  ) {

    return "morning";

  }


  /* GOOD AFTERNOON */

  if (
    totalMinutes >= 720 &&
    totalMinutes < 1020
  ) {

    return "afternoon";

  }


  /* GOOD EVENING */

  if (
    totalMinutes >= 1020 &&
    totalMinutes < 1200
  ) {

    return "evening";

  }


  /* GOOD NIGHT */

  return "night";

}


/* =========================================================
   GREETING TEXT
   ========================================================= */

function getGreeting(period) {

  if (period === "morning") {

    return "Good Morning";

  }

  if (period === "afternoon") {

    return "Good Afternoon";

  }

  if (period === "evening") {

    return "Good Evening";

  }

  return "Good Night";

}


/* =========================================================
   ARRIVAL VIDEO SELECTION
   =========================================================

   MORNING

   05:00 - 05:59
   morning.1

   06:00 - 07:59
   morning.2

   08:00 - 09:59
   morning.3

   10:00 - 11:59
   morning.4


   AFTERNOON

   12:00 - 12:59
   afternoon.1

   13:00 - 14:29
   afternoon.2

   14:30 - 15:59
   afternoon.3

   16:00 - 16:59
   afternoon.4


   EVENING

   17:00 - 17:44
   evening.1

   17:45 - 18:59
   evening.2

   19:00 - 19:59
   evening.3


   NIGHT

   20:00 - 23:59
   night.1

   00:00 - 04:59
   night.2

   ========================================================= */

function getArrivalVideo() {

  const now = getCurrentTime();

  const hour = now.getHours();

  const minutes = now.getMinutes();

  const totalMinutes =
    (hour * 60) + minutes;


  /* -------------------------
     MORNING
     ------------------------- */

  if (
    totalMinutes >= 300 &&
    totalMinutes < 360
  ) {

    return "aksh-morning.1.mov";

  }


  if (
    totalMinutes >= 360 &&
    totalMinutes < 480
  ) {

    return "aksh-morning.2.mov";

  }


  if (
    totalMinutes >= 480 &&
    totalMinutes < 600
  ) {

    return "aksh-morning.3.mov";

  }


  if (
    totalMinutes >= 600 &&
    totalMinutes < 720
  ) {

    return "aksh-morning.4.mov";

  }


  /* -------------------------
     AFTERNOON
     ------------------------- */

  if (
    totalMinutes >= 720 &&
    totalMinutes < 780
  ) {

    return "aksh-afternoon.1.mov";

  }


  if (
    totalMinutes >= 780 &&
    totalMinutes < 870
  ) {

    return "aksh-afternoon.2.mov";

  }


  if (
    totalMinutes >= 870 &&
    totalMinutes < 960
  ) {

    return "aksh-afternoon.3.mov";

  }


  if (
    totalMinutes >= 960 &&
    totalMinutes < 1020
  ) {

    return "aksh-afternoon.4.mov";

  }


  /* -------------------------
     EVENING
     ------------------------- */

  if (
    totalMinutes >= 1020 &&
    totalMinutes < 1065
  ) {

    return "aksh-evening.1.mov";

  }


  if (
    totalMinutes >= 1065 &&
    totalMinutes < 1140
  ) {

    return "aksh-evening.2.mov";

  }


  if (
    totalMinutes >= 1140 &&
    totalMinutes < 1200
  ) {

    return "aksh-evening.3.mov";

  }


  /* -------------------------
     NIGHT
     ------------------------- */

  if (
    totalMinutes >= 1200 ||
    totalMinutes < 300
  ) {

    if (totalMinutes >= 1200) {

      return "aksh-night.1.mov";

    }

    return "aksh-night.2.mov";

  }


  return "aksh-night.1.mov";

}


/* =========================================================
   LOAD ARRIVAL VIDEO
   ========================================================= */

function loadArrivalVideo() {

  const videoFile =
    getArrivalVideo();


  if (!arrivalVideo) {
    return;
  }


  /*
    Use the GitHub Pages root.

    Example:
    https://helloakshmw.github.io/aksh-mental-wellness/
  */

  const videoPath =
    encodeURI(videoFile);


  arrivalVideo.src =
    videoPath;


  arrivalVideo.loop = true;

  arrivalVideo.muted = true;

  arrivalVideo.playsInline = true;

  arrivalVideo.setAttribute(
    "playsinline",
    ""
  );

  arrivalVideo.setAttribute(
    "webkit-playsinline",
    ""
  );


  arrivalVideo.load();


  const playPromise =
    arrivalVideo.play();


  if (
    playPromise !== undefined
  ) {

    playPromise.catch(() => {

      /*
        Some browsers may wait for
        the first user interaction.
      */

    });

  }

}


/* =========================================================
   SOUND CONTROL
   ========================================================= */

let soundOn = false;


function updateSoundUI() {

  if (!soundButton) {
    return;
  }


  if (soundOn) {

    soundIcon.textContent = "●";

    soundText.textContent =
      "SOUND ON";

    soundButton.setAttribute(
      "aria-label",
      "Turn sound off"
    );

  } else {

    soundIcon.textContent = "◉";

    soundText.textContent =
      "SOUND OFF";

    soundButton.setAttribute(
      "aria-label",
      "Turn sound on"
    );

  }

}


function toggleSound() {

  if (!arrivalVideo) {
    return;
  }


  soundOn =
    !soundOn;


  arrivalVideo.muted =
    !soundOn;


  if (soundOn) {

    const playPromise =
      arrivalVideo.play();


    if (
      playPromise !== undefined
    ) {

      playPromise.catch(() => {

        soundOn = false;

        arrivalVideo.muted = true;

        updateSoundUI();

      });

    }

  }


  updateSoundUI();

}


if (soundButton) {

  soundButton.addEventListener(
    "click",
    toggleSound
  );

}


/* =========================================================
   QUOTE COLLECTION
   =========================================================

   Quotes are intentionally short.

   They will rotate every second.

   We prevent the immediate previous
   quote from being selected again.
   ========================================================= */

const quotes = [

  "Take a moment. You have arrived.",

  "You do not have to have everything figured out.",

  "Be where you are. That is enough.",

  "A quiet mind begins with a quiet moment.",

  "There is space for you here.",

  "You are allowed to slow down.",

  "Some days need softness.",

  "You can begin again from here.",

  "Your feelings deserve a safe place.",

  "You are more than what you are going through.",

  "It is okay to pause.",

  "Let this moment belong to you.",

  "You don't have to carry everything alone.",

  "There is no perfect way to feel.",

  "Come as you are.",

  "Your mind deserves kindness too.",

  "One breath. One moment. One step.",

  "You are allowed to take your time.",

  "A little space can change a lot.",

  "You can meet yourself with kindness.",

  "Nothing needs to be solved right now.",

  "You are welcome here.",

  "Rest is also part of the journey.",

  "Your story deserves to be heard.",

  "You don't have to pretend here.",

  "Maybe today can be a little gentler.",

  "There is strength in asking for support.",

  "You can start exactly where you are.",

  "Your inner world matters.",

  "Make room for yourself.",

  "Even a small pause can be meaningful.",

  "You deserve a space without judgement.",

  "It is okay to not be okay.",

  "Let yourself breathe.",

  "You are not behind.",

  "Your journey does not need comparison.",

  "There is always another beginning.",

  "Give yourself the same kindness you give others.",

  "Your feelings are worth listening to.",

  "Stay for a moment.",

  "You are enough for this moment.",

  "The next step can be small.",

  "You can choose softness today.",

  "There is no rush here.",

  "Your mind can rest here.",

  "You deserve to feel understood.",

  "Sometimes being heard is enough.",

  "A safe space can begin with one conversation.",

  "You don't need the right words.",

  "Start with whatever feels true.",

  "Your thoughts can be held gently.",

  "You are allowed to ask for help.",

  "Every mind deserves care.",

  "Your wellbeing matters.",

  "There is courage in reaching out.",

  "You can take one moment at a time.",

  "Let today be a beginning.",

  "You are not your hardest day.",

  "There is more to you than one moment.",

  "Your mind deserves room to breathe.",

  "Sometimes the first step is simply arriving.",

  "You can be honest here.",

  "You don't have to explain everything at once.",

  "Your pace is your own.",

  "A softer moment is still progress.",

  "You deserve support without judgement.",

  "Your emotions have a place here.",

  "You can put down what feels heavy.",

  "There is nothing weak about needing support.",

  "You are allowed to be human.",

  "Your wellbeing is worth making time for.",

  "You can listen to yourself today.",

  "Small moments matter.",

  "Sometimes clarity comes after stillness.",

  "You don't need to rush your healing.",

  "You can make space for what you feel.",

  "You deserve to be met with understanding.",

  "Your mind is part of your whole story.",

  "Let this be your pause.",

  "You can begin without knowing the ending.",

  "There is room for hope.",

  "You are not alone in needing support.",

  "A conversation can be a beginning.",

  "Your thoughts deserve attention, not judgement.",

  "You can choose to take care of yourself.",

  "Today does not have to be perfect.",

  "You can start again tomorrow.",

  "You deserve moments that feel peaceful.",

  "Your mind deserves compassion.",

  "It is brave to reach out.",

  "You can take up space here.",

  "There is no judgement in this space.",

  "You are seen.",

  "You are heard.",

  "You matter.",

  "You can breathe.",

  "You can pause.",

  "You can begin.",

  "You can simply be."

];


let previousQuote = -1;


function getRandomQuote() {

  if (
    quotes.length <= 1
  ) {

    return quotes[0];

  }


  let randomIndex;


  do {

    randomIndex =
      Math.floor(
        Math.random() * quotes.length
      );

  } while (
    randomIndex === previousQuote
  );


  previousQuote =
    randomIndex;


  return quotes[randomIndex];

}


/* =========================================================
   CHANGE QUOTE
   ========================================================= */

function changeQuote() {

  if (!arrivalQuote) {
    return;
  }


  arrivalQuote.classList.add(
    "quote-changing"
  );


  setTimeout(() => {

    arrivalQuote.textContent =
      getRandomQuote();


    arrivalQuote.classList.remove(
      "quote-changing"
    );

  }, 180);

}


/* =========================================================
   START QUOTE ROTATION
   ========================================================= */

function startQuoteRotation() {

  if (!arrivalQuote) {
    return;
  }


  /*
    Start with a random quote.
  */

  arrivalQuote.textContent =
    getRandomQuote();


  /*
    New quote every second.
  */

  setInterval(
    changeQuote,
    1000
  );

}


/* =========================================================
   ENTER WORLD ATMOSPHERE
   ========================================================= */

function updateWorldAtmosphere() {

  if (!enterWorld) {
    return;
  }


  const period =
    getTimePeriod();


  enterWorld.classList.remove(
    "morning",
    "afternoon",
    "evening",
    "night"
  );


  enterWorld.classList.add(
    period
  );


  if (period === "evening") {

    enterWorld
      .querySelector(".sky-rain")
      ?.style
      .setProperty(
        "opacity",
        "0.55"
      );

  }


}


/* =========================================================
   UPDATE GREETING
   ========================================================= */

function updateGreeting() {

  if (!timeGreeting) {
    return;
  }


  const period =
    getTimePeriod();


  timeGreeting.textContent =
    getGreeting(period);

}


/* =========================================================
   REFRESH TIME INFORMATION
   ========================================================= */

function refreshTimeExperience() {

  updateDate();

  updateGreeting();

  updateWorldAtmosphere();

}


/* =========================================================
   BEGIN YOUR JOURNEY
   ========================================================= */

function enterAKSHWorld() {

  if (!enterWorld) {
    return;
  }


  enterWorld.scrollIntoView({

    behavior: "smooth",

    block: "start"

  });

}


if (enterButton) {

  enterButton.addEventListener(
    "click",
    enterAKSHWorld
  );

}


/* =========================================================
   HORIZONTAL TOUCH / MOUSE EXPERIENCE
   =========================================================

   The cards naturally scroll sideways on phones.

   On desktop, we also allow click-and-drag.
   ========================================================= */

function enableHorizontalDrag() {

  if (!feelingHorizontal) {
    return;
  }


  let isDown = false;

  let startX = 0;

  let scrollStart = 0;


  feelingHorizontal.addEventListener(
    "pointerdown",
    (event) => {

      isDown = true;

      startX =
        event.clientX;

      scrollStart =
        feelingHorizontal.scrollLeft;

      feelingHorizontal.setPointerCapture(
        event.pointerId
      );

    }
  );


  feelingHorizontal.addEventListener(
    "pointermove",
    (event) => {

      if (!isDown) {
        return;
      }


      const distance =
        event.clientX - startX;


      feelingHorizontal.scrollLeft =
        scrollStart - distance;

    }
  );


  function stopDragging(event) {

    isDown = false;


    try {

      feelingHorizontal.releasePointerCapture(
        event.pointerId
      );

    } catch (error) {

      /* Nothing required */

    }

  }


  feelingHorizontal.addEventListener(
    "pointerup",
    stopDragging
  );


  feelingHorizontal.addEventListener(
    "pointercancel",
    stopDragging
  );


  feelingHorizontal.addEventListener(
    "pointerleave",
    () => {

      isDown = false;

    }
  );

}


/* =========================================================
   EMOTION CARD INTERACTION
   ========================================================= */

function enableEmotionCards() {

  const cards =
    document.querySelectorAll(
      ".feeling-world-card"
    );


  cards.forEach((card) => {

    card.addEventListener(
      "click",
      () => {

        const feeling =
          card.dataset.feeling;


        /*
          IMPORTANT:

          We are NOT opening the final
          emotion worlds yet.

          This is the foundation.

          Later each feeling will open
          its own cinematic world:

          ANXIOUS
          OVERWHELMED
          NEED TO TALK
          JUST EXPLORING
        */

        console.log(
          "AKSH feeling selected:",
          feeling
        );

      }
    );

  });

}


/* =========================================================
   VIDEO ERROR HANDLING
   ========================================================= */

if (arrivalVideo) {

  arrivalVideo.addEventListener(
    "error",
    () => {

      console.log(
        "AKSH arrival video could not be loaded."
      );

    }
  );

}


/* =========================================================
   KEEP WORLD ATMOSPHERE UPDATED
   =========================================================

   The visitor may keep the website open
   across a time period.

   Check every 30 seconds.
   ========================================================= */

setInterval(
  refreshTimeExperience,
  30000
);


/* =========================================================
   INITIALISE AKSH
   ========================================================= */

function initialiseAKSH() {

  refreshTimeExperience();

  loadArrivalVideo();

  updateSoundUI();

  startQuoteRotation();

  enableHorizontalDrag();

  enableEmotionCards();

}


/* =========================================================
   START
   ========================================================= */

if (
  document.readyState === "loading"
) {

  document.addEventListener(
    "DOMContentLoaded",
    initialiseAKSH
  );

} else {

  initialiseAKSH();

}
