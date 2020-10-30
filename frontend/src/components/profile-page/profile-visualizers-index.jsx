import React from "react";
import { connect } from "react-redux";
import { getVisualizersByUserId } from "../../reducers/selectors/visualizer_selectors";
import {
  fetchUserVisualizer,
  deleteVisualizer,
} from "../../actions/visualizer_actions";
import { ProfileVisualizerItem } from "./profile-visualizer-item";

const mSTP = (state, ownProps) => {
  return {
    visualizers: getVisualizersByUserId(
      ownProps.userId,
      state.entities.visualizers
    ),
  };
};

const mDTP = (dispatch, ownProps) => {
  return {
    fetchUserVisualizer: () => dispatch(fetchUserVisualizer(ownProps.userId)),
    deleteVisualizer: (visualizerId) =>
      dispatch(deleteVisualizer(visualizerId)),
  };
};

class ProfileVisualizerIndexComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      connectMusic: null,
      startPlaying: null
    }
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.props.fetchUserVisualizer();
  }

  handleClick(i){
    return () => {
      this.setState({connectMusic: i, startPlaying: i})
    }
  }

  render() {
    const usersVisualizers = this.props.visualizers.length
      ? this.props.visualizers.map((visualizer, i) => {
          return (
            <li className="column">
              <div className="visualizer-title">
              {visualizer.name}
              </div>
              <div className="item-overlay">
                <ProfileVisualizerItem
                  connectMusic={
                    this.state.connectMusic === i ? true : false
                  }
                  startPlaying={
                    this.state.startPlaying === i ? true : false
                  }
                  key={i}
                  visualizer={visualizer}
                  deleteVisualizer={this.props.deleteVisualizer}
                />
              </div>
              <button className="ui button" onClick={this.handleDelete}>
                <i className="trash icon"></i>
              </button>
            </li>
          );
        })
      : [];
    return <ul className="ui three column grid">{usersVisualizers}</ul>;
  }
}

export const ProfileVisualizerIndex = connect(
  mSTP,
  mDTP
)(ProfileVisualizerIndexComponent);
