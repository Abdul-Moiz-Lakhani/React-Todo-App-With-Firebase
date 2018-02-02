import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

class HomePage extends React.Component {

    render() {

        const { from } = this.props.location.state || { from: { pathname: '/' } }
        this.props.isAuthenticated ? this.props.history.push('/home') : null

        return (
            <div id="home-page-div">
                <img src={require('./../images/logo-home.png')} alt="Check" />
                <Buttons wait={3000} />
            </div>
        )
    }
}

export default withRouter(HomePage);

class Buttons extends Component {

    constructor(props) {
        super(props);

        this.state = {
            hidden: "hidden"
        }
    }

    componentDidMount() {
        var that = this;
        setTimeout(function () {
            that.setState({
                hidden: ""
            });
        }, that.props.wait);
    }

    render() {
        return (
            <div id="home-page-buttons" className={this.state.hidden}>
                <Link to="/register"><button id="signUpButton" className="buttonStyle">SIGN UP</button></Link>
                <Link to="/signin"><button id="signInButton" className="buttonStyle">SIGN IN</button></Link>
            </div>
        );
    }
}
