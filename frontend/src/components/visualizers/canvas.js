import React from "react";
import song from "../../audio_files/bensound-goinghigher.mp3";
import { BeatDetection } from "./beat_detection";
import { ToolbarIndex } from "../toolbar/toolbar-index";
import hal_visualizer_1 from "./hal_visualizer_1";
import yuehan_visualizer_1 from "./yuehan_visualizer_1"

const canvasDimensions = {
  width: 700,
  height: 700,
  barWidth: 1,
  radius: 0,
  centerX: 350,
  centerY: 350
};


export class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      play: false,
      audio: new Audio(song),
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
      visualizerSettings: {
        width: 700,
        height: 700,
        barWidth: 1,
        radius: 0,
        centerX: 250,
        centerY: 250,
        heightAmplifier: 2,
      },
    };
    // this.togglePlay = this.togglePlay.bind(this);
    // this.handleHeightAmp = this.handleHeightAmp.bind(this);
  }

  componentDidMount() {
    let visualizerSettings = JSON.stringify(this.state.visualizerSettings);
    window.localStorage.setItem("visualizerSettings", visualizerSettings);
  }

  togglePlay = () => {
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
      this.setState({
        context,
        source,
        analyser,
        frequencyArray,
        timeArray,
        beatDetection,
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
  };

  animation(canvas) {
    yuehan_visualizer_1(canvas, canvasDimensions, this.state);
  }

  tick = () => {
    this.animation(this.state.canvas.current);
    this.updateFrequencyData();
    this.setState({ rafId: requestAnimationFrame(this.tick) });
  };

  updateFrequencyData = () => {
    this.state.analyser.getByteFrequencyData(this.state.frequencyArray);
    this.state.beatDetection.update(this.state.frequencyArray);
  };

  updateWaveFormData = () => {
    this.state.analyser.getByteTimeDomainData(this.state.timeArray);
  };
  handleHeightAmp = () => {
    let heightAmplifier = JSON.parse(window.localStorage.visualizerSettings)
      .heightAmplifier;
    this.setState({ visualizerSettings: { heightAmplifier } });
  };

  render() {
    if (this.state.source && this.state.analyser) {
      this.state.source.connect(this.state.analyser);
      this.state.analyser.connect(this.state.context.destination);
    }

    const buttonText = !this.state.play ? "Play" : "Pause";
    return (
      <div className="canvas-main-div">
        <div className="canvas-div">
          <canvas ref={this.state.canvas} />
        </div>
        <div className="viz-toolb-div">
          <ToolbarIndex
            settings={this.state.settings}
            handleHeightAmp={this.handleHeightAmp}
            togglePlay={this.togglePlay}
          />
        </div>
      </div>
    );
  }
}
