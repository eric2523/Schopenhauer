import React from "react";
import { NavBarItem } from "./nav-bar-item";
import { mainNavPaths } from "./nav-paths";

export class NavBarIndex extends React.Component {
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
      </div>
    );
  }
}
