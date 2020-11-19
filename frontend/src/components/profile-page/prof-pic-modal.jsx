import React from "react";
import { connect } from "react-redux";
import { updatePhoto } from "../../actions/user_actions"

// const mSTP = (state, ownProps) => {
//   return {};
// };

const mDTP = (dispatch) => {
  return {
    updatePhoto: (imageFile, metaData) => dispatch(updatePhoto(imageFile, metaData)),
  };
};

class UploadPhotoModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUrl: this.props.user.photoUrl ? this.props.user.photoUrl : '',
      imageFile: null,
    }

    this.handleUpload = this.handleUpload.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
  }

  handleUpload(e) {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.currentTarget.files[0];
    reader.onloadend = () => {
      this.setState({ imageUrl: reader.result, imageFile: file });
    };
    if (file) {
      reader.readAsDataURL(file);
    } else {
      this.setState({ imageUrl: "", imageFile: null });
    }
  }

  handleSubmit(e) {
    const formData = new FormData();
    const metaData = {
      id: this.props.user.id,
    };
    if (this.state.imageFile) {
      formData.append("photo", this.state.imageFile);
    }
    this.props.uploadPhoto(formData, metaData).then(this.handleCloseModal);
  }

  handleModalClose() {
    console.log('modal closed')
    this.setState({
      imageUrl: "",
      imageFile: null,
    });
    this.props.closeModal();
  }

  render() {
    return (
      <div className="modal-background" onClick={this.handleModalClose}>
        <div className="modal-child" onClick={(e) => e.stopPropagation()}>
          <div id="photo-upload-modal" className="modal-form">
            <div className="x">
              <div onClick={this.handleModalClose}>&#10006;</div>
            </div>
            {this.state.imageUrl ? (
              <div className="image-preview">
                <img alt="preview" src={this.state.imageUrl}></img>
              </div>
            ) : (
              <></>
            )}
            <form className="upload-form">
              <label className="ui button primary">
                Upload Photo
                <input
                  id="photo-upload"
                  onChange={this.handleUpload}
                  type="file"
                  accept=".png, .jpg, .jpeg"
                ></input>
              </label>
            </form>
            <button
              onClick={this.handleSubmit}
              disabled={
                this.state.imageUrl && this.state.imageFile ? false : true
              }
              className="ui button save-photo"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export const UploadPhotoModalContainer = connect(null, mDTP)(UploadPhotoModal);
