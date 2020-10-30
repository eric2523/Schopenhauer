import {
  RECEIVE_CURRENT_USER,
  RECEIVE_USER_LOGOUT,
} from "../actions/session_actions";
import { 
  RECEIVE_CURRENT_SONG, 
  CLEAR_SONG,
  RECEIVE_USER_SONGS 
} from "../actions/song_actions";

const initialState = {
  isAuthenticated: false,
  user: {},
  song: {},
};

export const SessionReducer = (state = initialState, action) => {
  Object.freeze(state);
  let newState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !!action.currentUser,
        user: action.currentUser,
      };
    case RECEIVE_USER_SONGS:
      if(action.songs.data){
        let firstSong = Object.values(action.songs.data)[0];
        newState.song = firstSong;
      }
      return newState;
    case RECEIVE_CURRENT_SONG:
      newState.song = action.song;
      return newState;
    case CLEAR_SONG:
      newState.song = {};
      return newState;
    case RECEIVE_USER_LOGOUT:
      return {
        isAuthenticated: false,
        user: undefined,
      };
    default:
      return state;
  }
};
