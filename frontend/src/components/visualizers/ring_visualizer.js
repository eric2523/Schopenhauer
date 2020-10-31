export const defaultRingSettings = {
  type: "ring",
  typeSettings: { binCount: 1024},
  generalSettings: {
    heightAmplifier: 50
  }
}

export class SquareVisualizer {
  animate(canvas, state) {
    let width = canvas.width;
    let height = canvas.height;
    let centerX = canvas.width / 2;
    let centerY = canvas.height / 2;
    
    // adjustable : width, height, centerX, centerY
    // : outerRadius
    let outerRadius = 300;


    const dTheta = (Math.PI * 2) / state.typeSettings.binCount;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, width, height);

    for (let k = 0; k < state.typeSettings.binCount; k++) {
      let theta = k * dTheta;
      let r = state.waveformArray[k];


    }

  }
}


//     for (let i = 0; i < state.binCount; i++) {
//       let height =
//         state.waveformArray[i] * state.generalSettings.heightAmplifier;
//       const xStart =
//         (canvas.width / 2) +
//         Math.cos(radians * i) * state.generalSettings.radius;
//       const yStart =
//         (canvas.height / 2) +
//         Math.sin(radians * i) * state.generalSettings.radius;
//       const xEnd =
//         (canvas.width / 2) +
//         Math.cos(radians * i) * (state.generalSettings.radius + height);
//       const yEnd =
//         (canvas.height / 2) +
//         Math.sin(radians * i) * (state.generalSettings.radius + height);
//       this.drawBar(
//         xStart,
//         yStart,
//         xEnd,
//         yEnd,
//         state.waveformArray[i],
//         ctx,
//         canvas,
//         state.generalSettings
//       );
//     }
//   }

//   drawBar(
//     xStart,
//     yStart,
//     xEnd,
//     yEnd,
//     frequencyAmplitude,
//     ctx,
//     canvas,
//     typeSettings
//   ) {
//     const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
//     gradient.addColorStop(0, "rgba(35, 7, 77, 1)");
//     gradient.addColorStop(1, "rgba(204, 83, 51, 1)");
//     ctx.fillStyle = gradient;

//     const lineColor =
//       "rgb(" +
//       frequencyAmplitude +
//       ", " +
//       frequencyAmplitude +
//       ", " +
//       205 +
//       ")";
//     ctx.strokeStyle = lineColor;
//     ctx.lineWidth = typeSettings.barWidth;
//     ctx.beginPath();
//     ctx.moveTo(xStart, yStart);
//     ctx.lineTo(xEnd, yEnd);
//     ctx.stroke();
//   }
// }
