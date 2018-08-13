import React from 'react';
import { connect } from 'react-redux';
//import { Link } from 'react-router-dom';
import { receiveFriendsWannabes , acceptFriendRequest , endFriendship} from './actions';
//import FriendshipButton from './FriendshipButton';

class Friends extends React.Component {
    componentDidMount() {
        this.props.dispatch(receiveFriendsWannabes());
    }

    handleAcceptClick(userId){
        this.props.dispatch(
            acceptFriendRequest(userId)
        );
    }

    handleDeleteClick(userId){
        this.props.dispatch(
            endFriendship(userId)
        );
    }

    render() {
        var {userWannabes , userFriends}  = this.props;
        if (!userWannabes && !userFriends) {
            return null;
        }

        var wannabes = (
            <div className="main-users">
                {userWannabes.map(user => (
                    <div className="user" key={user.id}>
                        <img className="friends-profilepic" src={user.image_url} />
                        <div className="button-friends">
                            <h3>{user.first_name} {user.last_name}</h3>
                            <button onClick={()=>this.handleAcceptClick(user.id)}>Accept Friend Request</button>
                        </div>

                    </div>
                ))}
            </div>
        );

        var friends = (
            <div className="main-users">
                {userFriends.map(user => (
                    <div className="user" key={user.id}>
                        <img className="friends-profilepic" src={user.image_url} />

                        <div className="button-friends">
                            <h3>{user.first_name} {user.last_name}</h3>
                            <button onClick={()=>this.handleDeleteClick(user.id)}>End Friendship</button>
                        </div>
                    </div>
                ))}
            </div>
        );
        return (
            <div className="friends-wannabes">
                <div className="wannabes">
                    {!userWannabes.length && <div>You have no friend requests</div>}
                    {userWannabes.length && <h3>Those people wanna be your friends</h3>}
                    {!!userWannabes.length && wannabes}
                </div>

                <div className="friends">
                    {!userFriends.length && <div>You have no friends</div>}
                    {userFriends.length && <h3>Those people are your friends</h3>}
                    {!!userFriends.length && friends}
                </div>
            </div>
        );

    }
}

const mapStateToProps = function(state) {
    return {
        userWannabes: state.userFriendsAndWannabes && state.userFriendsAndWannabes.filter(user => user.status == 1),
        userFriends: state.userFriendsAndWannabes && state.userFriendsAndWannabes.filter(user => user.status == 2),
        newFriend : state.newFriend,
        deletedFriend : state.deletedFriend
    };
};

export default connect(mapStateToProps)(Friends);
