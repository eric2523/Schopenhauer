import React from "react";
import { Canvas } from "./canvas";
import { ToolbarIndex } from "../toolbar/toolbar-index";
import { Scrubber } from "../toolbar/scrubber";

export const Visualizer = (props) => {
  return (
    <div className="viz-outer-div">
      {/* <div className="viz-toolb-div">
        <ToolbarIndex />
      </div> */}
      <div className="visualizer">
        <div className="canvas-main-div">
          <div className="canvas-div">
            <Canvas match={props.match} canvasWidth={700} canvasHeight={700} />
          </div>
        </div>
      </div>
    </div>
  );
};
