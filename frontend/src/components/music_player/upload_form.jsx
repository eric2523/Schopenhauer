import React from "react";
import { connect } from "react-redux";
import { uploadSong } from '../../actions/song_actions';
import { clearErrors } from '../../actions/session_actions';
import { closeModal } from '../../actions/modal_actions';

const mSTP = (state) => {
  return {
    userId: state.session.user.id 
  };
};

const mDTP = (dispatch) => {
  return {
    uploadSong: (song, metaData) => dispatch(uploadSong(song, metaData)),
    clearErrors: () => dispatch(clearErrors()),
    closeModal: () => dispatch(closeModal())
  };
};

class UploadFormComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      soundFile: null,
      soundUrl: null,
      artist: '',
      title: '',
      genre: ''
    }
    this.handleUpload = this.handleUpload.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }


  handleUpload(e){
    e.preventDefault();
    const reader = new FileReader();
    const file = e.currentTarget.files[0];
    reader.onloadend = () => {
        this.setState({soundFile: file, soundUrl: reader.result})
    }
    if (file) {
        reader.readAsDataURL(file);
    } else {
        this.setState({soundFile: null, soundUrl: null});
    }
  }

  handleSubmit(){
    const formData = new FormData();
    const metaData = {
      userId: this.props.userId,
      title: this.state.title.length ? this.state.title : "Unknown",
      genre: this.state.genre.length ? this.state.genre : "Unknown",
      artist: this.state.artist.length ? this.state.artist : "Unknown"
    };
    if (this.state.soundFile){
        formData.append('song', this.state.soundFile);
    }
    this.props.uploadSong(formData, metaData).then(this.handleCloseModal);
  }

  handleCloseModal(){
    this.setState({
      soundFile: null, 
      soundUrl: null,
      artist: '',
      genre: '',
      title: ''
    })
  }

  handleInput(type){
    return (e) => {
      this.setState({[type]: e.target.value});
    }
  }

  render() {
    return (
      <div className="song-upload-form">
        <form className="ui form">
          <div className="field">
            <i className="fas fa-record-vinyl"></i>
            {/* <label>Title</label> */}
            <input 
              type="text" 
              placeholder="Title" 
              onChange={this.handleInput("title")}/>
          </div>
          <div className="field">
            <i className="far fa-user"></i>
            {/* <label>Artist</label> */}
            <input 
              type="text" 
              placeholder="Artist" 
              onChange={this.handleInput("artist")}/>
          </div>
          <div className="field">
            <i className="fas fa-music"></i>
            {/* <label>Genre</label> */}
            <input 
              type="text" 
              placeholder="Genre" 
              onChange={this.handleInput("genre")}/>
          </div>
          <div id="form-upload-btn" className="field">
            <label className="ui button">
            Choose a File
            <input
              onChange={this.handleUpload}
              type="file"
              accept=".mp3"
              ></input>
            </label>
          </div>
        </form>
        <audio 
          controls
          src={this.state.soundUrl}
        ></audio>
        <button 
          disabled={this.state.soundFile ? false : true}
          onClick={this.handleSubmit} 
          className="ui button">
          Save
        </button>
      </div>
    );
  }
}

export const UploadForm = connect(mSTP, mDTP)(UploadFormComponent);
