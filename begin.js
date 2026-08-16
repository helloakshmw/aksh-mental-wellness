/* =========================================================
   AKSH — BEGIN / BOOKING
   begin.js
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
       ===================================================== */

    const nav =
        document.getElementById("begin-nav");

    const menuButton =
        document.getElementById("menu-button");

    const mobileMenu =
        document.getElementById("mobile-menu");

    const mobileClose =
        document.getElementById("mobile-close");

    const steps =
        document.querySelectorAll(".booking-step");

    const progressSteps =
        document.querySelectorAll(".progress-step");

    const progressLines =
        document.querySelectorAll(".progress-line");

    const success =
        document.getElementById("booking-success");

    const submitButton =
        document.getElementById("submit-booking");

    const bookingError =
        document.getElementById("booking-error");

    const consent =
        document.getElementById("booking-consent");

    const year =
        document.getElementById("year");


    /* =====================================================
       BOOKING STATE
       ===================================================== */

    const bookingData = {

        support: "",

        format: "",

        date: "",

        time: "",

        name: "",

        phone: "",

        email: "",

        ageGroup: "",

        message: ""

    };


    let currentStep = 1;


    /* =====================================================
       YEAR
       ===================================================== */

    if (year) {

        year.textContent =
            new Date().getFullYear();

    }


    /* =====================================================
       NAVIGATION SCROLL
       ===================================================== */

    function updateNavigation() {

        if (!nav) return;

        if (window.scrollY > 35) {

            nav.classList.add("scrolled");

        } else {

            nav.classList.remove("scrolled");

        }

    }


    updateNavigation();


    window.addEventListener(
        "scroll",
        updateNavigation,
        {
            passive: true
        }
    );


    /* =====================================================
       MOBILE MENU
       ===================================================== */

    function openMenu() {

        if (!mobileMenu) return;

        mobileMenu.classList.add("open");

        mobileMenu.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.classList.add(
            "menu-open"
        );

        if (menuButton) {

            menuButton.setAttribute(
                "aria-expanded",
                "true"
            );

        }

    }


    function closeMenu() {

        if (!mobileMenu) return;

        mobileMenu.classList.remove("open");

        mobileMenu.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.classList.remove(
            "menu-open"
        );

        if (menuButton) {

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    }


    if (menuButton) {

        menuButton.addEventListener(
            "click",
            openMenu
        );

    }


    if (mobileClose) {

        mobileClose.addEventListener(
            "click",
            closeMenu
        );

    }


    /* =====================================================
       MOBILE MENU LINKS
       ===================================================== */

    if (mobileMenu) {

        const menuLinks =
            mobileMenu.querySelectorAll("a");

        menuLinks.forEach((link) => {

            link.addEventListener(
                "click",
                closeMenu
            );

        });

    }


    /* =====================================================
       ESCAPE KEY
       ===================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape"
            ) {

                closeMenu();

            }

        }
    );


    /* =====================================================
       STEP MANAGEMENT
       ===================================================== */

    function showStep(stepNumber) {

        if (
            stepNumber < 1 ||
            stepNumber > 5
        ) {

            return;

        }


        currentStep = stepNumber;


        steps.forEach((step) => {

            const number =
                Number(
                    step.dataset.step
                );

            step.classList.toggle(
                "active",
                number === stepNumber
            );

        });


        progressSteps.forEach(
            (step) => {

                const number =
                    Number(
                        step.dataset.progress
                    );


                step.classList.remove(
                    "active",
                    "completed"
                );


                if (
                    number === stepNumber
                ) {

                    step.classList.add(
                        "active"
                    );

                }


                if (
                    number < stepNumber
                ) {

                    step.classList.add(
                        "completed"
                    );

                }

            }
        );


        progressLines.forEach(
            (line, index) => {

                line.classList.toggle(
                    "completed",
                    index < stepNumber - 1
                );

            }
        );


        clearError();


        const bookingSection =
            document.getElementById(
                "booking"
            );


        if (bookingSection) {

            bookingSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    }


    /* =====================================================
       NEXT BUTTONS
       ===================================================== */

    const nextButtons =
        document.querySelectorAll(
            "[data-next]"
        );


    nextButtons.forEach((button) => {

        button.addEventListener(
            "click",
            () => {

                const nextStep =
                    Number(
                        button.dataset.next
                    );


                if (
                    validateStep(currentStep)
                ) {

                    collectCurrentData();

                    updateReview();

                    showStep(nextStep);

                }

            }
        );

    });


    /* =====================================================
       BACK BUTTONS
       ===================================================== */

    const backButtons =
        document.querySelectorAll(
            "[data-back]"
        );


    backButtons.forEach((button) => {

        button.addEventListener(
            "click",
            () => {

                const previousStep =
                    Number(
                        button.dataset.back
                    );


                collectCurrentData();

                showStep(previousStep);

            }
        );

    });


    /* =====================================================
       CHOICE CARDS
       ===================================================== */

    const choiceCards =
        document.querySelectorAll(
            ".choice-card"
        );


    choiceCards.forEach((card) => {

        card.addEventListener(
            "click",
            () => {

                choiceCards.forEach(
                    (otherCard) => {

                        otherCard.classList.remove(
                            "selected"
                        );

                    }
                );


                card.classList.add(
                    "selected"
                );


                bookingData.support =
                    card.dataset.choice || "";

            }
        );

    });


    /* =====================================================
       FORMAT CARDS
       ===================================================== */

    const formatCards =
        document.querySelectorAll(
            ".format-card"
        );


    formatCards.forEach((card) => {

        card.addEventListener(
            "click",
            () => {

                formatCards.forEach(
                    (otherCard) => {

                        otherCard.classList.remove(
                            "selected"
                        );

                    }
                );


                card.classList.add(
                    "selected"
                );


                bookingData.format =
                    card.dataset.choice || "";

            }
        );

    });


    /* =====================================================
       FORM ELEMENTS
       ===================================================== */

    const dateInput =
        document.getElementById(
            "preferred-date"
        );

    const timeInput =
        document.getElementById(
            "preferred-time"
        );

    const nameInput =
        document.getElementById(
            "full-name"
        );

    const phoneInput =
        document.getElementById(
            "phone"
        );

    const emailInput =
        document.getElementById(
            "email"
        );

    const ageInput =
        document.getElementById(
            "age-group"
        );

    const messageInput =
        document.getElementById(
            "message"
        );


    /* =====================================================
       MINIMUM DATE
       ===================================================== */

    if (dateInput) {

        const today =
            new Date();


        const yearValue =
            today.getFullYear();


        const monthValue =
            String(
                today.getMonth() + 1
            ).padStart(
                2,
                "0"
            );


        const dayValue =
            String(
                today.getDate()
            ).padStart(
                2,
                "0"
            );


        dateInput.min =
            `${yearValue}-${monthValue}-${dayValue}`;

    }


    /* =====================================================
       COLLECT CURRENT DATA
       ===================================================== */

    function collectCurrentData() {

        if (dateInput) {

            bookingData.date =
                dateInput.value;

        }


        if (timeInput) {

            bookingData.time =
                timeInput.value;

        }


        if (nameInput) {

            bookingData.name =
                nameInput.value.trim();

        }


        if (phoneInput) {

            bookingData.phone =
                phoneInput.value.trim();

        }


        if (emailInput) {

            bookingData.email =
                emailInput.value.trim();

        }


        if (ageInput) {

            bookingData.ageGroup =
                ageInput.value;

        }


        if (messageInput) {

            bookingData.message =
                messageInput.value.trim();

        }

    }


    /* =====================================================
       VALIDATION
       ===================================================== */

    function validateStep(stepNumber) {

        clearError();


        collectCurrentData();


        if (
            stepNumber === 1
        ) {

            if (
                !bookingData.support
            ) {

                showError(
                    "Please choose the kind of support you are looking for."
                );

                return false;

            }

        }


        if (
            stepNumber === 2
        ) {

            if (
                !bookingData.format
            ) {

                showError(
                    "Please choose how you would like to meet."
                );

                return false;

            }

        }


        if (
            stepNumber === 3
        ) {

            if (
                !bookingData.date
            ) {

                showError(
                    "Please choose a preferred date."
                );

                return false;

            }


            if (
                !bookingData.time
            ) {

                showError(
                    "Please choose a preferred time."
                );

                return false;

            }

        }


        if (
            stepNumber === 4
        ) {

            if (
                !bookingData.name
            ) {

                showError(
                    "Please enter your name."
                );

                return false;

            }


            if (
                !bookingData.phone
            ) {

                showError(
                    "Please enter your phone number."
                );

                return false;

            }


            if (
                bookingData.phone.length < 7
            ) {

                showError(
                    "Please enter a valid phone number."
                );

                return false;

            }


            if (
                bookingData.email
            ) {

                const emailPattern =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


                if (
                    !emailPattern.test(
                        bookingData.email
                    )
                ) {

                    showError(
                        "Please enter a valid email address."
                    );

                    return false;

                }

            }

        }


        return true;

    }


    /* =====================================================
       ERROR
       ===================================================== */

    function showError(message) {

        if (!bookingError) return;

        bookingError.textContent =
            message;

    }


    function clearError() {

        if (!bookingError) return;

        bookingError.textContent =
            "";

    }


    /* =====================================================
       REVIEW
       ===================================================== */

    function updateReview() {

        const reviewSupport =
            document.getElementById(
                "review-support"
            );

        const reviewFormat =
            document.getElementById(
                "review-format"
            );

        const reviewDate =
            document.getElementById(
                "review-date"
            );

        const reviewTime =
            document.getElementById(
                "review-time"
            );

        const reviewName =
            document.getElementById(
                "review-name"
            );

        const reviewContact =
            document.getElementById(
                "review-contact"
            );


        if (reviewSupport) {

            reviewSupport.textContent =
                bookingData.support ||
                "—";

        }


        if (reviewFormat) {

            reviewFormat.textContent =
                bookingData.format ||
                "—";

        }


        if (reviewDate) {

            reviewDate.textContent =
                formatDate(
                    bookingData.date
                ) || "—";

        }


        if (reviewTime) {

            reviewTime.textContent =
                bookingData.time ||
                "—";

        }


        if (reviewName) {

            reviewName.textContent =
                bookingData.name ||
                "—";

        }


        if (reviewContact) {

            reviewContact.textContent =
                bookingData.phone ||
                bookingData.email ||
                "—";

        }

    }


    /* =====================================================
       DATE FORMAT
       ===================================================== */

    function formatDate(value) {

        if (!value) return "";


        const date =
            new Date(
                `${value}T00:00:00`
            );


        if (
            Number.isNaN(
                date.getTime()
            )
        ) {

            return value;

        }


        return date.toLocaleDateString(
            "en-IN",
            {
                day: "numeric",
                month: "long",
                year: "numeric"
            }
        );

    }


    /* =====================================================
       SUBMIT
       ===================================================== */

    if (submitButton) {

        submitButton.addEventListener(
            "click",
            () => {

                clearError();


                collectCurrentData();


                if (
                    !consent ||
                    !consent.checked
                ) {

                    showError(
                        "Please confirm that you understand this is an appointment request."
                    );

                    return;

                }


                submitBooking();

            }
        );

    }


    /* =====================================================
       SUBMIT BOOKING
       ===================================================== */

    function submitBooking() {

        submitButton.disabled =
            true;


        submitButton.style.opacity =
            "0.6";


        submitButton.querySelector(
            "span"
        ).textContent =
            "…";


        /*
         * -------------------------------------------------
         * IMPORTANT
         * -------------------------------------------------
         *
         * This is currently the FRONT-END booking flow.
         *
         * It does NOT send personal information to a server.
         *
         * When the real booking backend / WhatsApp / email
         * connection is added later, this function will be
         * connected to it.
         *
         * -------------------------------------------------
         */


        setTimeout(
            () => {

                const activeStep =
                    document.querySelector(
                        '.booking-step[data-step="5"]'
                    );


                if (activeStep) {

                    activeStep.style.display =
                        "none";

                }


                if (success) {

                    success.classList.add(
                        "open"
                    );

                    success.setAttribute(
                        "aria-hidden",
                        "false"
                    );

                }


                progressSteps.forEach(
                    (step) => {

                        step.classList.remove(
                            "active"
                        );

                        step.classList.add(
                            "completed"
                        );

                    }
                );


                progressLines.forEach(
                    (line) => {

                        line.classList.add(
                            "completed"
                        );

                    }
                );


                submitButton.disabled =
                    false;

                submitButton.style.opacity =
                    "1";

                submitButton.querySelector(
                    "span"
                ).textContent =
                    "→";


                const bookingSection =
                    document.getElementById(
                        "booking"
                    );


                if (bookingSection) {

                    bookingSection.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

            },
            700
        );

    }


    /* =====================================================
       INPUT CLEANUP
       ===================================================== */

    if (phoneInput) {

        phoneInput.addEventListener(
            "input",
            () => {

                phoneInput.value =
                    phoneInput.value.replace(
                        /[^\d+\-\s()]/g,
                        ""
                    );

            }
        );

    }


    /* =====================================================
       CLEAR ERROR WHEN USER STARTS TYPING
       ===================================================== */

    const formInputs =
        document.querySelectorAll(
            "input, select, textarea"
        );


    formInputs.forEach((input) => {

        input.addEventListener(
            "input",
            clearError
        );

        input.addEventListener(
            "change",
            clearError
        );

    });


    /* =====================================================
       INTERNAL ANCHOR LINKS
       ===================================================== */

    const internalLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    internalLinks.forEach((link) => {

        link.addEventListener(
            "click",
            (event) => {

                const targetId =
                    link.getAttribute(
                        "href"
                    );


                if (
                    !targetId ||
                    targetId === "#"
                ) {

                    return;

                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (!target) return;


                event.preventDefault();


                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    });


    /* =====================================================
       INITIAL STATE
       ===================================================== */

    if (mobileMenu) {

        mobileMenu.setAttribute(
            "aria-hidden",
            "true"
        );

    }


    showStep(1);

});
