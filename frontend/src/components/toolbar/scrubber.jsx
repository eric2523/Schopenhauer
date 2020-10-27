import React from "react";

export class Scrubber extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      origin: 0,
      positionX: 0,
      mouseDown: false,
      defaultSettings: {
        heightAmplifier: 2
      }
    };
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
  }

  handleMouseDown(e) {
    let mouseDown = true;
    // parent node of this is current .viz-outer-div. Possibly why it can't move left
    let origin = e.target.parentNode.offsetLeft;
    // offsetLeft (read-only) gives offsetLeft pos of parentNode
    let positionX = e.target.offsetLeft;
    // state saves the position at which event occured
    this.setState({ mouseDown, origin, positionX });
  }

  handleMouseUp(e) {
    let currVisualizerSettings = JSON.parse(
      window.localStorage.visualizerSettings
    );
    // debugger;
    this.setState({ mouseDown: false });
    // ex ratio: 0.5 for halfway in between
    let ratio = this.state.positionX / e.target.parentNode.offsetWidth;

    if (this.props.type === "heightAmplifier") {
      currVisualizerSettings.heightAmplifier = this.state.defaultSettings.heightAmplifier * ratio;
      window.localStorage.visualizerSettings = JSON.stringify(currVisualizerSettings)
    }

    this.props.processEffect()
    // currVisualizerSettings.heightAmplifier;
    // window.localStorage.setItem
    // max height of scrubber should be max height of canvas
    //
  }

  handleMouseMove(e) {
    let scrubStyle;
    let scrubOffset;
    let position;
    let newPosition;
    let timeline = document.getElementsByClassName("scrubber-timeline")[0];
    let timeStyle;
    let timeWidth;

    if (this.state.mouseDown) {
      scrubStyle = getComputedStyle(e.target);
      scrubOffset = parseInt(scrubStyle.width, 10) / 2;

      position = parseInt(scrubStyle.left, 10);
      // clientX gives position at which event occured
      // subtracting clientX with prev position
      newPosition = position + (e.clientX - this.state.positionX);
      // prob dont need all the styles in the future
      timeStyle = getComputedStyle(timeline, 10);
      timeWidth = parseInt(timeStyle.width, 10);
      // checking if scrub is outside left/right range of timeline
      if (e.clientX < timeline.offsetLeft) {
        newPosition = this.state.origin - scrubOffset * 2;
      } else if (e.clientX > timeWidth + timeline.offsetLeft) {
        newPosition = timeWidth - scrubOffset;
      }
    }

    e.target.style.left = newPosition + "px";
    this.setState({ positionX: e.clientX });
  }

  render() {
    return (
      <div className="scrub-outer-div">
        <div className="scrubber-timeline">
          <div className="scrub-div">
            <div
              onMouseUp={this.handleMouseUp}
              onMouseDown={this.handleMouseDown}
              onMouseMove={this.handleMouseMove}
              className="scrub"
            ></div>
          </div>
        </div>
      </div>
    );
  }
}
