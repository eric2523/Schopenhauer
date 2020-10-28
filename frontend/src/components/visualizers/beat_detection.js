// Track a threshold volume level.
// If the current volume exceeds the threshold then you have a beat. Set the new threshold to the current volume.
// Reduce the threshold over time, using the Decay Rate.
// Wait for the Hold Time before detecting for the next beat. This can help reduce false positives.
// Inspired by p5 sound library and Felix Turner

export class BeatDetection {
  constructor(
    minThreshold = 15,
    dynamicThresholdMultiplier = 1.5,
    decayRate = 0.95,
    framesGap = 30
  ) {
    this.framesGap = framesGap;
    this.framesSinceLastPeak = 0;
    this.minThreshold = minThreshold;
    this.dynamicThreshold = minThreshold;
    this.dynamicThresholdMultiplier = dynamicThresholdMultiplier;
    this.decayRate = decayRate;

    this.currentAmp = 0;
    this.prevAmp = 0;

    this.detected = false;
  }

  update(frequencyArray) {
    const averageAmp =
      frequencyArray.reduce((acc, amp) => acc + amp) / frequencyArray.length;

    this.currentAmp = averageAmp;
    if (averageAmp > this.dynamicThreshold && averageAmp - this.prevAmp > 0) {
      this.framesSinceLastPeak = 0;
      this.dynamicThreshold = averageAmp * this.dynamicThresholdMultiplier;
      this.detected = true;
    } else {
      this.detected = false;
      if (this.framesSinceLastPeak <= this.framesGap) {
        this.framesSinceLastPeak++;
      } else {
        this.dynamicThreshold *= this.decayRate;
        this.dynamicThreshold = Math.max(
          this.dynamicThreshold,
          this.minThreshold
        );
      }
    }

    this.prevAmp = averageAmp;
  }
}
