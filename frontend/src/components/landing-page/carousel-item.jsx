import React from "react";
import { CanvasWithRouter } from "../visualizers/canvas";
import { testVisualizer } from "../visualizers/test_visualizer_object";

export const CarouselItem = (props) => {
  // need to figure out what vars we want in the template
  // (name, time, etc)
  let templateName = "Untitled"
  // if (props.visualizerSettings.name){
  //   templateName = props.visualizerSettings.name
  // }

  return (
    <div className="carousel-item-div">
      <div className="carousel-item-title">
        <h1 className="carousel-template-name">
          {templateName}
        </h1>
      </div>
      <div className="carousel-item-visualizer">
        <CanvasWithRouter
          canvasWidth={250}
          canvasHeight={250}
          toolbox={false}
          // onHover={true}
          visualizerSettings={props.visualizerSettings}
        />
      </div>
      <div className="carousel-template-btn">
        <button className="ui primary button creation-temp-btn">go to creation</button>
      </div>
    </div>
  );
};
