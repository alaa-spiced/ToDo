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
            }).then(()=>{

                axios.get('/user-friendship/'+ this.state.otherUserId+'.json').then((resp)=>{
                    console.log(resp.data);
                    if (!resp.data.success) {
                        this.setState({
                            friendshipStatus : 3,
                            loggedInUserId : resp.data.loggedInUser
                        });
                    }else {
                        console.log(resp.data.results[0].status);
                        this.setState({
                            friendshipStatus : resp.data.results[0].status,
                            loggedInUserId : resp.data.loggedInUser,
                            senderId : resp.data.results[0].sender_id,
                            receiverId : resp.data.results[0].receiver_id
                        });
                    }

                });

            });
    }

    render() {
        return (
            <div id="other-user-profile">
                <h1>{this.state.otherUserFirstName}, {this.state.otherUserLastName} {" "} Profile</h1>
                <img src={this.state.otherUserProfilePic} alt=" Profile Pic" />
                <p>{this.state.otherUserBio}</p>
                {this.state.friendshipStatus && <FriendshipButton status={this.state.friendshipStatus} senderId={this.state.senderId} receiverId={this.state.receiverId} otherUserId={this.state.otherUserId} loggedInUserId={this.state.loggedInUserId} setFriendshipStatus={this.setFriendshipStatus} />}
            </div>
        );
    }
}

export default OtherUserProfile;
