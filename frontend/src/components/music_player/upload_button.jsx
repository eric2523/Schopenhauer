import React from "react";
import { connect } from "react-redux";
import { uploadSong } from '../../actions/song_actions';

const mSTP = (state) => {
  return {
    userId: state.session.user.id 
  };
};

const mDTP = (dispatch) => {
  return {
    uploadSong: (song) => dispatch(uploadSong(song))
  };
};

class UploadButtonComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      soundFile: null
    }
    this.handleUpload = this.handleUpload.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleUpload(e){
    e.preventDefault();
    // const reader = new FileReader();
    const file = e.currentTarget.files[0];
    this.setState({soundFile: file}, this.handleSubmit);
    // reader.onloadend = () => {
    //     this.setState({soundFile: file}, console.log(this.state.soundFile))
    // }
    // if (file) {
    //     reader.readAsDataURL(file);
    // } else {
    //     this.setState({soundFile: null});
    // }
}
//WE WILL ONLY NEED THIS METHOD IF WE NEED A URL FOR SONG PREVIEW

handleSubmit(){
    const formData = new FormData();
    formData.append('song[user_id]', this.props.userId);
    if (this.state.soundFile){
        formData.append('song[file]', this.state.soundFile);
    }
    this.props.uploadSong(formData)//.then(this.setState({soundFile: null}));
}

  render() {
    return (
      <div>
        <form>
          <label className="ui button">
            Upload Song
            <input
              onChange={this.handleUpload}
              type="file"
              accept=".mp3"
              ></input>
          </label>
        </form>
      </div>
    );
  }
}

export const UploadButton = connect(mSTP, mDTP)(UploadButtonComponent);
