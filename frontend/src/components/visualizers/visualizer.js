import React from "react";
import { CanvasWithRouter } from "./canvas";
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
            <CanvasWithRouter
              canvasWidth={700}
              canvasHeight={700}
              visualizer={{ type: "", settings: { binCount: 1025 } }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
