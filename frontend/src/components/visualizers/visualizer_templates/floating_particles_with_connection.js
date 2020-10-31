import { distance } from "../../../util/visualizer_util";

export class ConnectedFloatingDotsVisualizer {
  constructor(canvas) {
    // canvas.height = 1080;
    // canvas.width = 1460;
    this.particleArray = [];
    for (let i = 0; i < 50; i++) {
      let size = Math.random() * 3 + 1;
      let x = Math.random() * canvas.width;
      let y = Math.random() * canvas.height;
      let xVel = Math.random() * 0.4;
      let yVel = Math.random() * 0.4;
      let color = "black";
      this.particleArray.push(new Particle(x, y, xVel, yVel, size, color));
    }
  }

  animate = (canvas, state) => {
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const particle of this.particleArray) {
      particle.animate(canvas, state, ctx);
    }
    this.connect(ctx);
  };
  connect(ctx) {
    let opacityValue = 1;
    for (let a = 0; a < this.particleArray.length; a++) {
      for (let b = a + 1; b < this.particleArray.length; b++) {
        const dist = distance(this.particleArray[a], this.particleArray[b]);
        opacityValue = 1 - dist / 150;
        ctx.strokeStyle = "rgba(140,85,31," + opacityValue + ")";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(this.particleArray[a].x, this.particleArray[a].y);
        ctx.lineTo(this.particleArray[b].x, this.particleArray[b].y);
        ctx.stroke();
      }
    }
  }
}
class Particle {
  constructor(x, y, xVel, yVel, size, color) {
    this.x = x;
    this.y = y;
    this.xVel = xVel;
    this.yVel = yVel;
    this.size = size;
    this.color = color;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fillStyle = "white";
    ctx.fill();
  }

  animate(canvas, state, ctx) {
    // this.x = (this.x + canvas.width) % canvas.width;
    // this.y = (this.y + canvas.height) % canvas.height;
    if (this.x > canvas.width || this.x < 0) {
      this.xVel = -this.xVel;
    }
    if (this.y > canvas.height || this.y < 0) {
      this.yVel = -this.yVel;
    }
    const dist = distance(state.mouse, this);

    if (dist < state.mouse.radius + this.size) {
      this.x += Math.sign(this.x - state.mouse.x) * 10;
      this.y += Math.sign(this.y - state.mouse.y) * 10;
    }
    this.x += this.xVel;
    this.y += this.yVel;
    this.draw(ctx);
  }
}
