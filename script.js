// Sakura falling petals animation on canvas

const canvas = document.getElementById("sakuraCanvas");
const ctx = canvas.getContext("2d");

let width, height;
function resize() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
}
resize();
window.addEventListener("resize", resize);

class Petal {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * width;
    this.y = Math.random() * -height;
    this.size = 10 + Math.random() * 10;
    this.speed = 1 + Math.random() * 2;
    this.wind = Math.random() * 1 - 0.5;
    this.angle = Math.random() * 2 * Math.PI;
    this.spin = (Math.random() - 0.5) * 0.02;
    this.opacity = 0.7 + Math.random() * 0.3;
  }

  update() {
    this.y += this.speed;
    this.x += this.wind + Math.sin(this.angle) * 0.5;
    this.angle += this.spin;

    if (this.y > height) this.reset();
    if (this.x > width) this.x = 0;
    if (this.x < 0) this.x = width;
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.fillStyle = `rgba(255, 182, 193, ${this.opacity})`; // pink sakura petal
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(5, 5, 10, 5, 5, 15);
    ctx.bezierCurveTo(0, 20, -5, 15, 0, 0);
    ctx.fill();
    ctx.restore();
  }
}

const petals = [];
const PETAL_COUNT = 50;
for (let i = 0; i < PETAL_COUNT; i++) {
  petals.push(new Petal());
}

function animate() {
  ctx.clearRect(0, 0, width, height);
  petals.forEach(petal => {
    petal.update();
    petal.draw();
  });
  drawMouseTrail();
  requestAnimationFrame(animate);
}

// Mouse trailing sakura petals

const trail = [];
const MAX_TRAIL = 20;

window.addEventListener("mousemove", e => {
  trail.push({
    x: e.clientX,
    y: e.clientY,
    size: 10 + Math.random() * 10,
    life: 20,
    opacity: 1,
    angle: Math.random() * 2 * Math.PI
  });

  if (trail.length > MAX_TRAIL) {
    trail.shift();
  }
});

function drawMouseTrail() {
  trail.forEach((point, idx) => {
    point.life--;
    point.opacity = point.life / 20;
    point.angle += 0.05;

    ctx.save();
    ctx.translate(point.x, point.y);
    ctx.rotate(point.angle);
    ctx.fillStyle = `rgba(255, 182, 193, ${point.opacity})`;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(5, 5, 10, 5, 5, 15);
    ctx.bezierCurveTo(0, 20, -5, 15, 0, 0);
    ctx.fill();
    ctx.restore();
  });

  // Remove dead points
  for (let i = trail.length - 1; i >= 0; i--) {
    if (trail[i].life <= 0) trail.splice(i, 1);
  }
}

animate();
