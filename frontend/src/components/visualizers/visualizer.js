import React from "react";
import { CanvasWithRouter } from "./canvas";
import { ToolbarItem } from "../toolbar/toolbar-item";
import { SongToolBar } from "../music_player/song_tool_bar";
import { connect } from "react-redux";
import { FrequencyVisualizer } from "./basic_frequency_visualizer";
import { SphereVisualizer } from "./nate_visualizer_1";

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
      default:
        this.visualizer = new SphereVisualizer();
        break;
    }
    this.visualizerSettings = Object.assign({}, this.props.visualizerSettings);
  }

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
            <ul>{items}</ul>
          </div>
          <SongToolBar />
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
          </div>
          <>{toolbar}</>
        </div>
      </div>
    );
  }
}

export const VisualizerItemContainer = connect(mSTP, null)(VisualizerItem);
