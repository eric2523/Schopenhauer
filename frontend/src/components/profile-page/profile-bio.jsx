import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { followUser, unfollowUser } from "../../actions/user_actions";

// const mSTP = (state, ownProps) => {
//   return {
//     isFollowing: ownProps.followers.includes(ownProps.currentUser.id)
//   }
// }

const mDTP = (dispatch, ownProps) => {
  return {
    follow:  () => dispatch(followUser(ownProps.currentUser.id, ownProps.user.id)),
    unfollow:  () => dispatch(unfollowUser(ownProps.currentUser.id, ownProps.user.id))
  }
}

class ProfileBioComponent extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      isFollowing: this.props.followers.includes(this.props.currentUser.id)
    }
    this.toggleFollow = this.toggleFollow.bind(this);
  }

  toggleFollow(){
    if(this.state.isFollowing){
      this.props.unfollow().then(
        this.setState({isFollowing: false})
      );
    } else {
      this.props.follow().then(
        this.setState({isFollowing: true})
      );
    }
  }

  render(){
    const buttonText = this.state.isFollowing ?
    "Unfollow" : "Follow";
    // const handle = 
    //   this.props.user.username ? 
    //   this.props.user.username : 
    //   this.props.user.email
    return(
      <div className="profile-bio">
        <i className="fas fa-user"></i>
        <div className="profile-bio-right">
          <div className="profile-title">
            <div>
              {this.props.user.username}
            </div>
            {!this.props.self ? 
            <button 
            id="follow-btn"
            className="ui button"
            onClick={this.toggleFollow}
            >
              {buttonText}
            </button>
            : null}
            </div>
          <div className="profile-stats">
            <div>Visualizers: &nbsp; {this.props.count}</div>
            <div>Followers: &nbsp; {this.props.followers.length}</div>
            <div>Following: &nbsp; {this.props.follows.length}</div>
          </div>
        </div>
      </div>     
    )
  }
}

export const ProfileBio = withRouter(connect(null, mDTP)(ProfileBioComponent));