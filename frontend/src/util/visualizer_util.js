export const getFrequencyAmp = function (frequency, frequencyArray, nyquist) {
  const index = Math.round((frequency / nyquist) * frequencyArray.length);
  return frequencyArray[index] ?? 0;
};

// frequency of A0

export const sumArray = function (array) {
  return array.reduce((acc, amp) => acc + amp);
};

export const averageArray = function (array) {
  return sumArray(array) / array.length;
};

export const stdevArray = function (array) {
  const avg = averageArray(array);
  const sqResiduals = array.map((el) => (el - avg) ** 2);
  return Math.sqrt(averageArray(sqResiduals));
};

export const parseVisualizerSettings = function (visualizerSettings) {
  let parsedSettings = Object.assign({}, visualizerSettings);
  parsedSettings.globalSettings = JSON.parse(visualizerSettings.globalSettings)
  parsedSettings.typeSettings = JSON.parse(visualizerSettings.typeSettings);

  return parsedSettings;
}

export const detectPitch = function (array) {
  const notes = [
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
  const pitch = { notes: [], strength: "none" };
  const std = stdevArray(array);
  const avg = averageArray(array);
  for (let i = 2; i >= 0; i--) {
    if (pitch.notes.length > 0) return pitch;

    array.forEach((note, index) => {
      if (note > avg + i * std) {
        pitch.notes.push(notes[index]);
        switch (i) {
          case 1:
            pitch.strength = "weak";
            break;
          case 2:
            pitch.strength = "strong";
            break;
          default:
            break;
        }
      }
    });
  }

  return pitch;
};
