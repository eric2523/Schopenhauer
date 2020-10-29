export class frequencyVisualizer {
  constructor(props) {
    debugger;
    this.settings = {
      radians: (2 * Math.PI) / props.binCount,
    };
  }

  animate(canvas, state) {
    debugger;
    const ctx = canvas.getContext("2d");

    for (let i = 0; i < state.binCount; i++) {
      let height =
        state.waveformArray[i] * state.visualizerSettings.heightAmplifier;
      const xStart =
        state.visualizerSettings.centerX +
        Math.cos(this.settings.radians * i) * state.visualizerSettings.radius;
      const yStart =
        state.visualizerSettings.centerY +
        Math.sin(this.settings.radians * i) * state.visualizerSettings.radius;
      const xEnd =
        state.visualizerSettings.centerX +
        Math.cos(this.settings.radians * i) *
          (state.visualizerSettings.radius + height);
      const yEnd =
        state.visualizerSettings.centerY +
        Math.sin(this.settings.radians * i) *
          (state.visualizerSettings.radius + height);
      debugger;
      this.drawBar(
        xStart,
        yStart,
        xEnd,
        yEnd,
        state.waveformArray[i],
        ctx,
        canvas,
        state.visualizerSettings
      );
    }
  }

  drawBar(
    xStart,
    yStart,
    xEnd,
    yEnd,
    frequencyAmplitude,
    ctx,
    canvas,
    visualizerSettings
  ) {
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, "rgba(35, 7, 77, 1)");
    gradient.addColorStop(1, "rgba(204, 83, 51, 1)");
    ctx.fillStyle = gradient;

    const lineColor =
      "rgb(" +
      frequencyAmplitude +
      ", " +
      frequencyAmplitude +
      ", " +
      205 +
      ")";
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = visualizerSettings.barWidth;
    ctx.beginPath();
    ctx.moveTo(xStart, yStart);
    ctx.lineTo(xEnd, yEnd);
    ctx.stroke();
  }
}

// function animation(canvas, state) {
//   debugger;
//   // canvas.width = state.visualizerSettings.width;
//   // canvas.height = state.visualizerSettings.height;
//   const ctx = canvas.getContext("2d");

//   for (let i = 0; i < state.freqCount; i++) {
//     let height =
//       state.frequencyArray[i] * state.visualizerSettings.heightAmplifier;

//     const xStart =
//       state.visualizerSettings.centerX +
//       Math.cos(this.settings.radians * i) * state.visualizerSettings.radius;
//     const yStart =
//       state.visualizerSettings.centerY +
//       Math.sin(this.settings.radians * i) * state.visualizerSettings.radius;
//     const xEnd =
//       state.visualizerSettings.centerX +
//       Math.cos(this.settings.radians * i) * (state.visualizerSettings.radius + height);
//     const yEnd =
//       state.visualizerSettings.centerY +
//       Math.sin(this.settings.radians * i) * (state.visualizerSettings.radius + height);

//     drawBar(
//       xStart,
//       yStart,
//       xEnd,
//       yEnd,
//       state.frequencyArray[i],
//       ctx,
//       canvas,
//       state.visualizerSettings
//     );

//     drawBeatInCircle(ctx, state.visualizerSettings, state);
//   }
// }

// function drawBeatInCircle(ctx, state.visualizerSettings, state) {
//   const beatRadius;
//   if (state.beatDetection.detected) {
//     beatRadius = 100;
//   } else {
//     beatRadius *= 0.9;
//   }
//   ctx.beginPath();
//   ctx.ellipse(
//     state.visualizerSettings.width / 2,
//     state.visualizerSettings.height / 2,
//     beatRadius,
//     beatRadius,
//     0,
//     0,
//     Math.PI * 2
//   );
//   ctx.stroke();
// }

// function drawBar(
//   xStart,
//   yStart,
//   xEnd,
//   yEnd,
//   frequencyAmplitude,
//   ctx,
//   canvas,
//   state.visualizerSettings
// ) {
//   const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
//   gradient.addColorStop(0, "rgba(35, 7, 77, 1)");
//   gradient.addColorStop(1, "rgba(204, 83, 51, 1)");
//   ctx.fillStyle = gradient;

//   const lineColor =
//     "rgb(" + frequencyAmplitude + ", " + frequencyAmplitude + ", " + 205 + ")";
//   ctx.strokeStyle = lineColor;
//   ctx.lineWidth = state.visualizerSettings.barWidth;
//   ctx.beginPath();
//   ctx.moveTo(xStart, yStart);
//   ctx.lineTo(xEnd, yEnd);
//   ctx.stroke();
// }

// drawOctaves(xStart, yStart, xEnd, yEnd, frequencyAmplitude, ctx, canvas) {
//   const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
//   gradient.addColorStop(0, "rgba(35, 7, 77, 1)");
//   gradient.addColorStop(1, "rgba(204, 83, 51, 1)");
//   ctx.fillStyle = gradient;

//   const lineColor =
//     "rgb(" +
//     frequencyAmplitude +
//     ", " +
//     frequencyAmplitude +
//     ", " +
//     205 +
//     ")";
//   ctx.strokeStyle = lineColor;
//   ctx.lineWidth = barWidth;
//   ctx.beginPath();
//   ctx.moveTo(xStart, yStart);
//   ctx.lineTo(xEnd, yEnd);
//   ctx.stroke();
// }
// export default animation;
