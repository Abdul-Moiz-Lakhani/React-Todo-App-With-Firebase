import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import * as firebase from "firebase";
import ShowDate from './ShowDate';
import LogOutIcon from "./../images/logout.png";
import LogOutIconBK from "./../images/logout_bk.png";
import ListBook from "./../images/list.png";
import ListBookBK from "./../images/list_bk.png";
import AddIcon from "./../images/plus.png";
import AddIconBK from "./../images/plus_bk.png";
import trashIcon from "./../images/trash.png";
import trashIconBK from "./../images/trash_bk.png";

class NavBar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            toggleListIcon: false,
            toggleLogOutIcon: false,
            toggleAddIcon: false,
            toggleClearTrashIcon: false
        }

        this.handleOnMouseOut = this.handleOnMouseOut.bind(this)
        this.handleOnMouseOver = this.handleOnMouseOver.bind(this)
    }

    handleOnMouseOver(ev) {
        ev.target.name === "listIcon" ? this.setState({
            toggleListIcon: true
        }) : ev.target.name === "logOutIcon" ? this.setState({
            toggleLogOutIcon: true
        }) : ev.target.name === "addIcon" ? this.setState({
            toggleAddIcon: true
        }) : ev.target.name === "clearAll" ? this.setState({
            toggleClearTrashIcon: true
        }) : null
    }

    handleOnMouseOut(ev) {
        ev.target.name === "listIcon" ? this.setState({
            toggleListIcon: false
        }) : ev.target.name === "logOutIcon" ? this.setState({
            toggleLogOutIcon: false
        }) : ev.target.name === "addIcon" ? this.setState({
            toggleAddIcon: false
        }) : ev.target.name === "clearAll" ? this.setState({
            toggleClearTrashIcon: false
        }) : null
    }

    handleSignOut() {
        firebase.auth().signOut();
    }

    gotoTodoList() {
        this.props.history.push('/todolist')
    }

    gotoHome() {
        this.props.history.push('/home')
    }

    handleOnClick() {
        let user = firebase.auth().currentUser;
        firebase.database().ref(`/Users/${user.uid}`).child('todos').remove();
    }

    render() {
        
        const { pathname } = this.props.location;

        return (
            <div id="nav_bar" className="container">
                
                { 
                    pathname === "/home" ?
                    <div id="viewList" title="View List">
                        {
                            <img name="listIcon" src={this.state.toggleListIcon ? ListBook : ListBookBK} alt="View List Button" onMouseOver={this.handleOnMouseOver} onMouseOut={this.handleOnMouseOut} onClick={this.gotoTodoList.bind(this)} />
                        }
                    </div> : pathname === "/todolist" ?
                    <div id="addTodos" title="Add More Todos">
                        {
                            <img name="addIcon" src={this.state.toggleAddIcon ? AddIcon : AddIconBK} alt="Add More Todos Button" onMouseOver={this.handleOnMouseOver} onMouseOut={this.handleOnMouseOut} onClick={this.gotoHome.bind(this)} />
                        }
                    </div> : null
                }
                
                <ShowDate />

                {
                    pathname === "/home" ?
                    <div id="logout" title="Sign Out">
                        {<img name="logOutIcon" src={this.state.toggleLogOutIcon ? LogOutIcon : LogOutIconBK} alt="Sign Out Button" onMouseOver={this.handleOnMouseOver} onMouseOut={this.handleOnMouseOut} onClick={this.handleSignOut.bind(this)} />}
                    </div> : pathname === "/todolist" ?
                    <div id="clearAllTrash" title="Clear All Todos">
                        {
                            <img name="clearAll" src={this.state.toggleClearTrashIcon ? trashIcon : trashIconBK} alt="Clear All Todos Button" onMouseOver={this.handleOnMouseOver} onMouseOut={this.handleOnMouseOut} onClick={this.handleOnClick.bind(this)} />
                        }
                    </div> : null
                }
            </div>
        );
    }
}

export default withRouter(NavBar);