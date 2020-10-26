import React from "react";
import { Visualizer } from "./visualizers/visualizer";
import { NavBarIndex } from "./nav-bar/nav-bar-index"

export const App = () => {
  return (
    <div>
      <header>
        <NavBarIndex />
      </header>
    
      <Visualizer />
    </div>
  );
};
