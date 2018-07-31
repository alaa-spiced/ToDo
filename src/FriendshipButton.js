import React from 'react';
import axios from './axios';

class FriendshipButton extends React.Component{
    constructor(props) {
        super(props);
        this.state = {};
        this.friend = this.friend.bind(this);
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
        if (this.state.status == 1) {
            axios.post('/accept-request' , {senderId : this.state.senderId, status : 2}).then((results)=>{
                console.log(results);
                if (results.data.success) {
                    this.props.setFriendshipStatus(2);
                    this.setState({
                        status : 2,
                        buttonText : 'cancle friend request'
                    });
                }else {
                    console.log("Results is empty");
                }

            });
        }else if (this.state.status == 2) {
            axios.post('/delete-friendship' , {senderId : this.state.senderId}).then((results)=>{
                console.log(results);
                if (results.data.success) {
                    this.props.setFriendshipStatus(null);
                    this.setState({
                        status : null
                    });
                }else {
                    console.log("delete Results is empty");
                }

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
