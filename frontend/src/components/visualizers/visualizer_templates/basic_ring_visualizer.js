export const defaultRingSettings = {
  type: "ring",
  typeSettings: { binCount: 1024},
  generalSettings: {
    redFactor: 1,
    greenFactor: 0,
    blueFactor: 0,
    outerRadius: 0,
    radiusMultiplier: 0
  }
}

export class RingVisualizer {
  animate(canvas, state) {
    let width = canvas.width;
    let height = canvas.height; 
    let centerX = canvas.width / 2;
    let centerY = canvas.height / 2;

    let {redFactor, greenFactor, blueFactor, outerRadius, radiusMultiplier} = state.generalSettings;

    // adjustable in theory : width, height, centerX, centerY
    // color, outerRadius, radiusMultiplier

    const dTheta = (Math.PI * 2) / state.typeSettings.binCount;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, width, height);
    ctx.strokeStyle = "red";

    for (let k = 0; k < state.typeSettings.binCount; k++) {
      let theta = k * dTheta;
      let r = (0.01 * radiusMultiplier + 1) * state.waveformArray[k];
      let circleX = centerX + (outerRadius*2 + 300) * Math.cos(theta);
      let circleY = centerY + (outerRadius*2 + 300) * Math.sin(theta);
      let startX = circleX + r * Math.cos(theta + Math.PI);
      let startY = circleY + r * Math.sin(theta + Math.PI); 
      ctx.beginPath();
      ctx.strokeStyle = `rgb(${r * redFactor},${r * greenFactor}, ${r * blueFactor})`;
      ctx.moveTo(startX, startY);
      ctx.lineTo(circleX, circleY);
      ctx.closePath();
      ctx.stroke();
    }
  }
}