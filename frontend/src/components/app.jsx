import React from "react";
import { Visualizer } from "./visualizers/visualizer";
import { NavBarIndex } from "./nav-bar/nav-bar-index";
import { Route } from "react-router-dom";
import { Modal } from "./user_auth_modal";

export const App = () => {
  return (
    <div>
      <header>
        <NavBarIndex />
      </header>
      <Modal/>
      <Visualizer />
    </div>
  );
};
