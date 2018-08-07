import axios from './axios';

export async function receiveFriendsWannabes() {
    const results  = await axios.get('/friends-wannabes');
    return {
        type                    :   'RECEIVE_USER_FRIENDS_AND_WANNABES',
        userFriendsAndWannabes  :   results.data.userFriendsAndWannabes
    };
}


export async function acceptFriendRequest(senderId) {
    const results = await axios.post('/update-friend',{senderId : senderId, status : 2});
    console.log("hellooooooo", results);
    return {
        type: 'ACCEPT_FRIEND',
        newFriend : results.data

    };
}

export async function endFriendship(senderId) {
    const results = await axios.post('/delete-friendship',{senderId : senderId});
    console.log("hellooooooo delete", results);
    return {
        type: 'END_FRIENDSHIP',
        deletedFriend : results.data

    };
}
//
// export async function endFriendship(senderId) {
//     const results = await axios.post('/end-friendship',{senderId : senderId});
//     return {
//         type: 'ACCEPT_FRIEND',
//         senderId : results.data.sender_id,
//         receiverId : results.data.receiver_id,
//         status : results.data.status,
//         buttonText : 'End Friendship'
//     };
// }
