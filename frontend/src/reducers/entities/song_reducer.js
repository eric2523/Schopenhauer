import { 
  RECEIVE_CURRENT_SONG, 
  CLEAR_SONG,
  RECEIVE_USER_SONGS
} from "../../actions/song_actions";

const _nullSong = {};

export const SongReducer = (state = _nullSong, action) => {
  Object.freeze(state);
  let newState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_CURRENT_SONG:
      newState[action.song.data._id] = action.song.data;
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
    default:
      return state;
  }
};
