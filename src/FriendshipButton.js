import React from 'react';
import axios from './axios';

class FriendshipButton extends React.Component{
    constructor(props) {
        super(props);
        this.state = {};
        this.friend = this.friend.bind(this);
    }

    componentDidMount(){
        axios.get('/user-friendship/'+ this.props.otherUserId+'.json').then((resp)=>{
            console.log(resp.data);
            if (resp.data.id == null) {
                this.setState({
                    friendshipStatus : null,
                    loggedInUserId : resp.data.loggedInUserId,
                    otherUserId     : this.props.otherUserId,
                    senderId : resp.data.loggedInUserId,
                    receiverId : this.props.otherUserId
                });
            }else {
                console.log(resp.data);
                this.setState({
                    friendshipStatus : resp.data.status,
                    loggedInUserId : resp.data.loggedInUserId,
                    otherUserId : this.props.otherUserId,
                    senderId : resp.data.sender_id,
                    receiverId : resp.data.receiver_id
                });
            }
            if (this.state.friendshipStatus == null) {
                console.log(this.state.friendshipStatus);
                this.setState({
                    buttonText : 'Add Friend'
                });
            }else if (this.state.friendshipStatus == 1 && this.state.loggedInUserId == this.state.senderId) {
                console.log(this.state.friendshipStatus);
                this.setState({
                    buttonText : 'Cancel Friend Request'
                });
            }else if (this.state.friendshipStatus == 1 && this.state.loggedInUserId == this.state.receiverId) {
                this.setState({
                    buttonText : 'Accept Friend Request'
                });
            }else if (this.state.friendshipStatus == 2 ) {
                this.setState({
                    buttonText : 'Delete Friendship'
                });
            }


        });

    }

    friend(){
        if (this.state.friendshipStatus == null) {
            axios.post('/accept-request' , {senderId : this.state.loggedInUserId, receiverId : this.state.otherUserId, status : 1}).then((results)=>{
                console.log(results.data);
                this.setState({
                    friendshipStatus : results.data.status,
                    senderId : results.data.sender_id,
                    receiver_id : results.data.receiver_id,
                    buttonText : 'Cancle Friend Request'
                });
            });
        }else if (this.state.friendshipStatus == 1 && this.state.loggedInUserId == this.state.senderId) {
            axios.post('/delete-friendship' , {senderId : this.state.loggedInUserId, receiverId : this.state.otherUserId}).then((results)=>{
                this.setState({
                    friendshipStatus : null,
                    senderId : this.state.loggedInUserId,
                    receiver_id : this.props.otherUserId,
                    buttonText : 'Add Friend'
                });


            });
        }else if (this.state.friendshipStatus == 1 && this.state.loggedInUserId == this.state.receiverId) {
            axios.post('/update-friend' , {senderId : this.state.otherUserId, receiverId : this.state.loggedInUserId, status:2}).then((results)=>{
                this.setState({
                    friendshipStatus : 2,
                    senderId : results.data.sender_id,
                    receiver_id : results.data.receiver_id,
                    buttonText : 'Delete Friendship'
                });


            });
        }else if (this.state.friendshipStatus == 2) {
            axios.post('/delete-friendship' , {senderId : this.state.loggedInUserId, receiverId : this.state.otherUserId}).then((results)=>{
                this.setState({
                    friendshipStatus : null,
                    senderId : this.state.loggedInUserId,
                    receiver_id : this.props.otherUserId,
                    buttonText : 'Add Friend'
                });


            });
        }

    }

    render() {
        return (<div>
            <button className="friendship-button" onClick={this.friend}>{this.state.buttonText}</button>
        </div>
        );
    }
}


export default FriendshipButton;
