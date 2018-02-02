import React, { Component } from 'react';
import InputComponent from './../components/InputComponent';
import { withRouter } from "react-router-dom";
import * as firebase from "firebase";

class AddWorkDiv extends Component {

  constructor(props) {
    super(props);

    this.state = {
      work: "",
      currentUser: {}
    }

    this.handleOnChange = this.handleOnChange.bind(this)
  }

  handleOnChange(ev) {
    this.setState({
      work: ev.target.value
    })
  }

  handleSubmit(ev) {
    ev.preventDefault();

    this.props.showLoader();

    let currentUser = firebase.auth().currentUser;

    let thisTodo = {
      todoWork: this.state.work,
      completed: false,
      editStatus: false
    }

    firebase.database().ref(`/Users/${currentUser.uid}/todos`).push(thisTodo).then(() => {

      this.props.hideLoader();
      
      this.props.showCongrats("Congrats! Todo Successfuly Added");

      setTimeout(() => {
        this.props.hideCongrats();
      }, 3000)

    }).catch(error => {

      this.props.showError("An error occured please try again");

      this.props.hideLoader();

      setTimeout(() => {
        this.props.hideError();
      }, 3000)
    })

    this.setState({
      work: ""
    })
  }

  componentDidMount() {

    let that = this;

    let user = firebase.auth().currentUser;

    if(user !== null) {

      firebase.database().ref(`/Users/${user.uid}`).on("value", userData => {
  
        let currentUser = userData.val();
        that.userSignedIn(currentUser);
        that.props.updateTodos(currentUser.todos ? currentUser.todos : {})
        that.props.hideLoader();
      })
    }
    else {
      this.props.history.push('/')
    }
  }

  userSignedIn(user) {
    this.setState({
      currentUser: user
    })
  }

  render() {

    this.props.isAuthenticated ? null : this.props.history.push('/')
    
    return (
      <div id="addWork_div">

        <h3 id="greet">Hello,</h3>
        <h2 id="greetName">{this.state.currentUser.userName}</h2>
        <h2 id="welcome">Welcome to To Do App</h2>

        <form onSubmit={this.handleSubmit.bind(this)}>
          <div id="label">
            <label htmlFor="workName">ENTER WORK TO DO BELOW</label>
            <br />
            <InputComponent ref="inputBox" inputFieldClassName="inputStyle" divClassName="userInputBox" type="text" name="workName" id="getWork" initialBorderColor="darkgrey" focusBorderColor="orange" value={this.state.work} onChange={this.handleOnChange} />
          </div>

          <button id="addbtn" className="buttonStyle" type="submit">Add to List</button>
        </form>

        {this.props.showErrorStatus ? <p id="errorMessage">{this.props.errorMessage}</p> : null}
        {this.props.showCongratsStatus ? <p id="congratsMessage">{this.props.congratsMessage}</p> : null}

      </div>
    )
  }
}

export default withRouter(AddWorkDiv);