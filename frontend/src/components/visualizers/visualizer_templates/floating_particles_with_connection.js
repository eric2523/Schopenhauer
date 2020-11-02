import { detectPitchColor, distance } from "../../../util/visualizer_util";
import { Particle } from "../element_templates/particle";

export class ConnectedFloatingDotsVisualizer {
  constructor(canvas) {
    this.particleArray = [];
    this.scaleConstant = (1 / 1757548) * canvas.width * canvas.height;
    this.repulseRadius = Math.max(100 * this.scaleConstant, 30);
    this.influenceRadius = Math.max(110 * this.scaleConstant, 40);
    const velScale = 0.3 * this.scaleConstant;
    const numParticles = Math.min(150 * this.scaleConstant, 200);
    for (let i = 0; i < numParticles; i++) {
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
      if (!state.play) {
        particle.dancing = false;
        if (dist < this.repulseRadius) {
          particle.x += Math.sign(particle.x - state.mouse.x) * 5;
          particle.y += Math.sign(particle.y - state.mouse.y) * 5;
          particle.xVel = -particle.xVel;
          particle.yVel = -particle.yVel;
        }
      } else {
        if (dist < this.influenceRadius) {
          if (state.beatDetection.detected) {
            particle.dancing = true;
          }
          const opacity = 1 - (dist / this.influenceRadius) * 0.5;
          const pitchColor = detectPitchColor(state.frequencyArray).join(",");
          this.color = `rgba(${pitchColor}, ${opacity})`;
          ctx.strokeStyle = this.color;
          ctx.shadowBlur = 10;
          this.connect(state.mouse, particle, ctx);
        }
      }

      particle.animate(canvas, ctx, state);
    }
    this.interact(ctx, 150, Math.max(50 * this.scaleConstant, 50));
  };

  interact(ctx, connectDist, danceDist, syncDist) {
    for (let a = 0; a < this.particleArray.length; a++) {
      for (let b = a + 1; b < this.particleArray.length; b++) {
        const dist = distance(this.particleArray[a], this.particleArray[b]);
        const opacity = 1 - dist / connectDist;
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
          this.connect(this.particleArray[a], this.particleArray[b], ctx);
        }

        if (dist < syncDist) {
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

  connect(objectA, objectB, ctx) {
    ctx.lineWidth = 0.3;
    ctx.beginPath();
    ctx.moveTo(objectA.x, objectA.y);
    ctx.lineTo(objectB.x, objectB.y);
    ctx.stroke();
  }
}
