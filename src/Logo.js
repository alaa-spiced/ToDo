import React, {Component} from "react";


class Logo extends Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        e.preventDefault();

    }
    render() {
        return (
            <div>
                <h1>Welcome, {this.props.first}</h1>
                <button type="button" onClick={this.handleClick}>Log out</button>
            </div>
        );
    }

}

export default Logo;
