import React from "react";
import { CanvasWithRouter } from "./canvas";
import { VisualizerSettings } from "./visualizer-settings";
import { ToolbarItem } from "../toolbar/toolbar-item";
// import { ToolbarIndex } from "../toolbar/toolbar-index";
// import { Scrubber } from "../toolbar/scrubber";
// import { testVisualizer } from "./test_visualizer_object";
import { SongToolBar } from '../music_player/song_tool_bar';
import { connect } from "react-redux";

const mSTP = (state) => {
  return {
    currentSong: state.session.song,
    // id: state.session.song ? state.session.song.id : null
  };
};

class VisualizerComponent extends React.Component {
  constructor(props) {
    super(props);
    this.visualizerSettings = new VisualizerSettings();
  }

  render() {
    if (!this.props.currentSong) {
      return null;
    }
    const generalSettings = this.visualizerSettings.settings.generalSettings;
    let items = [];
    for (const handle in generalSettings) {
      let setting = {
        name: handle,
        val: generalSettings[handle],
      };
      items.push(
        <ToolbarItem
          generalSettings={this.visualizerSettings.settings.generalSettings}
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
                visualizer={this.visualizerSettings.settings}
                song={this.props.song.songUrl}
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

export const Visualizer = connect(mSTP, null)(VisualizerComponent);
