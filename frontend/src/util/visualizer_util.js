export const getFrequencyAmp = (frequency, frequencyArray, nyquist) => {
  const index = Math.round((frequency / nyquist) * frequencyArray.length);
  return frequencyArray[index] ?? 0;
};

// frequency of A0
export const notes = [
  "A",
  "A#",
  "B",
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
];
