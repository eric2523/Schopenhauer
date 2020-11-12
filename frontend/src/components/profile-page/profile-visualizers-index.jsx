import React from "react";
import { connect } from "react-redux";
import { getVisualizersByUserId } from "../../reducers/selectors/visualizer_selectors";
import {
  fetchUserVisualizer,
  deleteVisualizer,
} from "../../actions/visualizer_actions";
import { withRouter } from 'react-router-dom';
import { ProfileVisualizerItem } from "./profile-visualizer-item";
import { uploadVisualizer } from "../../actions/visualizer_actions";
import { prepSettings } from "../../util/visualizer_api_util";

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
    uploadVisualizer: (visualizer) => dispatch(uploadVisualizer(visualizer))
  };
};

class ProfileVisualizerIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disconnectMusic: null,
      startPlaying: null,
      hovering: null,
      loading: true,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleHover = this.handleHover.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleTemplate = this.handleTemplate.bind(this);
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
    this.setState({loading: false});
  }


  handleEdit(id){
    return () => {
      this.props.history.push(`/visualizers/${id}`)
    }
  }

  handleTemplate(i){
    return () => {
      const templateVisualizer = this.props.visualizers[i];
      // templateVisualizer.userId = this.props.match.params.id
      this.props.uploadVisualizer(prepSettings(templateVisualizer, this.props.currentUser.id))
        .then((payload) =>{
          this.props.history.push(`/visualizers/${payload.visualizer._id}`);
        })
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
                  onHover={this.state.loading ? "loading" : true}
                  key={visualizer._id}
                  visualizer={visualizer}
                  deleteVisualizer={this.props.deleteVisualizer}
                />
              </div>
              <div className="vis-item-meta">
                <div>
                  <div className="visualizer-title">
                    {visualizer.name ? visualizer.name : "Untitled"}
                  </div>
                  <div>
                  <button
                        onClick={this.handleTemplate(i)}
                        className="template-btn"
                        data-tooltip="Use as template" 
                        data-position="top center"
                        data-inverted=""
                        >
                        <i className="fas fa-palette"></i>
                      </button>
                  </div>
                </div>
                {this.props.self ? (
                  <div className="vis-item-buttons">
                    <button
                      onClick={this.handleDelete(visualizer._id)}
                      className="delete-btn"
                      data-tooltip="Delete" 
                      data-position="top center"
                      data-inverted=""
                    >
                      <i className="trash icon"></i>
                    </button>
                    {/* <div className="tooltip">Delete</div> */}
                    <button
                    onClick={this.handleEdit(visualizer._id)}
                    className="edit-btn"
                    data-tooltip="Edit" 
                    data-position="top center"
                    data-inverted=""
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

export const ProfileVisualizerIndexContainer = withRouter(connect(
  mSTP,
  mDTP
)(ProfileVisualizerIndex));
