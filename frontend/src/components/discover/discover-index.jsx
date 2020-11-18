import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { DiscoverItemContainer } from "./discover-item";

const mSTP = (state) => {
  return {
    users: Object.values(state.entities.users)
  }
}


class Discover extends React.Component{
  constructor(props){
    super(props);   
  }

  componentDidMount(){

  }

  render(){
    if(!this.props.users) return null;
    const userList = this.props.users.length ?
      this.props.users.map((user, i) => {
        return <DiscoverItemContainer key={i} user={user} />
      }) : [];
    console.log(userList);
    return (
      <div className="discover-page">
        <header className="templates-header full">
          <h1 className="templ-header-title">
            Discover other Creators
          </h1>
        </header>
        <div className='seperator'>Some corny catchphrase</div>
        <ul className="discover-list">
          {userList}
        </ul>
      </div>
    )
  }
}

export const DiscoverContainer = connect(mSTP)(Discover);