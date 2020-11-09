import React from 'react';
import { connect } from 'react-redux';
// import { updateVisualizer, deleteVisualizer } from '../../actions/visualizer_actions';
import { openModal, closeModal } from '../../actions/modal_actions';

const mSTP = (state) => {
  return ({
    modal: state.ui.modal 
  })
}

const mDTP = (dispatch) => {
  return ({
    openModal: (type) => dispatch(openModal(type)),
    closeModal: () => dispatch(closeModal())
  })
}

class EditAlertModal extends React.Component {
  constructor(props){
    super(props)
    this.handleModalClose = this.handleModalClose.bind(this)
  }

  handleModalClose(e){
    this.props.closeModal()
  }

  render(){
    if (this.props.modal !== "edit-alert"){
      return null;
    }
    return (
      <div className="modal-background" onClick={this.handleModalClose}>
        <div className="modal-child" onClick={(e) => e.stopPropagation()}>
          Save or Delete Modal 
        </div>
      </div>
    )
  }
}

export const EditAlertModalContainer = connect(mSTP, mDTP)(EditAlertModal)
