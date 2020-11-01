import { distance } from "../../../util/visualizer_util";
import { Particle } from "./particle";
export class ConnectedFloatingDotsVisualizer {
  constructor(canvas) {
    this.particleArray = [];
    for (let i = 0; i < 150; i++) {
      let size = Math.random() * 3 + 1;
      let x = Math.random() * canvas.width;
      let y = Math.random() * canvas.height;
      let xVel = Math.random() * 0.15;
      let yVel = Math.random() * 0.15;
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
