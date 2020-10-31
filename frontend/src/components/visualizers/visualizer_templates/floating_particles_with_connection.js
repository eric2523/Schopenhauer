import { distance } from "../../../util/visualizer_util";

export class ConnectedFloatingDotsVisualizer {
  constructor(canvas) {
    this.particleArray = [];
    for (let i = 0; i < 150; i++) {
      let size = Math.random() * 3 + 1;
      let x = Math.random() * canvas.width;
      let y = Math.random() * canvas.height;
      let xVel = Math.random() * 0.1;
      let yVel = Math.random() * 0.1;
      let color = "white";
      this.particleArray.push(
        new Particle(x, y, xVel, yVel, size, color, true)
      );
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
    let opacity = 1;
    for (let a = 0; a < this.particleArray.length; a++) {
      for (let b = a + 1; b < this.particleArray.length; b++) {
        const dist = distance(this.particleArray[a], this.particleArray[b]);
        if (dist < 150) {
          opacity = 1 - dist / 150;
          ctx.strokeStyle = "rgba(123, 85, 48," + opacity + ")";
          ctx.lineWidth = 0.3;
          ctx.beginPath();
          ctx.moveTo(this.particleArray[a].x, this.particleArray[a].y);
          ctx.lineTo(this.particleArray[b].x, this.particleArray[b].y);
          ctx.stroke();
        }
      }
    }
  }
}
class Particle {
  constructor(x, y, xVel, yVel, size, color, twinkle) {
    this.x = x;
    this.y = y;
    this.xVel = xVel;
    this.yVel = yVel;
    this.baseSize = size;
    this.size = size;
    this.color = color;
    this.twinkle = twinkle ? 0.02 : 0;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.shadowBlur = 8;
    ctx.shadowColor = "white";
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  animate(canvas, state, ctx) {
    if (this.x > canvas.width || this.x < 0) {
      this.x = this.x < 0 ? 0 : canvas.width;
      this.xVel = -this.xVel;
    }
    if (this.y > canvas.height || this.y < 0) {
      this.y = this.y < 0 ? 0 : canvas.height;
      this.yVel = -this.yVel;
    }

    if (this.twinkle) {
      if (this.size > this.baseSize || this.size < 1) {
        this.twinkle = -this.twinkle;
      }
      this.size += this.twinkle;
    }
    const dist = distance(state.mouse, this);

    if (dist < state.mouse.radius) {
      this.x += Math.sign(this.x - state.mouse.x) * 5;
      this.y += Math.sign(this.y - state.mouse.y) * 5;
      this.xVel = -this.xVel;
      this.yVel = -this.yVel;
    }
    this.x += this.xVel;
    this.y += this.yVel;
    this.draw(ctx);
  }
}
