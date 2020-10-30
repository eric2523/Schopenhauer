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
    // this.state= {
    //   connectMusic: null
    // }
  }

  componentDidMount() {
    this.props.fetchUserVisualizer();
  }

  render() {
    const usersVisualizers = this.props.visualizers.length
      ? this.props.visualizers.map((visualizer, i) => {
          return (
            <ProfileVisualizerItem
              key={i}
              visualizer={visualizer}
              deleteVisualizer={this.props.deleteVisualizer}
            />
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
