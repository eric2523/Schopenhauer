import React from 'react'
import { connect } from 'react-redux'
import {ProfileBio} from "./profile-bio"

class ProfileIndex extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    return(
      <div>
        Profile index
        <ProfileBio user={this.props.user}/>
      </div>
    )
  }
}

const mSTP = (state, ownProps) => ({
  // users: state.entities.users,
  user: state.entities.users[ownProps.match.params.id],
})

export const ProfilePage = connect(mSTP, null)(ProfileIndex) 