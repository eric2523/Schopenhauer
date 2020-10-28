import { 
  RECEIVE_SONG_UPLOAD_ERROR, 
  RECEIVE_SONG_DELETE_ERROR 
} from '../../actions/song_actions';

const _nullErrors = {};

export const SongErrorsReducer = (state = _nullErrors, action) => {
  Object.freeze(state);
  switch(action.type){
    case RECEIVE_SONG_UPLOAD_ERROR:
      return action.err;
    case RECEIVE_SONG_DELETE_ERROR:
      return _nullErrors; 
    default:
      return state
  }
}