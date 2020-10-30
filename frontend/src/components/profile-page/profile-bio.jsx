import React from 'react'

export class ProfileBio extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    return(
      <div className="profile-bio">
        <i className="fas fa-user"></i>
        {this.props.user.email}
        {this.props.user.username}
      </div>
    )
  }
}
