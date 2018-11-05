import React from "react";
import { Router, Route } from "react-router-dom";
import history from "./history";
import axios from "./axios";
import Profile from "./Profile";
import { Link } from "react-router-dom";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    async componentDidMount() {
        history.push('/profile');
        const results = await axios.get("/user");
        this.setState({
            userInfo: results.data
        });
    }

    render() {
        if (!this.state.userInfo) {
            return <div className="progressbar-div"> <img src="./images/progressbar.gif" /> </div>;
        }
        return (
            <div id="app">
                <Router history={history}>
                    <div className="welcome-page">
                        <div className="header">
                            <div className="logo-image-container-app">
                                <div className="image-wraper">
                                    <img
                                        className="logo-image-welcome-app"
                                        src="/images/logo.png"
                                        alt="Logo image"
                                    />
                                </div>
                                <div className="todo-text">
                                    <h2>
                                        Projects Flow Control
                                    </h2>
                                </div>
                            </div>

                            <div className="welcome-nav">

                                {/*<Link className="projects-link" to="/projects">
                  Projects
                                </Link>*/}

                                <Link className="profile-link" to="/profile">
                  Profile
                                </Link>
                            </div>
                        </div>
                        <div className="main-content">
                            {/*<Route path="/projects" component={Projects} />*/}
                            <Route
                                exact
                                path="/profile"
                                render={() => (
                                    <Profile
                                        userInfo={this.state.userInfo}
                                    />
                                )}
                            />
                        </div>

                        <div className="footer">
                            <footer>&#169; 2018 Created by Alaa Abushkayyan</footer>
                        </div>
                    </div>
                </Router>
            </div>
        );
    }
}


export default App;
