export default function(state = {}, action) {
    if (action.type == 'RECEIVE_USER_FRIENDS_AND_WANNABES') {
        state = {
            ...state,
            userFriendsAndWannabes: action.userFriendsAndWannabes
        };
    }
    if (action.type == 'ACCEPT_FRIEND') {
        state = {
            ...state,
            userFriendsAndWannabes: state.userFriendsAndWannabes.map(user => {
                if (user.id == action.newFriend.sender_id) {
                    return {
                        ...user,
                        status : 2
                    };
                }else {
                    return user;
                }
            })

        };
    }

    if (action.type == 'END_FRIENDSHIP') {
        state = {
            ...state,
            userFriendsAndWannabes: state.userFriendsAndWannabes.map(user => {
                if (user.id == action.deletedFriend.sender_id || user.id == action.deletedFriend.receiver_id) {
                    return {
                        ...user,
                        status : 0
                    };
                }else {
                    return user;
                }
            })

        };
    }

    return state;
}
