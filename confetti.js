
const canvas = document.getElementById('confetti');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let confettis = [];
function launchConfetti() {
  for (let i = 0; i < 150; i++) {
    confettis.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      r: Math.random() * 6 + 4,
      d: Math.random() * 10 + 5,
      color: `hsl(${Math.random() * 360}, 100%, 50%)`,
      tilt: Math.random() * 10 - 10
    });
  }
  animateConfetti();
}

function animateConfetti() {
  let frame = 0;
  const animation = setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confettis.forEach((c, i) => {
      ctx.beginPath();
      ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
      ctx.fillStyle = c.color;
      ctx.fill();
      c.y += c.d;
      c.x += Math.sin(frame / 10 + i);
    });
    frame++;
  }, 16);
  setTimeout(() => {
    clearInterval(animation);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confettis = [];
  }, 3000);
}

function clearConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
