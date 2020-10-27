import React from "react";
import { NavBarItem } from "./nav-bar-item";
import { mainNavPaths } from "./nav-paths";
import { openModal } from "../../actions/modal_actions";
import { connect } from 'react-redux'
import { logout } from '../../actions/session_actions';

const mSTP = (state) => {
  return {
    loggedIn: state.session.isAuthenticated
  }
}

const mDTP = (dispatch) => {
  return {
    openLogin: () => dispatch(openModal('login')),
    openSignup: () => dispatch(openModal('signup')),
    logout: () => dispatch(logout())
  }
}

class NavBarIndexComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const navPaths = mainNavPaths();
    let navListItems = [];
    for (const keys in navPaths) {
      let { name, path } = navPaths[keys];

      navListItems.push(
        <NavBarItem 
          key={name}
          name={name} 
          path={path} 
        />
      );
    }

    return (
      <div className="nav-bar-div">
        <ul className="nav-bar-ul">
          {navListItems}
        </ul>
        {!this.props.loggedIn ? 
        <>
        <button onClick={this.props.openSignup}>Sign Up</button>
        <button onClick={this.props.openLogin}>Log in</button>
        </>
        : <button onClick={this.props.logout}>Log Out</button>}
      </div>
    );
  }
}

export const NavBarIndex = connect(mSTP, mDTP)(NavBarIndexComponent);