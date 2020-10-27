import React from "react";
import { Visualizer } from "./visualizers/visualizer";
import { NavBarIndex } from "./nav-bar/nav-bar-index";
import { Route, Redirect } from "react-router-dom";
import { Modal } from "./nav-bar/user_auth_modal";
import {Switch} from 'react-router-dom'
import {ProtectedRoute, AuthRoute} from '../util/route_util'

//Will probably move this component to a full sound bar component
import { UploadButton } from './music_player/upload_button';

export const App = () => {
  return (
    <div className="main-div">
      <header>
        <NavBarIndex />
      </header>
      <Modal/>
      {/* <Switch>
        <ProtectedRoute to="/visualizer" component={Visualizer}/>
        <Route path="/" />
      </Switch> */}
      <Visualizer />
      <UploadButton />
    </div>
  );
};
