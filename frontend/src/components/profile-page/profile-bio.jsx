import React from 'react'
import { connect } from 'react-redux';

const mSTP = (state, ownProps) => {
  return {
    user: state.entities.users[ownProps.match.params.id],
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
        {this.props.user.email}
        {this.props.user.username}
      </div>
    )
  }
}
