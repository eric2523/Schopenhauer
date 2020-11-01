import React from "react";
import { VisualizerItemContainer } from "../visualizers/visualizer";
import { defaultFrequencySettings } from "../visualizers/basic_frequency_visualizer";
import { defaultSphereSettings } from "../visualizers/nate_visualizer_1";
import { defaultSquareSettings } from "../visualizers/basic_square_visualizer";
import { defaultRingSettings } from "../visualizers/ring_visualizer";
import { defaultBarsSettings } from "../visualizers/eric-visualizer1";
import { withRouter } from "react-router-dom";
import { uploadVisualizer } from "../../actions/visualizer_actions";
import { connect } from "react-redux";
import { prepSettings } from "../../util/visualizer_api_util";

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

  componentDidMount() {
    let visualizerItems = document.getElementsByClassName("li-inner-div");
    for (let i = 0; i < visualizerItems.length; i++) {
      window.setTimeout(() => {
        visualizerItems[i].classList.add("li-inner-div-color");
      }, 250);
    }
  }

  componentWillUnmount() {
    let visualizerItems = document.getElementsByClassName("li-inner-div");
    for (let i = 0; i < visualizerItems.length; i++) {
      visualizerItems[i].classList.remove("li-inner-div-color");
    }
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
            <li className="templ-li" onClick={this.handleClick("frequency")}>
              <div className="li-inner-div">
                <VisualizerItemContainer
                  canvasWidth={400}
                  canvasHeight={250}
                  // toolbox={false}
                  visualizerSettings={defaultFrequencySettings}
                  onTemplate={true}
                />
              </div>
              <h1 className="templ-visualizer-h1">Frequency</h1>
            </li>

            <li className="templ-li" onClick={this.handleClick("sphere")}>
              <div className="li-inner-div">
                <VisualizerItemContainer
                  canvasWidth={400}
                  canvasHeight={250}
                  // toolbox={false}
                  visualizerSettings={defaultSphereSettings}
                  onTemplate={true}
                />
              </div>
              <h1 className="templ-visualizer-h1">Sphere</h1>
            </li>
            <li className="templ-li" onClick={this.handleClick("bars")}>
              <div className="li-inner-div">
                <VisualizerItemContainer
                  canvasWidth={400}
                  canvasHeight={250}
                  // toolbox={false}
                  visualizerSettings={defaultBarsSettings}
                  onTemplate={true}
                />
              </div>
              <h1 className="templ-visualizer-h1">Bars</h1>
            </li>
            <li className="templ-li" onClick={this.handleClick("square")}>
              <div className="li-inner-div">
                <VisualizerItemContainer
                  canvasWidth={400}
                  canvasHeight={250}
                  visualizerSettings={defaultSquareSettings}
                  onTemplate={true}
                />
              </div>
              <h1 className="templ-visualizer-h1">Square</h1>
            </li>

            <li className="templ-li" onClick={this.handleClick("ring")}>
              <div className="li-inner-div">
                <VisualizerItemContainer
                  canvasWidth={400}
                  canvasHeight={250}
                  // toolbox={false}
                  visualizerSettings={defaultRingSettings}
                  onTemplate={true}
                />
              </div>
              <h1 className="templ-visualizer-h1">Ring</h1>
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
