import React from 'react';
import axios from './axios';

class FriendshipButton extends React.Component{
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount(){
        if (this.props.status == 1) {
            console.log(this.props.status);
            this.setState({
                senderId : this.props.senderId,
                status : this.props.status,
                buttonText : 'Accept request'
            });
        }else if (this.props.status == 2) {
            console.log(this.props.status);
            this.setState({
                senderId : this.props.senderId,
                status : this.props.status,
                buttonText : 'cancle request'
            });
        }
    }

    friend(){
        if (FriendshipButton.state.status == 1) {
            axios.post('/accept-request' , {senderId : FriendshipButton.state.senderId, status : 2}).then((results)=>{
                console.log(results);
                // this.props.setFriendshipStatus(2);
                // this.setState({
                //     buttonText : 'cancle friend request'
                // });
            });
        }else if (FriendshipButton.state.status == 2) {
            axios.post('/delete-friendship' , {senderId : FriendshipButton.state.senderId}).then((results)=>{
                console.log(results);
                this.props.setFriendshipStatus(null);
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
