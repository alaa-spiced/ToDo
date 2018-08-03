import axios from './axios';


export async function receiveFriendsWannabes() {
    const { data } = await axios.get('/friends-wannabes');
    return {
        type                    :   'RECEIVE_USER_FRIENDS_AND_WANNABES',
        userFriendsAndWannabes  :   data.userFriendsAndWannabes
    };
}

// export async function acceptFriendRequest(userId) {
//     const x = await axios.post(`/hot/${userId}`);
//     return {
//         type: 'MAKE_HOT',
//         userId
//     };
// }



// export async function receiveUsers() {
//     const { data } = await axios.get('/users');
//     return {
//         type: 'RECEIVE_USERS',
//         users: data.users
//     };
// }
//
// export async function makeHot(id) {
//     const x = await axios.post(`/hot/${id}`);
//     return {
//         type: 'MAKE_HOT',
//         id
//     };
// }
//
// export async function makeNot(id) {
//     const x = await axios.post(`/not/${id}`);
//     return {
//         type: 'MAKE_NOT',
//         id
//     };
// }
