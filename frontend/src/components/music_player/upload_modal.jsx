import React from "react";
import { connect } from "react-redux";
import { closeModal } from "../../actions/modal_actions";
import { UploadForm } from './upload_form';

const mSTP = (state) => {
  return {
    modal: state.ui.modal,
  };
}

const mDTP = (dispatch) => {
  return {
    closeModal: () => dispatch(closeModal())
  }
}

const SongUploadModalComponent = (props) => {
  return props.modal !== 'upload' ? null :
    <div className="modal-background" onClick={props.closeModal}>
    <div id="upload-modal" className="modal-child" onClick={(e) => e.stopPropagation()}>
      <div className="modal-form">
        <div className="x">
          <div onClick={props.closeModal}>&#10006;</div>
        </div>
        <h2 id="modal-header" className="ui header">Upload a Song</h2>
        <UploadForm />
      </div>
    </div>
  </div>
}

export const SongUploadModal = connect(mSTP, mDTP)(SongUploadModalComponent);