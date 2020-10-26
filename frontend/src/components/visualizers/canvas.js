import React from "react";
import song from "../../audio_files/bensound-goinghigher.mp3";

const width = window.innerWidth;
const height = window.innerHeight;
const barWidth = 1;
const radius = 0;
const centerX = width / 2;
const centerY = height / 2;
const heightAmplifier = 2;

export class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.audio = new Audio(song);
    this.togglePlay = this.togglePlay.bind(this);
    this.canvas = React.createRef();
  }

  componentDidMount() {
    this.context = new (window.AudioContext || window.webkitAudioContext)();
    this.source = this.context.createMediaElementSource(this.audio);
    this.analyser = this.context.createAnalyser();
    this.source.connect(this.analyser);
    this.analyser.connect(this.context.destination);
    this.frequencyArray = new Uint8Array(this.analyser.frequencyBinCount);
    this.freqCount = this.frequencyArray.length;
    this.radians = (2 * Math.PI) / this.freqCount;
  }

  togglePlay() {
    if (this.audio.paused) {
      this.audio.play();
      this.rafId = requestAnimationFrame(this.tick);
    } else {
      this.audio.pause();
      cancelAnimationFrame(this.rafId);
    }
  }

  animation(canvas) {
    canvas.width = width;
    canvas.height = height;
    this.ctx = canvas.getContext("2d");
    for (let i = 0; i < this.freqCount; i++) {
      let height = this.frequencyArray[i] * heightAmplifier;

      const xStart = centerX + Math.cos(this.radians * i) * radius;
      const yStart = centerY + Math.sin(this.radians * i) * radius;
      const xEnd = centerX + Math.cos(this.radians * i) * (radius + height);
      const yEnd = centerY + Math.sin(this.radians * i) * (radius + height);

      this.drawBar(
        xStart,
        yStart,
        xEnd,
        yEnd,
        this.frequencyArray[i],
        this.ctx,
        canvas
      );
    }
  }

  drawBar(xStart, yStart, xEnd, yEnd, frequencyAmplitude, ctx, canvas) {
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, "rgba(35, 7, 77, 1)");
    gradient.addColorStop(1, "rgba(204, 83, 51, 1)");
    ctx.fillStyle = gradient;

    const lineColor =
      "rgb(" +
      frequencyAmplitude +
      ", " +
      frequencyAmplitude +
      ", " +
      205 +
      ")";
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = barWidth;
    ctx.beginPath();
    ctx.moveTo(xStart, yStart);
    ctx.lineTo(xEnd, yEnd);
    ctx.stroke();
  }

  tick = () => {
    this.animation(this.canvas.current);
    this.analyser.getByteTimeDomainData(this.frequencyArray);
    this.rafId = requestAnimationFrame(this.tick);
  };

  render() {
    const buttonText = this.audio.paused ? "Play" : "Pause";
    return (
      <div>
        <canvas ref={this.canvas} />
        <button onClick={this.togglePlay}>{buttonText}</button>
      </div>
    );
  }
}
