import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { DiscoverItemContainer } from "./discover-item";
import { getAllUsers } from '../../actions/user_actions';

const mSTP = (state) => {
  return {
    users: Object.values(state.entities.users)
  }
}

const mDTP = (dispatch) => {
  return {
    getAllUsers: () => dispatch(getAllUsers()),
  }
}



class Discover extends React.Component{
  constructor(props){
    super(props);   
  }

  componentDidMount(){
    this.props.getAllUsers();
  }

  render(){
    if(!this.props.users) return null;
    const userList = this.props.users.length ?
      this.props.users.map((user, i) => {
        let followerCount = user.followers ? //follower count extracted at this level to force rerender upon following 
        user.followers.length : 
        user.followerCount
        // if(user.id === '5f9c4f68fea31e545fc79683') console.log(user)
        return <DiscoverItemContainer key={i} user={user} followerCount={followerCount}/>
      }) : [];
    return (
      <div className="discover-page">
        <header className="templates-header full">
          <h1 className="templ-header-title">
            Discover other Creators
          </h1>
        </header>
        <div className='seperator'>All Users</div>
        <ul className="discover-list">
          {userList}
        </ul>
      </div>
    )
  }
}




export const DiscoverContainer = connect(mSTP, mDTP)(Discover);