import React from "react";
import { connect } from "react-redux";
import { openModal } from "../../actions/modal_actions";

const mDTP = (dispatch) => {
  return {
    openModal: () => dispatch(openModal("upload")),
  };
};

const UploadButtonComponent = (props) => {
  return (
    <button onClick={props.openModal} className="ui button">
      Upload Song
    </button>
  );
};

export const UploadButton = connect(null, mDTP)(UploadButtonComponent);
