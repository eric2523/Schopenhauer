let particleArray;
let ctx;
let mouse = {
  x: null,
  y: null,
  radius: (canvas.height / 80) * (canvas.width / 80),
};

class Particle {
  constructor(x, y, xVel, yVel, size, color) {
    this.x = x;
    this.y = y;
    this.xVel = xVel;
    this.yVel = yVel;
    this.size = size;
    this.color = color;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fillStyle = "white";
    ctx.fill();
  }

  animate() {
    this.x = (this.x + canvas.width) % canvas.width;
    this.x = (this.x + canvas.height) % canvas.height;

    const dx = mouse.x - this.x;
    const dy = mouse.y - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < mouse.radius + this.size) {
      this.x += Math.sign(this.x - mouse.x) * 10;
      this.y += Math.sign(this.y - mouse.y) * 10;
    }
    this.x += this.xVel;
    this.y += this.yVel;
    this.draw();
  }
}

const numDots = 10000;
