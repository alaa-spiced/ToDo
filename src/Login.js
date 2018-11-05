import React, {Component} from "react";
import axios from './axios';
import { Link } from 'react-router-dom';
import App from './App';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errorMessage : null
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({ [e.target.name] : e.target.value }, ()=>{
        });
    }

    async handleSubmit(e) {
        e.preventDefault();
        const results = await axios.post('/login', this.state);
        if (results.data.success) {
            this.setState({isloggedIn : true});
            location.replace('/');
        }else {
            this.setState({
                errorMessage : results.data.message
            });
        }
    }

    render() {
        if (this.state.isLoggedIn) {
            return (
                <App />
            );
        }else {
            return (
                <div className="login-div">
                    <form className="login-form" onSubmit={this.handleSubmit}>
                        <input
                            type="email"
                            name="email"
                            required
                            placeholder="E-Mail"
                            onChange={this.handleChange}
                        />

                        <input
                            type="password"
                            name="password"
                            required
                            placeholder="Password"
                            onChange={this.handleChange}
                        />

                        <input type="submit" value="Log In" />
                        {this.state.errorMessage && <div>{this.state.errorMessage}</div>}
                    </form>
                    <Link to="/">Click here to Register!</Link>
                </div>
            );
        }
    }
}

export default Login;
