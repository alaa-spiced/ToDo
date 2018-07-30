import React, { Component } from 'react';
import axios from './axios';

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        axios.get('/user/' + this.props.match.params.id + '.json')
            .then((results) => {
                if (results.data.redirect) {
                    this.props.history.push('/');
                } else {
                    this.setState({
                        userId     : results.data.id,
                        firstName  : results.data.first_name,
                        lastName   : results.data.last_name,
                        bio        : results.data.bio,
                        profilePic : results.data.image_url,
                        ctreatedAt : results.data.created_at
                    });
                }
            });
    }

    render() {
        return (
            <div id="other-user-profile">
                <h1>{this.state.firstName}, {this.state.lastName} {" "} Profile</h1>
                <img src={this.state.profilePic} alt=" Profile Pic" />
                <p>{this.state.bio}</p>
            </div>
        );
    }
}

export default Profile;
