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

export const detectPitch = function (array) {
  const notes = [
    "A",
    "As",
    "B",
    "C",
    "Cs",
    "D",
    "Ds",
    "E",
    "F",
    "Fs",
    "G",
    "Gs",
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

export const noteColorMap = {
  A: [255, 99, 0],
  As: [255, 236, 0],
  B: [153, 255, 0],
  C: [40, 255, 0],
  Cs: [0, 255, 232],
  D: [0, 124, 255],
  Ds: [5, 0, 255],
  E: [69, 0, 234],
  F: [87, 0, 158],
  Fs: [166, 0, 0],
  G: [179, 0, 0],
  Gs: [238, 0, 0],
};

export const pitchColor = function (pitchArray) {
  const color = [0, 0, 0];
  for (const pitch of pitchArray) {
    // debugger;
    // console.log(pitch);
    color[0] += noteColorMap[pitch][0];
    color[1] += noteColorMap[pitch][1];
    color[2] += noteColorMap[pitch][2];
  }

  color[0] = Math.floor(color[0] / pitchArray.length);
  color[1] = Math.floor(color[1] / pitchArray.length);
  color[2] = Math.floor(color[2] / pitchArray.length);
  return color;
};

export const detectPitchColor = function (array) {
  const octaveArray = octave(array);
  const pitch = detectPitch(octaveArray);
  console.log("incolor" + pitch.notes);
  return pitchColor(pitch.notes);
};

export const distance = function (objectA, objectB) {
  const dx = objectA.x - objectB.x;
  const dy = objectA.y - objectB.y;
  return Math.sqrt(dx * dx + dy * dy);
};


