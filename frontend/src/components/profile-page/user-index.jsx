import React from "react";
import { UserItemContainer } from "./user-item";

export class UserIndex extends React.Component{
  constructor(props){
    super(props)
    this.listRef = React.createRef();
  }


  render(){
    const userList = this.props.users.length ? 
    this.props.users.map((userId, i) => {
      return <UserItemContainer userId={userId} key={i}/>;
    }) : [] ;

    return(
      <div className="user-index-container">
        <h1 className="user-index-title">{this.props.title}</h1>
        <ul 
          className="user-list"
          ref={this.listRef}
          >
          {/* Load all user list items before rendering the list */}
          {userList}
        </ul>
      </div>
    );
  }
}