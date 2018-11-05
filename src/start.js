import React from 'react';
import ReactDOM from 'react-dom';
import Welcome from './Welcome';
import App from './App';

let component;

if (location.pathname == "/welcome") {
    component = <Welcome />;
} else {
    component = <App />;
}

ReactDOM.render(
    component,
    document.querySelector('main')
);
