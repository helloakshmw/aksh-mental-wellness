/* =====================================================
   AKSH — ARRIVAL EXPERIENCE ENGINE
   ===================================================== */


/* =====================================================
   ELEMENTS
   ===================================================== */

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


/* =====================================================
   VIDEO FILES
   ===================================================== */

const videos = {
  morning1: "aksh-morning.1.mov",
  morning2: "aksh-morning.2.mov",
  morning3: "aksh-morning.3.mov",
  morning4: "aksh-morning.4.mov",

  afternoon1: "aksh-afternoon.1.mov",
  afternoon2: "aksh-afternoon.2.mov",
  afternoon3: "aksh-afternoon.3.mov",
  afternoon4: "aksh-afternoon.4.mov",

  evening1: "aksh-evening.1.mov",
  evening2: "aksh-evening.2.mov",
  evening3: "aksh-evening.3.mov",

  night1: "aksh-night.1.mov",
  night2: "aksh-night.2.mov"
};


/* =====================================================
   TIME EXPERIENCE
   ===================================================== */

function getArrivalExperience() {

  const now = new Date();

  const hour = now.getHours();
  const minute = now.getMinutes();

  const timeInMinutes =
    (hour * 60) + minute;


  /* ---------------------------------------------
     GOOD MORNING
     5:00 AM – 11:59 AM
     --------------------------------------------- */

  if (
    timeInMinutes >= 300 &&
    timeInMinutes < 720
  ) {

    if (timeInMinutes < 360) {

      return {
        greeting: "Good Morning",
        video: videos.morning1,
        quote: "Begin gently. There is nowhere else you need to be."
      };

    }

    if (timeInMinutes < 480) {

      return {
        greeting: "Good Morning",
        video: videos.morning2,
        quote: "Let the morning arrive at its own pace."
      };

    }

    if (timeInMinutes < 600) {

      return {
        greeting: "Good Morning",
        video: videos.morning3,
        quote: "Give yourself a quiet moment before the world begins."
      };

    }

    return {
      greeting: "Good Morning",
      video: videos.morning4,
      quote: "There is always a little space to breathe."
    };

  }


  /* ---------------------------------------------
     GOOD AFTERNOON
     12:00 PM – 4:59 PM
     --------------------------------------------- */

  if (
    timeInMinutes >= 720 &&
    timeInMinutes < 1020
  ) {

    if (timeInMinutes < 780) {

      return {
        greeting: "Good Afternoon",
        video: videos.afternoon1,
        quote: "Pause for a moment. Notice where you are."
      };

    }

    if (timeInMinutes < 870) {

      return {
        greeting: "Good Afternoon",
        video: videos.afternoon2,
        quote: "You are allowed to slow down."
      };

    }

    if (timeInMinutes < 960) {

      return {
        greeting: "Good Afternoon",
        video: videos.afternoon3,
        quote: "Make a little room for yourself today."
      };

    }

    return {
      greeting: "Good Afternoon",
      video: videos.afternoon4,
      quote: "Even in a busy day, there can be a quiet moment."
    };

  }


  /* ---------------------------------------------
     GOOD EVENING
     5:00 PM – 7:59 PM
     --------------------------------------------- */

  if (
    timeInMinutes >= 1020 &&
    timeInMinutes < 1200
  ) {

    if (timeInMinutes < 1065) {

      return {
        greeting: "Good Evening",
        video: videos.evening1,
        quote: "Let the day soften around you."
      };

    }

    if (timeInMinutes < 1140) {

      return {
        greeting: "Good Evening",
        video: videos.evening2,
        quote: "You made it through another day. Breathe."
      };

    }

    return {
      greeting: "Good Evening",
      video: videos.evening3,
      quote: "Leave a little space for yourself tonight."
    };

  }


  /* ---------------------------------------------
     GOOD NIGHT
     8:00 PM – 4:59 AM
     --------------------------------------------- */

  if (
    timeInMinutes >= 1200 ||
    timeInMinutes < 300
  ) {

    if (timeInMinutes >= 1200) {

      return {
        greeting: "Good Night",
        video: videos.night1,
        quote: "Let the noise of the day become quiet."
      };

    }

    return {
      greeting: "Good Night",
      video: videos.night2,
      quote: "Rest. Tomorrow does not need to arrive tonight."
    };

  }


  /* ---------------------------------------------
     SAFETY FALLBACK
     --------------------------------------------- */

  return {
    greeting: "Welcome to AKSH",
    video: videos.morning1,
    quote: "Take a moment. You have arrived."
  };

}


