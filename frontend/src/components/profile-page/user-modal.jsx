import React from 'react';
import { UserIndex } from './user-index';

export const UserModal = (props) => {
  return (
    <div className="modal-background" onClick={props.closeModal}>
      <div className="modal-child" onClick={(e) => e.stopPropagation()}>
        <div className="modal-form">
          <div className="x">
            <div onClick={props.closeModal}>&#10006;</div>
          </div>
          <UserIndex users={props.users} title={props.title}/>
        </div>
      </div>
    </div>
  );
}
