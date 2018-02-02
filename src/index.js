import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import * as firebase from 'firebase';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCp_hnfHq74jsMllh_eU23PBWDsBC4ZYAs",
    authDomain: "react-todo-app-10d1b.firebaseapp.com",
    databaseURL: "https://react-todo-app-10d1b.firebaseio.com",
    projectId: "react-todo-app-10d1b",
    storageBucket: "react-todo-app-10d1b.appspot.com",
    messagingSenderId: "843992685173"
};

firebase.initializeApp(config);

ReactDOM.render(
    <MuiThemeProvider>
        <App />
    </MuiThemeProvider>
    , document.getElementById('root'));

registerServiceWorker();
