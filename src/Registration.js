import React, {Component} from "react";
import axios from './axios';
import { Link } from 'react-router-dom';
import App from './App';

class Registration extends Component {
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

        const results = await axios.post('/registration', this.state);
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
        }
        return (
            <div className="registration-div">
                <form className="registration-form" onSubmit={this.handleSubmit}>
                    <input
                        className="all-inputs"
                        type="text"
                        name="firstname"
                        required
                        title=" Enter Your First Name "
                        placeholder="First Name"
                        onChange={this.handleChange}
                    />

                    <input
                        className="all-inputs"
                        type="text"
                        name="lastname"
                        required
                        title=" Enter Your Last Name "
                        placeholder="Last Name"
                        onChange={this.handleChange}
                    />

                    <input
                        className="all-inputs"
                        type="email"
                        name="email"
                        required
                        title=" Enter Your E-Mail Address "
                        placeholder="E-Mail"
                        onChange={this.handleChange}
                    />

                    <input
                        className="all-inputs"
                        type="password"
                        name="password"
                        pattern = "(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"
                        minLength="8"
                        required
                        title=" Password must contain (UpperCase, LowerCase, Number, SpecialChar and min 8 Chars) "
                        placeholder="Password"
                        onChange={this.handleChange}
                    />

                    <input className="all-inputs" type="submit" value="Sign Up" />

                </form>
                {this.state.errorMessage && <div>{this.state.errorMessage}</div>}
                <Link to="/login">Click here to Log in!</Link>
            </div>
        );
    }
}

export default Registration;
