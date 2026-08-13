(function () {
  "use strict";

  const TODAY = new Date();

  window.CONFIG = {
    name: "You",
    title: "A Little Date For Us",
    music: "",
    images: {
      hero: "images/hero.jpg",
      firstMeeting: "images/first-meeting.jpg",
      gallery: [
        { src: "images/memory-1.jpg", caption: "A soft little moment" },
        { src: "images/memory-2.jpg", caption: "The smile I remember" },
        { src: "images/memory-3.jpg", caption: "Warm and peaceful vibe" },
        { src: "images/memory-4.jpg", caption: "Tiny spark of joy" },
        { src: "images/memory-5.jpg", caption: "A memory worth keeping" },
        { src: "images/memory-6.jpg", caption: "Hoping for many more" }
      ]
    },
    letterText: `তোমার সাথে সেই একবার দেখা হওয়ার মুহূর্তটা কেন জানি আমার কাছে একটু বেশিই special হয়ে আছে।

খুব বেশি সময় ছিল না, তবুও সেই অল্প সময়টুকু মনে একটা সুন্দর অনুভূতি রেখে গেছে।

তাই ইচ্ছে করছে এবার তোমার সাথে একটু বেশি সময় কাটাতে।
তোমার ছায়ায় ছায়ায় পাশাপাশি হাঁটতে, হাঁটতে হাঁটতে অনেক গল্প করতে, আর তোমার সেই মায়াভরা চোখ দুটো একটু কাছে থেকে ভালো করে দেখতে।

হয়তো খুব বড় কোনো ইচ্ছা না।
শুধু তোমার সাথে একটা সুন্দর দিন কাটাতে চাই, কিছু সুন্দর মুহূর্ত জমাতে চাই।

কেমন হবে বলো তো? ❤️`,
    availableDates: [],
    unavailableDates: [],
    times: [
      { id: "morning", icon: "🌅", title: "Morning", desc: "A fresh and calm start" },
      { id: "afternoon", icon: "☀️", title: "Afternoon", desc: "Soft sunshine and stories" },
      { id: "evening", icon: "🌆", title: "Evening", desc: "Golden hour magic" },
      { id: "night", icon: "🌙", title: "Night", desc: "City lights and cozy vibes" }
    ],
    dateTypes: [
      { id: "coffee", icon: "☕", title: "Coffee Date", desc: "Coffee, conversation, and calm." },
      { id: "food", icon: "🍕", title: "Food Date", desc: "Good food and happy laughs." },
      { id: "movie", icon: "🎬", title: "Movie Date", desc: "A film and shared reactions." },
      { id: "walk", icon: "🌆", title: "Evening Walk", desc: "Slow steps and soft talks." },
      { id: "sunset", icon: "🌅", title: "Sunset Date", desc: "Sky colors and peace." },
      { id: "surprise", icon: "🎲", title: "Surprise Me", desc: "Okay... I'll handle everything. 😌❤️" }
    ],
    reasons: [
      "Your smile is genuinely beautiful. ❤️",
      "Talking to you feels easy.",
      "That one meeting stayed in my mind.",
      "Somehow, I wanted to see you again.",
      "And honestly... I just like being around you. ❤️"
    ]
  };

  window.dateData = {
    date: null,
    time: null,
    type: null
  };

  const state = {
    currentStep: 1,
    totalSteps: 14
  };

  const screens = Array.from(document.querySelectorAll(".screen"));
  const progressText = document.getElementById("progressText");
  const progressBar = document.getElementById("progressBar");

  function formatStep(step) {
    return String(step).padStart(2, "0");
  }

  function updateProgress() {
    progressText.textContent = `${formatStep(state.currentStep)} / ${formatStep(state.totalSteps)}`;
    progressBar.style.width = `${(state.currentStep / state.totalSteps) * 100}%`;
  }

  function goToStep(step) {
    if (step < 1 || step > state.totalSteps) {
      return;
    }

    state.currentStep = step;
    screens.forEach(function (screen) {
      screen.classList.remove("active");
      if (Number(screen.dataset.step) === step) {
        screen.classList.add("active");
      }
    });

    updateProgress();
    updateTicket();
    window.scrollTo({ top: 0, behavior: "smooth" });

    if (step === 8 && window.NoButton && typeof window.NoButton.reset === "function") {
      window.NoButton.reset();
    }

    if (window.Animations && typeof window.Animations.refreshObservers === "function") {
      window.Animations.refreshObservers();
    }
  }

  function nextStep() {
    goToStep(state.currentStep + 1);
  }

  function prevStep() {
    goToStep(state.currentStep - 1);
  }

  function formatHumanDate(dateInput) {
    if (!dateInput) {
      return "Not selected";
    }
    const date = new Date(dateInput + "T00:00:00");
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric"
    });
  }

  function updateTicket() {
    const ticketDate = document.getElementById("ticketDate");
    const ticketTime = document.getElementById("ticketTime");
    const ticketType = document.getElementById("ticketType");

    if (!ticketDate || !ticketTime || !ticketType) {
      return;
    }

    ticketDate.textContent = formatHumanDate(window.dateData.date);
    ticketTime.textContent = window.dateData.time || "Not selected";
    ticketType.textContent = window.dateData.type || "Not selected";
  }

  function renderLetter() {
    const letterText = document.getElementById("letterText");
    if (letterText) {
      letterText.textContent = window.CONFIG.letterText;
    }
  }

  function renderGallery() {
    const gallery = document.getElementById("galleryGrid");
    if (!gallery) {
      return;
    }

    gallery.innerHTML = window.CONFIG.images.gallery
      .map(function (image) {
        return (
          '<figure class="photo-card">' +
          '<img src="' +
          image.src +
          '" alt="' +
          image.caption +
          '" loading="lazy" />' +
          "<figcaption>" +
          image.caption +
          "</figcaption>" +
          "</figure>"
        );
      })
      .join("");
  }

  function setMainImages() {
    const heroImage = document.getElementById("heroImage");
    const meetingImage = document.getElementById("meetingImage");
    if (heroImage) {
      heroImage.src = window.CONFIG.images.hero;
    }
    if (meetingImage) {
      meetingImage.src = window.CONFIG.images.firstMeeting;
    }
  }

  function applyDocumentTitle() {
    if (window.CONFIG.title) {
      document.title = window.CONFIG.title;
    }
  }

  function setupGenericNavigation() {
    document.querySelectorAll(".next-btn").forEach(function (button) {
      button.addEventListener("click", nextStep);
    });

    document.querySelectorAll(".back-btn").forEach(function (button) {
      button.addEventListener("click", prevStep);
    });

    const ticketBackBtn = document.getElementById("ticketBackBtn");
    if (ticketBackBtn) {
      ticketBackBtn.addEventListener("click", function () {
        goToStep(8);
      });
    }

    const openBtn = document.getElementById("openInvitationBtn");
    if (openBtn) {
      openBtn.addEventListener("click", function () {
        nextStep();
        const bgMusic = document.getElementById("bgMusic");
        if (bgMusic && window.CONFIG.music) {
          bgMusic.src = window.CONFIG.music;
        }
      });
    }

    const noMain = document.getElementById("noBtnMain");
    if (noMain) {
      noMain.addEventListener("click", function () {
        goToStep(8);
      });
    }

    // --- NEW: WhatsApp Button Logic ---
    const waBtn = document.getElementById("sendWhatsAppBtn");
    if (waBtn) {
      waBtn.addEventListener("click", function () {
        const yourWhatsAppNumber = "8801302912650"; 
        
        const date = window.dateData.date ? window.App.formatHumanDate(window.dateData.date) : "Surprise Date";
        const time = window.dateData.time || "Surprise Time";
        const type = window.dateData.type || "Surprise Plan";

        const message = `Hey Shakil! ❤️ I'd love to go on a date with you!\n\nHere is our ticket:\n📅 Date: ${date}\n⏰ Time: ${time}\n☕ Plan: ${type}\n\nSee you soon! 🌸`;
        
        const encodedMessage = encodeURIComponent(message);
        const waLink = `https://wa.me/${yourWhatsAppNumber}?text=${encodedMessage}`;
        
        window.open(waLink, "_blank");
      });
    }
    // -----------------------------------
  }

  function setupYesButtons() {
    ["yesBtnMain", "yesBtnChase"].forEach(function (id) {
      const yesBtn = document.getElementById(id);
      if (!yesBtn) {
        return;
      }

      yesBtn.addEventListener("click", function () {
        goToStep(9);
        if (window.Confetti && typeof window.Confetti.start === "function") {
          window.Confetti.start();
        }
        window.setTimeout(function () {
          goToStep(10);
        }, 2600);
      });
    });
  }

  function setupFirstMeetingObserver() {
    const firstMeeting = document.querySelector(".first-meeting");
    if (!firstMeeting || !("IntersectionObserver" in window)) {
      return;
    }

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            firstMeeting.classList.add("in-view");
          }
        });
      },
      { threshold: 0.35 }
    );
    observer.observe(firstMeeting);
  }

  window.App = {
    goToStep: goToStep,
    getCurrentStep: function () {
      return state.currentStep;
    },
    formatHumanDate: formatHumanDate,
    getToday: function () {
      return TODAY;
    },
    updateTicket: updateTicket
  };

  renderLetter();
  renderGallery();
  setMainImages();
  applyDocumentTitle();
  setupGenericNavigation();
  setupYesButtons();
  setupFirstMeetingObserver();
  updateTicket();
  updateProgress();
})();
