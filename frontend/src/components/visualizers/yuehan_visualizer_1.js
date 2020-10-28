function animation(canvas, canvasDimensions, state) {

  canvas.width = canvasDimensions.width;
  canvas.height = canvasDimensions.height;
  const ctx = canvas.getContext("2d");
  
  for (let i = 0; i < state.freqCount; i++) {
    let height =
      state.frequencyArray[i] *
      state.visualizerSettings.heightAmplifier;

    const xStart = canvasDimensions.centerX + Math.cos(state.radians * i) * canvasDimensions.radius;
    const yStart = canvasDimensions.centerY + Math.sin(state.radians * i) * canvasDimensions.radius;
    const xEnd =
      canvasDimensions.centerX + Math.cos(state.radians * i) * (canvasDimensions.radius + height);
    const yEnd =
      canvasDimensions.centerY + Math.sin(state.radians * i) * (canvasDimensions.radius + height);

    drawBar(
      xStart,
      yStart,
      xEnd,
      yEnd,
      state.frequencyArray[i],
      ctx,
      canvas,
      canvasDimensions
    );

    drawBeatInCircle(ctx, canvasDimensions, state);
  }
}

function drawBeatInCircle (ctx, canvasDimensions, state) {
  var beatRadius;
  if (state.beatDetection.detected) {
    beatRadius = 100;
  } else {
    beatRadius *= 0.9;
  }
  ctx.beginPath();
  ctx.ellipse(
    canvasDimensions.width / 2,
    canvasDimensions.height / 2,
    beatRadius,
    beatRadius,
    0,
    0,
    Math.PI * 2
  );
  ctx.stroke();
}

function drawBar(xStart, yStart, xEnd, yEnd, frequencyAmplitude, ctx, canvas, canvasDimensions) {
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
  ctx.lineWidth = canvasDimensions.barWidth;
  ctx.beginPath();
  ctx.moveTo(xStart, yStart);
  ctx.lineTo(xEnd, yEnd);
  ctx.stroke();
};

export default animation;