import React from "react";
import song from "../../audio_files/bensound-goinghigher.mp3";
import { BeatDetection } from "./beat_detection";
import { ToolbarIndex } from "../toolbar/toolbar-index";
import { withRouter } from "react-router-dom";

import { frequencyVisualizer } from "./basic_frequency_visualizer";

class Canvas extends React.Component {
  constructor(props) {
    // props contain canvasWidth & canvasHeight
    super(props);
    let visualizer;
    const binCount = 1024;
    this.canvas = React.createRef();
    switch (props.visualizer.type) {
      case "frequency":
      default:
        visualizer = new frequencyVisualizer(props.visualizer.settings);
        break;
    }
    this.state = {
      //needed
      // width: this.props.canvasWidth,
      // height: this.props.canvasHeight,
      visualizerSettings: props.visualizer.settings,
      globalSettings: {
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
      binCount,
      rafId: null,
      visualizer,
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

      this.setState({
        audioContext,
        source,
        analyser,
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
    this.state.visualizer.animate(canvas, this.state);
  }

  tick() {
    this.animation(this.canvas.current);
    this.updateAllData();
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
        <canvas ref={this.canvas} />
        {toolbarIndex}
      </>
    );
  }
}

export const CanvasWithRouter = withRouter(Canvas);
