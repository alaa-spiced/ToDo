import React from 'react';
import { connect } from 'react-redux';
//import { Link } from 'react-router-dom';
import { receiveFriendsWannabes } from './actions';
import FriendshipButton from './FriendshipButton';

class Friends extends React.Component {
    componentDidMount() {
        this.props.dispatch(receiveFriendsWannabes());
    }
    render() {
        var {userWannabes}  = this.props;
        var {userFriends} = this.props;
        if (!userWannabes && !userFriends) {
            return null;
        }

        var wannabes = (
            <div className="users">
                {userWannabes.map(user => (
                    <div className="user" key={user.id}>
                        <img className="profilepic" src={user.image_url} />
                        <h3>{user.first_name} {user.last_name}</h3>
                        <FriendshipButton otherUserId={user.id} />
                    </div>
                ))}
            </div>
        );

        var friends = (
            <div className="users">
                {userFriends.map(user => (
                    <div className="user" key={user.id}>
                        <img className="profilepic" src={user.image_url} />
                        <h3>{user.first_name} {user.last_name}</h3>
                        <FriendshipButton otherUserId={user.id} />
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
        userFriends: state.userFriendsAndWannabes && state.userFriendsAndWannabes.filter(user => user.status == 2)

    };
};

export default connect(mapStateToProps)(Friends);
