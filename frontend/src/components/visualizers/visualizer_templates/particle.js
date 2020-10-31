import { distance } from "../../../util/visualizer_util";

export class Particle {
  constructor(x, y, xVel, yVel, size, color, twinkle) {
    this.x = x;
    this.y = y;
    this.xVel = xVel;
    this.yVel = yVel;
    this.baseSize = size;
    this.color = color;
    if (twinkle) {
      this.twinkle = this.baseSize / 140;
      this.size = Math.random() * (size - 1) + 1;
    } else {
      this.twinkle = 0;
      this.size = size;
    }
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