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
      disconnectMusic: null,
      startPlaying: null,
      hover: null
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleHover = this.handleHover.bind(this);
  }

  componentDidMount() {
    this.props.fetchUserVisualizer();
  }

  handleClick(i){
    return () => {
      if(this.state.disconnectMusic === i){
        this.setState({disconnectMusic: null})
      } else{ 
        this.setState({disconnectMusic: i})
      }
    }
  }

  handleHover(i){
    return () => {
      this.setState({hover: i})
    }
  }

  handleDelete(id){
    // debugger
    return () => {
      this.props.deleteVisualizer(id)
    }
  }

  render() {
    const usersVisualizers = this.props.visualizers.length
      ? this.props.visualizers.map((visualizer, i) => {
          return (
            <li key={i} className="column">
              <div className="visualizer-title">
              {visualizer.name}
              </div>
              <div 
                id={this.state.disconnectMusic === i ? 
                'vis-playing' : ''}
                className="item-overlay" //{this.state.hover === i ? "item-overlay" : ""} 
                onClick={this.handleClick(i)}
                // onHover={this.handleHover(i)}
                >
                {this.state.disconnectMusic === i ?
                <i id="profile-play" className="big volume up icon"></i> :
                <i id="profile-play" className="big volume off icon"></i>
                }
                <ProfileVisualizerItem
                  disconnectMusic={
                    this.state.disconnectMusic === i ? false : true
                  }
                  // startPlaying={
                  //   this.state.startPlaying === i ? true : false
                  // }
                  onHover={true}
                  key={i}
                  visualizer={visualizer}
                  deleteVisualizer={this.props.deleteVisualizer}
                />
              </div>
              <button className="ui button" onClick={this.handleDelete(visualizer._id)}>
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
