export const defaultFrequencySettings = Object.freeze({
  type: "frequency",
  typeSettings: Object.freeze({ binCount: 1024 }),
  generalSettings: Object.freeze({
    //for any bar
    barWidth: 1,
    //for any circular object
    radius: 0,
    // finished controls
    heightAmplifier: 0.5,
    color: "blue",
  }),
});

export class FrequencyVisualizer {
  animate(canvas, state) {
    const radians = (Math.PI * 2) / state.typeSettings.binCount;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < state.binCount; i++) {
      let height =
        state.waveformArray[i] * state.generalSettings.heightAmplifier;
      const xStart =
        canvas.width / 2 + Math.cos(radians * i) * state.generalSettings.radius;
      const yStart =
        canvas.height / 2 +
        Math.sin(radians * i) * state.generalSettings.radius;
      const xEnd =
        canvas.width / 2 +
        Math.cos(radians * i) * (state.generalSettings.radius + height);
      const yEnd =
        canvas.height / 2 +
        Math.sin(radians * i) * (state.generalSettings.radius + height);
      this.drawBar(xStart, yStart, xEnd, yEnd, ctx, state.generalSettings);
    }
  }

  drawBar(xStart, yStart, xEnd, yEnd, ctx, generalSettings) {
    ctx.strokeStyle = generalSettings.color;

    ctx.lineWidth = generalSettings.barWidth;
    ctx.beginPath();
    ctx.moveTo(xStart, yStart);
    ctx.lineTo(xEnd, yEnd);
    ctx.stroke();
  }
}
