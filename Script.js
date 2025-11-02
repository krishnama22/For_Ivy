// Play the voice message
document.getElementById("audioBtn").addEventListener("click", () => {
  const audio = document.getElementById("voiceMsg");
  audio.play();
});

// Floating petals and hearts animation
const canvas = document.getElementById("background");
const ctx = canvas.getContext("2d");
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function random(min, max) {
  return Math.random() * (max - min) + min;
}

class Particle {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = random(0, canvas.width);
    this.y = random(-canvas.height, 0);
    this.size = random(10, 25);
    this.speed = random(0.5, 1.5);
    this.opacity = random(0.4, 0.9);
    this.type = Math.random() > 0.5 ? "heart" : "petal";
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.translate(this.x, this.y);
    if (this.type === "heart") {
      ctx.fillStyle = "#ff9ac8";
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(0, -this.size / 2, -this.size, -this.size / 2, -this.size, 0);
      ctx.bezierCurveTo(-this.size, this.size / 2, 0, this.size, 0, this.size * 1.5);
      ctx.bezierCurveTo(0, this.size, this.size, this.size / 2, this.size, 0);
      ctx.bezierCurveTo(this.size, -this.size / 2, 0, -this.size / 2, 0, 0);
      ctx.fill();
    } else {
      ctx.fillStyle = "#ffcce0";
      ctx.beginPath();
      ctx.ellipse(0, 0, this.size / 3, this.size / 2, Math.PI / 4, 0, 2 * Math.PI);
      ctx.fill();
    }
    ctx.restore();
  }

  update() {
    this.y += this.speed;
    this.x += Math.sin(this.y / 50) * 0.5;
    if (this.y > canvas.height + this.size) {
      this.reset();
    }
  }
}

function createParticles(count) {
  for (let i = 0; i < count; i++) {
    particles.push(new Particle());
  }
}
createParticles(50);

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p) => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animate);
}
animate();
