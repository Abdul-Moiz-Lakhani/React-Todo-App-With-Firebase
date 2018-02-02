import React, { Component } from 'react';
import { withRouter } from "react-router-dom";

class Header extends Component {

    gotoHome = () => {
        !this.props.isAuthenticated ? this.props.history.push('/') : null
    }

    render() {
        return (
            <div>
                <div id="header" onClick={this.gotoHome}>
                    <div id="opacBox">
                        <h1>To do App</h1>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Header);