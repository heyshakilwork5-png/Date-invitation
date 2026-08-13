(function () {
  "use strict";

  const floatingLayer = document.getElementById("floatingLayer");
  let revealObserver = null;

  function createFloatingParticles() {
    if (!floatingLayer) {
      return;
    }
    const chars = ["❤", "✦", "❀"];
    const count = window.matchMedia("(max-width: 600px)").matches ? 18 : 28;

    for (let i = 0; i < count; i += 1) {
      const particle = document.createElement("span");
      const char = chars[Math.floor(Math.random() * chars.length)];
      particle.className = "particle " + (char === "✦" ? "sparkle" : "");
      particle.textContent = char;
      particle.style.left = Math.random() * 100 + "%";
      particle.style.top = Math.random() * 100 + "%";
      particle.style.animationDelay = Math.random() * 4 + "s";
      particle.style.animationDuration = 5 + Math.random() * 5 + "s";
      floatingLayer.appendChild(particle);
    }
  }

  function setupRevealObserver() {
    const items = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window) || items.length === 0) {
      return;
    }
    revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          }
        });
      },
      {
        threshold: 0.25
      }
    );

    items.forEach(function (item) {
      revealObserver.observe(item);
    });
  }

  function heartBurst(anchorEl) {
    const burstHost = document.body;
    const rect = anchorEl.getBoundingClientRect();

    for (let i = 0; i < 10; i += 1) {
      const heart = document.createElement("span");
      heart.textContent = "❤";
      heart.style.position = "fixed";
      heart.style.left = rect.left + rect.width / 2 + "px";
      heart.style.top = rect.top + rect.height / 2 + "px";
      heart.style.color = i % 2 ? "#ff6b9a" : "#a78bfa";
      heart.style.pointerEvents = "none";
      heart.style.zIndex = "40";
      heart.style.transition = "transform 700ms ease, opacity 700ms ease";
      burstHost.appendChild(heart);

      const x = (Math.random() - 0.5) * 120;
      const y = -40 - Math.random() * 100;
      window.requestAnimationFrame(function () {
        heart.style.transform = "translate(" + x + "px," + y + "px) scale(1.3)";
        heart.style.opacity = "0";
      });
      window.setTimeout(function () {
        heart.remove();
      }, 740);
    }
  }

  function refreshObservers() {
    if (!revealObserver) {
      return;
    }
    document.querySelectorAll(".reveal").forEach(function (item) {
      revealObserver.observe(item);
    });
  }

  createFloatingParticles();
  setupRevealObserver();

  window.Animations = {
    heartBurst: heartBurst,
    refreshObservers: refreshObservers
  };
})();
