import React from "react";
import { connect } from "react-redux";
import { receiveCurrentSong } from "../../actions/song_actions";

const mSTP = (state) => {
  return {
    currentSong: state.session.song,
  };
};

const mDTP = (dispatch) => {
  return {
    receiveCurrentSong: (song) => dispatch(receiveCurrentSong(song)),
  };
};

class QueueItemComponent extends React.Component {
  constructor(props) {
    super(props);
    this.selectSong = this.selectSong.bind(this);
  }

  selectSong() {
    this.props.receiveCurrentSong(this.props.song);
  }

  render() {
    return (
      <li onClick={this.selectSong}>
        <div
          className={
            this.props.currentSong &&
            this.props.song._id === this.props.currentSong._id
              ? "current-song-item"
              : "song-item"
          }
        >
          {this.props.song.artist} -- {this.props.song.title}
        </div>
      </li>
    );
  }
}

export const QueueItem = connect(mSTP, mDTP)(QueueItemComponent);
