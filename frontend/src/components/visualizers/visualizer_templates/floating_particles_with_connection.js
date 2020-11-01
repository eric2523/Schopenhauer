import {
  detectPitchColor,
  distance,
  pitchColor,
} from "../../../util/visualizer_util";
import { Particle } from "./particle";
export class ConnectedFloatingDotsVisualizer {
  constructor(canvas) {
    this.particleArray = [];
    this.scaleConstant = (1 / 1757548) * canvas.width * canvas.height;
    this.repulseRadius = 100 * this.scaleConstant;
    this.influenceRadius = 110 * this.scaleConstant;
    const velScale = 0.3 * this.scaleConstant;
    for (let i = 0; i < 150 * this.scaleConstant; i++) {
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
      if (!state.play) {
        particle.color = "white";
        particle.dancing = false;
      }
      const dist = distance(state.mouse, particle);
      if (state.beatDetection.detected) {
        if (dist < this.influenceRadius) {
          particle.dancing = true;
        }
      }
      if (dist < this.repulseRadius) {
        particle.x += Math.sign(particle.x - state.mouse.x) * 5;
        particle.y += Math.sign(particle.y - state.mouse.y) * 5;
        particle.xVel = -particle.xVel;
        particle.yVel = -particle.yVel;
      }

      particle.animate(canvas, ctx, state);
    }
    this.interact(ctx, 150 * this.scaleConstant, 50 * this.scaleConstant);
  };

  interact(ctx, connectDist, danceDist, syncDist) {
    let opacity = 1;
    for (let a = 0; a < this.particleArray.length; a++) {
      for (let b = a + 1; b < this.particleArray.length; b++) {
        const dist = distance(this.particleArray[a], this.particleArray[b]);
        opacity = 1 - dist / connectDist;
        ctx.strokeStyle = "rgba(123, 85, 48," + opacity + ")";
        ctx.shadowColor = "white";
        if (dist < danceDist) {
          if (this.particleArray[a].dancing || this.particleArray[b].dancing) {
            const pitchColor = this.particleArray[a].dancing
              ? this.particleArray[a].color
              : this.particleArray[b].color;
            ctx.shadowColor = pitchColor;
            ctx.strokeStyle = pitchColor;
            // setTimeout(() => {
            //   this.particleArray[a].dancing = true;
            //   this.particleArray[b].dancing = true;
            // }, 0);
            this.particleArray[a].dancing = true;
            this.particleArray[b].dancing = true;
          }
        }
        if (dist < connectDist) {
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
