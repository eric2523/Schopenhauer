import React from "react";
import { VisualizerItemContainer } from "../visualizers/visualizer";

export class ProfileVisualizerItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(e) {
    this.props.deleteVisualizer(this.props.visualizer._id);
  }

  render() {
    const width = isNaN(window.innerWidth)
      ? window.clientWidth
      : window.innerWidth;
    return (
      <li className="column">
        <div className="visualizer-title">{this.props.visualizer.name}</div>
        <VisualizerItemContainer
          onHover={true}
          visualizerSettings={this.props.visualizer}
          canvasWidth={width / 4}
          canvasHeight={width / 4}
        />
        <button onClick={this.handleDelete}>DELETE</button>
      </li>
    );
  }
}
