import React from "react";
import song from "../../audio_files/bensound-goinghigher.mp3";
import { BeatDetection } from "./beat_detection";
import { withRouter } from "react-router-dom";
// import { connect } from "react-redux";

import { FrequencyVisualizer } from "./basic_frequency_visualizer";
import { SphereVisualizer } from "./nate_visualizer_1";

class Canvas extends React.Component {
  constructor(props) {
    // props contain canvasWidth & canvasHeight
    super(props);
    // let visualizer = this.props.visualizer;
    const binCount = 1024;
    this.canvas = React.createRef();
    // switch (this.props.match.params.id) {
    //   case "frequency":
    //     visualizer = new FrequencyVisualizer();
    //     break;
    //   case "sphere":
    //     visualizer = new SphereVisualizer();
    //     break;
    //   default:
    //     break;
    // }
    
    this.audio = new Audio();
    this.audio.crossOrigin = 'anonymous';
    this.audio.src = this.props.song.songUrl
    
    this.state = {
      // visualizer: {}

      //needed
      typeSettings: props.visualizerSettings.typeSettings,
      generalSettings: props.visualizerSettings.generalSettings,
      visualizer: props.visualizer,

      //tbd
      play: false,
      // audio: new Audio(this.props.song),
      beatDetection: new BeatDetection(),
      audioContext: null,
      source: null,
      analyser: null,
      frequencyArray: new Uint8Array(binCount),
      waveformArray: new Uint8Array(binCount),
      binCount,
      rafId: null,
      songId: null
    };

    this.togglePlay = this.togglePlay.bind(this);
    // this.handleHeightAmp = this.handleHeightAmp.bind(this);
    this.tick = this.tick.bind(this);
    this.updateFrequencyData = this.updateFrequencyData.bind(this);
    this.updateWaveformData = this.updateWaveformData.bind(this);
    this.updateAllData = this.updateAllData.bind(this);
    
  }

  componentDidUpdate(prevProps){
    if(this.props.song !== prevProps.song){
      this.setState({
        play: false
      }, () => {
      this.audio.pause();
      // cancelAnimationFrame(this.state.rafId)
      cancelAnimationFrame(this.state.rafId)
      this.audio = new Audio();
      this.audio.crossOrigin = 'anonymous';
      this.audio.src = this.props.song.songUrl;
      });
      
    }
  }

  togglePlay() {
    // checks if audio input is in (can change second conditional later to be more specific. Currently just a placeholder until I figure out a better flag )
    if ((this.audio instanceof Audio && !this.state.source) || (this.state.songId !== this.props.song._id)) {
      // debugger;
      const audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();
      const source = audioContext.createMediaElementSource(this.audio);
      const analyser = audioContext.createAnalyser();
      this.setState({
        songId: this.props.song._id,
        audioContext,
        source,
        analyser,
      });
    }
    // console.log(this.state.frequencyArray);
    if (!this.state.play) {
      this.audio.play();
      let rafId = requestAnimationFrame(this.tick);
      this.setState({
        rafId,
        play: true,
      });
    } else {
      this.audio.pause();
      cancelAnimationFrame(this.state.rafId);
      this.setState({
        play: false,
      });
    }
  }

  animation(canvas) {
    // canvas.width = this.props.canvasWidth;
    // canvas.height = this.props.canvasHeight;
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

  render() {
    if (this.state.source && this.state.analyser) {
      this.state.source.connect(this.state.analyser);
      this.state.analyser.connect(this.state.audioContext.destination);
    }

    const buttonText = !this.state.play ? (
      <i className="play icon white-audio-icon"></i>
    ) : (
      <i className="pause icon white-audio-icon"></i>
    );

    return (
      <>
        <canvas
          ref={this.canvas}
          height={this.props.canvasHeight}
          width={this.props.canvasWidth}
        />
        <button className="carousel-play" onClick={this.togglePlay}>
          {buttonText}
        </button>
      </>
    );
  }
}

export const CanvasWithRouter = withRouter(Canvas);
