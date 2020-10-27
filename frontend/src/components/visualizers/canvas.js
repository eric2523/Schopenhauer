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
    this.state = {
      play: false,
      audio: new Audio(song),
      context: {},
      source: null,
      analyser: null,
      frequencyArray: [],
      freqCount: null,
      radians: null,
      rafId: null,
      canvas: React.createRef(),
    };
    this.togglePlay = this.togglePlay.bind(this);
  }

  togglePlay() {
    // checks if audio input is in (can change second conditional later to be more specific. Currently just a placeholder until I figure out a better flag )
    if (this.state.audio instanceof Audio && !this.state.source) {
      let context = new (window.AudioContext || window.webkitAudioContext)();
      let source = context.createMediaElementSource(this.state.audio);
      let analyser = context.createAnalyser();
      let frequencyArray = new Uint8Array(analyser.frequencyBinCount);
      let freqCount = frequencyArray.length;
      let radians = (2 * Math.PI) / freqCount;
      this.setState({
        context,
        source,
        analyser,
        frequencyArray,
        freqCount,
        radians,
      });
    }

    if (!this.state.play) {
      this.state.audio.play();
      let rafId = requestAnimationFrame(this.tick);
      this.setState({
        rafId,
        play: true,
      });
    } else {
      this.state.audio.pause();
      cancelAnimationFrame(this.state.rafId);
      this.setState({
        play: false,
      });
    }
  }

  animation(canvas) {
    canvas.width = width;
    canvas.height = height;
    this.state.ctx = canvas.getContext("2d");
    for (let i = 0; i < this.state.freqCount; i++) {
      let height = this.state.frequencyArray[i] * heightAmplifier;

      const xStart = centerX + Math.cos(this.state.radians * i) * radius;
      const yStart = centerY + Math.sin(this.state.radians * i) * radius;
      const xEnd =
        centerX + Math.cos(this.state.radians * i) * (radius + height);
      const yEnd =
        centerY + Math.sin(this.state.radians * i) * (radius + height);

      this.drawBar(
        xStart,
        yStart,
        xEnd,
        yEnd,
        this.state.frequencyArray[i],
        this.state.ctx,
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
    this.animation(this.state.canvas.current);
    this.state.analyser.getByteTimeDomainData(this.state.frequencyArray);
    this.setState({ rafId: requestAnimationFrame(this.tick) });
  };

  render() {
    if (this.state.source && this.state.analyser) {
      this.state.source.connect(this.state.analyser);
      this.state.analyser.connect(this.state.context.destination);
    }
    const buttonText = !this.state.play ? "Play" : "Pause";
    return (
      <div>
        <canvas ref={this.state.canvas} />
        <button onClick={this.togglePlay}>{buttonText}</button>
      </div>
    );
  }
}
