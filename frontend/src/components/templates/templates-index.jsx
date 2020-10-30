import React from "react";
import { VisualizerItemContainer } from "../visualizers/visualizer";
import { defaultFrequencySettings } from "../visualizers/basic_frequency_visualizer";
import { defaultSphereSettings } from "../visualizers/nate_visualizer_1";
import { withRouter } from "react-router-dom";
import { uploadVisualizer } from "../../actions/visualizer_actions";
import { connect } from "react-redux";
import { prepSettings } from "../../util/visualizer_util";

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
        default:
          break;
      }
    };
  }

  render() {
    return (
      <div className="templates">
        <div className="default-templates">
          <ul>
            <li onClick={this.handleClick("frequency")}>
              <h1>Frequency Visualizer</h1>
              <VisualizerItemContainer
                canvasWidth={450}
                canvasHeight={450}
                // toolbox={false}
                visualizerSettings={defaultFrequencySettings}
                onTemplate={true}
              />
            </li>

            <li onClick={this.handleClick("sphere")}>
              <h1>Sphere Visualizer</h1>
              <VisualizerItemContainer
                canvasWidth={450}
                canvasHeight={450}
                // toolbox={false}
                visualizerSettings={defaultSphereSettings}
                onTemplate={true}
              />
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
