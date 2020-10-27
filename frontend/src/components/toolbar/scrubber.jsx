import React from 'react'

export class Scrubber extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      positionX: 0,
      positionY: 0,
      mouseDown: false,
    }
    this.handleMouseDown = this.handleMouseDown.bind(this)
    this.handleMouseUp = this.handleMouseUp.bind(this)
    this.handleMouseMove = this.handleMouseMove.bind(this)
  }

  handleMouseDown(){
    this.setState({ mouseDown: true })
  }

  handleMouseUp(){
    this.setState({ mouseDown: false })
  }

  handleMouseMove(e){
    if (this.state.mouseDown === true){
      debugger
      let offsetWidth = e.target.offsetWidth
    }
    // scrubOffset = parseInt(scrubStyle.width,10)/2,
    // position    = parseInt(scrubStyle.left, 10),
    // newPosition = position + (e.clientX - scrub.last.x),
    // timeStyle   = getComputedStyle(timeline, 10),
    // timeWidth   = parseInt(timeStyle.width,10);
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

// var scrub      = {
//   el: document.getElementById('scrub'),
//   current: {
//     x: 0
//   },
//   last: {
//     x: 0
//   }
// },
// timeline   = document.getElementById('timeline'),
// mouseDown  = false;

// scrub.el.onmousedown = function () {
// mouseDown    = true;
// scrub.origin = timeline.offsetLeft;
// scrub.last.x = scrub.el.offsetLeft;
// return false;
// };

// document.onmousemove = function(e) {

// if (mouseDown === true) {
// var scrubStyle  = getComputedStyle(scrub.el),
//     scrubOffset = parseInt(scrubStyle.width,10)/2,
//     position    = parseInt(scrubStyle.left, 10),
//     newPosition = position + (e.clientX - scrub.last.x),
//     timeStyle   = getComputedStyle(timeline, 10),
//     timeWidth   = parseInt(timeStyle.width,10);

// if (e.clientX < timeline.offsetLeft) {
//   newPosition = scrub.origin - (scrubOffset*2);
// } else if (e.clientX > timeWidth + timeline.offsetLeft) {
//   newPosition = timeWidth - (scrubOffset);
// }

// document.onmouseup = function() {
// mouseDown = false;
// };