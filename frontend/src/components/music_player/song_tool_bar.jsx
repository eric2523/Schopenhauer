import React from 'react';
import { connect } from 'react-redux';
import { Queue } from './queue';
import { UploadButton } from "./upload_button";

const mSTP = (state) => {
  return {
    currentSong: state.session.song,
  }
}

const mDTP = (dispatch) => {
  return {
    
  }
}

class SongToolBarComponent extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    const songSrc = this.props.currentSong ?
    this.props.currentSong.songUrl : ''

    return (
      <div className="song-toolbar">
        <div className="your-songs">Your Songs</div>
        <Queue />
        <UploadButton />
      </div>
    )
  }
}

export const SongToolBar = connect(mSTP, mDTP)(SongToolBarComponent);