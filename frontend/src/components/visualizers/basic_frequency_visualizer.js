export class FrequencyVisualizer {
  animate(canvas, state) {
    const radians = (Math.PI * 2) / state.typeSettings.binCount;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < state.binCount; i++) {
      let height =
        state.waveformArray[i] * state.generalSettings.heightAmplifier;
      const xStart =
        state.generalSettings.centerX +
        Math.cos(radians * i) * state.generalSettings.radius;
      const yStart =
        state.generalSettings.centerY +
        Math.sin(radians * i) * state.generalSettings.radius;
      const xEnd =
        state.generalSettings.centerX +
        Math.cos(radians * i) * (state.generalSettings.radius + height);
      const yEnd =
        state.generalSettings.centerY +
        Math.sin(radians * i) * (state.generalSettings.radius + height);
      this.drawBar(
        xStart,
        yStart,
        xEnd,
        yEnd,
        state.waveformArray[i],
        ctx,
        canvas,
        state.generalSettings
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
    typeSettings
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
    ctx.lineWidth = typeSettings.barWidth;
    ctx.beginPath();
    ctx.moveTo(xStart, yStart);
    ctx.lineTo(xEnd, yEnd);
    ctx.stroke();
  }
}

// function animation(canvas, state) {
//   ;
//   // canvas.width = state.generalSettings.width;
//   // canvas.height = state.generalSettings.height;
//   const ctx = canvas.getContext("2d");

//   for (let i = 0; i < state.freqCount; i++) {
//     let height =
//       state.frequencyArray[i] * state.generalSettings.heightAmplifier;

//     const xStart =
//       state.generalSettings.centerX +
//       Math.cos(radians * i) * state.generalSettings.radius;
//     const yStart =
//       state.generalSettings.centerY +
//       Math.sin(radians * i) * state.generalSettings.radius;
//     const xEnd =
//       state.generalSettings.centerX +
//       Math.cos(radians * i) * (state.generalSettings.radius + height);
//     const yEnd =
//       state.generalSettings.centerY +
//       Math.sin(radians * i) * (state.generalSettings.radius + height);

//     drawBar(
//       xStart,
//       yStart,
//       xEnd,
//       yEnd,
//       state.frequencyArray[i],
//       ctx,
//       canvas,
//       state.generalSettings
//     );

//     drawBeatInCircle(ctx, state.generalSettings, state);
//   }
// }

// function drawBeatInCircle(ctx, state.generalSettings, state) {
//   const beatRadius;
//   if (state.beatDetection.detected) {
//     beatRadius = 100;
//   } else {
//     beatRadius *= 0.9;
//   }
//   ctx.beginPath();
//   ctx.ellipse(
//     state.generalSettings.width / 2,
//     state.generalSettings.height / 2,
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
//   state.generalSettings
// ) {
//   const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
//   gradient.addColorStop(0, "rgba(35, 7, 77, 1)");
//   gradient.addColorStop(1, "rgba(204, 83, 51, 1)");
//   ctx.fillStyle = gradient;

//   const lineColor =
//     "rgb(" + frequencyAmplitude + ", " + frequencyAmplitude + ", " + 205 + ")";
//   ctx.strokeStyle = lineColor;
//   ctx.lineWidth = state.generalSettings.barWidth;
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
