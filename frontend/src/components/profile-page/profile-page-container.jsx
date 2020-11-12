import React from "react";
import { connect } from "react-redux";
import { ProfileBio } from "./profile-bio";
import { ProfileVisualizerIndexContainer } from "./profile-visualizers-index";
import { getVisualizersByUserId } from "../../reducers/selectors/visualizer_selectors";
import { ConnectedFloatingDotsVisualizer } from "../visualizers/visualizer_templates/floating_particles_with_connection";
import { BeatDetection } from "../visualizers/beat_detection";
import { getUser } from "../../actions/user_actions";
import { UserIndex } from "./user-index";
import { UserModal } from './user-modal';

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
      modal: null
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
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
    this.setState({modal: null})
    window.removeEventListener("resize", this.updateVisualizer);
    cancelAnimationFrame(this.state.rafId);
  }

  componentDidUpdate(prevProps){
    if(prevProps.match.params.id !== this.props.match.params.id){
      this.closeModal();
    }
  }

  animation(canvas) {
    this.state.visualizer.animate(canvas, this.state);
  }
  tick() {
    this.animation(this.canvas.current);
    this.setState({ rafId: requestAnimationFrame(this.tick) });
  }

  //event handler to be passed down to child
  //allows user to change rendered page to follows/followers
  openModal(type){
    return () => {
      this.setState({modal: type});
      document.body.classList.add('modal-open');
    }
  }

  closeModal(){
    this.setState({modal: null});
    document.body.classList.remove('modal-open');
  }

  render() {
    if (!this.props.user) {
      return null;
    }

    const self = this.props.user.id === this.props.currentUser.id;
    
    //conditionally render followers/follows modal
    let modal = null; 
    if(this.state.modal === 'followers'){
      modal = <UserModal
        users={this.props.user.followers}
        title={'Followers'}
        closeModal={this.closeModal}
      />;
    } else if (this.state.modal === 'follows'){
      modal = <UserModal
        users={this.props.user.follows}
        title={'Following'}
        closeModal={this.closeModal}
      />;
    }
    return (
      <>
      {modal}
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
            openModal={this.openModal}
          />
        </div>
        <ProfileVisualizerIndexContainer
          self={self}
          userId={this.props.user.id}
          currentUser={this.props.currentUser}
        />
      </div>
      </>
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
