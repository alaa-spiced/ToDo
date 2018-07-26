import React from 'react';
import ReactDOM from 'react-dom';
import Welcome from './Welcome';
import App from './App';

const welcome = <Welcome />;
const app = <App />;
ReactDOM.render(
    (location.pathname === '/welcome')
        ? welcome
        : app
    ,
    document.querySelector('main')
);
