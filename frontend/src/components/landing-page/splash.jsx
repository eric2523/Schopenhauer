import React from "react";
import { Link } from "react-router-dom";
import { ConnectedFloatingDotsVisualizer } from "../visualizers/visualizer_templates/floating_particles_with_connection";

export class Splash extends React.Component {
  constructor(props) {
    super(props);
    this.canvas = React.createRef();

    this.state = {
      mouse: {
        x: 0,
        y: 0,
        radius: 50,
      },
      visualizer: null,
      rafId: null,
    };
    this.onMouseMove = this.onMouseMove.bind(this);
    this.tick = this.tick.bind(this);
  }

  componentDidMount() {
    debugger;
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
    cancelAnimationFrame(this.state.rafId);
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
  animation(canvas) {
    this.state.visualizer.animate(canvas, this.state);
  }
  tick() {
    this.animation(this.canvas.current);
    this.setState({ rafId: requestAnimationFrame(this.tick) });
  }

  render() {
    return (
      <div className="splash-outer-div">
        <canvas
          className="splash-img-overlay"
          ref={this.canvas}
          onMouseMove={this.onMouseMove}
        ></canvas>
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
