import React from "react";
import ReactDOM from "react-dom";
import { Root } from "./components/root";
import { configureStore } from "./store/store";
import jwt_decode from 'jwt-decode';
import { setAuthToken } from './util/session_api_util';
import { logout } from './actions/session_actions';
import { receiveUserSongs } from './actions/song_actions';
import { fetchUserVisualizer } from "./actions/visualizer_actions";
import { defaultFrequencySettings } from "./components/visualizers/basic_frequency_visualizer";
import { defaultSphereSettings } from "./components/visualizers/nate_visualizer_1";
import { receiveUser } from './actions/user_actions';

document.addEventListener("DOMContentLoaded", () => {
  // currently no preloaded state
  let store = configureStore();
  if (localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken);
    const decodedUser = jwt_decode(localStorage.jwtToken);
    const preloadedState = { 
      session: { isAuthenticated: true, user: decodedUser }, 
      entities: {
        defaultSettings: {
          frequencySettings: defaultFrequencySettings,
          sphereSettings: defaultSphereSettings
        }
      }
    };

    store = configureStore(preloadedState);
    store.dispatch(receiveUserSongs(store.getState().session.user.id));
    store.dispatch(fetchUserVisualizer(store.getState().session.user.id));
    store.dispatch(receiveUser(store.getState().session.user));
    const currentTime = Date.now() / 1000;

    if (decodedUser.exp < currentTime) {
      store.dispatch(logout());
      window.location.href = '/';
    }
  } else {
    store = configureStore({});
  }
  const root = document.getElementById("root");
  ReactDOM.render(<Root store={store} />, root);
});
