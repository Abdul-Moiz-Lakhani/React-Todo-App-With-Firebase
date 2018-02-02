import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import InputComponent from './../components/InputComponent';
import * as firebase from "firebase";

class SignInPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
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

    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.pass).then(user => {

      this.props.history.push('/home');

      this.props.hideLoader;
      
      this.props.showCongrats("Congrats! Sign In Successful")

      setTimeout(() => {
        this.props.hideCongrats();
      }, 3000)

    }).catch(error => {
      let errorMessage = error.message;

      let firebaseErrors = {
        error1: "The password is invalid or the user does not have a password.",
        error2: "The email address is badly formatted.",
        error3: "Password should be at least 6 characters",
        error4: "There is no user record corresponding to this identifier. The user may have been deleted."
      };

      if (errorMessage === firebaseErrors.error1) {
        this.props.showError("Invalid Password")
      }
      else if (errorMessage === firebaseErrors.error2) {
        this.props.showError("Invalid Email")
      }
      else if (errorMessage === firebaseErrors.error3) {
        this.props.showError("Short Password")
      }
      else if (errorMessage === firebaseErrors.error4) {
        this.props.showError("User Not Found");
      }
      else {
        this.props.showError(errorMessage)
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
        <h3 id="heading">Sign In</h3>

        <form onSubmit={this.handleOnSubmit}>
          <label htmlFor="userName">ENTER EMAIL</label>
          <br />
          <InputComponent inputFieldClassName="inputStyle" divClassName="userInputBox" type="email" name="email" id="userNameS" initialBorderColor="darkgrey" focusBorderColor="orange" onChange={this.handleOnChange} value={this.state.email} />
          <br />
          <label htmlFor="key">ENTER PASSWORD</label>
          <br />
          <InputComponent inputFieldClassName="inputStyle" divClassName="userInputBox" type="password" name="pass" id="keyS" initialBorderColor="darkgrey" focusBorderColor="orange" onChange={this.handleOnChange} value={this.state.pass} />
          <br />
          <button id="sign_up" type="submit">SIGN IN</button>
        </form>

        {this.props.showErrorStatus ? <p id="errorMessage">{this.props.errorMessage}</p> : null}
        {this.props.showCongratsStatus ? <p id="congratsMessage">{this.props.congratsMessage}</p> : null}

        <div id="btn">
          <Link to="/register"><button className="navigation-button">I want to create new account</button></Link>
        </div>

      </div>
    )
  }
}

export default withRouter(SignInPage);