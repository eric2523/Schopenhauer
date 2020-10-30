import React from "react";
import { CanvasWithRouter } from "./canvas";
import { VisualizerSettings } from "./visualizer-settings";
import { ToolbarItem } from "../toolbar/toolbar-item";

export class Visualizer extends React.Component {
  constructor(props) {
    super(props);
    this.visualizerSettings = new VisualizerSettings();
  }

  render() {
    const generalSettings = this.visualizerSettings.settings.generalSettings;
    let items = [];
    for (const handle in generalSettings) {
      let setting = {
        name: handle,
        val: generalSettings[handle],
      };
      items.push(
        <ToolbarItem
          key={handle}
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
              />
            </div>
          </div>
        <div className="toolbar">
          <ul>{items}</ul>
        </div>
        </div>
      </div>
    );
  }
}
