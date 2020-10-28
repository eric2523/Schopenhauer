import * as SongAPIUtil from '../util/song_api_util';

export const RECEIVE_CURRENT_SONG = "RECEIVE_CURRENT_SONG";
export const CLEAR_SONG = "CLEAR_SONG";
export const RECEIVE_SONG_UPLOAD_ERROR = "RECEIVE_SONG_UPLOAD_ERROR";
export const RECEIVE_SONG_DELETE_ERROR = "RECEIVE_SONG_DELETE_ERROR"

const receiveCurrentSong = (song) => {
  return {
    type: RECEIVE_CURRENT_SONG,
    song
  }
}

const clearSong = () => {
  return {
    type: CLEAR_SONG
  }
}

const receiveSongUploadError = (err) => {
  return {
    type: RECEIVE_SONG_UPLOAD_ERROR,
    err
  }
}

const receiveSongDeleteError = (err) => {
  return {
    type: RECEIVE_SONG_DELETE_ERROR,
    err
  }
}

export const uploadSong = (song) => (dispatch) => {
  SongAPIUtil.uploadSong(song)
    .then(
      song => dispatch(receiveCurrentSong(song)),
      err => dispatch(receiveSongUploadError(err))
    );
}

export const deleteSong = (song) => (dispatch) => {
  SongAPIUtil.deleteSong(song)
    .then(
      song => dispatch(clearSong(song)),
      err => dispatch(receiveSongDeleteError(err))
    )
}