import React from "react";
import { VisualizerItemContainer } from "../visualizers/visualizer_item";

export class ProfileVisualizerItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.state = {
      connectMusic: false,
      startPlaying: false,
      width: window.innerWidth / 4 || window.clientWidth / 4,
    };
    this.toggleMusic = this.toggleMusic.bind(this);
    this.updateVisualizer = this.updateVisualizer.bind(this);
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateVisualizer);
  }

  updateVisualizer() {
    this.setState({ width: window.innerWidth / 4 || window.clientWidth / 4 });
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateVisualizer);
  }
  toggleMusic() {
    this.setState({ connectMusic: !this.state.connectMusic });
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(e) {
    this.props.deleteVisualizer(this.props.visualizer._id);
  }

  render() {
    return (
      <VisualizerItemContainer
        connectMusic={this.props.connectMusic}
        startPlaying={this.props.startPlaying}
        visualizerSettings={this.props.visualizer}
        // canvasWidth={this.state.width}
        // canvasHeight={this.state.width}
        canvasWidth={533}
        canvasHeight={400}
        onHover={this.props.onHover}
        disconnectMusic={this.props.disconnectMusic}
      />
    );
  }
}
