import React from "react";
import { CanvasWithRouter } from "./canvas";
import { ToolbarIndex } from "../toolbar/toolbar-index";
import { Scrubber } from "../toolbar/scrubber";
import { testVisualizer } from "./test_visualizer_object";

export const Visualizer = (props) => {
  return (
    <div className="viz-outer-div">
      {/* <div className="viz-toolb-div">
        <ToolbarIndex />
      </div> */}
      <div className="visualizer">
        <div className="canvas-main-div">
          <div className="canvas-div">
            <CanvasWithRouter
              canvasWidth={700}
              canvasHeight={700}
              visualizer={testVisualizer}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
