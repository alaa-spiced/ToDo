import React from 'react';
import { connect } from 'react-redux';
//import { Link } from 'react-router-dom';
import { receiveOtherUserFriends } from './actions';
//import FriendshipButton from './FriendshipButton';

class OtherUserFriends extends React.Component {
    constructor(props){
        super(props);
    }
    componentDidMount() {
        console.log(this.props.ouId);
        this.props.dispatch(receiveOtherUserFriends(this.props.ouId));
    }


    render() {
        var {otherUserFriends}  = this.props;
        if (!otherUserFriends) {
            return null;
        }

        var otherFriends = (
            <div className="other-user-friends">
                {otherUserFriends.map(user => (
                    <div className="user" key={user.id}>
                        <img className="profilepic" src={user.image_url} />
                        <h3>{user.first_name} {user.last_name}</h3>
                    </div>
                ))}
            </div>
        );
        return (
            <div className="other-user-friends-div">
                {!otherUserFriends.length && <div>This user has no friends</div>}
                {otherUserFriends.length && <h3>Those people are the other user friends</h3>}
                {!!otherUserFriends.length && otherFriends}

            </div>
        );

    }
}

const mapStateToProps = function(state) {
    console.log(state.otherUserFriends);
    return {
        otherUserFriends: state.otherUserFriends
    };
};

export default connect(mapStateToProps)(OtherUserFriends);
