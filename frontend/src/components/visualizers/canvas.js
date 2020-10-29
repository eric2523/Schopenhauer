import React from "react";
import song from "../../audio_files/bensound-goinghigher.mp3";
import { BeatDetection } from "./beat_detection";
import { ToolbarIndex } from "../toolbar/toolbar-index";
import { withRouter } from "react-router-dom";

import { octave } from "./octave";
import { detectPitch } from "../../util/visualizer_util";

import hal_visualizer_1 from "./hal_visualizer_1";
import { frequencyVisualizer } from "./yuehan_visualizer_1";

const binCount = 1024;
class Canvas extends React.Component {
  constructor(props) {
    // props contain canvasWidth & canvasHeight

    super(props);
    switch (props.visualizerType) {
      case "frequency":
      default:
        this.state.visualizer = new frequencyVisualizer();
        break;
    }

    this.state = {
      //needed
      // width: this.props.canvasWidth,
      // height: this.props.canvasHeight,
      visualizerSettings: {
        //for canvas settings

        centerX: this.props.canvasWidth / 2,
        centerY: this.props.canvasHeight / 2,

        //for any bar
        barWidth: 1,

        //for any circular object
        radius: 0,

        // finished controls
        heightAmplifier: 0.5,
      },

      //tbd
      play: false,
      audio: new Audio(song),

      beatDetection: new BeatDetection(),
      audioContext: null,
      source: null,
      analyser: null,
      frequencyArray: new Uint8Array(binCount),
      waveformArray: new Uint8Array(binCount),
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
      const audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();
      const source = audioContext.createMediaElementSource(this.state.audio);
      const analyser = audioContext.createAnalyser();

      // let freqCount = frequencyArray.length;
      // let radians = (2 * Math.PI) / freqCount;
      // let octaveRadians = (2 * Math.PI) / 12;
      this.setState({
        audioContext,
        source,
        analyser,
        // frequencyArray,
        // waveformArray,
        // beatDetection,
        // freqCount,
        // radians,
        // octaveRadians,
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
    // const animationContext = canvas.getContext("2d");
    // const octaveAmp = octave(
    //   this.state.frequencyArray,
    //   this.state.audioContext
    // );
    // const pitch = detectPitch(octaveAmp);
    this.state.visualizer.update(canvas, this.state);
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
    this.state.analyser.getByteTimeDomainData(this.state.waveformArray);
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
      this.state.analyser.connect(this.state.audioContext.destination);
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
