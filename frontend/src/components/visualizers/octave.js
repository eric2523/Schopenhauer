import { getFrequencyAmp } from "../../util/visualizer_util";

export const octave = (frequencyArray, context) => {
  const fmin = 27.5;
  let freq = fmin;
  const nyquist = context ? context.sampleRate / 2 : 48000 / 2;
  const octaveSteps = 12;
  const octaveAmp = new Array(octaveSteps).fill(0);
  let i = 0;
  while (freq < nyquist) {
    freq = Math.pow(2, i / octaveSteps) * fmin;
    octaveAmp[i % octaveSteps] +=
      getFrequencyAmp(freq, frequencyArray, nyquist) / 50;
    i++;
  }

  return octaveAmp;
};
