import React from 'react'

export class Scrubber extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      origin: 0,
      positionX: 0,
      mouseDown: false,
    }
    this.handleMouseDown = this.handleMouseDown.bind(this)
    this.handleMouseUp = this.handleMouseUp.bind(this)
    this.handleMouseMove = this.handleMouseMove.bind(this)
  }

  handleMouseDown(){
    let mouseDown = true;
    let origin = document.getElementsByClassName("scrubber-timeline")[0].offsetLeft
    let positionX = document.getElementsByClassName("scrub")[0].offsetLeft
    this.setState({ mouseDown, origin, positionX})
  }

  handleMouseUp(){
    this.setState({ mouseDown: false })
  }

  handleMouseMove(e){
    let scrubStyle;
    let scrubOffset;
    let position;
    let newPosition;
    let timeline = document.getElementsByClassName("scrubber-timeline")[0]
    let timeStyle;
    let timeWidth;
   
    if (this.state.mouseDown){
      scrubStyle  = getComputedStyle(e.target)
      scrubOffset = parseInt(scrubStyle.width,10)/2

      position    = parseInt(scrubStyle.left, 10)
      // clientX gives position at which event occured 
      // subtracting clientX with prev position 
      newPosition = position + (e.clientX - this.state.positionX)
      // prob dont need all the styles in the future 
      timeStyle   = getComputedStyle(timeline, 10)
      timeWidth   = parseInt(timeStyle.width,10)
      // checking if scrub is outside left/right range of timeline 
      if (e.clientX < timeline.offsetLeft) {
        newPosition = timeline.offsetLeft - (scrubOffset*2);
      } else if (e.clientX > timeWidth + timeline.offsetLeft) {
        newPosition = timeWidth - (scrubOffset);
      }

    }
    
    e.target.style.left = newPosition + 'px';
    this.setState({ positionX: e.clientX})
  }

  render(){
    return (
      <div className="scrubber-timeline">
        <div 
          onMouseUp={this.handleMouseUp}
          onMouseDown={this.handleMouseDown} 
          onMouseMove={this.handleMouseMove}
          className="scrub">
        </div>
      </div>
    )
  }
}
