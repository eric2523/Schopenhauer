import React from "react";
import { VisualizerItemContainer } from "./visualizer_item";
import { connect } from "react-redux";

const mSTP = (state, ownProps) => {
  return {
    visualizerSettings: state.entities.visualizers[ownProps.match.params.id],
  };
};

const VisualizerEdit = (props) => {
  const visualizerSettings = props.visualizerSettings;
  const width = window.innerWidth;
  const height = window.innerHeight;
  if (visualizerSettings) {
    return (
      <VisualizerItemContainer
        toolbox={true}
        canvasWidth={width}
        canvasHeight={height}
        visualizerSettings={visualizerSettings}
      />
    );
  } else {
    return null;
  }
};

export const VisualizerEditContainer = connect(mSTP, null)(VisualizerEdit);
