import React from "react";
import { VisualizerItemContainer } from "./visualizer_item";
import { connect } from "react-redux";
import { openModal, closeModal } from "../../actions/modal_actions";
import { updateVisualizer } from "../../actions/visualizer_actions";
import { prepSettings } from "../../util/visualizer_api_util";

const mSTP = (state, ownProps) => {
  return {
    visualizerSettings: state.entities.visualizers[ownProps.match.params.id],
  };
};

const mDTP = (dispatch) => {
  return {
    openModal: (type) => dispatch(openModal(type)),
    closeModal: () => dispatch(closeModal()),
    updateVisualizer: (visualizer) => dispatch(updateVisualizer(visualizer))
  };
};

class VisualizerEdit extends React.Component {
  constructor(props) {
    super(props);
    this.handleSave = this.handleSave.bind(this);
  }

  handleSave(e) {
    this.props.updateVisualizer(prepSettings(this.props.visualizerSettings))
  }

  render() {
    const visualizerSettings = this.props.visualizerSettings;
    const width = window.innerWidth;
    const height = window.innerHeight;
    if (visualizerSettings) {
      return (
        <>
        <VisualizerItemContainer
          canvasWidth={width}
          canvasHeight={height}
          toolbox={true}
          visualizerSettings={visualizerSettings}
          handleSave={this.handleSave}
        />
        </>
      );
    } else {
      return null;
    }
  }
}

export const VisualizerEditContainer = connect(mSTP, mDTP)(VisualizerEdit);