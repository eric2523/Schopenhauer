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
        <ProfileBio />
      </div>
    )
  }
}

const mSTP = (state) => ({
  users: state.entities.users
})

export const ProfilePage = connect(mSTP, null)(ProfileIndex) 