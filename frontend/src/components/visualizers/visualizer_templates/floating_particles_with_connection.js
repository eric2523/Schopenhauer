import { distance } from "../../../util/visualizer_util";
import { Particle } from "./particle";
export class ConnectedFloatingDotsVisualizer {
  constructor(canvas) {
    const velScale = 0.3;
    this.particleArray = [];
    for (let i = 0; i < 150; i++) {
      let size = Math.random() * 3 + 1;
      let x = Math.random() * canvas.width;
      let y = Math.random() * canvas.height;

      let xVel = Math.random() * velScale - velScale / 2;
      let yVel = Math.random() * velScale - velScale / 2;
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
      const dist = distance(state.mouse, particle);
      if (dist < state.mouse.radius) {
        particle.x += Math.sign(particle.x - state.mouse.x) * 5;
        particle.y += Math.sign(particle.y - state.mouse.y) * 5;
        particle.xVel = -particle.xVel;
        particle.yVel = -particle.yVel;
      }

      particle.animate(canvas, ctx);
    }
    this.interact(ctx, 150, 150);
  };

  interact(ctx, connectDist, syncDist) {
    let opacity = 1;
    for (let a = 0; a < this.particleArray.length; a++) {
      for (let b = a + 1; b < this.particleArray.length; b++) {
        const dist = distance(this.particleArray[a], this.particleArray[b]);
        if (dist < connectDist) {
          opacity = 1 - dist / connectDist;
          ctx.strokeStyle = "rgba(123, 85, 48," + opacity + ")";
          ctx.lineWidth = 0.3;
          ctx.beginPath();
          ctx.moveTo(this.particleArray[a].x, this.particleArray[a].y);
          ctx.lineTo(this.particleArray[b].x, this.particleArray[b].y);
          ctx.stroke();
        }
        if (dist < syncDist) {
          // this.particleArray[b].size = this.particleArray[b].baseSize;
          // this.particleArray[a].size = this.particleArray[a].baseSize;
          this.particleArray[b].size =
            (this.particleArray[a].size / this.particleArray[a].baseSize) *
            this.particleArray[b].baseSize;
          this.particleArray[b].twinkle =
            Math.sign(this.particleArray[a].twinkle) *
            Math.abs(this.particleArray[b].twinkle);
        }
      }
    }
  }
}
