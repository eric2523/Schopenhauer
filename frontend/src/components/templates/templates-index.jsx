import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { uploadVisualizer } from "../../actions/visualizer_actions";
import { prepSettings } from "../../util/visualizer_api_util";

import { VisualizerItemContainer } from "../visualizers/visualizer_item";
import {
  selectAllVisualizerTypes,
  visualizerConstructors,
} from "../../util/visualizer_constructor_util";

const mSTP = (state) => ({
  userId: state.session.user.id,
});

const mDTP = (dispatch) => ({
  uploadVisualizer: (visualizerSettings) =>
    dispatch(uploadVisualizer(visualizerSettings)),
});

class TemplatesIndex extends React.Component {
  constructor(props) {
    super(props);
    const allVisualizers = selectAllVisualizerTypes;

    this.visualizerItems = allVisualizers.map((type) => (
      <li className="templ-li" onClick={this.handleClick(type)}>
        <div className="li-inner-div">
          <VisualizerItemContainer
            canvasWidth={400}
            canvasHeight={250}
            visualizerSettings={visualizerConstructors[type].defaultSettings}
            onTemplate={true}
          />
        </div>
        <h1 className="templ-visualizer-h1">{type}</h1>
      </li>
    ));

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
      const defaultSettings = visualizerConstructors[type].defaultSettings;

      this.props
        .uploadVisualizer(prepSettings(defaultSettings, this.props.userId))
        .then((payload) => {
          this.props.history.push(`/visualizers/${payload.visualizer._id}`);
        });
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
          <ul>{this.visualizerItems}</ul>
        </div>
      </div>
    );
  }
}

export const TemplatesIndexContainer = withRouter(
  connect(mSTP, mDTP)(TemplatesIndex)
);
