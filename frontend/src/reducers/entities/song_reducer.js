import { RECEIVE_CURRENT_SONG, CLEAR_SONG } from '../../actions/song_actions';

const _nullSong = {currentSong: null};

export const SongReducer = (state = _nullSong, action) => {
  Object.freeze(state);
  let newState = Object.assign({}, state);
  switch(action.type){
    case RECEIVE_CURRENT_SONG:
      newState.currentSong = action.song.data;
      return newState;
    case CLEAR_SONG:
      return _nullSong;
    default:
      return state;
  }
}