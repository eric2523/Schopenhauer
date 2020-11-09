import React from "react";
import { CanvasWithRouter } from "./canvas";
import { ToolbarItem } from "../toolbar/toolbar-item";
import { SongToolBar } from "../music_player/song_tool_bar";
import { connect } from "react-redux";
import song from "../../audio_files/bensound-goinghigher.mp3";
import { CirclePicker } from "react-color";
import { visualizerConstructors } from "../../util/visualizer_constructor_util";
import { Prompt } from "react-router-dom";

const mSTP = (state) => {
  return {
    currentSong: state.session.song,
  };
};

class VisualizerItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { saved: true };
    const visualizerType = props.visualizerSettings.type;
    const { TypeConstructor } = visualizerConstructors[visualizerType];
    this.visualizer = new TypeConstructor();
    this.visualizerSettings = props.visualizerSettings;
    this.handleChange = this.handleChange.bind(this);
    this.handleColorChange = this.handleColorChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  handleColorChange = (color, event) => {
    this.visualizerSettings.generalSettings["color"] = color.hex;
  };

  handleChange(setting) {
    return (e) => {
      this.visualizerSettings.generalSettings[setting] = parseInt(
        e.target.value
      );
      this.setState({ saved: false });
    };
  }

  handleSave(e) {
    this.props.handleSave(e);
    this.setState({ saved: true });
  }

  render() {
    let toolBar;
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
            handleChange={this.handleChange}
            setting={setting}
          />
        );
      }
      toolBar = (
        <>
          <div className="toolbar">
            <div className="toolbar-container">
              <h3 className="toolbar-h3">Settings</h3>
              <ul className="toolbar-ul">{items}</ul>
              <SongToolBar />
              <h3 className="toolbar-h3">Color Picker</h3>
              <CirclePicker onChange={this.handleColorChange} />
              <button onClick={this.handleSave} className="ui button">
                {this.state.saved ? "saved" : "unsaved"}
              </button>
            </div>
          </div>
        </>
      );
    }
    return (
      <div className="viz-outer-div">
        <Prompt
          when={!this.state.saved}
          message={(location) =>
            "You have unsaved work are you sure you want to leave?"
          }
        />
        <div className="visualizer">
          <div className="canvas-main-div">
            <div className={this.props.onHover ? "hover-canvas" : "canvas-div"}>
              <CanvasWithRouter
                canvasWidth={this.props.canvasWidth}
                canvasHeight={this.props.canvasHeight}
                visualizer={this.visualizer}
                visualizerSettings={this.visualizerSettings}
                song={this.props.currentSong ? this.props.currentSong : song}
                onHover={this.props.onHover}
                onTemplate={this.props.onTemplate}
                connectMusic={this.props.connectMusic}
                disconnectMusic={this.props.disconnectMusic}
              />
            </div>
            <>{toolBar}</>
          </div>
        </div>
      </div>
    );
  }
}

export const VisualizerItemContainer = connect(mSTP, null)(VisualizerItem);