/* =====================================================
   DATE + DAY
   FORMAT:
   14.08.2026
   Friday
   ===================================================== */

function updateDate() {

  const now = new Date();


  const day =
    String(now.getDate()).padStart(2, "0");

  const month =
    String(now.getMonth() + 1).padStart(2, "0");

  const year =
    now.getFullYear();


  const formattedDate =
    `${day}.${month}.${year}`;


  const formattedDay =
    now.toLocaleDateString(
      undefined,
      {
        weekday: "long"
      }
    );


  currentDate.textContent =
    formattedDate;

  currentDay.textContent =
    formattedDay;

}


/* =====================================================
   LOAD ARRIVAL EXPERIENCE
   ===================================================== */

function loadArrival() {

  const experience =
    getArrivalExperience();


  /* ---------------------------------------------
     DATE
     --------------------------------------------- */

  updateDate();


  /* ---------------------------------------------
     GREETING
     --------------------------------------------- */

  timeGreeting.textContent =
    experience.greeting;


  /* ---------------------------------------------
     QUOTE
     --------------------------------------------- */

  arrivalQuote.textContent =
    experience.quote;


  /* ---------------------------------------------
     VIDEO
     --------------------------------------------- */

  arrivalVideoSource.src =
    experience.video;


  arrivalVideo.load();


  /*
     Start muted first.

     This is the browser-safe autoplay
     behaviour.
  */

  arrivalVideo.muted = true;


  const playPromise =
    arrivalVideo.play();


  if (playPromise !== undefined) {

    playPromise.catch(() => {

      /*
         Some browsers may still block autoplay.
         The visitor can start it through interaction.
      */

    });

  }


  /*
     Try to enable sound automatically.

     Some browsers allow it.
     Others will block it.

     If blocked, video remains muted
     and the SOUND button becomes the
     way to enable the music.
  */

  setTimeout(() => {

    arrivalVideo.muted = false;

    const soundPromise =
      arrivalVideo.play();


    if (
      soundPromise &&
      typeof soundPromise.catch === "function"
    ) {

      soundPromise.catch(() => {

        arrivalVideo.muted = true;

        updateSoundButton();

      });

    }

  }, 150);

}


/* =====================================================
   SOUND BUTTON
   ===================================================== */

function updateSoundButton() {

  if (arrivalVideo.muted) {

    soundIcon.textContent = "◉";

    soundText.textContent =
      "SOUND OFF";

    soundButton.setAttribute(
      "aria-label",
      "Turn sound on"
    );

  } else {

    soundIcon.textContent = "◉";

    soundText.textContent =
      "SOUND ON";

    soundButton.setAttribute(
      "aria-label",
      "Turn sound off"
    );

  }

}


function toggleSound() {

  if (arrivalVideo.muted) {

    arrivalVideo.muted = false;

    const playPromise =
      arrivalVideo.play();


    if (
      playPromise &&
      typeof playPromise.catch === "function"
    ) {

      playPromise.catch(() => {

        arrivalVideo.muted = true;

      });

    }

  } else {

    arrivalVideo.muted = true;

  }


  updateSoundButton();

}


soundButton.addEventListener(
  "click",
  toggleSound
);


/* =====================================================
   BEGIN YOUR JOURNEY
   ===================================================== */

enterButton.addEventListener(
  "click",
  () => {

    const beginning =
      document.getElementById("begin");


    if (beginning) {

      beginning.scrollIntoView({
        behavior: "smooth"
      });

    }

  }
);


/* =====================================================
   FIRST USER INTERACTION
   =====================================================

   If the browser blocked audio autoplay,
   the first interaction with the page gives
   us an opportunity to start the video with
   sound.
   ===================================================== */

function enableAudioAfterInteraction() {

  if (!arrivalVideo.muted) {
    return;
  }


  /*
     We only attempt this once.
  */

  arrivalVideo.muted = false;


  const playPromise =
    arrivalVideo.play();


  if (
    playPromise &&
    typeof playPromise.catch === "function"
  ) {

    playPromise.catch(() => {

      arrivalVideo.muted = true;

      updateSoundButton();

    });

  }


  updateSoundButton();


  document.removeEventListener(
    "click",
    enableAudioAfterInteraction
  );

  document.removeEventListener(
    "touchstart",
    enableAudioAfterInteraction
  );

}


document.addEventListener(
  "click",
  enableAudioAfterInteraction,
  {
    once: true
  }
);

document.addEventListener(
  "touchstart",
  enableAudioAfterInteraction,
  {
    once: true,
    passive: true
  }
);


/* =====================================================
   INITIALISE
   ===================================================== */

loadArrival();

updateSoundButton();
