import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { followUser, unfollowUser } from "../../actions/user_actions";


const mSTP = (state, ownProps) => {
  return {
    currentUserId: state.session.user.id,
    isFollowing: state.entities.users[state.session.user.id].follows.includes(ownProps.user.id)
  }
}

const mDTP = (dispatch, ownProps) => {
  return {
    follow: (currentUserId) => dispatch(followUser(currentUserId, ownProps.user.id)),
    unfollow: (currentUserId) => dispatch(unfollowUser(currentUserId, ownProps.user.id))
  }
}

class DiscoverItem extends React.Component {
  constructor(props){
    super(props);
    this.toggleFollow = this.toggleFollow.bind(this);
  }

  toggleFollow(){
    if(this.props.isFollowing){
      this.props.unfollow(this.props.currentUserId)
    } else {
      this.props.follow(this.props.currentUserId)
    }
  }

  render(){
    const buttonText = this.props.isFollowing ?
    "Unfollow" : "Follow";

    return (
      <li className="discover-item-container">
        <div className="discover-item-left">
          <Link className="photo-link" to={`/profile/${this.props.user.id}`}>
            {this.props.user.photoUrl ? 
            <img alt='Preview' src={this.props.user.photoUrl}></img>
          : <i className="fas fa-user"></i>}
          </Link>
          <div>
            <Link to={`/profile/${this.props.user.id}`}>
              <div>{this.props.user.username}</div>
            </Link>
            <div>Visualizers: &nbsp; {
            this.props.user.visualizers ? 
            this.props.user.visualizers.length : 
            this.props.user.visualizerCount }</div>
            <div>Followers: &nbsp; {
            this.props.followerCount }</div>
          </div>
        </div>
        {this.props.currentUserId !== this.props.user.id ? 
          <button 
          id="follow-btn"
          className="ui button"
          onClick={this.toggleFollow}
          >
            {buttonText}
          </button>
        : null}
      </li>
    )
  }
  
}

export const DiscoverItemContainer = connect(mSTP, mDTP)(DiscoverItem);