import React from "react";
import { NavBarItem } from "./nav-bar-item";
import { mainNavPaths } from "./nav-paths";
import { openModal } from "../../actions/modal_actions";
import { connect } from "react-redux";
import { logout } from "../../actions/session_actions";
import { Link } from "react-router-dom";

const mSTP = (state) => {
  return {
    loggedIn: state.session.isAuthenticated,
  };
};

const mDTP = (dispatch) => {
  return {
    openLogin: () => dispatch(openModal("login")),
    openSignup: () => dispatch(openModal("signup")),
    logout: () => dispatch(logout()),
  };
};

class NavBarIndexComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const navPaths = mainNavPaths();
    let navListItems = [];
    for (const keys in navPaths) {
      let { name, path } = navPaths[keys];

      navListItems.push(<NavBarItem key={name} name={name} path={path} />);
    }

    let btn = null;
    if (!this.props.loggedIn) {
      btn = (
        <div className="login-signup-btn-div">
          <button className="session-btns" onClick={this.props.openSignup}>
            <span className="btn-ctx">Sign Up</span>
          </button>
          <button className="session-btns" onClick={this.props.openLogin}>
            <span className="btn-ctx">Log in</span>
          </button>
        </div>
      );
    } else {
      btn = (
        <div className="login-signup-btn-div">
          <button className="session-btns" onClick={this.props.logout}>
            <span className="btn-ctx">Log Out</span>
          </button>
        </div>
      );
    }

    return (
      <div className="nav-bar-div">
        <Link to="/">
          <div className="small-icon"></div>
        </Link>
        <ul className="nav-bar-ul">{navListItems}</ul>
        {btn}
      </div>
    );
  }
}

export const NavBarIndex = connect(mSTP, mDTP)(NavBarIndexComponent);
