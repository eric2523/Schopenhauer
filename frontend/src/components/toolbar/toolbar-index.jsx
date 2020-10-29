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
      <i class="play icon"></i>
    ) : (
      <i class="pause icon"></i>
    );

    return (
      <div>
        <ul className="toolb-ul">
          {/* eventually map through all controls and link to actions */}
          <ToolbarIndexItem
            type="heightAmplifier"
            handleHeightAmp={this.props.handleHeightAmp}
          />
          <button onClick={this.handleClick} class="ui button">
            {buttonText}
          </button>
        </ul>
      </div>
    );
  }
}
