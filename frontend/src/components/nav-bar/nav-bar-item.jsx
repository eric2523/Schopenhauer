import React from "react";
import { NavLink } from "react-router-dom";

export class NavBarItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <NavLink to={this.props.path}>
        <li>{this.props.name}</li>
      </NavLink>
    );
  }
}
