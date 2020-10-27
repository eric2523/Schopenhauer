import React from "react";
import { Visualizer } from "./visualizers/visualizer";
import { NavBarIndex } from "./nav-bar/nav-bar-index";
import { Route, Redirect } from "react-router-dom";
import { UserAuthModal } from "./nav-bar/user_auth_modal";
import {Switch} from 'react-router-dom'
import {ProtectedRoute, AuthRoute} from '../util/route_util'

//Will probably move this component to a full sound bar component
import { SongUploadModal } from './music_player/upload_modal';
import { UploadButton } from './music_player/upload_button';

export const App = () => {
  return (
    <div className="main-div">
      <header>
        <NavBarIndex />
      </header>      
      <SongUploadModal />
      <UserAuthModal/>
      {/* <Switch>
        <ProtectedRoute to="/visualizer" component={Visualizer}/>
        <Route path="/" />
      </Switch> */}
      <UploadButton />
      <Visualizer />
    </div>
  );
};
