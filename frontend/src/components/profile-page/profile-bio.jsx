import React from 'react'
import { connect } from 'react-redux'

export class ProfileBio extends React.Component {
  constructor(props){
    super(props)
    this.toggleFollow = this.toggleFollow.bind(this);
  }

  toggleFollow(){
    return
  }

  render(){
    const buttonText = "Follow"
    const handle = 
      this.props.user.username ? 
      this.props.user.username : 
      this.props.user.email
    return(
      <div className="profile-bio">
        <i className="fas fa-user"></i>
        <div className="profile-bio-right">
          <div className="profile-title">
            <div>
              {handle}
            </div>
            {this.props.self ? 
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
            <div>Followers: </div>
            <div>Following: </div>
          </div>
        </div>
      </div>     
    )
  }
}
