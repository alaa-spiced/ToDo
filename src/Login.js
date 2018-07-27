import React, {Component} from "react";
import axios from './axios';
import App from './App';
// import { Link } from 'react-router-dom';

class Login extends Component { //inherits properties of Component
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
        axios.post('/login', this.state).then((results)=>{
            if (results.data.success) {
                this.setState({isloggedIn : true});
                console.log(results.data.message);
                location.replace('/');

            }else {
                super.setState({isloggedIn : false});
                console.log(results.data.message);
            }
        });

    }

    render() {
        if (this.state.isLoggedIn) {
            return (
                <App />
            );
        }else {
            return (
                <div>
                    <form onSubmit={this.handleSubmit}>
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
                </div>
            );
        }
    }

}

export default Login;
