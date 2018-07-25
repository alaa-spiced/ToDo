import React from "react";
import Registration from "./Registration";
import { HashRouter, Route } from 'react-router-dom';
import Login from "./Login";

function Welcome() {
    return (
        <div id="welcome">
            <h1>Welcome!</h1>
            <img src="./images/logo.jpg" alt="Logo" />
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
