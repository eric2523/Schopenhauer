import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getVisualizersByUserId } from "../../reducers/selectors/visualizer_selectors";
import { getUserAndVisualizers } from "../../actions/user_actions";

const mSTP = (state, ownProps) => {
  return {
    user: state.entities.users[ownProps.userId],
    visualizers: getVisualizersByUserId(
      ownProps.userId,
      state.entities.visualizers
    ),
  }
}

const mDTP = (dispatch, ownProps) => {
  return {
    getUser: () => dispatch(getUserAndVisualizers(ownProps.userId))
  }
}


class UserItem extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.getUser();
  }

  render(){
    //placeholder for loading
    if (!this.props.user) return <li className="user-item"></li>; 
    
    return (
      <Link to={`/profile/${this.props.userId}`}>
      <li className="user-item">
        <i className="fas fa-user"></i>
        <div>
          <div>{this.props.user.username}</div>
          <div>Visualizers: &nbsp; {this.props.visualizers.length}</div>
        </div>
      </li>
      </Link>
    )
  }
}

export const UserItemContainer = connect(mSTP, mDTP)(UserItem);