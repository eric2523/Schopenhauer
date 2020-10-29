import React from 'react';
import ReactPlayer from 'react-player/file';
import { connect } from 'react-redux';
import { Queue } from './queue';

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
      <div>
        Sound Bar
        <Queue />
        <ReactPlayer 
        url={songSrc}
        controls={true}/>
      </div>
    )
  }
}

export const SongToolBar = connect(mSTP, mDTP)(SongToolBarComponent);