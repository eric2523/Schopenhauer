import React from 'react';
import { connect } from 'react-redux';
import { receiveCurrentSong, receiveUserSongs } from '../../actions/song_actions';
import { QueueItem } from './queue_item';

const mSTP = (state) => {
  return {
    user: state.session.user,
    currentSong: state.session.song,
    userSongs: state.entities.song
  }
}

const mDTP = (dispatch) => {
  return {
    receiveCurrentSong: (song) => dispatch(receiveCurrentSong(song)),
    receiveUserSongs: (userId) => dispatch(receiveUserSongs(userId))
  }
}

class QueueComponent extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      currentSong: this.props.currentSong
    }
  }

  componentDidMount() {
    this.props.receiveUserSongs(this.props.user.id);
  }

  // componentDidMount(){
  //   if(this.props.user && this.props.userSongs){
  //     let firstSong = Object.values(this.props.userSongs)[0];
  //     this.props.receiveCurrentSong(firstSong);
  //   }
  // }

  // componentDidUpdate(prevProps){
  //   if((this.props.user !== prevProps.user) && this.props.userSongs){
  //     let firstSong = Object.values(this.props.userSongs)[0];
  //     this.props.receiveCurrentSong(firstSong);
  //   }
  // }

  render(){
    const songList = !this.props.userSongs ? [] :
    Object.values(this.props.userSongs).map( (song, i) => {
      return <QueueItem key={i} song={song}/>
    }) 
    return (
      <div className="queue-container">
        <ul>
          {songList}
        </ul>
      </div>
    )
  }
}

export const Queue = connect(mSTP, mDTP)(QueueComponent);