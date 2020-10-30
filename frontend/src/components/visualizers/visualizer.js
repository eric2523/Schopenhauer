import React from "react";
import { CanvasWithRouter } from "./canvas";
import { VisualizerSettings } from "./visualizer-settings";
import { ToolbarItem } from "../toolbar/toolbar-item";
import { testVisualizer } from "./test_visualizer_object";
import { SongToolBar } from '../music_player/song_tool_bar';
import { connect } from "react-redux";
import { FrequencyVisualizer } from "./basic_frequency_visualizer";
import { SphereVisualizer } from "./nate_visualizer_1";

const mSTP = (state) => {
  return {
    currentSong: state.session.song
    // id: state.session.song ? state.session.song.id : null
  }
};

// EXAMPLE 
{/* <VisualizerItemContainer visualizerSettings={visualerSettingsFromDB}/> */}

class VisualizerItem extends React.Component {
  constructor(props) {
    super(props);
    switch (props.visualizerSettings.type) {
      case "frequency":
        this.visualizer = new FrequencyVisualizer()
        break;
      case "sphere":
        this.visualizer = new SphereVisualizer()
        break;
      default:
        break;
    }
    this.visualizerSettings = props.visualizerSettings
  }

  render() {
    if (!this.props.currentSong || !Object.keys(this.props.currentSong).length) {
      return null;
    }
    const generalSettings = this.visualizerSettings.generalSettings;
    let items = [];
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
    return (
      <div className="viz-outer-div">
        <div className="visualizer">
          <div className="canvas-main-div">
            <div className="canvas-div">
              <CanvasWithRouter
                canvasWidth={700}
                canvasHeight={700}
                visualizer={this.visualizer}
                visualizerSettings={this.visualizerSettings}
                song={this.props.currentSong}
              />
            </div>
          </div>
          <div className="toolbar">
            <ul>{items}</ul>
          </div>
          {/* </div> */}
          <SongToolBar />
        </div>
      </div>
    );
  }
}

export const VisualizerItemContainer = connect(mSTP, null)(VisualizerItem);
