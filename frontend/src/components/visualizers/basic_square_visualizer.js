export const defaultSquareSettings = {
  type: "square",
  typeSettings: { binCount: 1024},
  generalSettings: {
    heightAmplifier: 50
  }
}

export class SquareVisualizer {
  animate(canvas, state) {
    let width = canvas.width;
    let height = canvas.height
  
    let squareSide = Math.floor(Math.sqrt(width * height / state.binCount * 3));  
  
    let numRows = Math.floor(height / squareSide)
    let numCols = Math.floor(width / squareSide)
  
    let amp = 0.05 *  state.generalSettings.heightAmplifier;
  
    const ctx = canvas.getContext("2d");
  
    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols; col++) {
        let upperLeftX = col * squareSide;
        let upperLeftY = row * squareSide
        let r = (state.frequencyArray[row*numCols*3 + col] * amp) % 255
          || (state.frequencyArray[1023 - (row*numCols*3 + col)] * amp) % 255
          || (state.frequencyArray[Math.abs(512 - (row*numCols*3 + col))] * amp) % 255;
        let g = (state.frequencyArray[row*numCols*3 + col + 1] * amp) % 255
          || (state.frequencyArray[1023 - (row*numCols*3 + col + 1)] * amp) % 255
          || (state.frequencyArray[Math.abs(512 - (row*numCols*3 + col + 1))] * amp) % 255;
        let b = (state.frequencyArray[row*numCols*3 + + col + 2] * amp) % 255
          || (state.frequencyArray[1023 - (row*numCols*3 + col + 2)] * amp) % 255
          || (state.frequencyArray[Math.abs(512 - (row*numCols*3 + col + 2))] * amp) % 255;
  
        if (r + g + b > 100) {
          ctx.fillStyle = `rgb(
                ${r}, 
                ${g},
                ${b})`;
          ctx.fillRect(upperLeftX, upperLeftY, squareSide, squareSide);
        }
      }
    }
  }
}