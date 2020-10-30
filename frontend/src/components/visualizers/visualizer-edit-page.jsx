import React from "react";
import { VisualizerItemContainer } from "./visualizer";
import { connect } from "react-redux";

const mSTP = (state, ownProps) => {
  return {
    defaultSettings: state.entities.defaultSettings,
    visualizerSettings: state.entities.visualizers[ownProps.match.params.id],
  };
};

const VisualizerEdit = (props) => {
  const visualizerSettings = props.visualizerSettings;

  return (
    <VisualizerItemContainer
      toolbox={true}
      canvasWidth={700}
      canvasHeight={700}
      visualizerSettings={visualizerSettings}
    />
  );
};

export const VisualizerEditContainer = connect(mSTP, null)(VisualizerEdit);
