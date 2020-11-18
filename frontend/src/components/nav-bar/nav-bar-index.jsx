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
    currentUserId: state.session.user ? state.session.user.id : ''
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
    // this.handleLogout = this.handleLogout.bind(this);
  }

   //still throws errors but functional for now. Need to find way to handle
   //this operation async
  // handleLogout(){
  //   window.location.href = '/';
  //   this.props.logout();
  // }

  render() {
    let navPaths = mainNavPaths();
    if (this.props.currentUserId) {
      navPaths.profile.path = navPaths.profile.path.concat(
        `/${this.props.currentUserId}`
      );
    }
    let navListItems = [];
    for (const keys in navPaths) {
      if(!this.props.loggedIn && keys === 'profile') break;
      let { name, path } = navPaths[keys];
      navListItems.push(<NavBarItem key={name} name={name} path={path} />);
    }

    let repoIcon = 
    <a 
      id="nav-github-link"
      key="nav-github-link"
      href="https://github.com/eric2523/Schopenhauer" 
      target="_blank">
      <i id="nav-github-icon" className="fab fa-github"></i>
    </a>

    // navListItems.splice(2, 0, repoIcon);
    navListItems.unshift(repoIcon);

    let btn = null;
    if (!this.props.loggedIn) {
      btn = (
        <div className="login-signup-btn-div">
          <button id="sign-up" className="session-btns" onClick={this.props.openSignup}>
            <span className="btn-ctx">Sign Up</span>
          </button>
          <button id="log-in" className="session-btns" onClick={this.props.openLogin}>
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
        <div className="nav-bar-left">
          <Link to="/">
            <div className="small-icon"></div>
          </Link>
          <Link className="nav-left-title" to="/">
            SCHOPENHAUER
          </Link>
        </div>
        <div className="nav-bar-right">
          <ul className="nav-bar-ul">{navListItems}</ul>
          {btn}
        </div>
      </div>
    );
  }
}

export const NavBarIndex = connect(mSTP, mDTP)(NavBarIndexComponent);
