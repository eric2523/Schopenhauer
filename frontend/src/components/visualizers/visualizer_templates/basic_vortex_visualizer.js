export const defaultVortexSettings = Object.freeze({
  type: "vortex",
  typeSettings: Object.freeze({ binCount: 1024 }),
  generalSettings: Object.freeze({
    bandWidth: 1,
    outerRadius: 0
  }),
});

export class VortexVisualizer {
  animate(canvas, state) {

    let width = canvas.width;
    let height = canvas.height;
    let centerX = canvas.width / 2;
    let centerY = canvas.height / 2;
    let {bandWidth, color, outerRadius} = state.generalSettings;
    let radius = outerRadius + 200;
    let h = hexToHSL(String(color))[0];
    let dr = radius / 1024;
    console.log();

    
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, width, height);
    ctx.lineWidth = dr;
    for (let numCircle = 0; numCircle < 1024; numCircle++) {
      let adjusted = bandWidth * Math.floor(numCircle / bandWidth);
      ctx.strokeStyle = `hsl(${h}, ${100 * (255-state.waveformArray[adjusted] )/ 255}%, ${100 * (255-state.waveformArray[adjusted]) / 255}%)`;
      ctx.beginPath();
      ctx.arc(centerX, centerY, numCircle*dr, 0, 2*Math.PI);
      ctx.lineWidth = radius/1024;
      ctx.closePath();
      ctx.stroke();
    }

  }
}


// From CSS tricks : hex to HSL converter
function hexToHSL(H) {
  // Convert hex to RGB first
  let r = 0, g = 0, b = 0;
  if (H.length == 4) {
    r = "0x" + H[1] + H[1];
    g = "0x" + H[2] + H[2];
    b = "0x" + H[3] + H[3];
  } else if (H.length == 7) {
    r = "0x" + H[1] + H[2];
    g = "0x" + H[3] + H[4];
    b = "0x" + H[5] + H[6];
  }
  // Then to HSL
  r /= 255;
  g /= 255;
  b /= 255;
  let cmin = Math.min(r,g,b),
      cmax = Math.max(r,g,b),
      delta = cmax - cmin,
      h = 0,
      s = 0,
      l = 0;

  if (delta == 0)
    h = 0;
  else if (cmax == r)
    h = ((g - b) / delta) % 6;
  else if (cmax == g)
    h = (b - r) / delta + 2;
  else
    h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  if (h < 0)
    h += 360;

  l = (cmax + cmin) / 2;
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return [h, s, l];
}

function distance(x1, y1, x2, y2) {
  return Math.sqrt((x1 - x2)**2 + (y1-y2)**2);
}