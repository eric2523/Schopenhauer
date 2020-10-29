function animation(canvas, state) {

  let cD = state.visualizerSettings;
  canvas.width = cD.width;
  canvas.height = cD.height;

  let squareSide = Math.floor(Math.sqrt(cD.width * cD.height / state.freqCount * 3));  

  let numRows = Math.floor(cD.height / squareSide)
  let numCols = Math.floor(cD.width / squareSide)

  let amp = 1 * state.visualizerSettings.heightAmplifier;

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

      ctx.fillStyle = `rgb(
            ${r},
            ${g},
            ${b})`;
      ctx.fillRect(upperLeftX, upperLeftY, squareSide, squareSide);
    }
  }
}

export default animation;