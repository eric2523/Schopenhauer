import React from "react";
import { VisualizerItemContainer } from "../visualizers/visualizer";
import { defaultFrequencySettings } from "../visualizers/basic_frequency_visualizer";
import { defaultSphereSettings } from "../visualizers/nate_visualizer_1";
import { Link } from "react-router-dom";

export class TemplatesIndex extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="templates">
        <div className="default-templates">
          <ul>
            <Link
              to={{
                pathname: "/visualizer/edit",
                state: {
                  visualizerSettings: defaultFrequencySettings,
                },
              }}
            >
              <li>
                <h1>Frequency Visualizer</h1>
                <VisualizerItemContainer
                  canvasWidth={450}
                  canvasHeight={450}
                  toolbox={false}
                  visualizerSettings={defaultFrequencySettings}
                />
              </li>
            </Link>
            <Link
              to={{
                pathname: "/visualizer/edit",
                state: {
                  visualizerSettings: defaultSphereSettings,
                },
              }}
            >
              <li>
                <h1>Sphere Visualizer</h1>
                <VisualizerItemContainer
                  canvasWidth={450}
                  canvasHeight={450}
                  toolbox={false}
                  visualizerSettings={defaultSphereSettings}
                />
              </li>
            </Link>
          </ul>
        </div>
      </div>
    );
  }
}
