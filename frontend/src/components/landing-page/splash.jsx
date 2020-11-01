import React from "react";
import { Link } from "react-router-dom";
import { ConnectedFloatingDotsVisualizer } from "../visualizers/visualizer_templates/floating_particles_with_connection";
import song from "../../audio_files/bensound-goinghigher.mp3";
import { BeatDetection } from "../visualizers/beat_detection";
export class Splash extends React.Component {
  constructor(props) {
    super(props);
    this.canvas = React.createRef();
    const binCount = 1024;
    this.audio = new Audio();
    this.audio.crossOrigin = "anonymous";
    this.audio.src = song;
    this.state = {
      mouse: {
        x: 0,
        y: 0,
        radius: 100,
      },
      visualizer: null,
      rafId: null,
      play: false,
      beatDetection: new BeatDetection(),
      audioContext: null,
      source: null,
      analyser: null,
      frequencyArray: new Uint8Array(binCount),
      binCount,
    };
    this.onMouseMove = this.onMouseMove.bind(this);
    this.tick = this.tick.bind(this);
    this.togglePlay = this.togglePlay.bind(this);
    this.updateFrequencyData = this.updateFrequencyData.bind(this);
  }

  componentDidMount() {
    this.bound = this.canvas.current.getBoundingClientRect();
    this.canvas.current.height = window.innerHeight - this.bound.top; // 10 is for the padding of the immediate sibling element
    this.canvas.current.width = window.innerWidth - this.bound.left;
    this.setState(
      {
        visualizer: new ConnectedFloatingDotsVisualizer(this.canvas.current),
      },
      () => this.tick()
    );
  }

  componentWillUnmount() {
    this.audio.pause();
    cancelAnimationFrame(this.state.rafId);
    this.setState({
      play: false,
    });
  }

  onMouseMove(e) {
    this.setState({
      mouse: {
        x:
          ((e.clientX - this.bound.left) /
            (this.bound.right - this.bound.left)) *
          this.canvas.current.width,
        y:
          ((e.clientY - this.bound.top) /
            (this.bound.bottom - this.bound.top)) *
          this.canvas.current.height,
        radius: this.state.mouse.radius,
      },
    });
  }

  togglePlay() {
    // checks if audio input is in (can change second conditional later to be more specific. Currently just a placeholder until I figure out a better flag )
    if (this.audio instanceof Audio && !this.state.source) {
      const audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();
      const source = audioContext.createMediaElementSource(this.audio);
      const analyser = audioContext.createAnalyser();
      this.setState({
        audioContext,
        source,
        analyser,
      });
    }
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
  updateFrequencyData() {
    this.state.analyser.getByteFrequencyData(this.state.frequencyArray);
    this.state.beatDetection.update(this.state.frequencyArray);
  }
  animation(canvas) {
    this.state.visualizer.animate(canvas, this.state);
  }

  tick() {
    this.animation(this.canvas.current);
    this.setState({ rafId: requestAnimationFrame(this.tick) });
  }

  render() {
    if (this.state.source && this.state.analyser) {
      //this needs to be hook up to a speaker
      if (this.props.disconnectMusic) {
        this.state.source.connect(this.state.analyser);
        // need testing seems redundant
        this.state.analyser.connect(this.state.audioContext.destination);
        this.state.analyser.disconnect(this.state.audioContext.destination);
      } else {
        this.state.source.connect(this.state.analyser);
        this.state.analyser.connect(this.state.audioContext.destination);
      }
    }
    const buttonText = !this.state.play ? (
      <i className="play icon white-audio-icon"></i>
    ) : (
      <i className="pause icon white-audio-icon"></i>
    );
    return (
      <div className="splash-outer-div">
        <canvas
          className="splash-img-overlay"
          ref={this.canvas}
          onMouseMove={this.onMouseMove}
        ></canvas>
        <button className="carousel-play" onClick={this.togglePlay}>
          {buttonText}
        </button>
        <div className="splash-title">
          <div className="main-title">
            <h1 className="splash-title">Schopenhauer</h1>
          </div>
          <div className="subtitle">
            <h2 className="splash-subtitle">Re-envision sound</h2>
          </div>
        </div>
        <div className="splash-btn">
          <Link to="/templates">
            <button className="ui primary button">GET STARTED NOW</button>
          </Link>
        </div>
      </div>
    );
  }
}
