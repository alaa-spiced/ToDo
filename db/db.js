const spicedPg = require("spiced-pg");
let db; //connecting to heroku or localhost
if (process.env.DATABASE_URL) {
    db = spicedPg(process.env.DATABASE_URL);
}else {
    db = spicedPg("postgres:postgres:postgres@localhost:5432/socialnetwork");
}

exports.createUser = function(firstName, lastName, email, password) {
    const q =
    "INSERT INTO users (first_name, last_name,email, hashed_password) VALUES ($1, $2 ,$3, $4) RETURNING *";

    const params = [firstName, lastName, email, password];
    return db.query(q, params).then(results => {
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
