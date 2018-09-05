import React, { Component } from 'react';
import axios from './axios';
import FriendshipButton from './FriendshipButton';
import OtherUserFriends from './OtherUserFriends';

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
                } else if (results.data.noSuchId) {
                    this.setState({
                        noSuchId : results.data.noSuchId
                    });
                }else{
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
        if (this.state.noSuchId) {
            return (<div>No Such User Id</div>);
        }
        return (
            <div id="other-user-profile">
                <h1>{this.state.otherUserFirstName}, {this.state.otherUserLastName} {" "} Profile</h1>
                <img src={this.state.otherUserProfilePic} alt=" Profile Pic" />
                <p>{this.state.otherUserBio}</p>
                <FriendshipButton otherUserId={this.props.match.params.id} /><br></br>
                <OtherUserFriends ouId={this.props.match.params.id} />
            </div>
        );
    }
}

export default OtherUserProfile;
