import React, {Component} from "react";
import { Link } from 'react-router-dom';
import axios from './axios';


class Logo extends Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        e.preventDefault();
        axios.get('/logout').then(()=>{
            super.setState({isLoggedIn : false});
            location.replace('/welcome');
        });
    }
    render() {
        return (

            <div id="logo-component">
                <img className="logo-image" src="./images/logo.png" alt="Logo image" />
                <div className="logout-user">
                    <h1>Welcome, {this.props.first}</h1>
                    <button type="button" onClick={this.handleClick}>Log out</button>
                </div>
                <div className="nav-links-div">
                    <Link className="nav-links" to="/profile">Profile</Link>
                    <Link className="nav-links" to="/friends">Friends</Link>
                    <Link className="nav-links" to="/online">Online users</Link>
                    <Link className="nav-links" to="/chat">Chat</Link>
                </div>
            </div>
        );
    }

}

export default Logo;
