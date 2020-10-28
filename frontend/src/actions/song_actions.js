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

//ADD GENRE AND ARTIST TO uploadSong RETURN OBJECT
export const uploadSong = (songFile, metaData) => (dispatch) => {
  return (
    SongAPIUtil.uploadSong(songFile)
      .then(
        payload => {
          const DBEntry = {
            fileName: payload.data.fileName, 
            songUrl: payload.data.songUrl, 
          }
          return (
            SongAPIUtil.uploadSongDB(Object.assign({}, DBEntry, metaData))
              .then(
                song => dispatch(receiveCurrentSong(song)),
                err => dispatch(receiveSongUploadError(err))
              )
          );
        },
        err => dispatch(receiveSongUploadError(err))
      )      
  );
}

export const deleteSong = (song) => (dispatch) => {
  return(
    SongAPIUtil.deleteSong(song)
    .then(
      song => dispatch(clearSong(song)),
      err => dispatch(receiveSongDeleteError(err))
      )
  )
}