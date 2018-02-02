import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import InputComponent from './../components/InputComponent';
import * as firebase from "firebase";

class RegistrationPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      pass: ""
    }

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  handleOnChange(ev) {
    this.setState({
      [ev.target.name]: ev.target.value
    })
  }

  handleOnSubmit(e) {
    e.preventDefault();

    this.props.showLoader();

    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.pass).then(user => {

      let currentUserDetails = {
        userUid: user.uid,
        userName: this.state.name
      }

      firebase.database().ref(`/Users/${user.uid}`).set(currentUserDetails).then(() => {

        this.props.history.push('/home');

        this.props.hideLoader();
        this.props.showCongrats("Congrats! Sign Up Successful");

        setTimeout(() => {
          this.props.hideCongrats();
        }, 3000)
      })

    }).catch(error => {
      let errorMessage = error.message;

      let firebaseErrors = {
        error1: "The email address is already in use by another account.",
        error2: "The email address is badly formatted."
      };

      if (errorMessage === firebaseErrors.error1) {
        this.props.showError("Already an account with this Email")
      }
      else if (errorMessage === firebaseErrors.error2) {
        this.props.showError("Invalid Email");
      }
      else {
        this.props.showError(errorMessage);
      }

      this.props.hideLoader();

      setTimeout(() => {
        this.props.hideError();
      }, 3000)
    })
  }

  render() {
    
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    this.props.isAuthenticated ? this.props.history.push(from) : null
    
    return (
      <div className="pageDiv">
        <h3 id="heading">Sign Up</h3>

        <form onSubmit={this.handleOnSubmit}>
          <label htmlFor="userName">ENTER NAME</label>
          <br />
          <InputComponent inputFieldClassName="inputStyle" divClassName="userInputBox" type="text" name="name" id="userName" initialBorderColor="darkgrey" focusBorderColor="orange" onChange={this.handleOnChange} value={this.state.name} />
          <br />
          <label htmlFor="userName">ENTER EMAIL</label>
          <br />
          <InputComponent inputFieldClassName="inputStyle" divClassName="userInputBox" type="text" name="email" id="email" initialBorderColor="darkgrey" focusBorderColor="orange" onChange={this.handleOnChange} value={this.state.email} />
          <br />
          <label htmlFor="key">ENTER PASSWORD</label>
          <br />
          <InputComponent inputFieldClassName="inputStyle" divClassName="userInputBox" type="password" name="pass" id="key" initialBorderColor="darkgrey" focusBorderColor="orange" value={this.state.pass} onChange={this.handleOnChange}/>
          <br />
          <button id="sign_up" type="submit">REGISTER</button>
        </form>

        {this.props.showErrorStatus ? <p id="errorMessage">{this.props.errorMessage}</p> : null}
        {this.props.showCongratsStatus ? <p id="congratsMessage">{this.props.congratsMessage}</p> : null}

        <div id="btn">
          <Link to="/signin"><button className="navigation-button">I already have an account</button></Link>
        </div>
      </div>
    )
  }

}

export default withRouter(RegistrationPage);