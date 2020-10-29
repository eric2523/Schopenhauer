import React from 'react'
import { connect } from 'react-redux'

class ProfileIndex extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    return(
      <div>
        Profile index
      </div>
    )
  }
}

const mSTP = (state) => ({
  users: state.entities.users
})

export const ProfilePage = connect(mSTP, null)(ProfileIndex) 