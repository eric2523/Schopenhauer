export const RECEIVE_CURRENT_SONG = "RECEIVE_CURRENT_SONG";
export const CLEAR_SONG = "CLEAR_SONG";

export const receiveCurrentSong = (song) => {
  debugger;
  return {
    type: RECEIVE_CURRENT_SONG,
    //TESTING PURPOSES ONLY (WILL CALL FORMDATA METHODS IN API UTIL METHODS)
    song: song.get('song[file]')
  }
}

export const clearSong = () => {
  return {
    type: CLEAR_SONG
  }
}


//Need to implement thunk action creators after backend api endpoints are created

export const uploadSong = (song) => (dispatch) => {
  dispatch(receiveCurrentSong(song))
}