import React, { Component } from 'react';
import { withRouter } from "react-router-dom"
import CheckIcon from "./../images/check.png"
import CrossIcon from "./../images/cross.png"
import EditIcon from "./../images/edit.png"
import SaveIcon from "./../images/save_wt.png"
import TrashIcon from "./../images/trash_wt.png"
import * as firebase from "firebase";

class TodoList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: {},
            editIconMouseOverStyle: {},
            deleteIconMouseOverStyle: {},
            checkIconMouseOverStyle: {},
            crossIconMouseOverStyle: {},
            saveIconMouseOverStyle: {},
            editTodoWork: "",
            completed: false,
            todos: [],
        }
    }

    handleOnMouseOver(i, ev) {

        this.setState({
            [`${ev.target.name}MouseOverStyle`]: {
                [i]: { transform: "scale(1.5)" }
            }
        })
    }

    handleOnMouseOut(i, ev) {
        this.setState({
            [`${ev.target.name}MouseOverStyle`]: {
                [`${i}`]: null
            }
        })
    }

    handleDeleteTodo(id) {
        firebase.database().ref(`/Users/${this.state.user.uid}/todos/${id}`).remove();
    }

    handleOnChange(ev) {
        this.setState({
            [ev.target.name] : ev.target.value
        })
    }

    handleSaveTodo(id) {
        firebase.database().ref(`/Users/${this.state.user.uid}/todos/${id}`).once('value', data => {
            let thisTodo = data.val();
            thisTodo.todoWork = this.state.editTodoWork;
            thisTodo.editStatus = false;
            firebase.database().ref(`/Users/${this.state.user.uid}/todos/${id}`).set(thisTodo);
        })
    }

    handleComplete(id) {
        firebase.database().ref(`/Users/${this.state.user.uid}/todos/${id}`).once('value', data => {
            let thisTodo = data.val();
            thisTodo.completed = true;
            firebase.database().ref(`/Users/${this.state.user.uid}/todos/${id}`).set(thisTodo);
        })
    }

    handleIncomplete(id) {
        firebase.database().ref(`/Users/${this.state.user.uid}/todos/${id}`).once('value', data => {
            let thisTodo = data.val();
            thisTodo.completed = false;
            firebase.database().ref(`/Users/${this.state.user.uid}/todos/${id}`).set(thisTodo);
        })
    }

    handleToggleEdit(id) {

        firebase.database().ref(`/Users/${this.state.user.uid}/todos/${id}`).once('value', data => {
            let thisTodo = data.val();
            
            this.setState({
                editTodoWork: thisTodo.todoWork
            })

            thisTodo.editStatus = thisTodo.editStatus ? false : !thisTodo.editStatus ? true : false 

            firebase.database().ref(`/Users/${this.state.user.uid}/todos/${id}`).set(thisTodo);
        })
    }

    componentDidMount() {

        this.props.showLoader();

        let that = this;

        let user = firebase.auth().currentUser;
        
        if (user) {
            that.setState({
                user
            })
            that.props.hideLoader();
        }
        else {
            that.props.hideLoader();
            this.props.history.push('/')
        }
    }

    render() {
        
        return (

            <div id="WorkList_div">

                {
                    this.props.todos.length < 1 ? <h3 id="message2">Hurray! No Work Pending</h3> :
                        <div>
                            <h2 id="message">Here is the Work List</h2>
                            <ul id="workList">
                                {
                                    this.props.todos.map((todo, ind) =>
                                        <li key={ind} className="listItem completed">
                                            {
                                                
                                                <div id={todo.completed ? "checkIcon" : !todo.completed ? "crossIcon" : null} className="padding5 margin3" title={todo.completed ? "Mark As Incomplete" : !todo.completed ? "Mark As Complete" : null} onClick={todo.completed ? this.handleIncomplete.bind(this, todo.uID) : !todo.completed ? this.handleComplete.bind(this, todo.uID) : null}>
                                                    <img 
                                                        id={todo.completed ? "checkImage" : !todo.completed ? "checkImage" : null} 
                                                        name={todo.completed ? "checkIcon" : !todo.completed ? "crossIcon" : null} 
                                                        src={todo.completed ? CheckIcon : !todo.completed ? CrossIcon : null} 
                                                        alt={todo.completed ? "Mark As Incomplete Button" : !todo.completed ? "Mark As Complete Button" : null} 
                                                        onMouseOver={this.handleOnMouseOver.bind(this, ind)} 
                                                        onMouseOut={this.handleOnMouseOut.bind(this, ind)} 
                                                        style={todo.completed ? this.state.checkIconMouseOverStyle[`${ind}`] : !todo.completed ? this.state.crossIconMouseOverStyle[`${ind}`] : null} 
                                                    />
                                                </div>
                                            }
                                            <div id="todoText" className="padding5 margin3">{!todo.editStatus ? todo.todoWork : <input className="editTodoInput" type="text" name="editTodoWork" value={this.state.editTodoWork} onChange={this.handleOnChange.bind(this)} />}</div>
                                            
                                            {   !todo.editStatus ? 
                                                <div id="editIcon" className="padding5 margin3" title="Edit" onClick={this.handleToggleEdit.bind(this, todo.uID)}>
                                                    <img id="editImage" name="editIcon" src={EditIcon} alt="Edit Button" onMouseOver={this.handleOnMouseOver.bind(this, ind)} onMouseOut={this.handleOnMouseOut.bind(this, ind)} style={this.state.editIconMouseOverStyle[`${ind}`]} />
                                                </div> : null
                                            }

                                            {
                                                !todo.editStatus ?  
                                                <div id="deleteIcon" className="padding5 margin3" title="Delete">
                                                    <img id="deleteImage" name="deleteIcon" src={TrashIcon} alt="Delete Button" onMouseOver={this.handleOnMouseOver.bind(this, ind)} onMouseOut={this.handleOnMouseOut.bind(this, ind)} style={this.state.deleteIconMouseOverStyle[`${ind}`]} onClick={this.handleDeleteTodo.bind(this, todo.uID)} />
                                                </div> : 
                                                <div id="saveIcon" className="padding5 margin3" title="Save">
                                                    <img id="saveImage" name="saveIcon" src={SaveIcon} alt="Save Button" onMouseOver={this.handleOnMouseOver.bind(this, ind)} onMouseOut={this.handleOnMouseOut.bind(this, ind)} style={this.state.saveIconMouseOverStyle[`${ind}`]} onClick={this.handleSaveTodo.bind(this, todo.uID)} />
                                                </div>
                                            }
                                        </li>
                                    ).reverse()
                                }
                            </ul>
                        </div>
                }


            </div>
        )
    }
}

export default withRouter(TodoList);