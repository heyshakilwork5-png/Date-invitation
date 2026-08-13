(function () {
  "use strict";

  function to12Hour(time24) {
    if (!time24) {
      return "";
    }
    const parts = time24.split(":");
    const h = Number(parts[0]);
    const m = parts[1];
    const hour = ((h + 11) % 12) + 1;
    const ampm = h >= 12 ? "PM" : "AM";
    return String(hour).padStart(2, "0") + ":" + m + " " + ampm;
  }

  function createOptionCards(container, options, onSelect) {
    if (!container) {
      return;
    }
    container.innerHTML = options
      .map(function (option) {
        return (
          '<button type="button" class="option-card" data-id="' +
          option.id +
          '">' +
          '<div class="icon">' +
          option.icon +
          "</div>" +
          "<h3>" +
          option.title +
          "</h3>" +
          "<p>" +
          option.desc +
          "</p>" +
          "</button>"
        );
      })
      .join("");

    container.addEventListener("click", function (event) {
      const target = event.target.closest(".option-card");
      if (!target) {
        return;
      }

      const id = target.getAttribute("data-id");
      container.querySelectorAll(".option-card").forEach(function (card) {
        card.classList.toggle("selected", card === target);
      });
      onSelect(id);
    });
  }

  const timeContainer = document.getElementById("timeOptions");
  const selectedTimeText = document.getElementById("selectedTimeText");
  const exactTimeInput = document.getElementById("exactTime");
  const timeContinue = document.getElementById("timeContinue");
  const typeContainer = document.getElementById("typeOptions");
  const selectedTypeText = document.getElementById("selectedTypeText");
  const typeContinue = document.getElementById("typeContinue");
  const reasonBtn = document.getElementById("reasonBtn");
  const reasonText = document.getElementById("reasonText");
  const secretBtn = document.getElementById("secretBtn");
  const secretText = document.getElementById("secretText");

  function updateTimeSelection(text) {
    selectedTimeText.textContent = "Selected time: " + text;
    timeContinue.disabled = !window.dateData.time;
    if (window.dateData.time) {
      selectedTimeText.classList.add("active");
      window.setTimeout(function () {
        selectedTimeText.classList.remove("active");
      }, 280);
    }
    window.App.updateTicket();
  }

  function updateTypeSelection(text) {
    selectedTypeText.textContent = "Selected type: " + text;
    typeContinue.disabled = !window.dateData.type;
    if (window.dateData.type) {
      selectedTypeText.classList.add("active");
      window.setTimeout(function () {
        selectedTypeText.classList.remove("active");
      }, 280);
    }
    window.App.updateTicket();
  }

  // Updated: Heart burst added on time selection
  createOptionCards(timeContainer, window.CONFIG.times, function (id) {
    const selected = window.CONFIG.times.find(function (item) {
      return item.id === id;
    });
    if (!selected) {
      return;
    }
    window.dateData.time = selected.title;
    if (exactTimeInput) {
      exactTimeInput.value = "";
    }
    updateTimeSelection(selected.title);
    
    const activeCard = timeContainer.querySelector(`[data-id="${id}"]`);
    if (window.Animations && typeof window.Animations.heartBurst === "function" && activeCard) {
        window.Animations.heartBurst(activeCard);
    }
  });

  if (exactTimeInput) {
    exactTimeInput.addEventListener("input", function () {
      if (!exactTimeInput.value) {
        return;
      }

      if (timeContainer) {
        timeContainer.querySelectorAll(".option-card").forEach(function (card) {
          card.classList.remove("selected");
        });
      }
      const formatted = to12Hour(exactTimeInput.value);
      window.dateData.time = formatted;
      updateTimeSelection(formatted);
    });
  }

  // Updated: Heart burst added on date type selection
  createOptionCards(typeContainer, window.CONFIG.dateTypes, function (id) {
    const selected = window.CONFIG.dateTypes.find(function (item) {
      return item.id === id;
    });
    if (!selected) {
      return;
    }
    window.dateData.type = selected.title;
    updateTypeSelection(selected.title);
    
    const activeCard = typeContainer.querySelector(`[data-id="${id}"]`);
    if (window.Animations && typeof window.Animations.heartBurst === "function" && activeCard) {
        window.Animations.heartBurst(activeCard);
    }
  });

  if (reasonBtn && reasonText) {
    let reasonIndex = 0;
    reasonBtn.addEventListener("click", function () {
      const reason = window.CONFIG.reasons[reasonIndex % window.CONFIG.reasons.length];
      reasonText.style.opacity = "0";
      window.setTimeout(function () {
        reasonText.textContent = reason;
        reasonText.style.opacity = "1";
      }, 130);
      reasonIndex += 1;
    });
  }

  if (secretBtn && secretText) {
    secretBtn.addEventListener("click", function () {
      secretText.textContent = "I knew you were going to click it. 🤭";
      window.setTimeout(function () {
        secretText.textContent = "You're curious... and that's kinda cute. ❤️";
      }, 900);

      if (window.Animations && typeof window.Animations.heartBurst === "function") {
        window.Animations.heartBurst(secretBtn);
      }
    });
  }

  updateTimeSelection("Not selected");
  updateTypeSelection("Not selected");
})();