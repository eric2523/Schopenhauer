import React from "react";
import { CanvasWithRouter } from "../visualizers/canvas";

export const CarouselItem = (props) => {
  // need to figure out what vars we want in the template
  // (name, time, etc)
  return (
    <div className="carousel-item-div">
      <div className="carousel-item-title">
        <h1 className="carousel-template-name">template name</h1>
      </div>
      <div className="carousel-item-visualizer">
        {/* waiting for canvas.. */}
        {/* <CanvasWithRouter canvasWidth={250} canvasHeight={250} /> */}
        <CanvasWithRouter
          canvasWidth={250}
          canvasHeight={250}
          visualizer={{ type: "", settings: { binCount: 1025 } }}
        />
      </div>
      <div className="carousel-template-btn">
        <button className="ui primary button creation-temp-btn">go to creation</button>
      </div>
    </div>
  );
};
