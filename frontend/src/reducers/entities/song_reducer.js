import { 
  RECEIVE_CURRENT_SONG, 
  CLEAR_SONG,
  RECEIVE_USER_SONGS
} from "../../actions/song_actions";

import {
  RECEIVE_USER_LOGOUT,
} from "../../actions/session_actions";

const _nullSong = {};

export const SongReducer = (state = _nullSong, action) => {
  Object.freeze(state);
  let newState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_CURRENT_SONG:
      if(action.song._id){ 
        newState[action.song._id] = action.song;
      } else if (action.song.id){
        newState[action.song.id] = action.song;
      }
      return newState;
    case RECEIVE_USER_SONGS:
      if (action.songs.data){
        action.songs.data.forEach(song => {
          newState[song._id] = song;
        })
      }
      return newState;
    case CLEAR_SONG:
      return _nullSong;
    case RECEIVE_USER_LOGOUT:
      return _nullSong;
    default:
      return state;
  }
};
