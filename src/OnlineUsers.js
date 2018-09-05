import React from 'react';
import { connect } from 'react-redux';

class OnlineUsers extends React.Component {
    componentDidMount() {
    }
    render() {
        const { onlineUsers } = this.props;
        if (!onlineUsers) {
            return (<h1>There are no online users</h1>);
        }

        const onlineUsersDiv = (
            <div className="main-online-users">
                <div className="left">
                    <h2>Online users</h2>
                    <div className="online-users">
                        {onlineUsers.map(user => (
                            <div key={user.id} className="friend">
                                <img className="online-user-pic" src={user.image_url || '/images/default.png'} />
                                <div>{user.first_name} {user.last_name}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );

        return (
            <div id="online-users-div">
                {!onlineUsers.length && <div>Nobody is Online</div>}
                {!!onlineUsers.length && onlineUsersDiv}
            </div>
        );
    }
}
export default connect(state => {
    return {
        onlineUsers: state.onlineUsers
    };
})(OnlineUsers);
