import React from "react";
import { CanvasWithRouter } from "./canvas";
import { ToolbarItem } from "../toolbar/toolbar-item";
import { SongToolBar } from "../music_player/song_tool_bar";
import { connect } from "react-redux";
import { FrequencyVisualizer } from "./basic_frequency_visualizer";
import { SphereVisualizer } from "./nate_visualizer_1";
import { BarVisualizer } from "./eric-visualizer1";

import { CirclePicker } from "react-color"

import { SquareVisualizer } from "./basic_square_visualizer";


const mSTP = (state) => {
  return {
    currentSong: state.session.song,
    // id: state.session.song ? state.session.song.id : null
  };
};

// EXAMPLE
/* <VisualizerItemContainer visualizerSettings={visualerSettingsFromDB}/> */

class VisualizerItem extends React.Component {
  constructor(props) {
    super(props);
    switch (props.visualizerSettings.type) {
      case "frequency":
        this.visualizer = new FrequencyVisualizer();
        break;
      case "sphere":
        this.visualizer = new SphereVisualizer();
        break;
      case "bars":
        this.visualizer = new BarVisualizer();
        break;
      case "square":
        this.visualizer = new SquareVisualizer();
        break;
      default:
        this.visualizer = new SphereVisualizer();
      break;
    }
    this.visualizerSettings = Object.assign({}, this.props.visualizerSettings);
    this.handleColorChange = this.handleColorChange.bind(this);
  }

  handleColorChange = (color, event) => {
    this.visualizerSettings.generalSettings['color'] = color.hex;
  };


  render() {
    // debugger;
    // if (
    //   !this.props.currentSong ||
    //   !Object.keys(this.props.currentSong).length
    // ) {
    //   debugger;
    //   return null;
    // }

    let toolbar = null;
    if (this.props.toolbox) {
      let items = [];
      const generalSettings = this.visualizerSettings.generalSettings;
      for (const handle in generalSettings) {
        let setting = {
          name: handle,
          val: generalSettings[handle],
        };
        items.push(
          <ToolbarItem
            key={handle}
            generalSettings={this.visualizerSettings.generalSettings}
            setting={setting}
          />
        );
      }
      toolbar = (
        <>
          <div className="toolbar">
            <div className="toolbar-container">
              <h3 className="toolbar-h3">Settings</h3>
              <ul className="toolbar-ul">{items}</ul>
              <SongToolBar />
              <CirclePicker onChange={ this.handleColorChange }/>
            </div>
          </div>
        </>
      );
    }
    return (
      <div className="viz-outer-div">
        <div className="visualizer">
          <div className="canvas-main-div">
            <div className={this.props.onHover ? "hover-canvas" : "canvas-div"}>
              <CanvasWithRouter
                canvasWidth={this.props.canvasWidth}
                canvasHeight={this.props.canvasHeight}
                visualizer={this.visualizer}
                visualizerSettings={this.visualizerSettings}
                song={this.props.currentSong}
                onHover={this.props.onHover}
                onTemplate={this.props.onTemplate}
                connectMusic={this.props.connectMusic}
                disconnectMusic={this.props.disconnectMusic}
              />
            </div>
          <>{toolbar}</>
          </div>
        </div>
      </div>
    );
  }
}

export const VisualizerItemContainer = connect(mSTP, null)(VisualizerItem);
