const spicedPg = require("spiced-pg");
let db; //connecting to heroku or localhost
if (process.env.DATABASE_URL) {
    db = spicedPg(process.env.DATABASE_URL);
}else {
    db = spicedPg("postgres:postgres:postgres@localhost:5432/socialnetwork");
}

exports.createUser = function(firstName, lastName, email, password) {
    const query =
    "INSERT INTO users (first_name, last_name,email, hashed_password) VALUES ($1, $2 ,$3, $4) RETURNING *";

    const params = [firstName, lastName, email, password];
    return db.query(query, params).then(results => {
        return results.rows[0];
    });
};

exports.checkEmail = function(email) {
    const q = "SELECT * FROM users WHERE email = $1;";
    const params = [email];
    return db.query(q, params).then(results => {
        return results.rows;
    });
};

exports.getUserInfoById = function(userId) {
    const q = "SELECT * FROM users WHERE id = $1;";
    const params = [userId];
    return db.query(q, params).then(results => {
        return results.rows[0];
    });
};

exports.updateUserProfilePic = function(userId , imageUrl) {
    const q =
    "UPDATE users SET image_url = ($2) WHERE id = ($1) RETURNING *;";

    const params = [userId , imageUrl];
    return db.query(q, params).then(results => {
        return results.rows[0];
    });
};

exports.updateUserBio = function(userId, bio) {
    const q =
    "UPDATE users SET bio = ($2) WHERE id = ($1) RETURNING *;";

    const params = [userId , bio];
    return db.query(q, params).then(results => {
        return results.rows[0];
    });
};

exports.getFriendshipStatusById = function(userId) {
    const q = "SELECT * FROM friendships WHERE (receiver_id = $1);";
    const params = [userId];
    return db.query(q, params).then(results => {
        return results.rows;
    });
};

exports.getFriendshipStatus = function(senderId, receiverId) {
    const q = "SELECT * FROM friendships WHERE ((sender_id = $1 AND receiver_id = $2) OR (sender_id = $2 AND receiver_id = $1));";
    const params = [senderId, receiverId];
    return db.query(q, params).then(results => {
        return results.rows;
    });
};

exports.setFriendshipStatus = function(senderId, receiverId , status) {
    const q = "UPDATE friendships SET status = $3 WHERE (sender_id = $1 AND receiver_id = $2) RETURNING *;";
    const params = [senderId, receiverId, status];
    return db.query(q, params).then(results => {
        return results.rows[0];
    });
};

exports.deleteFriendship = function(senderId, receiverId) {
    const q = "DELETE FROM friendships where ((sender_id = $1 AND receiver_id = $2) OR (sender_id = $2 AND receiver_id = $1)) RETURNING *;";
    const params = [senderId, receiverId];
    return db.query(q, params).then(results => {
        return results.rows[0];
    });
};

exports.addFriend = function(senderId, receiverId , status) {
    const q = "INSERT INTO friendships (sender_id,receiver_id,status) VALUES ($1, $2, $3) RETURNING *;";
    const params = [senderId, receiverId, status];
    return db.query(q, params).then(results => {
        return results.rows[0];
    });
};


exports.getFriendsAndWannabes = function(userId) {
    const q = `
           SELECT users.id, first_name, last_name, image_url, status
           FROM friendships
           JOIN users
           ON (status = 1 AND receiver_id = $1 AND sender_id = users.id)
           OR (status = 2 AND receiver_id = $1 AND sender_id = users.id)
           OR (status = 2 AND sender_id = $1 AND receiver_id = users.id);
       `;
    const params = [userId];
    return db.query(q, params).then(results => {
        return results.rows;
    });
};

exports.getUsersInfosByIds = function(arrayOfIds) {
    const query = `SELECT * FROM users WHERE id = ANY($1)`;
    return db.query(query, [arrayOfIds])
        .then(results => {
            console.log(results.rows);
            return results.rows;
        });
};

exports.deleteUserFriendships = function(userId) {
    const query = `DELETE FROM friendships WHERE (sender_id =($1) OR receiver_id = ($1))`;
    return db.query(query, [userId])
        .then(results => {
            return results.rows[0];
        });
};

exports.getUserImages = function(userId) {
    const query = `SELECT image_urls FROM images WHERE user_id =($1);`;
    return db.query(query, [userId])
        .then(results => {
            return results.rows;
        });
};

exports.deleteUserImagesDb = function(userId) {
    const query = `DELETE FROM images WHERE user_id =($1);`;
    return db.query(query, [userId])
        .then(results => {
            return results.rows;
        });
};

exports.addImage = function(userId, imageName) {
    const q = "INSERT INTO images (user_id,image_urls) VALUES ($1, $2);";
    const params = [userId, imageName];
    return db.query(q, params).then(results => {
        return results.rows[0];
    });
};

exports.deleteUser = function(userId) {
    const query = `DELETE FROM users WHERE id =($1);`;
    return db.query(query, [userId])
        .then(results => {
            return results.rows;
        });
};

exports.checkOtherUserId = function(userId) {
    const q = `
           SELECT * FROM users where id= $1;
       `;
    const params = [userId];
    return db.query(q, params).then(results => {
        return results.rows;
    });
};


exports.getOtherUserFriends = function(userId) {
    const q = `
           SELECT users.id, first_name, last_name, image_url, status
           FROM friendships
           JOIN users
           ON (status = 2 AND receiver_id = $1 AND sender_id = users.id)
           OR (status = 2 AND sender_id = $1 AND receiver_id = users.id);
       `;
    const params = [userId];
    return db.query(q, params).then(results => {
        return results.rows;
    });
<<<<<<< HEAD
};
=======
};
>>>>>>> 9815ea825ef8247ee5b5894d92eba2f74f299f0c
