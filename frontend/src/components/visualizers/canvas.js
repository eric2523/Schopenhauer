import React from "react";
import song from "../../audio_files/bensound-goinghigher.mp3";
import { BeatDetection } from "./beat_detection";
import { ToolbarIndex } from "../toolbar/toolbar-index";
import { withRouter } from "react-router-dom";

import { octave } from "./octave";
import {
  averageArray,
  detectPitch,
  stdevArray,
} from "../../util/visualizer_util";
import hal_visualizer_1 from "./hal_visualizer_1";
import yuehan_visualizer_1 from "./yuehan_visualizer_1";

const barWidth = 1;
const radius = 0;
const canvasDimensions = {
  width: 700,
  height: 700,
  barWidth: 1,
  radius: 0,
  centerX: 350,
  centerY: 350,
};

class Canvas extends React.Component {
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
        heightAmplifier: 0.5,
      },
      beatDetection: null,
      context: {},
      source: null,
      analyser: null,
      frequencyArray: [],
      timeArray: [],
      freqCount: null,
      radians: null,
      rafId: null,
      canvas: React.createRef(),
    };
    this.togglePlay = this.togglePlay.bind(this);
    this.handleHeightAmp = this.handleHeightAmp.bind(this);
    this.tick = this.tick.bind(this);
    this.updateFrequencyData = this.updateFrequencyData.bind(this);
    this.updateWaveformData = this.updateWaveformData.bind(this);
    this.updateAllData = this.updateAllData.bind(this);
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
      console.log(analyser.fftSize);
      let frequencyArray = new Uint8Array(analyser.frequencyBinCount);
      console.log(frequencyArray);
      let timeArray = new Uint8Array(analyser.frequencyBinCount);
      console.log(timeArray);

      let beatDetection = new BeatDetection();
      let freqCount = frequencyArray.length;
      let radians = (2 * Math.PI) / freqCount;
      let octaveRadians = (2 * Math.PI) / 12;
      this.setState({
        context,
        source,
        analyser,
        frequencyArray,
        timeArray,
        beatDetection,
        freqCount,
        radians,
        octaveRadians,
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
    const ctx = canvas.getContext("2d");
    const octaveAmp = octave(this.state.frequencyArray, this.state.context);
    const pitch = detectPitch(octaveAmp);
    console.table(pitch);

    this.drawBeatInCircle(ctx);
  }
  drawBeatInCircle = (ctx) => {
    const { width, height } = this.state.visualizerSettings;
    if (this.state.beatDetection.detected) {
      this.beatRadius = 100;
    } else {
      this.beatRadius *= 0.9;
    }
    ctx.beginPath();
    ctx.ellipse(
      width / 2,
      height / 2,
      this.beatRadius,
      this.beatRadius,
      0,
      0,
      Math.PI * 2
    );
    ctx.stroke();
  };
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

    yuehan_visualizer_1(canvas, canvasDimensions, this.state);
  }

  drawOctaves(xStart, yStart, xEnd, yEnd, frequencyAmplitude, ctx, canvas) {
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

  tick() {
    this.animation(this.state.canvas.current);
    this.updateFrequencyData();
    this.setState({ rafId: requestAnimationFrame(this.tick) });
  }

  updateFrequencyData() {
    this.state.analyser.getByteFrequencyData(this.state.frequencyArray);
    this.state.beatDetection.update(this.state.frequencyArray);
  }

  updateWaveformData() {
    this.state.analyser.getByteTimeDomainData(this.state.timeArray);
  }

  updateAllData() {
    this.updateFrequencyData();
    this.updateWaveformData();
  }
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
    const buttonText = !this.state.play ? (
      <i class="play icon"></i>
    ) : (
      <i class="pause icon"></i>
    );

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
    } else {
      toolbarIndex = (
        <button className="ui button carousel-play" onClick={this.togglePlay}>
          {buttonText}
        </button>
      );
    }

    return (
      <>
        <canvas ref={this.state.canvas} />
        {toolbarIndex}
      </>
    );
  }
}

export const CanvasWithRouter = withRouter(Canvas);
