(function () {
  "use strict";

  const noBtn = document.getElementById("noEscapeBtn");
  const yesBtn = document.getElementById("yesBtnChase");
  const noMessage = document.getElementById("noMessage");
  const playground = document.getElementById("noPlayground");

  if (!noBtn || !yesBtn || !noMessage || !playground) {
    return;
  }

  const messages = [
    "Are you sure? 👀",
    "Nice try 😂",
    "You really thought I'd let you? 😭",
    "Why are you running? 😂",
    "Okay... just press YES 😌"
  ];

  let noCount = 0;

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function moveNoButton() {
    const areaRect = playground.getBoundingClientRect();
    const noRect = noBtn.getBoundingClientRect();
    const yesRect = yesBtn.getBoundingClientRect();
    const margin = 12;
    if (areaRect.width < 120 || areaRect.height < 120) {
      return;
    }

    const maxX = Math.max(margin, areaRect.width - noRect.width - margin);
    const maxY = Math.max(margin, areaRect.height - noRect.height - margin);
    const yesLocalX = yesRect.left - areaRect.left;
    const yesLocalY = yesRect.top - areaRect.top;

    let attempts = 0;
    let nextX = margin;
    let nextY = margin;
    do {
      nextX = margin + Math.random() * Math.max(10, maxX - margin);
      nextY = margin + Math.random() * Math.max(10, maxY - margin);
      attempts += 1;
    } while (
      attempts < 25 &&
      nextX < yesLocalX + yesRect.width + 10 &&
      nextX + noRect.width > yesLocalX - 10 &&
      nextY < yesLocalY + yesRect.height + 10 &&
      nextY + noRect.height > yesLocalY - 10
    );

    noBtn.style.transition = "left 220ms ease, top 220ms ease, transform 200ms ease";
    noBtn.style.right = "auto";
    noBtn.style.left = clamp(nextX, margin, maxX) + "px";
    noBtn.style.top = clamp(nextY, margin, maxY) + "px";
  }

  function resetButtons() {
    noCount = 0;
    noMessage.textContent = "Let's test that button first...";
    yesBtn.style.transform = "scale(1)";
    noBtn.style.transform = "scale(1)";
    yesBtn.style.left = "24px";
    yesBtn.style.top = "24px";
    noBtn.style.left = "auto";
    noBtn.style.right = "24px";
    noBtn.style.top = "24px";
  }

  noBtn.addEventListener("click", function () {
    noCount += 1;
    noMessage.textContent = messages[(noCount - 1) % messages.length];
    moveNoButton();

    const yesScale = 1 + Math.min(noCount * 0.08, 0.36);
    const noScale = 1 - Math.min(noCount * 0.06, 0.28);
    yesBtn.style.transform = "scale(" + yesScale.toFixed(2) + ")";
    noBtn.style.transform = "scale(" + noScale.toFixed(2) + ")";
  });

  window.addEventListener("resize", function () {
    moveNoButton();
  });

  window.NoButton = {
    reset: resetButtons
  };
})();
