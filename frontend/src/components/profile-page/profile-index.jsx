import React from 'react'
import { connect } from 'react-redux'
import { ProfileBio } from "./profile-bio"
import { ProfileVisualizerIndex } from "./profile-visualizers-index"


class ProfileIndex extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    if(!this.props.user){
      return null
    }
    return(
      <div className="profile-index">
        <ProfileBio user={this.props.user}/>
        <ProfileVisualizerIndex userId={this.props.user.id}/>
      </div>
    )
  }
}

const mSTP = (state, ownProps) => {

  return {
  // users: state.entities.users,
  user: state.entities.users[ownProps.match.params.id],
}}

export const ProfilePage = connect(mSTP, null)(ProfileIndex) 