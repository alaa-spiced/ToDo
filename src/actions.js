import axios from './axios';

export async function receiveFriendsWannabes() {
    const results  = await axios.get('/friends-wannabes');
    return {
        type                    :   'RECEIVE_USER_FRIENDS_AND_WANNABES',
        userFriendsAndWannabes  :   results.data.userFriendsAndWannabes
    };
}

export async function receiveOtherUserFriends(ouId) {
    console.log("action ", ouId);
    const results  = await axios.post('/other-user-friends',({ouId : ouId}));
    console.log("Other User Friends" , results.data.otherUserFriends);
    return {
        type                    :   'RECEIVE_OTHER_USER_FRIENDS',
        otherUserFriends  :   results.data.otherUserFriends
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


export function pushOnlineUsersToRedux(onlineUsers) {
    return {
        type: 'PUSH_ONLINE_USERS_TO_REDUX',
        onlineUsers

    };
}
export function userJoined (user) {
    console.log('userjoined' , user);
    return {
        type:'USER_JOINED',
        user
    };
}

export function userLeft (user) {
    console.log('userLeft' , user);
    return {
        type:'USER_LEFT',
        user
    };
}
export function pushChatMessagesToRedux(chatMessages) {
    return {
        type: 'PUSH_CHAT_MESSAGES_TO_REDUX',
        chatMessages
    };
}
export function newMessageAction (chatMessage) {
    console.log('newMessage' , chatMessage);
    return {
        type:'NEW_MESSAGE',
        chatMessage
    };
}