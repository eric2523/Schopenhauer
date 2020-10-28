import React from 'react'
import { CanvasWithRouter } from '../visualizers/canvas'

export const CarouselItem = (props) => {
  // need to figure out what vars we want in the template
  // (name, time, etc)
  return (
    <div className="carousel-item-div">
      <div className="carousel-item-title">
         <h1 className="carousel-template-name">
           template name 
         </h1>
      </div>
      <div className="carousel-item-visualizer">
        <CanvasWithRouter canvasWidth={200} canvasHeight={200} />
      </div>
      <div className="carousel-template-btn">
        <button className="carousel-item-btn">
          go to creation 
        </button>
      </div>
    </div>
  )
}