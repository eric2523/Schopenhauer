import React from "react";
import { VisualizerItemContainer } from "../visualizers/visualizer";
import { defaultFrequencySettings } from "../visualizers/basic_frequency_visualizer";
import { defaultSphereSettings } from "../visualizers/nate_visualizer_1";
import { defaultSquareSettings } from "../visualizers/basic_square_visualizer";
import { defaultRingSettings } from "../visualizers/ring_visualizer";
import { withRouter } from "react-router-dom";
import { uploadVisualizer } from "../../actions/visualizer_actions";
import { connect } from "react-redux";
import { prepSettings } from "../../util/visualizer_util";
import { defaultBarsSettings } from "../visualizers/eric-visualizer1";

const mSTP = (state) => ({
  userId: state.session.user.id,
});

const mDTP = (dispatch) => ({
  uploadVisualizer: (visualizer) => dispatch(uploadVisualizer(visualizer)),
});

class TemplatesIndex extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(type) {
    return (e) => {
      switch (type) {
        case "frequency":
          this.props
            .uploadVisualizer(
              prepSettings(defaultFrequencySettings, this.props.userId)
            )
            .then((payload) => {
              this.props.history.push(`/visualizers/${payload.visualizer._id}`);
            });
          break;
        case "sphere":
          this.props
            .uploadVisualizer(
              prepSettings(defaultSphereSettings, this.props.userId)
            )
            .then((payload) =>
              this.props.history.push(`/visualizers/${payload.visualizer._id}`)
            );
          break;
        case "bars":
          this.props
            .uploadVisualizer(
              prepSettings(defaultBarsSettings, this.props.userId)
            )
            .then((payload) =>
              this.props.history.push(`/visualizers/${payload.visualizer._id}`)
            );
          break;
        case "square":
          this.props
            .uploadVisualizer(
              prepSettings(defaultSquareSettings, this.props.userId)
            )
            .then((payload) =>
              this.props.history.push(`/visualizers/${payload.visualizer._id}`)
            );
          break;
        case "ring":
          this.props
            .uploadVisualizer(
              prepSettings(defaultRingSettings, this.props.userId)
            )
            .then((payload) =>
              this.props.history.push(`/visualizers/${payload.visualizer._id}`)
            );
          break;
        default:
          break;
      }
    };
  }

  render() {
    return (
      <div className="templates">
        <header className="templates-header">
          <div className="templ-header-left">
            <h1>Pick your starting point.</h1>
          </div>
          <div className="templ-header-right">
            <h2>
              Get started with any of our best-in-class audio visualizers and
              customize it to fit your needs, whether it's tweaking amplitudes
              or color pallettes. Making a beautiful visualizer has never been
              faster.
            </h2>
          </div>
        </header>
        <div className="default-templates">
          <ul>
            <li onClick={this.handleClick("frequency")}>
              <div className="li-inner-div">
                <VisualizerItemContainer
                  canvasWidth={450}
                  canvasHeight={250}
                  // toolbox={false}
                  visualizerSettings={defaultFrequencySettings}
                  onTemplate={true}
                />
              </div>
              <h1>Frequency Visualizer</h1>
            </li>

            <li onClick={this.handleClick("sphere")}>
              <div className="li-inner-div">
                <VisualizerItemContainer
                  canvasWidth={450}
                  canvasHeight={250}
                  // toolbox={false}
                  visualizerSettings={defaultSphereSettings}
                  onTemplate={true}
                />
              </div>
              <h1>Sphere Visualizer</h1>
            </li>
            <li onClick={this.handleClick("bars")}>
              <div className="li-inner-div">
                <VisualizerItemContainer
                  canvasWidth={450}
                  canvasHeight={250}
                  // toolbox={false}
                  visualizerSettings={defaultBarsSettings}
                  onTemplate={true}
                />
              </div>
              <h1>Bars Visualizer</h1>
            </li>
            <li onClick={this.handleClick("square")}>
              <div className="li-inner-div">
                <VisualizerItemContainer
                  canvasWidth={450}
                  canvasHeight={250}
                  visualizerSettings={defaultSquareSettings}
                  onTemplate={true}
                />
              </div>
              <h1>Square Visualizer</h1>
            </li>

            <li onClick={this.handleClick("ring")}>
              <div className="li-inner-div">
                <VisualizerItemContainer
                  canvasWidth={450}
                  canvasHeight={250}
                  // toolbox={false}
                  visualizerSettings={defaultRingSettings}
                  onTemplate={true}
                />
              </div>
              <h1>Ring Visualizer</h1>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export const TemplatesIndexContainer = withRouter(
  connect(mSTP, mDTP)(TemplatesIndex)
);
