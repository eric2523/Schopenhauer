import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { followUser, unfollowUser } from "../../actions/user_actions";

const mSTP = (state, ownProps) => {
  return {
    isFollowing: ownProps.followers.includes(ownProps.currentUser.id)
  }
}

const mDTP = (dispatch, ownProps) => {
  return {
    follow:  () => dispatch(followUser(ownProps.currentUser.id, ownProps.user.id)),
    unfollow:  () => dispatch(unfollowUser(ownProps.currentUser.id, ownProps.user.id))
  }
}

class ProfileBioComponent extends React.Component {
  constructor(props){
    super(props)
    this.toggleFollow = this.toggleFollow.bind(this);
  }

  toggleFollow(){
    if(this.props.isFollowing){
      this.props.unfollow()
    } else {
      this.props.follow()
    }
  }

  render(){
    const buttonText = this.props.isFollowing ?
    "Unfollow" : "Follow";
    // console.log(this.props.photoUrl);
    // const handle = 
    //   this.props.user.username ? 
    //   this.props.user.username : 
    //   this.props.user.email
    return(
      <div className="profile-bio">
        {this.props.photoUrl ? 
        <div className='img-container'>
          <img 
            alt="Profile"
            src={this.props.photoUrl} 
            className="prof-photo"
            >
          </img>
        </div>
        // : <i className="fas fa-user"></i>} 
        : <i className="user icon"></i> } 
          {/* //default user icon  */}
        {this.props.self ? 
        <div 
        onClick={this.props.openModal('photo')}
        className="edit-photo">
          <i className="fas fa-camera"></i>
        </div> : null}
        <div className="profile-bio-right">
          <div className="profile-title">
            <div>
              {this.props.user.username}
            </div>
            <div>
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
            </div>
          <div className="profile-stats">
            <div>Visualizers: &nbsp; {this.props.count}</div>
            <div onClick={this.props.openModal('followers')}>Followers: &nbsp; {this.props.followers.length}</div>
            <div onClick={this.props.openModal('follows')}>Following: &nbsp; {this.props.follows.length}</div>
          </div>
        </div>
      </div>     
    )
  }
}

export const ProfileBio = withRouter(connect(mSTP, mDTP)(ProfileBioComponent));