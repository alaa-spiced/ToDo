import React from "react";
import Registration from "./Registration";
import { HashRouter, Route } from 'react-router-dom';
import Login from "./Login";

function Welcome() {
    return (
        <div id="welcome-page">
            <div className="logo-image-container">
                <div className="welcome-trasparent"></div>
                <div className="logo-image-div"><img className="logo-image-welcome"  src="/images/logo.png" alt="Logo image" />
                    <div className="todo-text">
                        <h1>Projects Flow Control</h1>
                    </div>
                </div>

            </div>

            <HashRouter>
                <div className="welcome-page-routs">
                    <Route exact path="/" component={Registration} />
                    <Route path="/login" component={Login} />
                </div>
            </HashRouter>
        </div>
    );
}

export default Welcome;
