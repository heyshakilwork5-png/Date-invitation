(function () {
  "use strict";

  const canvas = document.getElementById("celebrationCanvas");
  if (!canvas) {
    return;
  }
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return;
  }

  let rafId = null;
  let particles = [];

  function sizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function random(min, max) {
    return min + Math.random() * (max - min);
  }

  function createParticles() {
    const colors = ["#ff6b9a", "#ffdce8", "#a78bfa", "#e8b86d", "#ffffff"];
    particles = [];

    for (let i = 0; i < 180; i += 1) {
      const shapePick = Math.random();
      particles.push({
        x: random(0, canvas.width),
        y: random(-canvas.height * 0.1, canvas.height),
        vx: random(-1.5, 1.5),
        vy: random(-1.2, 3.2),
        size: random(4, 10),
        color: colors[Math.floor(Math.random() * colors.length)],
        life: random(50, 120),
        shape: shapePick > 0.77 ? "heart" : shapePick > 0.55 ? "spark" : "dot"
      });
    }
  }

  function drawHeart(x, y, size, color) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(size / 12, size / 12);
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(0, 3);
    ctx.bezierCurveTo(0, -3, -6, -3, -6, 2);
    ctx.bezierCurveTo(-6, 5, -3, 8, 0, 10);
    ctx.bezierCurveTo(3, 8, 6, 5, 6, 2);
    ctx.bezierCurveTo(6, -3, 0, -3, 0, 3);
    ctx.fill();
    ctx.restore();
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(function (p) {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.02;
      p.life -= 1;

      if (p.shape === "heart") {
        drawHeart(p.x, p.y, p.size, p.color);
      } else if (p.shape === "spark") {
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, p.size, 2);
      } else {
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    particles = particles.filter(function (p) {
      return p.life > 0 && p.y < canvas.height + 30;
    });

    if (particles.length > 0) {
      rafId = window.requestAnimationFrame(animate);
    }
  }

  function start() {
    if (rafId) {
      window.cancelAnimationFrame(rafId);
    }
    sizeCanvas();
    createParticles();
    animate();
  }

  window.addEventListener("resize", sizeCanvas);
  sizeCanvas();

  window.Confetti = {
    start: start
  };
})();
