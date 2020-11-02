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

class ProfileVisualizerIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disconnectMusic: null,
      startPlaying: null,
      hovering: null,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleHover = this.handleHover.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleClick(i) {
    return () => {
      if (this.state.disconnectMusic === i) {
        this.setState({ disconnectMusic: null });
      } else {
        this.setState({ disconnectMusic: i });
      }
    };
  }

  handleMouseLeave(i) {
    return () => {
      if (this.state.disconnectMusic === i) {
        this.setState({ disconnectMusic: null, hovering: null });
      } else {
        this.setState({ hovering: null });
      }
    };
  }

  handleHover(i) {
    return () => {
      this.setState({ hovering: i });
    };
  }

  handleDelete(id) {
    return () => {
      this.props.deleteVisualizer(id);
    };
  }

  componentDidMount() {
    this.props.fetchUserVisualizer();
  }

  handleEdit(id){
    return () => {
      this.props.history.push(`/visualizers/${id}`)
    }
  }

  render() {
    const usersVisualizers = this.props.visualizers.length
      ? this.props.visualizers.map((visualizer, i) => {
          return (
            <li key={visualizer._id} className="vis-item">
              <div
                id={this.state.disconnectMusic === i ? "vis-playing" : ""}
                className="li-inner-div-color item-overlay" //{this.state.hover === i ? "item-overlay" : ""}
                onClick={this.handleClick(i)}
                onMouseLeave={this.handleMouseLeave(i)}
                onMouseEnter={this.handleHover(i)}
              >
                {this.state.disconnectMusic === i ? (
                  <i id="profile-play" className="big volume up icon"></i>
                ) : (
                  <i id="profile-play" className="big volume off icon"></i>
                )}
                <ProfileVisualizerItem
                  disconnectMusic={
                    this.state.disconnectMusic === i ? false : true
                  }
                  onHover={true}
                  key={visualizer._id}
                  visualizer={visualizer}
                  deleteVisualizer={this.props.deleteVisualizer}
                />
              </div>
              <div className="vis-item-meta">
                <div className="visualizer-title">
                  {visualizer.name ? visualizer.name : "Untitled"}
                </div>
                {this.props.self ? (
                  <div className="vis-item-buttons">
                    <button
                      onClick={this.handleDelete(visualizer._id)}
                      className="delete-btn"
                    >
                      <i className="trash icon"></i>
                    </button>
                    <button
                    onClick={this.handleEdit(visualizer._id)}
                    className="edit-btn"
                  >
                    <i className="edit icon"></i>
                  </button>
                </div>
                ) : (
                  ""
                )}
              </div>
            </li>
          );
        })
      : [];
    return <ul className="vis-list">{usersVisualizers}</ul>;
  }
}

export const ProfileVisualizerIndexContainer = connect(
  mSTP,
  mDTP
)(ProfileVisualizerIndex);
