import React from "react";
import Registration from "./Registration";
import { HashRouter, Route } from 'react-router-dom';
import Login from "./Login";

function Welcome() {
    return (
        <div id="welcome-page">
            <div className="logo-image-container">
                <img className="logo-image" src="./images/logo.png" alt="Logo image" />
                <div className="peace-text">
                    <h1>PEACE</h1>
                </div>
            </div>

            <HashRouter>
                <div>
                    <Route exact path="/" component={Registration} />
                    <Route path="/login" component={Login} />
                </div>
            </HashRouter>
        </div>
    );
}

export default Welcome;
