import React from "react";
import { VisualizerItemContainer } from "./visualizer";

export const VisualizerEdit = (props) => {
  const visualizerSettings = props.location.state.visualizerSettings;

  return (
    <VisualizerItemContainer
      toolbox={true}
      canvasWidth={700}
      canvasHeight={700}
      visualizerSettings={visualizerSettings}
    />
  );
};
