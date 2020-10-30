import React from 'react'
import { connect } from 'react-redux';

const mSTP = (state, ownProps) => {
  return {
    user: state.entities.users[ownProps.match.params.userId],
    currentUser: state.session.user
  }
}

const mDTP = (dispatch) => {
  return {
    
  }
}

export class ProfileBio extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    return(
      <div>
        Profile Bio
      </div>
    )
  }
}