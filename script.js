const canvas = document.getElementById('trail');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let points = [];
const maxPoints = 50;

window.addEventListener('mousemove', function(e) {
points.push({ x: e.clientX, y: e.clientY });
if (points.length > maxPoints) points.shift();
});

function draw() {
ctx.clearRect(0, 0, canvas.width, canvas.height);
for (let i = 0; i < points.length; i++) {
const opacity = i / points.length;
ctx.beginPath();
ctx.arc(points[i].x, points[i].y, 6, 0, 2 * Math.PI);
ctx.fillStyle = `rgba(255, 105, 180, ${opacity})`; // Hot pink trail
ctx.fill();
}
requestAnimationFrame(draw);
}

draw();

window.addEventListener('resize', () => {
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
});
