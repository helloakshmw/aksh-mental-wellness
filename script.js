/* =========================================================
   AKSH — A SAFE SPACE FOR EVERY MIND
   EXPERIENCE ENGINE
   Version 2.0
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  "use strict";

  /* =========================================================
     01 — BASIC REFERENCES
     ========================================================= */

  const html = document.documentElement;
  const body = document.body;


  /* =========================================================
     02 — TIME EXPERIENCE
     ========================================================= */

  const introTime = document.querySelector(".intro-time");
  const introMessage = document.querySelector(".intro-message");
  const introWeather = document.querySelector(".intro-weather");

  const hour = new Date().getHours();

  let currentTimePeriod = "night";
  let greeting = "Good night.";
  let atmosphere = "A calm night atmosphere";

  if (hour >= 5 && hour < 12) {

    currentTimePeriod = "morning";
    greeting = "Good morning.";
    atmosphere = "A soft morning sky";

  } else if (hour >= 12 && hour < 17) {

    currentTimePeriod = "afternoon";
    greeting = "Good afternoon.";
    atmosphere = "A warm afternoon atmosphere";

  } else if (hour >= 17 && hour < 20) {

    currentTimePeriod = "evening";
    greeting = "Good evening.";
    atmosphere = "A quiet evening sky";

  } else {

    currentTimePeriod = "night";
    greeting = "Good night.";
    atmosphere = "A calm night atmosphere";

  }

  html.dataset.time = currentTimePeriod;


  /* =========================================================
     03 — AKSH QUOTES
     ========================================================= */

  const quotes = {

    morning: [
      "You do not have to rush into the day.",
      "Begin gently. The day can wait.",
      "Take a breath. There is time.",
      "A new morning is another chance to begin.",
      "Let today meet you exactly as you are.",
      "You are allowed to move slowly.",
      "Some mornings are meant to be quiet.",
      "Start with one peaceful thought.",
      "You don't need to have everything figured out today.",
      "Give yourself permission to simply begin."
    ],

    afternoon: [
      "You are allowed to pause in the middle of everything.",
      "Not every moment needs an answer.",
      "Take a breath before taking the next step.",
      "You don't have to carry everything at once.",
      "A quiet mind can begin with one quiet moment.",
      "Whatever today feels like, you can meet it gently.",
      "There is still time to choose yourself.",
      "You are more than what you accomplish today.",
      "Pause. Breathe. Continue when you are ready.",
      "Your wellbeing belongs in the middle of your day too."
    ],

    evening: [
      "Let the day become quieter.",
      "You have made it this far. Breathe.",
      "The day does not need to end perfectly.",
      "Leave some space for yourself tonight.",
      "You can put down what no longer needs carrying.",
      "Somewhere between today and tomorrow, there is rest.",
      "Let yourself arrive here.",
      "You deserve a moment without expectations.",
      "Slow down. You are safe to pause.",
      "The evening is allowed to be gentle."
    ],

    night: [
      "Nothing needs to be solved tonight.",
      "Rest is also a form of moving forward.",
      "Let your mind become quiet, one breath at a time.",
      "Tomorrow can wait.",
      "You have permission to rest.",
      "The night does not ask anything from you.",
      "Breathe. You have done enough for today.",
      "Some answers arrive after we stop searching.",
      "Close the day gently.",
      "You can simply be here."
    ]

  };


  /*
     Create a changing quote without repeating the same
     quote continuously.
  */

  function getQuote(period) {

    const list = quotes[period] || quotes.night;

    const storageKey = "aksh-last-quote-" + period;

    let previous = null;

    try {
      previous = localStorage.getItem(storageKey);
    } catch (error) {
      previous = null;
    }

    let available = list.filter(item => item !== previous);

    if (!available.length) {
      available = list;
    }

    const selected =
      available[Math.floor(Math.random() * available.length)];

    try {
      localStorage.setItem(storageKey, selected);
    } catch (error) {
      /* Storage unavailable — continue normally */
    }

    return selected;
  }


  const selectedQuote = getQuote(currentTimePeriod);


  /* =========================================================
     04 — UPDATE ARRIVAL INFORMATION
     ========================================================= */

  if (introTime) {
    introTime.textContent = greeting;
  }

  if (introMessage) {
    introMessage.textContent = selectedQuote;
  }

  if (introWeather) {
    introWeather.textContent = atmosphere;
  }


  /* =========================================================
     05 — DATE + DAY
     ========================================================= */

  function updateDateInformation() {

    const now = new Date();

    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const year = now.getFullYear();

    const weekday = now.toLocaleDateString("en-IN", {
      weekday: "long"
    });

    const formattedDate = `${day}.${month}.${year}`;

    /*
      Find common date elements if they exist.
    */

    const dateElements = document.querySelectorAll(
      ".date, .current-date, .intro-date, [data-aksh-date]"
    );

    dateElements.forEach(element => {
      element.textContent = formattedDate;
    });


    const dayElements = document.querySelectorAll(
      ".day, .current-day, .intro-day, [data-aksh-day]"
    );

    dayElements.forEach(element => {
      element.textContent = weekday;
    });


    /*
      If a combined date/day element exists.
    */

    const combinedElements = document.querySelectorAll(
      "[data-aksh-datetime]"
    );

    combinedElements.forEach(element => {
      element.innerHTML = `
        <span>${formattedDate}</span>
        <span>${weekday}</span>
      `;
    });

  }

  updateDateInformation();


  /* =========================================================
     06 — QUOTE VARIATION
     ========================================================= */

  function refreshQuote() {

    const messageElements = document.querySelectorAll(
      ".intro-message, .quote-text, [data-aksh-quote]"
    );

    if (!messageElements.length) return;

    const newQuote = getQuote(currentTimePeriod);

    messageElements.forEach(element => {

      element.classList.add("quote-changing");

      setTimeout(() => {

        element.textContent = newQuote;

        element.classList.remove("quote-changing");

      }, 300);

    });

  }


  /*
     Change the quote occasionally so the experience never
     feels completely static.
  */

  setInterval(() => {

    refreshQuote();

  }, 15000);


  /* =========================================================
     07 — INTRO EXPERIENCE
     ========================================================= */

  const intro = document.querySelector(".intro-screen");
  const enterButton = document.querySelector(".enter-button");

  function enterExperience() {

    if (!intro) return;

    intro.classList.add("hidden");

    body.classList.add("experience-entering");

    setTimeout(() => {

      body.classList.remove("intro-active");
      body.classList.remove("experience-entering");
      body.classList.add("aksh-experience-ready");

    }, 900);

  }


  if (enterButton) {

    enterButton.addEventListener("click", () => {

      enterExperience();

    });

  }


  /*
     Allow keyboard users to enter.
  */

  document.addEventListener("keydown", event => {

    if (
      event.key === "Enter" &&
      intro &&
      !intro.classList.contains("hidden")
    ) {

      enterExperience();

    }

  });


  /* =========================================================
     08 — MOBILE MENU
     ========================================================= */

  const menuButton = document.querySelector(".menu-button");
  const mobileMenu = document.querySelector(".mobile-menu");
  const closeMenu = document.querySelector(".close-menu");

  function openMenu() {

    if (!mobileMenu) return;

    mobileMenu.classList.add("open");
    body.classList.add("modal-open");

  }


  function closeMobileMenu() {

    if (!mobileMenu) return;

    mobileMenu.classList.remove("open");
    body.classList.remove("modal-open");

  }


  if (menuButton) {

    menuButton.addEventListener("click", openMenu);

  }


  if (closeMenu) {

    closeMenu.addEventListener("click", closeMobileMenu);

  }


  if (mobileMenu) {

    mobileMenu.querySelectorAll("a").forEach(link => {

      link.addEventListener("click", closeMobileMenu);

    });

  }


  /* =========================================================
     09 — SCROLL REVEAL
     ========================================================= */

  const revealElements = document.querySelectorAll(
    ".reveal, .emotion-card, .support-item, .journey-step, .collaboration-grid > div"
  );


  if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver(

      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target.classList.add("visible");

            observer.unobserve(entry.target);

          }

        });

      },

      {
        threshold: 0.12,
        rootMargin: "0px 0px -60px 0px"
      }

    );


    revealElements.forEach(element => {

      observer.observe(element);

    });

  } else {

    revealElements.forEach(element => {

      element.classList.add("visible");

    });

  }


  /* =========================================================
     10 — JOURNEY EXPERIENCE
     ========================================================= */

  const journeySteps = document.querySelectorAll(".journey-step");


  if (
    journeySteps.length &&
    "IntersectionObserver" in window
  ) {

    const journeyObserver = new IntersectionObserver(

      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            journeySteps.forEach(step => {

              step.classList.remove("active");

            });

            entry.target.classList.add("active");

          }

        });

      },

      {
        threshold: 0.5
      }

    );


    journeySteps.forEach(step => {

      journeyObserver.observe(step);

    });

  }


  /* =========================================================
     11 — EMOTION EXPERIENCE
     ========================================================= */

  const emotionCards =
    document.querySelectorAll(".emotion-card");

  const emotionModal =
    document.querySelector(".emotion-modal");

  const emotionModalContent =
    document.querySelector(".emotion-modal-content");

  const modalClose =
    document.querySelector(".modal-close");

  const modalBackdrop =
    document.querySelector(".emotion-modal-backdrop");

  const modalIcon =
    document.querySelector(".modal-emotion-icon");

  const modalEyebrow =
    document.querySelector(".modal-eyebrow");

  const modalTitle =
    emotionModalContent
      ? emotionModalContent.querySelector("h2")
      : null;

  const modalText =
    emotionModalContent
      ? emotionModalContent.querySelector(":scope > p")
      : null;


  const emotionData = {

    anxious: {

      icon: "◌",

      label: "A MOMENT TO BREATHE",

      title: "Feeling anxious?",

      text:
        "You don't have to fight the feeling. Let's slow everything down and give your mind some space.",

      atmosphere: "breathe"

    },


    overwhelmed: {

      icon: "✦",

      label: "YOU CAN PAUSE",

      title: "Feeling overwhelmed?",

      text:
        "When everything feels like too much, the first step doesn't need to be a big one. Just pause.",

      atmosphere: "pause"

    },


    talk: {

      icon: "○",

      label: "A SPACE TO SPEAK",

      title: "Need someone to talk to?",

      text:
        "You deserve a space where you can speak openly, without judgement and without having to pretend.",

      atmosphere: "talk"

    },


    exploring: {

      icon: "∞",

      label: "YOUR JOURNEY",

      title: "Just exploring?",

      text:
        "Understanding yourself is a journey. You can take it slowly, one honest moment at a time.",

      atmosphere: "explore"

    }

  };


  function getEmotionType(card) {

    if (card.classList.contains("anxious"))
      return "anxious";

    if (card.classList.contains("overwhelmed"))
      return "overwhelmed";

    if (card.classList.contains("talk"))
      return "talk";

    if (card.classList.contains("exploring"))
      return "exploring";

    return null;

  }


  function openEmotionModal(card) {

    if (!emotionModal) return;

    const type = getEmotionType(card);

    if (!type) return;

    const data = emotionData[type];

    if (modalIcon)
      modalIcon.textContent = data.icon;

    if (modalEyebrow)
      modalEyebrow.textContent = data.label;

    if (modalTitle)
      modalTitle.textContent = data.title;

    if (modalText)
      modalText.textContent = data.text;


    html.dataset.emotion = type;

    body.classList.add("emotion-experience");

    emotionModal.classList.add("open");

    body.classList.add("modal-open");

  }


  function closeEmotionModal() {

    if (!emotionModal) return;

    emotionModal.classList.remove("open");

    body.classList.remove("modal-open");

    body.classList.remove("emotion-experience");

    delete html.dataset.emotion;

  }


  emotionCards.forEach(card => {

    card.addEventListener("click", () => {

      openEmotionModal(card);

    });

    /*
       Keyboard accessibility.
    */

    card.addEventListener("keydown", event => {

      if (
        event.key === "Enter" ||
        event.key === " "
      ) {

        event.preventDefault();

        openEmotionModal(card);

      }

    });

  });


  if (modalClose) {

    modalClose.addEventListener(
      "click",
      closeEmotionModal
    );

  }


  if (modalBackdrop) {

    modalBackdrop.addEventListener(
      "click",
      closeEmotionModal
    );

  }


  /* =========================================================
     12 — HORIZONTAL EMOTION EXPERIENCE
     ========================================================= */

  const emotionContainer =
    document.querySelector(
      ".emotions-grid, .emotion-grid, .emotions-container"
    );


  if (emotionContainer) {

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;


    emotionContainer.addEventListener(
      "pointerdown",
      event => {

        isDown = true;

        startX = event.pageX -
          emotionContainer.offsetLeft;

        scrollLeft =
          emotionContainer.scrollLeft;

        emotionContainer.classList.add(
          "dragging"
        );

      }
    );


    emotionContainer.addEventListener(
      "pointerleave",
      () => {

        isDown = false;

        emotionContainer.classList.remove(
          "dragging"
        );

      }
    );


    emotionContainer.addEventListener(
      "pointerup",
      () => {

        isDown = false;

        emotionContainer.classList.remove(
          "dragging"
        );

      }
    );


    emotionContainer.addEventListener(
      "pointermove",
      event => {

        if (!isDown) return;

        event.preventDefault();

        const x =
          event.pageX -
          emotionContainer.offsetLeft;

        const walk =
          (x - startX) * 1.2;

        emotionContainer.scrollLeft =
          scrollLeft - walk;

      }
    );

  }


  /* =========================================================
     13 — BREATHING SPACE
     ========================================================= */

  const breathingCircle =
    document.querySelector(
      ".breathing-circle"
    );

  const breathingCore =
    document.querySelector(
      ".breathing-core"
    );


  let breathingTimer = null;


  if (breathingCircle) {

    breathingCircle.addEventListener(
      "click",
      () => {

        breathingCircle.classList.toggle(
          "breathing-active"
        );


        if (
          breathingCircle.classList.contains(
            "breathing-active"
          )
        ) {

          if (breathingCore) {

            breathingCore.textContent =
              "Breathe";

          }


          let phase = 0;

          clearInterval(
            breathingTimer
          );


          breathingTimer = setInterval(
            () => {

              phase++;

              if (!breathingCore)
                return;

              if (phase % 2 === 1) {

                breathingCore.textContent =
                  "Inhale";

              } else {

                breathingCore.textContent =
                  "Exhale";

              }

            },
            4000
          );


        } else {

          clearInterval(
            breathingTimer
          );

          if (breathingCore) {

            breathingCore.textContent =
              "Begin";

          }

        }

      }
    );

  }


  /* =========================================================
     14 — QUIET SPACE
     ========================================================= */

  const quietButton =
    document.querySelector(
      ".quiet-button"
    );

  const quietOverlay =
    document.querySelector(
      ".quiet-overlay"
    );

  const quietClose =
    document.querySelector(
      ".quiet-close"
    );


  function openQuietSpace() {

    if (!quietOverlay) return;

    quietOverlay.classList.add("open");

    body.classList.add("modal-open");

  }


  function closeQuietSpace() {

    if (!quietOverlay) return;

    quietOverlay.classList.remove("open");

    body.classList.remove("modal-open");

  }


  if (quietButton) {

    quietButton.addEventListener(
      "click",
      openQuietSpace
    );

  }


  if (quietClose) {

    quietClose.addEventListener(
      "click",
      closeQuietSpace
    );

  }


  /* =========================================================
     15 — AKSH AI PANEL
     ========================================================= */

  const aiPanel =
    document.querySelector(
      ".ai-panel"
    );

  const aiLaunchButtons =
    document.querySelectorAll(
      ".ai-launch"
    );

  const closeAI =
    document.querySelector(
      ".close-ai"
    );


  function openAI() {

    if (!aiPanel) return;

    aiPanel.classList.add("open");

    body.classList.add("ai-active");

  }


  function closeAIPanel() {

    if (!aiPanel) return;

    aiPanel.classList.remove("open");

    body.classList.remove("ai-active");

  }


  aiLaunchButtons.forEach(button => {

    button.addEventListener(
      "click",
      openAI
    );

  });


  if (closeAI) {

    closeAI.addEventListener(
      "click",
      closeAIPanel
    );

  }


  /* =========================================================
     16 — AI CHAT
     ========================================================= */

  const aiChat =
    document.querySelector(
      ".ai-chat"
    );

  const aiInput =
    document.querySelector(
      ".ai-input-area input"
    );

  const sendButton =
    document.querySelector(
      ".send-button"
    );

  const quickPrompts =
    document.querySelectorAll(
      ".quick-prompts button"
    );


  function escapeHTML(value) {

    return String(value)

      .replace(
        /&/g,
        "&amp;"
      )

      .replace(
        /</g,
        "&lt;"
      )

      .replace(
        />/g,
        "&gt;"
      )

      .replace(
        /"/g,
        "&quot;"
      )

      .replace(
        /'/g,
        "&#039;"
      );

  }


  function addUserMessage(text) {

    if (!aiChat || !text.trim())
      return;


    const wrapper =
      document.createElement(
        "div"
      );


    wrapper.className =
      "chat-message user-message";


    wrapper.innerHTML = `

      <div class="ai-message">

        ${escapeHTML(text)}

      </div>

    `;


    aiChat.appendChild(
      wrapper
    );


    aiChat.scrollTop =
      aiChat.scrollHeight;

  }


  function addAIMessage(text) {

    if (!aiChat) return;


    const wrapper =
      document.createElement(
        "div"
      );


    wrapper.className =
      "chat-message";


    wrapper.innerHTML = `

      <div class="chat-avatar">
        ✦
      </div>

      <div class="ai-message">

        ${escapeHTML(text)}

      </div>

    `;


    aiChat.appendChild(
      wrapper
    );


    aiChat.scrollTop =
      aiChat.scrollHeight;

  }


  /* =========================================================
     17 — AKSH AI RESPONSE FOUNDATION
     ========================================================= */

  function getAIResponse(message) {

    const text =
      message
        .toLowerCase()
        .trim();


    if (
      text.includes("anxious") ||
      text.includes("anxiety")
    ) {

      return "Let's slow this moment down together. Take one gentle breath in, and slowly breathe out. You don't have to solve everything right now.";

    }


    if (
      text.includes("stress") ||
      text.includes("stressed")
    ) {

      return "It sounds like things may be feeling heavy. You can start with just one thing that feels difficult right now. I'm listening.";

    }


    if (
      text.includes("sad") ||
      text.includes("lonely")
    ) {

      return "I'm glad you chose to pause here. You don't have to pretend that everything is okay. You can tell me what has been weighing on you.";

    }


    if (
      text.includes("overwhelmed") ||
      text.includes("too much")
    ) {

      return "When everything feels like too much, we don't need to solve everything at once. Let's take one small piece of this moment.";

    }


    if (
      text.includes("sleep") ||
      text.includes("can't sleep")
    ) {

      return "Let's make this moment quieter. Put down the pressure to fall asleep immediately and take a few slow breaths.";

    }


    if (
      text.includes("hello") ||
      text.includes("hi") ||
      text.includes("hey")
    ) {

      return "Hello. I'm AKSH AI. You can talk to me at your own pace. What's on your mind?";

    }


    if (
      text.includes("book") ||
      text.includes("appointment")
    ) {

      return "Of course. If you would like to speak with a psychologist, you can continue to the AKSH appointment journey.";

    }


    return "I'm listening. You don't have to find the perfect words. Tell me a little more about what you're experiencing right now.";

  }


  function sendAIMessage() {

    if (!aiInput)
      return;


    const message =
      aiInput.value.trim();


    if (!message)
      return;


    addUserMessage(
      message
    );


    aiInput.value = "";


    /*
       Small human-feeling pause.
    */

    setTimeout(
      () => {

        addAIMessage(
          getAIResponse(
            message
          )
        );

      },
      700
    );

  }


  if (sendButton) {

    sendButton.addEventListener(
      "click",
      sendAIMessage
    );

  }


  if (aiInput) {

    aiInput.addEventListener(
      "keydown",
      event => {

        if (
          event.key ===
          "Enter"
        ) {

          event.preventDefault();

          sendAIMessage();

        }

      }
    );

  }


  quickPrompts.forEach(button => {

    button.addEventListener(
      "click",
      () => {

        const text =
          button.textContent.trim();


        if (aiInput) {

          aiInput.value =
            text;

          sendAIMessage();

        }

      }
    );

  });


  /* =========================================================
     18 — LANGUAGE FOUNDATION
     ========================================================= */

  const languageButtons =
    document.querySelectorAll(
      "[data-language], .language-option"
    );


  languageButtons.forEach(button => {

    button.addEventListener(
      "click",
      () => {

        const language =
          button.dataset.language ||
          button.textContent.trim();


        html.dataset.language =
          language.toLowerCase();


        languageButtons.forEach(
          item => {

            item.classList.remove(
              "active"
            );

          }
        );


        button.classList.add(
          "active"
        );


        /*
          Translation engine will be connected
          later. We deliberately do not fake
          translations here.
        */

      }
    );

  });


  /* =========================================================
     19 — VOICE FOUNDATION
     ========================================================= */

  const voiceButtons =
    document.querySelectorAll(
      "[data-aksh-voice], .voice-button, .ai-voice"
    );


  let recognition = null;


  if (
    "webkitSpeechRecognition"
    in window
  ) {

    recognition =
      new webkitSpeechRecognition();


    recognition.continuous =
      false;

    recognition.interimResults =
      false;

    recognition.lang =
      "en-IN";


    recognition.onresult =
      event => {

        const transcript =
          event.results[0][0].transcript;


        if (aiInput) {

          aiInput.value =
            transcript;

          sendAIMessage();

        }

      };


    recognition.onerror =
      () => {

        console.log(
          "AKSH voice input unavailable."
        );

      };

  }


  voiceButtons.forEach(button => {

    button.addEventListener(
      "click",
      () => {

        if (!recognition) {

          alert(
            "Voice input is not available in this browser."
          );

          return;

        }


        try {

          recognition.start();

          button.classList.add(
            "listening"
          );

          setTimeout(
            () => {

              button.classList.remove(
                "listening"
              );

            },
            5000
          );

        } catch (error) {

          console.log(
            "Voice session already active."
          );

        }

      }
    );

  });


  /* =========================================================
     20 — WHATSAPP
     ========================================================= */

  const whatsappButtons =
    document.querySelectorAll(
      ".whatsapp-button, .floating-whatsapp"
    );


  whatsappButtons.forEach(button => {

    button.addEventListener(
      "click",
      event => {

        /*
          Existing real WhatsApp links
          continue normally.
        */

        if (
          button.tagName.toLowerCase()
          === "a"
        ) {

          return;

        }


        event.preventDefault();


        const phoneNumber =
          "YOUR_WHATSAPP_NUMBER";


        if (
          phoneNumber !==
          "YOUR_WHATSAPP_NUMBER"
        ) {

          window.open(
            `https://wa.me/${phoneNumber}`,
            "_blank"
          );

        } else {

          alert(
            "WhatsApp connection will be added here."
          );

        }

      }
    );

  });


  /* =========================================================
     21 — INTERNAL SMOOTH NAVIGATION
     ========================================================= */

  document
    .querySelectorAll(
      'a[href^="#"]'
    )
    .forEach(link => {

      link.addEventListener(
        "click",
        event => {

          const targetID =
            link.getAttribute(
              "href"
            );


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


          if (!target)
            return;


          event.preventDefault();


          target.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });

        }
      );

    });


  /* =========================================================
     22 — PARALLAX ATMOSPHERE
     ========================================================= */

  let ticking = false;


  function updateParallax() {

    const scrollY =
      window.scrollY;


    const atmosphereElements =
      document.querySelectorAll(
        ".sky-glow, .mist, .mountains, .lake-reflection"
      );


    atmosphereElements.forEach(
      (element, index) => {

        const amount =
          (scrollY * (0.02 + index * 0.008));


        element.style.transform =
          `translate3d(0, ${amount}px, 0)`;

      }
    );


    ticking = false;

  }


  window.addEventListener(
    "scroll",
    () => {

      if (!ticking) {

        window.requestAnimationFrame(
          updateParallax
        );

        ticking = true;

      }

    },
    {
      passive: true
    }
  );


  /* =========================================================
     23 — HOVER / POINTER ATMOSPHERE
     ========================================================= */

  if (
    window.matchMedia(
      "(pointer:fine)"
    ).matches
  ) {

    document.addEventListener(
      "pointermove",
      event => {

        const x =
          event.clientX /
          window.innerWidth;

        const y =
          event.clientY /
          window.innerHeight;


        html.style.setProperty(
          "--aksh-pointer-x",
          `${x * 100}%`
        );


        html.style.setProperty(
          "--aksh-pointer-y",
          `${y * 100}%`
        );

      }
    );

  }


  /* =========================================================
     24 — REDUCE MOTION SUPPORT
     ========================================================= */

  const prefersReducedMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;


  if (prefersReducedMotion) {

    html.classList.add(
      "reduced-motion"
    );

  }


  /* =========================================================
     25 — ESCAPE KEY
     ========================================================= */

  document.addEventListener(
    "keydown",
    event => {

      if (
        event.key !==
        "Escape"
      ) {

        return;

      }


      closeMobileMenu();
      closeEmotionModal();
      closeQuietSpace();
      closeAIPanel();

    }
  );


  /* =========================================================
     26 — EXPERIENCE READY
     ========================================================= */

  setTimeout(
    () => {

      body.classList.add(
        "aksh-experience-ready"
      );

    },
    1200
  );


  /* =========================================================
     27 — DEVICE DETECTION
     ========================================================= */

  function updateDeviceClass() {

    const width =
      window.innerWidth;


    html.classList.remove(
      "aksh-mobile",
      "aksh-tablet",
      "aksh-desktop"
    );


    if (width < 768) {

      html.classList.add(
        "aksh-mobile"
      );

    } else if (width < 1200) {

      html.classList.add(
        "aksh-tablet"
      );

    } else {

      html.classList.add(
        "aksh-desktop"
      );

    }

  }


  updateDeviceClass();


  window.addEventListener(
    "resize",
    updateDeviceClass
  );


  /* =========================================================
     28 — PAGE VISIBILITY
     ========================================================= */

  document.addEventListener(
    "visibilitychange",
    () => {

      if (
        document.hidden
      ) {

        body.classList.add(
          "page-hidden"
        );

      } else {

        body.classList.remove(
          "page-hidden"
        );

      }

    }
  );


  /* =========================================================
     29 — INITIALIZATION MESSAGE
     ========================================================= */

  console.log(
    "AKSH — A Safe Space For Every Mind — Experience Engine Loaded."
  );

  console.log(
    "Time period:",
    currentTimePeriod
  );

});
