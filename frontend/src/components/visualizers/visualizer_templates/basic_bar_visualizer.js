export const defaultBarsSettings = Object.freeze({
  type: "bars",
  typeSettings: Object.freeze({ binCount: 1024 }),
  generalSettings: Object.freeze({
    //for any bar
    barWidth: 10,
    //for any circular object
    radius: 0,
    // finished controls
    heightAmplifier: 0.5,
  }),
});

export class BarVisualizer {
  animate(canvas, state) {
    const ctx = canvas.getContext("2d");
    let waveformArray = state.frequencyArray;
    let barWidth = state.generalSettings.barWidth;
    // const colors = ["red", "blue", "green"];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < canvas.width; i += 15) {

      let color = state.generalSettings.color
      const barHeight =
        -waveformArray[i] * state.generalSettings.heightAmplifier;
      const xStart = i * 3;
      const yStart = canvas.height / 2;
      this.createBlocks(ctx, barHeight, xStart, yStart, barWidth, color);
    }
  }

  createBlocks(ctx, barHeight, xStart, yStart, barWidth, color) {
    const randColor = color;
    ctx.fillStyle = randColor;
    ctx.fillRect(xStart, yStart, barWidth, barHeight);
    ctx.fill();
  }
}
