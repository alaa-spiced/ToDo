import React from 'react';
import { connect } from 'react-redux';
import { receiveFriendsWannabes } from './actions';

class Friends extends React.Component {
    componentDidMount() {
        this.props.dispatch(receiveFriendsWannabes());
    }
    render() {
        const { userFriendsAndWannabes } = this.props;
        console.log(userFriendsAndWannabes);
        if (!userFriendsAndWannabes) {
            return null;
        }
        // const handleHotClick = e => {
        //     this.props.dispatch(
        //         makeHot(userFriendsAndWannabes[0].id)
        //     );
        // };
        //
        // const handleNotClick = e => {
        //     this.props.dispatch(
        //         makeNot(users[0].id)
        //     );
        // };

        return (
            <div id="friends-wannabes">
                <div className="user">
                    <img src={userFriendsAndWannabes[1].image_url} />
                    <h3>{userFriendsAndWannabes[1].first_name} {userFriendsAndWannabes[0].last_name}</h3>
                    <h3>{userFriendsAndWannabes[1].bio}</h3>
                    {/*<div className="buttons">
                        <button onClick={handleHotClick}>Hot</button>
                        <button onClick={handleNotClick}>Not</button>
                    </div>*/}
                </div>
                {/*<nav>
                    <Link to="/hot">See who&apos;s hot</Link>
                    <Link to="/not">See who&apos;s not</Link>
                </nav>*/}
            </div>
        );
    }
}

const mapStateToProps = function(state) {
    return {
        users: state.users && state.users.filter(user => user.hot == null)
    };
};

export default connect(mapStateToProps)(Friends);
