export default function(state = {}, action) {
    if (action.type == 'RECEIVE_USER_FRIENDS_AND_WANNABES') {
        state = {
            ...state,
            userFriendsAndWannabes: action.userFriendsAndWannabes
        };
    }
    if (action.type == 'MAKE_HOT' || action.type == 'MAKE_NOT') {
        state = {
            ...state,
            users: state.users.map(
                user => {
                    if (user.id == action.id) {
                        return {
                            ...user,
                            hot: action.type == 'MAKE_HOT'
                        };
                    } else {
                        return user;
                    }
                }
            )
        };
    }

    return state;
}
