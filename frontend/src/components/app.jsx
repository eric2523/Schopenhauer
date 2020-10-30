import React from "react";
import { VisualizerItemContainer } from "./visualizers/visualizer";
import { NavBarIndex } from "./nav-bar/nav-bar-index";
import { Route, Redirect } from "react-router-dom";
import { UserAuthModal } from "./nav-bar/user_auth_modal";
import { Switch } from "react-router-dom";
import { ProtectedRoute, AuthRoute } from "../util/route_util";
import { LandingPageIndex } from "./landing-page/landing-page-index";
//Will probably move this component to a full sound bar component
import { SongUploadModal } from "./music_player/upload_modal";
import { ProfilePage } from "./profile-page/profile-index";

export const App = () => {
  return (
    <div className="main-div">
      <header>
        <NavBarIndex />
      </header>
      <SongUploadModal />
      <UserAuthModal />
      <Switch>
        <Route exact path="/visualizer" component={} />
        <Route exact path="/profile/:d" component={ProfilePage} />
        <Route path="/" component={LandingPageIndex} />
        <Redirect to="/" />
      </Switch>
      
    </div>
  );
};
