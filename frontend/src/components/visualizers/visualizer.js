import React from "react";
import { CanvasWithRouter } from "./canvas";
import { VisualizerSettings } from "./visualizer-settings";
import { ToolbarItem } from "../toolbar/toolbar-item";
import { testVisualizer } from "./test_visualizer_object";
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
        this.visualizer = new SphereVisualizer()
        break;
    }
    this.visualizerSettings = props.visualizerSettings;
  }

  render() {
    if (
      !this.props.currentSong ||
      !Object.keys(this.props.currentSong).length
    ) {
      return null;
    }

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
            <div className={
              this.props.onHover ? 
              "hover-canvas" : "canvas-div"}>
              <CanvasWithRouter
                canvasWidth={this.visualizerSettings.width}
                canvasHeight={this.visualizerSettings.height}
                visualizer={this.visualizer}
                visualizerSettings={this.visualizerSettings}
                song={this.props.currentSong}
                onHover={this.props.onHover}
              />
            </div>
          </div>
          {this.props.toolbar ? 
          <>
          <div className="toolbar">
            <ul>{items}</ul>
          </div>
          {/* </div> */}
          <SongToolBar />
          </>
          : <></>}
        </div>
      </div>
    );
  }
}

export const VisualizerItemContainer = connect(mSTP, null)(VisualizerItem);
