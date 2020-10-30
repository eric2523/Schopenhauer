import React from "react";
import { VisualizerItemContainer } from "../visualizers/visualizer";

export class ProfileVisualizerItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.state = {
      connectMusic: false,
      startPlaying: false,
    };
    this.toggleMusic = this.toggleMusic.bind(this);
  }

  toggleMusic() {
    this.setState({ connectMusic: !this.state.connectMusic });
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(e) {
    this.props.deleteVisualizer(this.props.visualizer._id);
  }

  render() {
    const buttonText = !this.state.connectMusic ? (
      <i className="play icon white-audio-icon"></i>
    ) : (
      <i className="pause icon white-audio-icon"></i>
    );
    var width = isNaN(window.innerWidth)
      ? window.clientWidth
      : window.innerWidth;

    return (
        <VisualizerItemContainer
          connectMusic={this.props.connectMusic}
          startPlaying={this.props.startPlaying} 
          visualizerSettings={this.props.visualizer}
          canvasWidth={width/4}
          canvasHeight={width/4}
          onHover={this.props.onHover}
          disconnectMusic={this.props.disconnectMusic}
          />
          )
  }
}
