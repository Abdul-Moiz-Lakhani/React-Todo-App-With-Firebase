import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { LinearProgress } from 'material-ui';

import Header from './components/Header';
import NavBar from './components/navBar';
import HomePage from './components/HomePage';
import RegistrationPage from './components/RegistrationPage';
import SignInPage from './components/SignInPage';
import AddWorkDiv from './components/AddWorkDiv';
import TodoList from './components/todoList';

import * as firebase from "firebase";

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loaderStatus: false,
      isAuthenticated: false,
      congratsMessageStatus: false,
      congratsMessage: "",
      errorMessageStatus: false,
      errorMessage: "",
      todos: []
    }

    this.showLoader = this.showLoader.bind(this)
    this.hideLoader = this.hideLoader.bind(this)
    this.showCongrats = this.showCongrats.bind(this)
    this.hideCongrats = this.hideCongrats.bind(this)
    this.showError = this.showError.bind(this)
    this.hideError = this.hideError.bind(this)
    this.authenticateUser = this.authenticateUser.bind(this)
    this.unAuthenticateUser = this.unAuthenticateUser.bind(this)
    this.updateTodos = this.updateTodos.bind(this)
  }

  /* Loader Handlers */
  showLoader() {
    this.setState({
      loaderStatus: true
    })
  }

  hideLoader() {
    this.setState({
      loaderStatus: false
    })
  }

  /* Congrats Handlers */
  showCongrats(message) {
    this.setState({
      congratsMessageStatus: true,
      congratsMessage: message
    })
  }

  hideCongrats() {
    this.setState({
      congratsMessageStatus: false,
      congratsMessage: ""
    })
  }

  /* Error Handlers */
  showError(message) {
    this.setState({
      errorMessageStatus: true,
      errorMessage: message
    })
  }

  hideError() {
    this.setState({
      errorMessageStatus: false,
      errorMessage: ""
    })
  }
  
  /* Authenticate User Handlers */
  authenticateUser() {
    this.setState({
      isAuthenticated: true
    })
  }

  unAuthenticateUser() {
    this.setState({
      isAuthenticated: false
    })
  }

  /* Update Todos */
  updateTodos(todos) {

    let arr = [];

    Object.keys(todos).map( key => {
      
      let obj = todos[key];
      obj.uID = key;

      arr.push(obj);
    })
    
    this.setState({
      todos: arr
    })
  }

  componentWillMount() {
    this.showLoader();

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.authenticateUser();
        this.hideLoader();
      }
      else {
        this.unAuthenticateUser();
        this.hideLoader()
        console.log('user signed out')
      }
    })
  }

  render() {

    return (
      <BrowserRouter>
        <div className="App">

          {this.state.loaderStatus ? <LinearProgress mode="indeterminate" color="orange" /> : <div id="upper_line"></div>}

          <Header />
          <NavBar isAuthenticated={this.state.isAuthenticated} />

          <div id="line"></div>

          <div id="screen">

            <div id="opacBox2">

              <div id="renderPage">

                <Switch>
                  
                  <Route exact path="/" 
                    render={
                      props =>
                      <HomePage {...props}
                        isAuthenticated={this.state.isAuthenticated}
                      />
                    }
                  />
                  
                  <Route path="/register"
                    render = {
                      props => 
                      <RegistrationPage {...props} 
                        showLoader={this.showLoader} 
                        hideLoader={this.hideLoader} 
                        showCongrats={this.showCongrats} 
                        hideCongrats={this.hideCongrats} 
                        showError={this.showError} 
                        hideError={this.hideError} 
                        showCongratsStatus={this.state.congratsMessageStatus} 
                        congratsMessage={this.state.congratsMessage} 
                        showErrorStatus={this.state.errorMessageStatus} 
                        errorMessage={this.state.errorMessage}
                        isAuthenticated={this.state.isAuthenticated}
                      />
                    }
                  />

                  <Route path="/signin" 
                    render = {
                      props => 
                      <SignInPage {...props}
                        authenticateUser={this.authenticateUser}
                        unAuthenticateUser={this.unAuthenticateUser}
                        showLoader={this.showLoader} 
                        hideLoader={this.hideLoader} 
                        showCongrats={this.showCongrats} 
                        hideCongrats={this.hideCongrats} 
                        showError={this.showError} 
                        hideError={this.hideError} 
                        showCongratsStatus={this.state.congratsMessageStatus} 
                        congratsMessage={this.state.congratsMessage} 
                        showErrorStatus={this.state.errorMessageStatus} 
                        errorMessage={this.state.errorMessage}
                        isAuthenticated={this.state.isAuthenticated}
                      />
                    }
                  />
                  
                  <Route path="/home" 
                    render = {
                      props => 
                      <AddWorkDiv {...props} 
                        showLoader={this.showLoader} 
                        hideLoader={this.hideLoader} 
                        showCongrats={this.showCongrats} 
                        hideCongrats={this.hideCongrats} 
                        showError={this.showError} 
                        hideError={this.hideError} 
                        updateTodos={this.updateTodos}
                        showCongratsStatus={this.state.congratsMessageStatus} 
                        congratsMessage={this.state.congratsMessage} 
                        showErrorStatus={this.state.errorMessageStatus} 
                        errorMessage={this.state.errorMessage}
                        isAuthenticated={this.state.isAuthenticated}
                      />
                    }
                  />

                  <Route path="/todolist" 
                    render = {
                      props => 
                      <TodoList {...props} 
                        showLoader={this.showLoader} 
                        hideLoader={this.hideLoader} 
                        showCongrats={this.showCongrats} 
                        hideCongrats={this.hideCongrats} 
                        showError={this.showError} 
                        hideError={this.hideError} 
                        showCongratsStatus={this.state.congratsMessageStatus} 
                        congratsMessage={this.state.congratsMessage} 
                        showErrorStatus={this.state.errorMessageStatus} 
                        errorMessage={this.state.errorMessage}
                        todos={this.state.todos} 
                      />
                    }
                  />
                
                </Switch>

              </div>

            </div>

          </div>

        </div>
      </BrowserRouter>
    );
  }
}

export default App;
