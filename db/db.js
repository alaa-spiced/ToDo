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

exports.updateUserBio = function(userId , bio) {
    const q =
    "UPDATE users SET bio = ($2) WHERE id = ($1) RETURNING *;";

    const params = [userId , bio];
    return db.query(q, params).then(results => {
        return results.rows[0];
    });
};
