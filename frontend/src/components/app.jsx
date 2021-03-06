import React from "react";
import { NavBarIndex } from "./nav-bar/nav-bar-index";
import { Route, Redirect } from "react-router-dom";
import { UserAuthModal } from "./nav-bar/user_auth_modal";
import { Switch } from "react-router-dom";
import { ProtectedRoute, AuthRoute } from "../util/route_util";
import { LandingPageIndex } from "./landing-page/landing-page-index";
//Will probably move this component to a full sound bar component
import { SongUploadModal } from "./music_player/upload_modal";
import { ProfilePageContainer } from "./profile-page/profile-page-container";
import { TemplatesIndexContainer } from "./templates/templates-index";
import { VisualizerEditContainer } from "./visualizers/visualizer-edit-page";
import { AboutPage } from "./about-page/about-page";
import { EditAlertModalContainer } from "./templates/edit-alert-modal";
import { Footer } from "./footer/footer";
import { DiscoverContainer } from "./discover/discover-index"

export const App = () => {
  return (
    <div className="main-div">
      <header className="nav-bar-head">
        <NavBarIndex />
      </header>
      <SongUploadModal />
      <UserAuthModal />
      <EditAlertModalContainer />
      <Switch>
        <ProtectedRoute
          exact
          path="/templates"
          component={TemplatesIndexContainer}
        />
        <ProtectedRoute
          exact
          path="/visualizers/:id"
          component={VisualizerEditContainer}
        />
        <ProtectedRoute
          exact
          path="/profile/:id"
          component={ProfilePageContainer}
        />
        <ProtectedRoute
          exact
          path="/discover"
          component={DiscoverContainer}
        />
        <Route exact path="/about" component={AboutPage} />
        <Route path="/" component={LandingPageIndex} />
        <Redirect to="/" />
      </Switch>
      <Route path={["/about", "/templates", "/profile"]} component={Footer} />
    </div>
  );
};
