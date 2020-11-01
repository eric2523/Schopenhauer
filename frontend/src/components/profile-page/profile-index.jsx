import React from 'react'
import { connect } from 'react-redux'
import { ProfileBio } from "./profile-bio"
import { ProfileVisualizerIndex } from "./profile-visualizers-index"
import { getVisualizersByUserId } from "../../reducers/selectors/visualizer_selectors";
import { VisualizerItemContainer } from "../visualizers/visualizer";
import { ConnectedFloatingDotsVisualizer } from "../visualizers/visualizer_templates/floating_particles_with_connection";
class ProfileIndex extends React.Component {
  constructor(props){
    super(props)
    this.canvas = React.createRef();
    this.state = {
      mouse: {
        x: 0,
        y: 0,
        radius: 50,
      },
      visualizer: null,
      rafId: null,
    };
    this.tick = this.tick.bind(this);
  }

  componentDidMount() {
    this.canvas.current.height = window.innerHeight/2;
    this.canvas.current.width = window.innerWidth;
    this.setState(
      {
        visualizer: new ConnectedFloatingDotsVisualizer(this.canvas.current),
      },
      () => this.tick()
    );
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.state.rafId);
  }

  
  animation(canvas) {
    this.state.visualizer.animate(canvas, this.state);
  }
  tick() {
    this.animation(this.canvas.current);
    this.setState({ rafId: requestAnimationFrame(this.tick) });
  }

  render(){
    if(!this.props.user){
      return null
    }
    const self = this.props.user.id === this.props.currentUser.id;

    return(
      <div className="profile-index">
        <canvas
          className="header-bg"
          ref={this.canvas}
        ></canvas>
        <div className="profile-header">
          <ProfileBio 
            user={this.props.user}
            count={this.props.visualizers.length}
            self={self}
          />
        </div>
        <ProfileVisualizerIndex 
          self={self}
          userId={this.props.user.id}
        />
      </div>
    )
  }
}

const mSTP = (state, ownProps) => {

  return {
  visualizers: getVisualizersByUserId(
      ownProps.match.params.id,
      state.entities.visualizers),
  user: state.entities.users[ownProps.match.params.id],
  currentUser: state.entities.users[state.session.user.id]
}}

export const ProfilePage = connect(mSTP, null)(ProfileIndex) 