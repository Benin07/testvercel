// Starfield canvas
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");
let stars = [];

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const count = Math.min(300, Math.floor((canvas.width * canvas.height) / 4000));
  stars = Array.from({ length: count }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.4 + 0.3,
    base: Math.random() * 0.5 + 0.3,
    phase: Math.random() * Math.PI * 2,
    speed: Math.random() * 0.015 + 0.004,
    hue: Math.random() < 0.85 ? 0 : Math.random() < 0.5 ? 1 : 2,
  }));
}

const colors = ["255,255,255", "245,214,123", "139,164,255"];

function draw(t) {
  if (!ctx) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (const s of stars) {
    const tw = s.base + Math.sin(t * s.speed * 0.06 + s.phase) * 0.35;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${colors[s.hue]},${Math.max(0.05, tw)})`;
    ctx.fill();
  }
  requestAnimationFrame(draw);
}

window.addEventListener("resize", resize);
resize();
requestAnimationFrame(draw);

// Reveal on scroll
const observer = new IntersectionObserver(
  (entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        observer.unobserve(e.target);
      }
    }
  },
  { threshold: 0.12 }
);

document
  .querySelectorAll(".section, .glass-card, .t-item")
  .forEach((el) => {
    el.classList.add("reveal");
    observer.observe(el);
  });
