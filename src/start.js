import React from 'react';
import ReactDOM from 'react-dom';
import Welcome from './Welcome';

import Logo from './Logo';
const welcome = <Welcome />;


if(location.pathname == '/welcome'){
    ReactDOM.render(
        welcome,
        document.querySelector('main')
    );
}else {
    ReactDOM.render(
        <Logo />,
        document.querySelector('main')
    );
}
