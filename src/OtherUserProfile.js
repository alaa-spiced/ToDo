import React, { Component } from 'react';
import axios from './axios';
import FriendshipButton from './FriendshipButton';

class OtherUserProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.setFriendshipStatus = this.setFriendshipStatus.bind(this);
    }

    setFriendshipStatus(status){
        this.setState({
            friendshipStatus : status
        });
    }


    componentDidMount() {
        axios.get('/user/' + this.props.match.params.id + '.json')
            .then((results) => {
                if (results.data.redirect) {
                    this.props.history.push('/');
                } else {
                    this.setState({
                        otherUserId     : results.data.id,
                        otherUserFirstName  : results.data.first_name,
                        otherUserLastName   : results.data.last_name,
                        otherUserbio        : results.data.bio,
                        otherUserProfilePic : results.data.image_url || './images/default.jpg',
                        otherUserCtreatedAt : results.data.created_at
                    });
                }
            });
    }

    render() {
        return (
            <div id="other-user-profile">
                <h1>{this.state.otherUserFirstName}, {this.state.otherUserLastName} {" "} Profile</h1>
                <img src={this.state.otherUserProfilePic} alt=" Profile Pic" />
                <p>{this.state.otherUserBio}</p>
                <FriendshipButton otherUserId={this.props.match.params.id} />
            </div>
        );
    }
}

export default OtherUserProfile;
