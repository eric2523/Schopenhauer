import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { openModal } from "../../actions/modal_actions";

export class NavBarItemTEST extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.loggedIn && 
      this.props.name !== 'about' &&
      this.props.name !== 'home'){
      return (
        <div className="nav-redirect" onClick={this.props.openModal}>
          <NavLink
            className="nav-link-li"
            activeClassName="active-blue"
            to={this.props.path}
          >
            <li className="navbar-item-li">{this.props.name}</li>
          </NavLink>
        </div>
      )
    }
    return (
      <NavLink
        className="nav-link-li"
        activeClassName="active-blue"
        to={this.props.path}
      >
        <li className="navbar-item-li">{this.props.name}</li>
      </NavLink>
    );
  }
}

const mSTP = (state) => {
  return {
    loggedIn: Object.keys(state.session.user).length
  }
}

const mDTP = (dispatch) => {
  return {
    openModal: () => dispatch(openModal('login'))
  }
}

export const NavBarItem = connect(mSTP, mDTP)(NavBarItemTEST)