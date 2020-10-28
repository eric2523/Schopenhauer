import React from "react";
import song from "../../audio_files/bensound-goinghigher.mp3";
import { ToolbarIndex } from "../toolbar/toolbar-index";

const barWidth = 1;
const radius = 0;

export class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      play: false,
      audio: new Audio(song),
      visualizerSettings: {
        barWidth: 1,
        radius: 0,
        centerX: 250,
        centerY: 250,
        // finished controls
        heightAmplifier: 2,
      },
      source: null,
      context: {},
      analyser: null,
      frequencyArray: [],
      freqCount: null,
      radians: null,
      rafId: null,
      canvas: React.createRef(),
    };
    this.togglePlay = this.togglePlay.bind(this);
    this.handleHeightAmp = this.handleHeightAmp.bind(this);
  }

  componentDidMount() {
    let visualizerSettings = JSON.stringify(this.state.visualizerSettings);
    window.localStorage.setItem("visualizerSettings", visualizerSettings);
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
    canvas.width = this.props.canvasWidth;
    canvas.height = this.props.canvasHeight;
    this.state.ctx = canvas.getContext("2d");
    for (let i = 0; i < this.state.freqCount; i++) {
      let height =
        this.state.frequencyArray[i] *
        this.state.visualizerSettings.heightAmplifier;

      let centerX = this.props.canvasWidth / 2;
      let centerY = this.props.canvasHeight / 2;

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

  handleHeightAmp() {
    let heightAmplifier = JSON.parse(window.localStorage.visualizerSettings)
      .heightAmplifier;
    this.setState({ visualizerSettings: { heightAmplifier } });
  }

  render() {
    if (this.state.source && this.state.analyser) {
      this.state.source.connect(this.state.analyser);
      this.state.analyser.connect(this.state.context.destination);
    }

    let toolbarIndex = null;
    if (this.props.match.path === "/visualizer") {
      toolbarIndex = (
        <div className="viz-toolb-div">
          <ToolbarIndex
            settings={this.state.settings}
            handleHeightAmp={this.handleHeightAmp}
            togglePlay={this.togglePlay}
          />
        </div>
      );
    }

    const buttonText = !this.state.play ? "Play" : "Pause";
    return (
      <>
        <canvas ref={this.state.canvas} />
        {toolbarIndex}
      </>
    );
  }
}
