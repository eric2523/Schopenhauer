import React from "react";
import { connect } from "react-redux";
import { ProfileBio } from "./profile-bio";
import { ProfileVisualizerIndexContainer } from "./profile-visualizers-index";
import { getVisualizersByUserId } from "../../reducers/selectors/visualizer_selectors";
import { ConnectedFloatingDotsVisualizer } from "../visualizers/visualizer_templates/floating_particles_with_connection";
import { BeatDetection } from "../visualizers/beat_detection";
import { getUser } from "../../actions/user_actions";
class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.canvas = React.createRef();
    this.state = {
      mouse: {
        x: 0,
        y: 0,
        radius: 50,
      },
      beatDetection: new BeatDetection(),
      visualizer: null,
      rafId: null,
    };
    this.tick = this.tick.bind(this);
    this.updateVisualizer = this.updateVisualizer.bind(this);
    this.initializeCanvas = this.initializeCanvas.bind(this);
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateVisualizer);
    if (!this.props.user) {
      console.log("no user");
      this.props.getUser().then(this.initializeCanvas);
    } else {
      this.initializeCanvas();
    }
  }

  updateVisualizer() {
    cancelAnimationFrame(this.state.rafId);
    this.initializeCanvas();
  }

  initializeCanvas() {
    const width = window.innerWidth || window.clientWidth;
    const height = window.innerHeight || window.clientHeight;
    this.canvas.current.height = height * 0.3;
    this.canvas.current.width = width;
    this.setState(
      {
        visualizer: new ConnectedFloatingDotsVisualizer(this.canvas.current),
      },
      () => this.tick()
    );
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateVisualizer);
    cancelAnimationFrame(this.state.rafId);
  }

  animation(canvas) {
    this.state.visualizer.animate(canvas, this.state);
  }
  tick() {
    this.animation(this.canvas.current);
    this.setState({ rafId: requestAnimationFrame(this.tick) });
  }

  render() {
    if (!this.props.user) {
      return null;
    }
    const self = this.props.user.id === this.props.currentUser.id;

    return (
      <div className="profile-index">
        <canvas className="header-bg" ref={this.canvas}></canvas>
        <div className="profile-header">
          <ProfileBio
            user={this.props.user}
            followers={this.props.user.followers}
            follows={this.props.user.follows}
            count={this.props.visualizers.length}
            self={self}
            currentUser={this.props.currentUser}
          />
        </div>
        <ProfileVisualizerIndexContainer
          self={self}
          userId={this.props.user.id}
        />
      </div>
    );
  }
}

const mSTP = (state, ownProps) => {
  return {
    visualizers: getVisualizersByUserId(
      ownProps.match.params.id,
      state.entities.visualizers
    ),
    user: state.entities.users[ownProps.match.params.id],
    currentUser: state.entities.users[state.session.user.id],
  };
};

const mDTP = (dispatch, ownProps) => {
  return {
    getUser: () => dispatch(getUser(ownProps.match.params.id)),
  };
};

export const ProfilePageContainer = connect(mSTP, mDTP)(ProfilePage);
