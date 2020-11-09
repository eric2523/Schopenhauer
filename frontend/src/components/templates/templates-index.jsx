import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { uploadVisualizer } from "../../actions/visualizer_actions";
import { prepSettings } from "../../util/visualizer_api_util";
import {
  selectAllVisualizerTypes,
  visualizerConstructors,
} from "../../util/visualizer_constructor_util";

import { VisualizerItemContainer } from "../visualizers/visualizer_item";

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
    this.allVisualizers = selectAllVisualizerTypes;

    this.state = {
      disconnectMusic: true,
      itemClassName: "li-inner-div",
    };

    this.handleClick = this.handleClick.bind(this);
    this.toggleMusic = this.toggleMusic.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ itemClassName: "li-inner-div li-inner-div-color" });
    }, 250);
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

  toggleMusic(){
    this.setState({disconnectMusic: !this.state.disconnectMusic})
  }

  render() {
    const visualizerItems = this.allVisualizers.map((type) => (
      <li className="templ-li" onClick={this.handleClick(type)} key={type}>
        <div className="template-prompt">Use as template</div>
        <div className={this.state.itemClassName}>
          <VisualizerItemContainer
            canvasWidth={400}
            canvasHeight={250}
            toolbox={false}
            visualizerSettings={visualizerConstructors[type].defaultSettings}
            onTemplate={true}
            disconnectMusic={this.state.disconnectMusic}
          />
        </div>
        <h1 className="templ-visualizer-h1">{type}</h1>
      </li>
    ));

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
                    <div 
            className="template-audio" 
            onClick={this.toggleMusic}>
            {!this.state.disconnectMusic ?
              <i className="big volume up icon"></i> :
              <i className="big volume off icon"></i>
            } 
          </div>

          <ul>{visualizerItems}</ul>

        </div>
      </div>
    );
  }
}

export const TemplatesIndexContainer = withRouter(
  connect(mSTP, mDTP)(TemplatesIndex)
);
