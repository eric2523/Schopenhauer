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
          name={name} 
          path={path} 
        />
      );
    }

    return <div>We are in Nav Bar Index</div>;
  }
}
