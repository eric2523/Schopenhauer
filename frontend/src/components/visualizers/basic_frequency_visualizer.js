export class frequencyVisualizer {
  constructor(props) {
    this.settings = props;
  }

  animate(canvas, state) {
    const radians = (Math.PI * 2) / state.visualizerSettings.binCount;
    const ctx = canvas.getContext("2d");

    for (let i = 0; i < state.binCount; i++) {
      let height =
        state.waveformArray[i] * state.globalSettings.heightAmplifier;
      const xStart =
        state.globalSettings.centerX +
        Math.cos(radians * i) * state.globalSettings.radius;
      const yStart =
        state.globalSettings.centerY +
        Math.sin(radians * i) * state.globalSettings.radius;
      const xEnd =
        state.globalSettings.centerX +
        Math.cos(radians * i) * (state.globalSettings.radius + height);
      const yEnd =
        state.globalSettings.centerY +
        Math.sin(radians * i) * (state.globalSettings.radius + height);
      this.drawBar(
        xStart,
        yStart,
        xEnd,
        yEnd,
        state.waveformArray[i],
        ctx,
        canvas,
        state.globalSettings
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
//   ;
//   // canvas.width = state.globalSettings.width;
//   // canvas.height = state.globalSettings.height;
//   const ctx = canvas.getContext("2d");

//   for (let i = 0; i < state.freqCount; i++) {
//     let height =
//       state.frequencyArray[i] * state.globalSettings.heightAmplifier;

//     const xStart =
//       state.globalSettings.centerX +
//       Math.cos(radians * i) * state.globalSettings.radius;
//     const yStart =
//       state.globalSettings.centerY +
//       Math.sin(radians * i) * state.globalSettings.radius;
//     const xEnd =
//       state.globalSettings.centerX +
//       Math.cos(radians * i) * (state.globalSettings.radius + height);
//     const yEnd =
//       state.globalSettings.centerY +
//       Math.sin(radians * i) * (state.globalSettings.radius + height);

//     drawBar(
//       xStart,
//       yStart,
//       xEnd,
//       yEnd,
//       state.frequencyArray[i],
//       ctx,
//       canvas,
//       state.globalSettings
//     );

//     drawBeatInCircle(ctx, state.globalSettings, state);
//   }
// }

// function drawBeatInCircle(ctx, state.globalSettings, state) {
//   const beatRadius;
//   if (state.beatDetection.detected) {
//     beatRadius = 100;
//   } else {
//     beatRadius *= 0.9;
//   }
//   ctx.beginPath();
//   ctx.ellipse(
//     state.globalSettings.width / 2,
//     state.globalSettings.height / 2,
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
//   state.globalSettings
// ) {
//   const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
//   gradient.addColorStop(0, "rgba(35, 7, 77, 1)");
//   gradient.addColorStop(1, "rgba(204, 83, 51, 1)");
//   ctx.fillStyle = gradient;

//   const lineColor =
//     "rgb(" + frequencyAmplitude + ", " + frequencyAmplitude + ", " + 205 + ")";
//   ctx.strokeStyle = lineColor;
//   ctx.lineWidth = state.globalSettings.barWidth;
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
