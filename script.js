/* =========================================
   AKSH — INTERACTION ENGINE
   ========================================= */

const enterButton = document.getElementById("enterButton");
const feelingCards = document.querySelectorAll(".feeling-card");


/* =========================================
   ENTER AKSH
   ========================================= */

if (enterButton) {
  enterButton.addEventListener("click", () => {

    document.body.classList.add("entering");

    setTimeout(() => {
      const beginning = document.getElementById("begin");

      if (beginning) {
        beginning.scrollIntoView({
          behavior: "smooth"
        });
      }

    }, 250);

  });
}


/* =========================================
   FEELING EXPERIENCES
   ========================================= */

const experiences = [

  {
    title: "You feel anxious.",
    message:
      "You don't have to figure everything out at once. Take a moment. Notice what is happening within you. You can begin from exactly where you are.",
    label: "A MOMENT WITH AKSH"
  },

  {
    title: "You feel overwhelmed.",
    message:
      "When everything feels like too much, you don't have to carry everything at the same time. Pause. Breathe. Start with one small thing.",
    label: "A MOMENT WITH AKSH"
  },

  {
    title: "You need to talk.",
    message:
      "Sometimes the first step is simply having a safe space to speak. You don't have to have the right words. You can begin with what is on your mind.",
    label: "A MOMENT WITH AKSH"
  },

  {
    title: "You're just exploring.",
    message:
      "That's completely okay. You don't need a reason to become more curious about your mind. Take your time and explore AKSH at your own pace.",
    label: "WELCOME TO AKSH"
  }

];


/* =========================================
   CREATE EXPERIENCE WINDOW
   ========================================= */

function openExperience(experience) {

  const existing = document.querySelector(".experience-overlay");

  if (existing) {
    existing.remove();
  }


  const overlay = document.createElement("div");

  overlay.className = "experience-overlay";


  overlay.innerHTML = `

    <div class="experience-background"></div>

    <div class="experience-content">

      <button
        class="experience-close"
        aria-label="Close"
      >
        ×
      </button>

      <p class="experience-label">
        ${experience.label}
      </p>

      <h2>
        ${experience.title}
      </h2>

      <p class="experience-message">
        ${experience.message}
      </p>

      <button class="experience-back">
        RETURN TO AKSH
      </button>

    </div>

  `;


  document.body.appendChild(overlay);


  requestAnimationFrame(() => {
    overlay.classList.add("active");
  });


  const closeButton =
    overlay.querySelector(".experience-close");

  const backButton =
    overlay.querySelector(".experience-back");


  function closeExperience() {

    overlay.classList.remove("active");

    setTimeout(() => {
      overlay.remove();
    }, 500);

  }


  closeButton.addEventListener(
    "click",
    closeExperience
  );


  backButton.addEventListener(
    "click",
    closeExperience
  );


  overlay.addEventListener("click", (event) => {

    if (event.target === overlay) {
      closeExperience();
    }

  });

}


/* =========================================
   CARD CLICK EVENTS
   ========================================= */

feelingCards.forEach((card, index) => {

  card.addEventListener("click", () => {

    const experience =
      experiences[index];

    if (experience) {
      openExperience(experience);
    }

  });

});


/* =========================================
   KEYBOARD SUPPORT
   ========================================= */

document.addEventListener("keydown", (event) => {

  if (event.key === "Escape") {

    const overlay =
      document.querySelector(".experience-overlay");

    if (overlay) {
      overlay.remove();
    }

  }

});
