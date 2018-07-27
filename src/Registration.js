import React, {Component} from "react";
import axios from './axios';
import { Link } from 'react-router-dom';
import App from './App';

class Registration extends Component { //inherits properties of Component
    constructor(props) {
        super(props);
        this.state = {isLoggedIn : null};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({ [e.target.name] : e.target.value }, ()=>{
            console.log(this.state);
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        axios.post('/registration', this.state).then((results)=>{
            if (results.data.success) {
                console.log(results.data.success);
                this.setState({isloggedIn : true});
                location.replace('/');

            }else {
                this.setState({isloggedIn : false});

            }
        });

    }

    render() {
        if (this.state.isLoggedIn) {
            return (
                <App />
            );
        }
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label> First Name:
                        <input
                            type="text"
                            name="firstname"
                            placeholder="First Name"
                            onChange={this.handleChange}
                        />
                    </label>
                    <label> Last Name:
                        <input
                            type="text"
                            name="lastname"
                            placeholder="Last Name"
                            onChange={this.handleChange}
                        />
                    </label>
                    <label> E-Mail:
                        <input
                            type="text"
                            name="email"
                            placeholder="E-Mail"
                            onChange={this.handleChange}
                        />
                    </label>
                    <label> Password:
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={this.handleChange}
                        />
                    </label>
                    <input type="submit" value="submit" />
                </form>
                <Link to="/login">Click here to Log in!</Link>
            </div>
        );
    }
    // }

}

export default Registration;
