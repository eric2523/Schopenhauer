import React from "react";
import { connect } from "react-redux";
import { login, signup } from "../actions/session_actions";
import { openModal, closeModal } from '../actions/modal_actions';
import { clearErrors } from '../actions/session_actions';

const mSTP = (state) => {
  return {
    modal: state.ui.modal,
    errors: state.errors.session,
  };
};

const mDTP = (dispatch) => {
  return {
    closeModal: () => dispatch(closeModal()),
    signup: (user) => dispatch(signup(user)),
    login: (user) => dispatch(login(user)),
    clearErrors: () => dispatch(clearErrors()),
    openModal: (type) => dispatch(openModal(type))
  };
};


class ModalComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.toggleLogin = this.toggleLogin.bind(this);
    this.toggleSignup = this.toggleSignup.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.clearErrors();
    const user = Object.assign({}, this.state);
    if(this.props.modal === 'login'){
      this.props.login(user).then(()=>{
        if(this.props.errors.length){
          return
        } else {
          this.handleModalClose();
        }
      });
    }
    else {
      this.props.signup(user).then(()=>{
        if(this.props.errors.length){
          return
        } else {
          this.handleModalClose();
        }
      });
    }
  }

  handleInput(type) {
    return (e) => {
      this.setState({ [type]: e.target.value });
    };
  }

  componentDidMount() {
    this.props.clearErrors();
  }

  toggleLogin(){
    this.props.clearErrors();
    this.props.openModal('login');
    this.setState({
      email: "",
      password: "",
    })
  }

  toggleSignup(){
    this.props.clearErrors();
    this.props.openModal('signup');
    this.setState({
      email: "",
      password: "",
    })
  }

  handleModalClose() {
    this.props.clearErrors();
    this.props.closeModal();
    this.setState({
      email: "",
      password: "",
    });
  }
  
  

  render() {
    if (this.props.modal !== "signup" && this.props.modal !== "login") {
      return null;
    }

    const errorArr = this.props.errors ? 
    Object.values(this.props.errors).map((error) => {
        return <li>{error}</li>;
      })
    : [];

    return (
      <div className="modal-background" onClick={this.handleModalClose}>
        <div className="modal-child" onClick={(e) => e.stopPropagation()}>
          <div className="modal-form">
            <div className="x" onClick={this.handleModalClose}>
              &#10006;
            </div>
            <div className="sign-up-text">
              <h2>{this.props.modal === 'login' ? "Login" : "Sign Up"}</h2>
            </div>
            <form>
              <input
                type="text"
                onChange={this.handleInput("email")}
                value={this.state.email}
                placeholder="Email">
              </input>
              <input
                type="password"
                onChange={this.handleInput("password")}
                value={this.state.password}
                placeholder="Password">
              </input>
              <button
                onClick={this.handleSubmit}
                className="btn sign-up"
                type="submit">
                {this.props.modal === 'login' ? "Login" : "Sign Up"}
              </button>
            </form>
            {errorArr.length ? 
            <ul className="error">{errorArr}</ul> 
            : <></>}
          </div>
          <button disabled={this.props.modal === 'login' ? true : false} onClick={this.toggleLogin}>Log in</button>
          <button disabled={this.props.modal === 'signup' ? true : false} onClick={this.toggleSignup}>Sign Up</button>
        </div>
      </div>
    );
  }
}

export const Modal = connect(mSTP, mDTP)(ModalComponent);
