import React from "react";
import { Canvas } from "./canvas"
import { ToolbarIndex } from "../toolbar/toolbar-index";

export const Visualizer = () => {
  return (
    <div className="viz-outer-div">
      <div className="viz-toolb-div">
        <ToolbarIndex />
      </div>
      <div className="visualizer">
        <Canvas />
      </div>
    </div>
  );
};
