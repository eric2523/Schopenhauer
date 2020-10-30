export const defaultFrequencySettings = {
  type: "frequency",
  typeSettings: { binCount: 1024 },
  generalSettings: {
    //for canvas settings

    // maybe we shouldnt let users change this. gonna mess up the center positioning of visualizer 
    // centerX: 350,
    // centerY: 350,

    //for any bar
    barWidth: 1,

    //for any circular object
    radius: 0,

    // finished controls
    heightAmplifier: 0.5,
  },
};

export class FrequencyVisualizer {
  animate(canvas, state) {
    const radians = (Math.PI * 2) / state.typeSettings.binCount;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < state.binCount; i++) {
      let height =
        state.waveformArray[i] * state.generalSettings.heightAmplifier;
      const xStart =
        (canvas.width / 2) +
        Math.cos(radians * i) * state.generalSettings.radius;
      const yStart =
        (canvas.height / 2) +
        Math.sin(radians * i) * state.generalSettings.radius;
      const xEnd =
        (canvas.width / 2) +
        Math.cos(radians * i) * (state.generalSettings.radius + height);
      const yEnd =
        (canvas.height / 2) +
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
