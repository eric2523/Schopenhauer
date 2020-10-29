import React from "react";
import { ToolbarIndexItem } from "./toolbar-index-item";

export class ToolbarIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      play: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    let play = !this.state.play;
    this.setState({ play });
    this.props.togglePlay();
  }

  render() {
    const buttonText = !this.state.play ? (
      <i className="play icon"></i>
    ) : (
      <i className="pause icon"></i>
    );

    return (
      <div>
        <ul className="toolb-ul">
          {/* eventually map through all controls and link to actions */}
          <ToolbarIndexItem
            type="heightAmplifier"
            handleHeightAmp={this.props.handleHeightAmp}
          />
          <button onClick={this.handleClick} className="ui button">
            {buttonText}
          </button>
        </ul>
      </div>
    );
  }
}
