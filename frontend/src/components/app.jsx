import React from "react";
import { Visualizer } from "./visualizers/visualizer";
import { NavBarIndex } from "./nav-bar/nav-bar-index";
import { Route } from "react-router-dom";
import { Modal } from "./nav-bar/user_auth_modal";

//Will probably move this component to a full sound bar component
import { UploadButton } from './music_player/upload_button';

export const App = () => {
  return (
    <div className="main-div">
      <header>
        <NavBarIndex />
      </header>
      <Modal/>
      <Visualizer />
      <UploadButton />
    </div>
  );
};
